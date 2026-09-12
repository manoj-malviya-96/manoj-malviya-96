import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { FaceCanvasTune } from "./config";
import {
	createAttributeBuffer,
	createIndexBuffer,
	createProgram,
} from "./gl/compile";
import { FACE_FRAGMENT_SHADER, FACE_VERTEX_SHADER } from "./gl/shaders";
import type { FaceMesh } from "./mesh/types";
import { easePointer, usePointer } from "./use-pointer";

type CanvasSize = { width: number; height: number };

type GlState = {
	gl: WebGL2RenderingContext;
	program: WebGLProgram;
	triangleCount: number;
	uPointer: WebGLUniformLocation;
	uPointerStrength: WebGLUniformLocation;
	uAmbientPulse: WebGLUniformLocation;
	uAspect: WebGLUniformLocation;
};

function setupGl(canvas: HTMLCanvasElement, mesh: FaceMesh): GlState | null {
	const gl = canvas.getContext("webgl2", {
		alpha: true,
		premultipliedAlpha: false,
	});
	if (!gl) return null;

	const program = createProgram(gl, FACE_VERTEX_SHADER, FACE_FRAGMENT_SHADER);
	gl.useProgram(program);

	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);
	createAttributeBuffer(gl, program, "aPosition", mesh.positions, 2);
	createAttributeBuffer(gl, program, "aColor", mesh.colors, 3);
	createIndexBuffer(gl, mesh.indices);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	const uPointer = gl.getUniformLocation(program, "uPointer");
	const uPointerStrength = gl.getUniformLocation(program, "uPointerStrength");
	const uAmbientPulse = gl.getUniformLocation(program, "uAmbientPulse");
	const uAspect = gl.getUniformLocation(program, "uAspect");
	if (!uPointer || !uPointerStrength || !uAmbientPulse || !uAspect) {
		throw new Error("Face shader is missing an expected uniform");
	}

	return {
		gl,
		program,
		triangleCount: mesh.triangleCount,
		uPointer,
		uPointerStrength,
		uAmbientPulse,
		uAspect,
	};
}

function pulsePhase(t: number): number {
	return (
		(1 - Math.cos((t / FaceCanvasTune.ambientPulse.periodMs) * Math.PI * 2)) / 2
	);
}

/** Owns the WebGL context, buffers, and render loop for a triangulated `FaceMesh`. */
export function useFaceShaderRenderer(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	mesh: FaceMesh | null,
): (size: CanvasSize) => void {
	const stateRef = useRef<GlState | null>(null);
	const sizeRef = useRef<CanvasSize>({ width: 0, height: 0 });
	const aspectRef = useRef(1);
	const pointerRef = usePointer(canvasRef, aspectRef);

	function handleResize(size: CanvasSize): void {
		sizeRef.current = size;
		aspectRef.current = size.width / size.height;
		const gl = stateRef.current?.gl;
		if (gl) gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || !mesh) return;

		// The atom <Canvas> already sizes the backing store to devicePixelContentBox and
		// calls `handleResize` before this effect can run, so the buffer is ready here.
		const state = setupGl(canvas, mesh);
		stateRef.current = state;
		if (!state) return;
		state.gl.viewport(0, 0, canvas.width, canvas.height);

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let raf: number | null = null;

		function draw(t: number): void {
			const current = stateRef.current;
			if (current) {
				easePointer(pointerRef.current);
				const { gl, program, triangleCount } = current;
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.useProgram(program);
				gl.uniform2f(
					current.uPointer,
					pointerRef.current.x,
					pointerRef.current.y,
				);
				gl.uniform1f(current.uPointerStrength, pointerRef.current.strength);
				gl.uniform1f(current.uAmbientPulse, pulsePhase(t));
				gl.uniform1f(current.uAspect, aspectRef.current);
				gl.drawElements(gl.TRIANGLES, triangleCount * 3, gl.UNSIGNED_INT, 0);
			}
			if (!reduceMotion) raf = requestAnimationFrame(draw);
		}

		if (reduceMotion) {
			draw(0);
		} else {
			raf = requestAnimationFrame(draw);
		}

		return () => {
			if (raf) cancelAnimationFrame(raf);
			stateRef.current = null;
		};
	}, [canvasRef, mesh, pointerRef]);

	return handleResize;
}
