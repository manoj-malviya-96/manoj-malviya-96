"use client";

import { Canvas } from "@manoj-malviya-96/atom";
import {
	type PointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import type { TrussOptResult } from "@/lib/data/truss_opt";
import type { TrussMesh } from "@/lib/truss-opt/engine/mesh";
import type { MouseMode } from "@/lib/truss-opt/use-truss-opt";
import {
	type CanvasSize,
	computeOffset,
	computeScale,
	drawLattice,
	fromCanvasPoint,
} from "./draw";

interface LatticeCanvasProps {
	mesh: TrussMesh;
	result: TrussOptResult | null;
	mouseMode: MouseMode;
	onPlaceNode: (meshX: number, meshY: number) => void;
}

export function LatticeCanvas({
	mesh,
	result,
	mouseMode,
	onPlaceNode,
}: LatticeCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		drawLattice(ctx, size, mesh, result);
	}, [mesh, result, size]);

	const handlePointerDown = useCallback(
		(event: PointerEvent<HTMLCanvasElement>) => {
			if (mouseMode === "none") return;
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const scale = computeScale(size, mesh);
			if (scale === 0) return;
			const offset = computeOffset(size, mesh, scale);
			const [meshX, meshY] = fromCanvasPoint(
				event.clientX - rect.left,
				event.clientY - rect.top,
				scale,
				offset,
			);
			onPlaceNode(meshX, meshY);
		},
		[mouseMode, size, mesh, onPlaceNode],
	);

	return (
		<Canvas
			ref={canvasRef}
			onResize={setSize}
			onPointerDown={handlePointerDown}
			width="full"
			height="full"
			style={{ cursor: mouseMode === "none" ? "default" : "crosshair" }}
		/>
	);
}
