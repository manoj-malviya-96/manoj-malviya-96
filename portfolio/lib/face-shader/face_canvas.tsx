"use client";

import { Canvas, Text } from "@manoj-malviya-96/atom";
import { useRef } from "react";
import { useFaceMesh } from "./use-face-mesh";
import { useFaceShaderRenderer } from "./use-face-shader-renderer";

/** Renders the source face photo as a cursor-reactive, triangulated WebGL mesh facing left. */
export default function FaceCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const state = useFaceMesh();
	const mesh = state.status === "ready" ? state.mesh : null;
	const handleResize = useFaceShaderRenderer(canvasRef, mesh);

	if (state.status === "error") {
		return (
			<Text variant="caption" muted>
				Face mesh failed to load: {state.error.message}
			</Text>
		);
	}

	return (
		<Canvas
			ref={canvasRef}
			onResize={handleResize}
			role="img"
			aria-label="Triangulated portrait, cursor-reactive"
			style={{ width: "100%", height: "100%" }}
		/>
	);
}
