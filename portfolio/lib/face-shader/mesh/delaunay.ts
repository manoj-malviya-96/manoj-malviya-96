import type { Point } from "./types";

type Triangle = { a: number; b: number; c: number };
type Edge = { a: number; b: number };

const EPSILON = 1e-9;

function circumcircleContains(points: Point[], t: Triangle, p: Point): boolean {
	const a = points[t.a];
	const b = points[t.b];
	const c = points[t.c];

	const ax = a.x - p.x;
	const ay = a.y - p.y;
	const bx = b.x - p.x;
	const by = b.y - p.y;
	const cx = c.x - p.x;
	const cy = c.y - p.y;

	const det =
		(ax * ax + ay * ay) * (bx * cy - cx * by) -
		(bx * bx + by * by) * (ax * cy - cx * ay) +
		(cx * cx + cy * cy) * (ax * by - bx * ay);

	// Triangles are wound CCW by construction, so a positive determinant means `p`
	// falls inside the circumcircle.
	return det > EPSILON;
}

function superTriangle(points: Point[]): {
	points: Point[];
	triangle: Triangle;
} {
	let minX = Number.POSITIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	for (const p of points) {
		if (p.x < minX) minX = p.x;
		if (p.y < minY) minY = p.y;
		if (p.x > maxX) maxX = p.x;
		if (p.y > maxY) maxY = p.y;
	}
	const dx = maxX - minX;
	const dy = maxY - minY;
	const span = Math.max(dx, dy, 1) * 20;
	const midX = (minX + maxX) / 2;
	const midY = (minY + maxY) / 2;

	return {
		points: [
			{ x: midX - span, y: midY - span },
			{ x: midX + span, y: midY - span },
			{ x: midX, y: midY + span },
		],
		triangle: { a: 0, b: 1, c: 2 },
	};
}

function edgeKey(a: number, b: number): string {
	return a < b ? `${a}:${b}` : `${b}:${a}`;
}

/**
 * Bowyer-Watson triangulation. Runs once at mesh build time (not per frame), so the
 * O(n^2) point-insertion cost is traded for zero external dependencies.
 */
export function triangulate(input: Point[]): Triangle[] {
	if (input.length < 3) return [];

	const { points: superPoints, triangle: superT } = superTriangle(input);
	const points = [...superPoints, ...input];
	let triangles: Triangle[] = [superT];

	for (let i = 0; i < input.length; i++) {
		const pointIndex = superPoints.length + i;
		const point = points[pointIndex];

		const bad: Triangle[] = [];
		const good: Triangle[] = [];
		for (const t of triangles) {
			if (circumcircleContains(points, t, point)) bad.push(t);
			else good.push(t);
		}

		const edgeCount = new Map<string, { edge: Edge; count: number }>();
		for (const t of bad) {
			const edges: Edge[] = [
				{ a: t.a, b: t.b },
				{ a: t.b, b: t.c },
				{ a: t.c, b: t.a },
			];
			for (const edge of edges) {
				const key = edgeKey(edge.a, edge.b);
				const existing = edgeCount.get(key);
				edgeCount.set(key, { edge, count: existing ? existing.count + 1 : 1 });
			}
		}

		const boundary: Edge[] = [];
		for (const { edge, count } of edgeCount.values()) {
			if (count === 1) boundary.push(edge);
		}

		const rebuilt: Triangle[] = boundary.map(({ a, b }) => ({
			a,
			b,
			c: pointIndex,
		}));
		triangles = [...good, ...rebuilt];
	}

	const superCount = superPoints.length;
	const isSuperIndex = (index: number) => index < superCount;
	return triangles
		.filter(
			(t) => !isSuperIndex(t.a) && !isSuperIndex(t.b) && !isSuperIndex(t.c),
		)
		.map((t) => ({
			a: t.a - superCount,
			b: t.b - superCount,
			c: t.c - superCount,
		}));
}

export type { Triangle };
