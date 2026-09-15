"use client";

import { useSelector } from "@legendapp/state/react";
import {
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { isEditingRun, placeNode, trussOptState$ } from "@/lib/truss-opt/state";
import {
	type CanvasSize,
	computeOffset,
	computeScale,
	drawLattice,
	fromCanvasPoint,
} from "./draw";

export function useLatticeCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0 });
	const mesh = useSelector(() => trussOptState$.mesh.get());
	const result = useSelector(() => trussOptState$.result.get());
	const run = useSelector(() => trussOptState$.run.get());
	const editing = isEditingRun(run);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || size.width === 0 || size.height === 0) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const dpr = canvas.width / size.width;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		drawLattice(ctx, size, mesh, result);
	}, [mesh, result, size]);

	const onPointerDown = useCallback(
		(event: ReactPointerEvent<HTMLCanvasElement>) => {
			if (!editing) return;
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const scale = computeScale(size);
			if (scale === 0) return;
			const offset = computeOffset(size, mesh, scale);
			const [meshX, meshY] = fromCanvasPoint(
				event.clientX - rect.left,
				event.clientY - rect.top,
				scale,
				offset,
			);
			placeNode(meshX, meshY);
		},
		[editing, size, mesh],
	);

	return {
		canvasRef,
		onResize: setSize,
		onPointerDown,
		cursor: editing ? "crosshair" : "default",
	};
}
