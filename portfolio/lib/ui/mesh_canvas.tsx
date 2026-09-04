"use client";

import { Canvas, getThemeColor, useTheme } from "@manoj-malviya-96/atom";
import { type RefObject, useEffect, useRef } from "react";

type CanvasSize = { width: number; height: number };
type Vertex = { x: number; y: number };
type Edge = { from: number; to: number };

type HexGrid = {
	vertices: Vertex[];
	edges: Edge[];
	center: Vertex;
	hexSize: number;
};

// Unit-space (hexSize=1, origin-anchored) shared-corner topology — see buildHexTopology.
type HexTopology = {
	directions: Vertex[];
	edges: Edge[];
};

type Pointer = {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	strength: number;
	targetStrength: number;
};

// Every tunable number/string the mesh reads, grouped by what they shape — one scoped identifier
// instead of two dozen module-level constants. HEX_SCALE_MAX isn't here: the breath animates
// between hex.sizeMin/sizeMax's result and that result itself, so "full size" is always 1, not a
// separate knob (see useMeshRenderer's draw loop).
const MeshTune = {
	corner: {
		// Scales with viewport on small screens, caps out so it never dominates large ones.
		boxSize: "min(67vw, 67vh, 620px)",
		// Rooted at the true corner (100% 100%) so the box blends into the page instead of
		// presenting a hard rectangle.
		fadeMask:
			"radial-gradient(circle at 100% 100%, black 0%, black 42%, transparent 82%)",
	},
	hex: {
		sizeRatio: 0.16,
		sizeMin: 80,
		sizeMax: 160,
		// Keeps the anchor hex's outer edge near the true viewport corner, so the cluster reads
		// as emanating from it rather than floating in the middle of the box.
		anchorInset: 12.35,
		// Cells within this many rings of the anchor cell — a disk of 1 + 3·r·(r+1) hexes.
		ringRadius: 20,
		// Topology is built once in unit hex space, so genuinely distinct corners are always far
		// more than a millionth apart — this only needs to be finer than independent-trig
		// floating error, not tuned for visual effect.
		dedupePrecision: 1e6,
	},
	breath: {
		// One slow breath drives both size and glow together — the cluster grows out from the
		// corner as it brightens, and eases back in as it dims, rather than two motions ticking
		// independently.
		periodMs: 18000,
		scaleMin: 0.86,
	},
	glow: {
		lineAlpha: 0.14,
		radiusFactor: 3.2,
		ambientAlphaMin: 0.06,
		ambientAlphaMax: 0.16,
		pointerAlphaBoost: 0.28,
		// Below this, a glow pass would be invisible — skip drawing it rather than tuning how it
		// looks.
		alphaEpsilon: 0.005,
	},
	pointer: {
		// Viewport-space distance from the true corner that wakes the pointer glow. Gating this
		// spatially (rather than by recency of movement, as a full-viewport mesh would) keeps the
		// ambient glow visible while the cursor is anywhere else on the page.
		captureRadius: 260,
		ease: 0.12,
		strengthEase: 0.08,
	},
	canvas: {
		maxDpr: 2,
		// Coarse (touch) pointers get a lower cap, keeping the canvas backing store smaller on
		// hardware that's typically weaker and battery-constrained.
		coarseMaxDpr: 1,
		resizeSettleMs: 150,
	},
} as const;

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

function hexSizeFor(size: CanvasSize): number {
	const scaled = Math.min(size.width, size.height) * MeshTune.hex.sizeRatio;
	return Math.min(MeshTune.hex.sizeMax, Math.max(MeshTune.hex.sizeMin, scaled));
}

function lerp(min: number, max: number, t: number): number {
	return min + (max - min) * t;
}

// Eases to a stop at both extremes (unlike a raw sine, which moves fastest at rest position) —
// reads as an actual breath in/out rather than a mechanical oscillation.
function breathPhase(t: number): number {
	return (1 - Math.cos((t / MeshTune.breath.periodMs) * Math.PI * 2)) / 2;
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
	const p = MeshTune.hex.dedupePrecision;
	return `${Math.round(v.x * p)}:${Math.round(v.y * p)}`;
}

