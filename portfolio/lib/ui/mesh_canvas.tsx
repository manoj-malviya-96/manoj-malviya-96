"use client";

import { Canvas, getThemeColor, useTheme } from "@manoj-malviya-96/atom";
import { useEffect, useRef } from "react";

type CanvasSize = { width: number; height: number };
type Vertex = { x: number; y: number };
type Edge = { from: number; to: number };

type HexGrid = {
	vertices: Vertex[];
	edges: Edge[];
	center: Vertex;
	hexSize: number;
};

type Pointer = {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	strength: number;
	targetStrength: number;
};

// Bounded corner box: scales with viewport on small screens, caps out so it never dominates large ones.
const CORNER_BOX_SIZE = "min(58vw, 58vh, 620px)";
// Radial fade rooted at the true corner (100% 100%) so the box blends into the page instead of
// presenting a hard rectangle.
const CORNER_FADE_MASK =
	"radial-gradient(circle at 100% 100%, black 0%, black 42%, transparent 82%)";

const HEX_SIZE_RATIO = 0.16;
const HEX_SIZE_MIN = 40;
const HEX_SIZE_MAX = 88;
// Keeps the anchor hex's outer edge near the true viewport corner, so the cluster reads as
// emanating from it rather than floating in the middle of the box.
const HEX_ANCHOR_INSET = 1.35;
// Quarter-pixel buckets: merges corners shared by adjacent hexes without relying on exact
// floating-point equality between two independently-computed trig results.
const VERTEX_DEDUPE_PRECISION = 4;

const LINE_ALPHA = 0.14;
const GLOW_RADIUS_FACTOR = 3.2;
// One slow breath drives both size and glow together — the cluster grows out from the corner
// as it brightens, and eases back in as it dims, rather than two motions ticking independently.
const BREATH_PERIOD_MS = 18000;
const HEX_SCALE_MIN = 0.86;
const HEX_SCALE_MAX = 1;
const AMBIENT_ALPHA_MIN = 0.06;
const AMBIENT_ALPHA_MAX = 0.16;
const POINTER_ALPHA_BOOST = 0.28;
// Viewport-space distance from the true corner that wakes the pointer glow. Gating this
// spatially (rather than by recency of movement, as a full-viewport mesh would) keeps the
// ambient glow visible while the cursor is anywhere else on the page.
const POINTER_CAPTURE_RADIUS = 260;
const POINTER_EASE = 0.12;
const STRENGTH_EASE = 0.08;
const GLOW_ALPHA_EPSILON = 0.005;

const MAX_DPR = 2;
const COARSE_MAX_DPR = 1;
const RESIZE_SETTLE_MS = 150;

// Radius 2 around the anchor cell — a compact 19-hex disk (1 + 3·r·(r+1)), enough to read as a
// small cluster without turning into a field.
const HEX_RING_RADIUS = 2;

// Every axial cell within `radius` steps of the origin, walked as concentric hexagonal rings.
function hexDisk(radius: number): Array<readonly [number, number]> {
	const cells: Array<readonly [number, number]> = [];
	for (let q = -radius; q <= radius; q++) {
		const rMin = Math.max(-radius, -q - radius);
		const rMax = Math.min(radius, -q + radius);
		for (let r = rMin; r <= rMax; r++) {
			cells.push([q, r]);
		}
	}
	return cells;
}

const HEX_CELLS = hexDisk(HEX_RING_RADIUS);

function hexSizeFor(size: CanvasSize): number {
	const scaled = Math.min(size.width, size.height) * HEX_SIZE_RATIO;
	return Math.min(HEX_SIZE_MAX, Math.max(HEX_SIZE_MIN, scaled));
}

function lerp(min: number, max: number, t: number): number {
	return min + (max - min) * t;
}

// Eases to a stop at both extremes (unlike a raw sine, which moves fastest at rest position) —
// reads as an actual breath in/out rather than a mechanical oscillation.
function breathPhase(t: number): number {
	return (1 - Math.cos((t / BREATH_PERIOD_MS) * Math.PI * 2)) / 2;
}

// Flat-top axial-to-pixel conversion (redblobgames convention).
function hexCenter(anchor: Vertex, size: number, q: number, r: number): Vertex {
	return {
		x: anchor.x + size * 1.5 * q,
		y: anchor.y + size * Math.sqrt(3) * (r + q / 2),
	};
}

function hexCorner(center: Vertex, size: number, i: number): Vertex {
	const angle = (Math.PI / 180) * (60 * i);
	return {
		x: center.x + size * Math.cos(angle),
		y: center.y + size * Math.sin(angle),
	};
}

function vertexKey(v: Vertex): string {
	return `${Math.round(v.x * VERTEX_DEDUPE_PRECISION)}:${Math.round(v.y * VERTEX_DEDUPE_PRECISION)}`;
}

