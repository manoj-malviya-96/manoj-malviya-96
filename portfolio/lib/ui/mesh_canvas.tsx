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

type Edge = { from: number; to: number };

type Grid = {
	points: Point[];
	edges: Edge[];
};

type Pointer = {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	strength: number;
	targetStrength: number;
	lastMove: number;
	pushEnabled: boolean;
};

const CELL_SIZE = 130;
const JITTER = 0.35;
const DRIFT_RADIUS = 4;
const DRIFT_X_SPEED = 0.0002;
const DRIFT_Y_SPEED = 0.00016;
const POINTER_RADIUS = 170;
const POINTER_PUSH = 36;
const POINTER_STRENGTH_EPSILON = 0.001;
const LINE_ALPHA = 0.16;
const POINTER_EASE = 0.12;
const STRENGTH_EASE = 0.06;
const IDLE_TIMEOUT_MS = 500;
const MAX_DPR = 2;
const COARSE_MAX_DPR = 1;
const RESIZE_SETTLE_MS = 150;
const AMBIENT_PERIOD_MS = 32000;
const AMBIENT_ORBIT_FRACTION = 0.32;
const AMBIENT_GLOW_RADIUS = 260;
const AMBIENT_ALPHA_BOOST = 0.22;
const POINTER_ALPHA_BOOST = 0.3;
const GLOW_ALPHA_EPSILON = 0.005;

function buildPoints(cols: number, rows: number): Point[] {
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
	return points;
}

// Grid connectivity only depends on cols/rows, so it's decided once per resize
// instead of re-deriving which lines to draw for every point on every animation frame.
function buildEdges(cols: number, rows: number): Edge[] {
	const edges: Edge[] = [];
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			const idx = j * cols + i;
			if (i < cols - 1) edges.push({ from: idx, to: idx + 1 });
			if (j < rows - 1) edges.push({ from: idx, to: idx + cols });
			if (i < cols - 1 && j < rows - 1) {
				edges.push(
					(i + j) % 2 === 0
						? { from: idx, to: idx + cols + 1 }
						: { from: idx + 1, to: idx + cols },
				);
			}
		}
	}
	return edges;
}

function buildGrid(width: number, height: number): Grid {
	const cols = Math.ceil(width / CELL_SIZE) + 1;
	const rows = Math.ceil(height / CELL_SIZE) + 1;
	return { points: buildPoints(cols, rows), edges: buildEdges(cols, rows) };
}

function easePointer(pointer: Pointer, t: number): void {
	pointer.x += (pointer.targetX - pointer.x) * POINTER_EASE;
	pointer.y += (pointer.targetY - pointer.y) * POINTER_EASE;
	if (t - pointer.lastMove > IDLE_TIMEOUT_MS) pointer.targetStrength = 0;
	pointer.strength +=
		(pointer.targetStrength - pointer.strength) * STRENGTH_EASE;
}

// Pure physics step: decides where every point sits this frame. Rendering (I/O) is a separate step.
function updatePoints(points: Point[], t: number, pointer: Pointer): void {
	const pointerActive = pointer.strength > POINTER_STRENGTH_EPSILON;
	for (const p of points) {
		let x =
			p.baseX + Math.sin(t * DRIFT_X_SPEED * p.speed + p.phase) * DRIFT_RADIUS;
		let y =
			p.baseY + Math.cos(t * DRIFT_Y_SPEED * p.speed + p.phase) * DRIFT_RADIUS;

		if (pointerActive && pointer.pushEnabled) {
			const dx = x - pointer.x;
			const dy = y - pointer.y;
			const dist = Math.hypot(dx, dy);
			if (dist < POINTER_RADIUS && dist > POINTER_STRENGTH_EPSILON) {
				const falloff = (1 - dist / POINTER_RADIUS) * pointer.strength;
				x += (dx / dist) * POINTER_PUSH * falloff;
				y += (dy / dist) * POINTER_PUSH * falloff;
			}
		}
		p.x = x;
		p.y = y;
	}
}

// Slow elliptical orbit, centered on the canvas, that repeats exactly every AMBIENT_PERIOD_MS.
function ambientLightPosition(
	t: number,
	size: CanvasSize,
): { x: number; y: number } {
	const angle = (t / AMBIENT_PERIOD_MS) * Math.PI * 2;
	return {
		x: size.width / 2 + Math.cos(angle) * size.width * AMBIENT_ORBIT_FRACTION,
		y: size.height / 2 + Math.sin(angle) * size.height * AMBIENT_ORBIT_FRACTION,
	};
}

function traceEdges(ctx: CanvasRenderingContext2D, grid: Grid): void {
	ctx.beginPath();
	for (const edge of grid.edges) {
		const from = grid.points[edge.from];
		const to = grid.points[edge.to];
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
	}
}