// Shared-corner topology depends only on the axial layout, never on viewport size or the animated
// hexSize (both just translate/scale every vertex uniformly) — so it's built once, here, instead
// of being rediscovered by hashing every corner on every animation frame. Adjacent hexes share
// corners and edges; both are deduplicated so a shared edge isn't stroked twice (which would draw
// it brighter than the rest of the mesh).
function buildHexTopology(): HexTopology {
	const directions: Vertex[] = [];
	const directionIndex = new Map<string, number>();
	const seenEdges = new Set<string>();
	const edges: Edge[] = [];

	const indexOf = (v: Vertex): number => {
		const key = vertexKey(v);
		const found = directionIndex.get(key);
		if (found !== undefined) return found;
		const idx = directions.length;
		directions.push(v);
		directionIndex.set(key, idx);
		return idx;
	};

	for (const [q, r] of hexDisk(MeshTune.hex.ringRadius)) {
		const cellCenter = hexCenter({ x: 0, y: 0 }, 1, q, r);
		const corners = Array.from({ length: 6 }, (_, i) =>
			indexOf(hexCorner(cellCenter, 1, i)),
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

	return { directions, edges };
}

const HEX_TOPOLOGY = buildHexTopology();

// Plain per-vertex arithmetic, no hashing or corner-dedup work — that's all one-time, in
// buildHexTopology above — so this is cheap to call fresh every animation frame.
function projectHexGrid(size: CanvasSize, hexSize: number): HexGrid {
	const anchor: Vertex = {
		x: size.width - hexSize * MeshTune.hex.anchorInset,
		y: size.height - hexSize * MeshTune.hex.anchorInset,
	};
	const vertices = HEX_TOPOLOGY.directions.map((d) => ({
		x: anchor.x + hexSize * d.x,
		y: anchor.y + hexSize * d.y,
	}));
	return { vertices, edges: HEX_TOPOLOGY.edges, center: anchor, hexSize };
}

function easePointer(pointer: Pointer): void {
	pointer.x += (pointer.targetX - pointer.x) * MeshTune.pointer.ease;
	pointer.y += (pointer.targetY - pointer.y) * MeshTune.pointer.ease;
	pointer.strength +=
		(pointer.targetStrength - pointer.strength) * MeshTune.pointer.strengthEase;
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
	ctx.globalAlpha = MeshTune.glow.lineAlpha;
	traceEdges(ctx, grid);
	ctx.stroke();

	const glowRadius = grid.hexSize * MeshTune.glow.radiusFactor;

	// Glow brightens in step with the same breath that grows the cluster (see useMeshRenderer's
	// draw loop), so size and light read as one motion. It steps aside as the pointer glow
	// (spatially gated to the corner, see MeshTune.pointer.captureRadius) takes over, so only one
	// light source reads at a time.
	const ambientAlpha =
		lerp(
			MeshTune.glow.ambientAlphaMin,
			MeshTune.glow.ambientAlphaMax,
			breathPhase(t),
		) *
		(1 - pointer.strength);
	if (ambientAlpha > MeshTune.glow.alphaEpsilon) {
		drawGlowPass(ctx, grid, grid.center, glowRadius, color, ambientAlpha);
	}

	const pointerAlpha = MeshTune.glow.pointerAlphaBoost * pointer.strength;
	if (pointerAlpha > MeshTune.glow.alphaEpsilon) {
		drawGlowPass(ctx, grid, pointer, glowRadius, color, pointerAlpha);
	}
}

function useAmbientColor(): RefObject<string> {
	const colorRef = useRef("#8a8a8a");
	const theme = useTheme();

	// biome-ignore lint/correctness/useExhaustiveDependencies: theme isn't read here, it's the re-run trigger — colorRef must be re-resolved whenever data-theme changes.
	useEffect(() => {
		colorRef.current = getThemeColor("content");
	}, [theme]);

	return colorRef;
}

function useMaxDevicePixelRatio(): RefObject<number> {
	const maxDprRef = useRef<number>(MeshTune.canvas.maxDpr);

	useEffect(() => {
		maxDprRef.current = window.matchMedia("(pointer: coarse)").matches
			? MeshTune.canvas.coarseMaxDpr
			: MeshTune.canvas.maxDpr;
	}, []);

	return maxDprRef;
}

// Tracks the cursor only while it's near the true viewport corner and converts it into
// canvas-local coordinates; easing (including fading out on idle) happens once per frame in the
// render loop, not here, since that also has to run while the pointer isn't moving at all.
function usePointerCorner(sizeRef: RefObject<CanvasSize>): RefObject<Pointer> {
	const pointerRef = useRef<Pointer>({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		strength: 0,
		targetStrength: 0,
	});

	useEffect(() => {
		// Listens on window (not the canvas) because the canvas is pointer-events:none — the
		// corner offset below converts a viewport-space cursor position into canvas-local space.
		function onPointerMove(e: PointerEvent): void {
			const pointer = pointerRef.current;
			const size = sizeRef.current;
			const cornerDistance = Math.hypot(
				window.innerWidth - e.clientX,
				window.innerHeight - e.clientY,
			);
			pointer.targetStrength =
				cornerDistance < MeshTune.pointer.captureRadius ? 1 : 0;
			if (pointer.targetStrength > 0) {
				pointer.targetX = e.clientX - (window.innerWidth - size.width);
				pointer.targetY = e.clientY - (window.innerHeight - size.height);
			}
		}
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => window.removeEventListener("pointermove", onPointerMove);
	}, [sizeRef]);

	return pointerRef;
}

// Returns the resize handler to wire into <Canvas onResize> — the caller owns the element/JSX,
// this hook owns everything about what's drawn on it.
function useMeshRenderer(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	colorRef: RefObject<string>,
	maxDprRef: RefObject<number>,
): (size: CanvasSize) => void {
	const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
	const sizeRef = useRef<CanvasSize>({ width: 0, height: 0 });
	const baseHexSizeRef = useRef(0);
	const drawRef = useRef<(t: number) => void>(() => {});
	const resizeTimerRef = useRef<number | null>(null);
	const hasMountedRef = useRef(false);
	const pointerRef = usePointerCorner(sizeRef);

	function applyResize(size: CanvasSize): void {
		sizeRef.current = size;
		baseHexSizeRef.current = hexSizeFor(size);
		ctxRef.current = canvasRef.current?.getContext("2d") ?? null;
		if (!ctxRef.current) return;
		const dpr = Math.min(window.devicePixelRatio || 1, maxDprRef.current);
		ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
		drawRef.current(performance.now());
	}

	function handleResize(size: CanvasSize): void {
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
		}, MeshTune.canvas.resizeSettleMs);
	}

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let raf: number | null = null;

		function draw(t: number): void {
			const ctx = ctxRef.current;
			const size = sizeRef.current;
			if (ctx && baseHexSizeRef.current > 0) {
				easePointer(pointerRef.current);
				// The breath's "full size" is the base hex size itself — there's no separate max
				// scale to tune, only how far below it the contracted end sits.
				const hexSize =
					baseHexSizeRef.current *
					lerp(MeshTune.breath.scaleMin, 1, breathPhase(t));
				const grid = projectHexGrid(size, hexSize);
				renderHexMesh(ctx, size, grid, colorRef.current, t, pointerRef.current);
			}
			if (!reduceMotion) raf = requestAnimationFrame(draw);
		}
		drawRef.current = draw;

		function onVisibilityChange(): void {
			if (document.hidden) {
				if (raf) cancelAnimationFrame(raf);
				raf = null;
			} else if (!reduceMotion && raf === null) {
				raf = requestAnimationFrame(draw);
			}
		}
		document.addEventListener("visibilitychange", onVisibilityChange);

		if (reduceMotion) {
			draw(0);
		} else {
			raf = requestAnimationFrame(draw);
		}

		return () => {
			document.removeEventListener("visibilitychange", onVisibilityChange);
			if (raf) cancelAnimationFrame(raf);
			if (resizeTimerRef.current !== null) {
				window.clearTimeout(resizeTimerRef.current);
			}
			drawRef.current = () => {};
		};
	}, [colorRef, pointerRef]);

	return handleResize;
}

export default function MeshCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const colorRef = useAmbientColor();
	const maxDprRef = useMaxDevicePixelRatio();
	const handleResize = useMeshRenderer(canvasRef, colorRef, maxDprRef);

	return (
		<Canvas
			ref={canvasRef}
			onResize={handleResize}
			aria-hidden="true"
			// atom marks `style` deprecated-as-policy (last resort when no prop fits) — fixed
			// corner positioning and a CSS mask have no dedicated atom prop, so this is that case.
			style={{
				position: "fixed",
				right: 0,
				bottom: 0,
				width: MeshTune.corner.boxSize,
				height: MeshTune.corner.boxSize,
				zIndex: -1,
				pointerEvents: "none",
				maskImage: MeshTune.corner.fadeMask,
				WebkitMaskImage: MeshTune.corner.fadeMask,
			}}
		/>
	);
}