// `hexSize` is the animated (breathing) size, recomputed fresh every frame from the viewport plus
// the current breath phase — cheap enough at 19 cells that there's no need to cache topology
// across frames the way a full-viewport mesh would. Adjacent hexes share corners and edges; both
// are deduplicated so a shared edge isn't stroked twice (which would draw it brighter than the rest).
function buildHexGrid(size: CanvasSize, hexSize: number): HexGrid {
	const center: Vertex = {
		x: size.width - hexSize * HEX_ANCHOR_INSET,
		y: size.height - hexSize * HEX_ANCHOR_INSET,
	};

	const vertices: Vertex[] = [];
	const vertexIndex = new Map<string, number>();
	const seenEdges = new Set<string>();
	const edges: Edge[] = [];

	const indexOf = (v: Vertex): number => {
		const key = vertexKey(v);
		const found = vertexIndex.get(key);
		if (found !== undefined) return found;
		const idx = vertices.length;
		vertices.push(v);
		vertexIndex.set(key, idx);
		return idx;
	};

	for (const [q, r] of HEX_CELLS) {
		const cellCenter = hexCenter(center, hexSize, q, r);
		const corners = Array.from({ length: 6 }, (_, i) =>
			indexOf(hexCorner(cellCenter, hexSize, i)),
		);
		for (let i = 0; i < 6; i++) {
			const from = corners[i];
			const to = corners[(i + 1) % 6];
			const edgeKey = from < to ? `${from}-${to}` : `${to}-${from}`;
			if (seenEdges.has(edgeKey)) continue;
			seenEdges.add(edgeKey);
			edges.push({ from, to });
		}
	}

	return { vertices, edges, center, hexSize };
}

function easePointer(pointer: Pointer): void {
	pointer.x += (pointer.targetX - pointer.x) * POINTER_EASE;
	pointer.y += (pointer.targetY - pointer.y) * POINTER_EASE;
	pointer.strength +=
		(pointer.targetStrength - pointer.strength) * STRENGTH_EASE;
}

function traceEdges(ctx: CanvasRenderingContext2D, grid: HexGrid): void {
	ctx.beginPath();
	for (const edge of grid.edges) {
		const from = grid.vertices[edge.from];
		const to = grid.vertices[edge.to];
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
	}
}

// One brightened pass over the mesh: a radial gradient centered on `center` fades the stroke
// from `color` to transparent over `radius`, so the highlight falls off smoothly for free.
function drawGlowPass(
	ctx: CanvasRenderingContext2D,
	grid: HexGrid,
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

function renderHexMesh(
	ctx: CanvasRenderingContext2D,
	size: CanvasSize,
	grid: HexGrid,
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

	const glowRadius = grid.hexSize * GLOW_RADIUS_FACTOR;

	// Glow brightens in step with the same breath that grows the cluster (see buildHexGrid's
	// caller), so size and light read as one motion. It steps aside as the pointer glow
	// (spatially gated to the corner, see POINTER_CAPTURE_RADIUS) takes over, so only one light
	// source reads at a time.
	const ambientAlpha =
		lerp(AMBIENT_ALPHA_MIN, AMBIENT_ALPHA_MAX, breathPhase(t)) *
		(1 - pointer.strength);
	if (ambientAlpha > GLOW_ALPHA_EPSILON) {
		drawGlowPass(ctx, grid, grid.center, glowRadius, color, ambientAlpha);
	}

	const pointerAlpha = POINTER_ALPHA_BOOST * pointer.strength;
	if (pointerAlpha > GLOW_ALPHA_EPSILON) {
		drawGlowPass(ctx, grid, pointer, glowRadius, color, pointerAlpha);
	}
}

export default function MeshCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const sizeRef = useRef<CanvasSize>({ width: 0, height: 0 });
	const baseHexSizeRef = useRef(0);
	const pointerRef = useRef<Pointer>({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		strength: 0,
		targetStrength: 0,
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
		baseHexSizeRef.current = hexSizeFor(size);
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

		// Listens on window (not the canvas) because the canvas is pointer-events:none — the
		// corner offset below converts a viewport-space cursor position into canvas-local space.
		const onPointerMove = (e: PointerEvent) => {
			const pointer = pointerRef.current;
			const size = sizeRef.current;
			const cornerDistance = Math.hypot(
				window.innerWidth - e.clientX,
				window.innerHeight - e.clientY,
			);
			pointer.targetStrength = cornerDistance < POINTER_CAPTURE_RADIUS ? 1 : 0;
			if (pointer.targetStrength > 0) {
				pointer.targetX = e.clientX - (window.innerWidth - size.width);
				pointer.targetY = e.clientY - (window.innerHeight - size.height);
			}
		};
		window.addEventListener("pointermove", onPointerMove, { passive: true });

		const draw = (t: number) => {
			const ctx = ctxRef.current;
			const size = sizeRef.current;
			if (ctx && baseHexSizeRef.current > 0) {
				easePointer(pointerRef.current);
				const hexSize =
					baseHexSizeRef.current *
					lerp(HEX_SCALE_MIN, HEX_SCALE_MAX, breathPhase(t));
				const grid = buildHexGrid(size, hexSize);
				renderHexMesh(ctx, size, grid, colorRef.current, t, pointerRef.current);
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
			aria-hidden="true"
			style={{
				position: "fixed",
				right: 0,
				bottom: 0,
				width: CORNER_BOX_SIZE,
				height: CORNER_BOX_SIZE,
				zIndex: -1,
				pointerEvents: "none",
				maskImage: CORNER_FADE_MASK,
				WebkitMaskImage: CORNER_FADE_MASK,
			}}
		/>
	);
}
