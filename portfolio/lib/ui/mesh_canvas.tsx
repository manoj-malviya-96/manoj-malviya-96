"use client";

import { Canvas, getThemeColor, useTheme } from "@manoj-malviya-96/atom";
import { useEffect, useRef } from "react";

type CanvasSize = { width: number; height: number };

type Point = {
	baseX: number;
	baseY: number;
	x: number;
	y: number;
	phase: number;
	speed: number;
};

type Grid = {
	cols: number;
	rows: number;
	points: Point[];
};

const CELL_SIZE = 72;
const JITTER = 0.35;
const DRIFT_RADIUS = 6;
const POINTER_RADIUS = 160;
const POINTER_PUSH = 22;
const LINE_ALPHA = 0.16;
const POINTER_EASE = 0.12;
const STRENGTH_EASE = 0.06;
const IDLE_TIMEOUT_MS = 500;

function buildGrid(width: number, height: number): Grid {
	const cols = Math.ceil(width / CELL_SIZE) + 1;
	const rows = Math.ceil(height / CELL_SIZE) + 1;
	const points: Point[] = [];
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			const x = i * CELL_SIZE + (Math.random() - 0.5) * CELL_SIZE * JITTER;
			const y = j * CELL_SIZE + (Math.random() - 0.5) * CELL_SIZE * JITTER;
			points.push({
				baseX: x,
				baseY: y,
				x,
				y,
				phase: Math.random() * Math.PI * 2,
				speed: 0.15 + Math.random() * 0.15,
			});
		}
	}
	return { cols, rows, points };
}

// Wireframe only, deliberately — no triangle fills. Keep it that way.
export default function MeshCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sizeRef = useRef<CanvasSize>({ width: 0, height: 0 });
	const gridRef = useRef<Grid>({ cols: 0, rows: 0, points: [] });
	const pointerRef = useRef({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		strength: 0,
		targetStrength: 0,
		lastMove: 0,
	});
	const colorRef = useRef("#8a8a8a");
	const theme = useTheme();

	// biome-ignore lint/correctness/useExhaustiveDependencies: theme isn't read here, it's the re-run trigger — colorRef must be re-resolved whenever data-theme changes.
	useEffect(() => {
		colorRef.current = getThemeColor("muted");
	}, [theme]);

	const handleResize = (size: CanvasSize) => {
		sizeRef.current = size;
		gridRef.current = buildGrid(size.width, size.height);
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;
		const dpr = window.devicePixelRatio || 1;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	};

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let raf: number | null = null;

		const onPointerMove = (e: PointerEvent) => {
			const pointer = pointerRef.current;
			pointer.targetX = e.clientX;
			pointer.targetY = e.clientY;
			pointer.targetStrength = 1;
			pointer.lastMove = performance.now();
		};
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		const draw = (t: number) => {
			const ctx = canvasRef.current?.getContext("2d");
			const { width, height } = sizeRef.current;
			const { cols, rows, points } = gridRef.current;

			if (ctx && points.length > 0) {
				const pointer = pointerRef.current;
				pointer.x += (pointer.targetX - pointer.x) * POINTER_EASE;
				pointer.y += (pointer.targetY - pointer.y) * POINTER_EASE;
				if (t - pointer.lastMove > IDLE_TIMEOUT_MS) pointer.targetStrength = 0;
				pointer.strength +=
					(pointer.targetStrength - pointer.strength) * STRENGTH_EASE;

				for (const p of points) {
					let x =
						p.baseX + Math.sin(t * 0.0002 * p.speed + p.phase) * DRIFT_RADIUS;
					let y =
						p.baseY + Math.cos(t * 0.00016 * p.speed + p.phase) * DRIFT_RADIUS;

					if (pointer.strength > 0.001) {
						const dx = x - pointer.x;
						const dy = y - pointer.y;
						const dist = Math.hypot(dx, dy);
						if (dist < POINTER_RADIUS && dist > 0.001) {
							const falloff = (1 - dist / POINTER_RADIUS) * pointer.strength;
							x += (dx / dist) * POINTER_PUSH * falloff;
							y += (dy / dist) * POINTER_PUSH * falloff;
						}
					}
					p.x = x;
					p.y = y;
				}

				ctx.clearRect(0, 0, width, height);
				ctx.strokeStyle = colorRef.current;
				ctx.globalAlpha = LINE_ALPHA;
				ctx.lineWidth = 1;
				ctx.beginPath();
				for (let j = 0; j < rows; j++) {
					for (let i = 0; i < cols; i++) {
						const idx = j * cols + i;
						const p = points[idx];
						if (i < cols - 1) {
							const right = points[idx + 1];
							ctx.moveTo(p.x, p.y);
							ctx.lineTo(right.x, right.y);
						}
						if (j < rows - 1) {
							const down = points[idx + cols];
							ctx.moveTo(p.x, p.y);
							ctx.lineTo(down.x, down.y);
						}
						if (i < cols - 1 && j < rows - 1) {
							const right = points[idx + 1];
							const down = points[idx + cols];
							const diag = points[idx + cols + 1];
							if ((i + j) % 2 === 0) {
								ctx.moveTo(p.x, p.y);
								ctx.lineTo(diag.x, diag.y);
							} else {
								ctx.moveTo(right.x, right.y);
								ctx.lineTo(down.x, down.y);
							}
						}
					}
				}
				ctx.stroke();
			}

			if (!reduceMotion) raf = requestAnimationFrame(draw);
		};

		const onVisibility = () => {
			if (document.hidden) {
				if (raf) cancelAnimationFrame(raf);
				raf = null;
			} else if (!reduceMotion && raf === null) {
				raf = requestAnimationFrame(draw);
			}
		};
		document.addEventListener("visibilitychange", onVisibility);

		if (reduceMotion) {
			draw(0);
		} else {
			raf = requestAnimationFrame(draw);
		}

		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("visibilitychange", onVisibility);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<Canvas
			ref={canvasRef}
			onResize={handleResize}
			style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
		/>
	);
}
