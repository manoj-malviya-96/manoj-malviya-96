"use client";

import { Canvas } from "@manoj-malviya-96/atom";
import { useLatticeCanvas } from "./use-lattice-canvas";

export function LatticeCanvas() {
	const { canvasRef, onResize, onPointerDown, cursor } = useLatticeCanvas();

	return (
		<Canvas
			ref={canvasRef}
			onResize={onResize}
			onPointerDown={onPointerDown}
			width="full"
			height="full"
			style={{ cursor }}
		/>
	);
}