// One brightened pass over the mesh: a radial gradient centered on `center` fades the stroke
// from `color` to transparent over `radius`, so the highlight falls off smoothly for free.
function drawGlowPass(
	ctx: CanvasRenderingContext2D,
	grid: Grid,
	center: { x: number; y: number },
	radius: number,
	color: string,
	alpha: number,
): void {
	const glow = ctx.createRadialGradient(
		center.x,
		center.y,
		0,
		center.x,
		center.y,
		radius,
	);
	glow.addColorStop(0, color);
	glow.addColorStop(1, "transparent");
	ctx.strokeStyle = glow;
	ctx.globalAlpha = alpha;
	traceEdges(ctx, grid);
	ctx.stroke();
}

function renderMesh(
	ctx: CanvasRenderingContext2D,
	size: CanvasSize,
	grid: Grid,
	color: string,
	t: number,
	pointer: Pointer,
): void {
	ctx.clearRect(0, 0, size.width, size.height);
	ctx.lineWidth = 1;

	ctx.strokeStyle = color;
	ctx.globalAlpha = LINE_ALPHA;
	traceEdges(ctx, grid);
	ctx.stroke();

	// Two light sources brighten nearby lines, crossfaded by how engaged the pointer is: a
	// slow autonomous loop keeps the mesh alive when idle, and the cursor/touch position takes
	// over as it moves — so the highlight follows the user instead of just wandering underneath.
	const ambientAlpha = AMBIENT_ALPHA_BOOST * (1 - pointer.strength);
	if (ambientAlpha > GLOW_ALPHA_EPSILON) {
		drawGlowPass(
			ctx,
			grid,
			ambientLightPosition(t, size),
			AMBIENT_GLOW_RADIUS,
			color,
			ambientAlpha,
		);
	}

	const pointerAlpha = POINTER_ALPHA_BOOST * pointer.strength;
	if (pointerAlpha > GLOW_ALPHA_EPSILON) {
		drawGlowPass(ctx, grid, pointer, POINTER_RADIUS, color, pointerAlpha);
	}
}

export default function MeshCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const sizeRef = useRef<CanvasSize>({ width: 0, height: 0 });
	const gridRef = useRef<Grid>({ points: [], edges: [] });
	const pointerRef = useRef<Pointer>({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		strength: 0,
		targetStrength: 0,
		lastMove: 0,
		pushEnabled: false,
	});
	const colorRef = useRef("#8a8a8a");
	const drawRef = useRef<(t: number) => void>(() => {});
	const maxDprRef = useRef(MAX_DPR);
	const resizeTimerRef = useRef<number | null>(null);
	const hasMountedRef = useRef(false);
	const theme = useTheme();

	// biome-ignore lint/correctness/useExhaustiveDependencies: theme isn't read here, it's the re-run trigger — colorRef must be re-resolved whenever data-theme changes.
	useEffect(() => {
		colorRef.current = getThemeColor("content");
	}, [theme]);

	useEffect(() => {
		maxDprRef.current = window.matchMedia("(pointer: coarse)").matches
			? COARSE_MAX_DPR
			: MAX_DPR;
	}, []);

	const applyResize = (size: CanvasSize) => {
		sizeRef.current = size;
		gridRef.current = buildGrid(size.width, size.height);
		ctxRef.current = canvasRef.current?.getContext("2d") ?? null;
		if (!ctxRef.current) return;
		const dpr = Math.min(window.devicePixelRatio || 1, maxDprRef.current);
		ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
		drawRef.current(performance.now());
	};
	const handleResize = (size: CanvasSize) => {
		if (!hasMountedRef.current) {
			hasMountedRef.current = true;
			applyResize(size);
			return;
		}
		if (resizeTimerRef.current !== null) {
			window.clearTimeout(resizeTimerRef.current);
		}
		resizeTimerRef.current = window.setTimeout(() => {
			resizeTimerRef.current = null;
			applyResize(size);
		}, RESIZE_SETTLE_MS);
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
			// Touch has no hover state and a scroll-drag fires pointermove too, so touch only
			// drives the glow below — physically pushing the grid on every scroll would be jarring.
			pointer.pushEnabled = e.pointerType !== "touch";
		};
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		const draw = (t: number) => {
			const ctx = ctxRef.current;
			const grid = gridRef.current;
			if (ctx && grid.points.length > 0) {
				easePointer(pointerRef.current, t);
				updatePoints(grid.points, t, pointerRef.current);
				renderMesh(
					ctx,
					sizeRef.current,
					grid,
					colorRef.current,
					t,
					pointerRef.current,
				);
			}
			if (!reduceMotion) raf = requestAnimationFrame(draw);
		};
		drawRef.current = draw;

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
			if (resizeTimerRef.current !== null) {
				window.clearTimeout(resizeTimerRef.current);
			}
			drawRef.current = () => {};
		};
	}, []);

	return (
		<Canvas
			ref={canvasRef}
			onResize={handleResize}
			width="full"
			height="full"
			aria-hidden="true"
			style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
		/>
	);
}
