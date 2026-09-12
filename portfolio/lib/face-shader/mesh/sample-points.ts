import { FaceMeshTune } from "./config";
import type { Point } from "./types";

function luminanceAt(
	data: Uint8ClampedArray,
	width: number,
	x: number,
	y: number,
): number {
	const i = (y * width + x) * 4;
	return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
}

/** Sobel gradient magnitude on a coarse grid; cheap enough to run once at load. */
function gradientGrid(
	image: ImageData,
	step: number,
): { points: Point[]; weight: number[] } {
	const { data, width, height } = image;
	const points: Point[] = [];
	const weight: number[] = [];

	for (let y = step; y < height - step; y += step) {
		for (let x = step; x < width - step; x += step) {
			const gx =
				luminanceAt(data, width, x + step, y - step) +
				2 * luminanceAt(data, width, x + step, y) +
				luminanceAt(data, width, x + step, y + step) -
				luminanceAt(data, width, x - step, y - step) -
				2 * luminanceAt(data, width, x - step, y) -
				luminanceAt(data, width, x - step, y + step);
			const gy =
				luminanceAt(data, width, x - step, y + step) +
				2 * luminanceAt(data, width, x, y + step) +
				luminanceAt(data, width, x + step, y + step) -
				luminanceAt(data, width, x - step, y - step) -
				2 * luminanceAt(data, width, x, y - step) -
				luminanceAt(data, width, x + step, y - step);

			points.push({ x, y });
			weight.push(Math.hypot(gx, gy));
		}
	}

	return { points, weight };
}

function tooClose(p: Point, accepted: Point[], minSpacing: number): boolean {
	for (const a of accepted) {
		if (Math.hypot(a.x - p.x, a.y - p.y) < minSpacing) return true;
	}
	return false;
}

/** Weighted sample without replacement, spaced apart so points don't clump on strong edges. */
function pickWeighted(
	candidates: Point[],
	weight: number[],
	count: number,
	minSpacing: number,
	accepted: Point[],
): void {
	const totalWeight = weight.reduce((sum, w) => sum + w, 0);
	if (totalWeight <= 0) return;

	const order = candidates
		.map((_, i) => i)
		.sort((a, b) => weight[b] - weight[a]);

	for (const i of order) {
		if (accepted.length >= count) break;
		const p = candidates[i];
		if (!tooClose(p, accepted, minSpacing)) accepted.push(p);
	}
}

function borderPoints(width: number, height: number, perSide: number): Point[] {
	const points: Point[] = [
		{ x: 0, y: 0 },
		{ x: width - 1, y: 0 },
		{ x: 0, y: height - 1 },
		{ x: width - 1, y: height - 1 },
	];
	for (let i = 1; i < perSide; i++) {
		const t = i / perSide;
		points.push({ x: t * (width - 1), y: 0 });
		points.push({ x: t * (width - 1), y: height - 1 });
		points.push({ x: 0, y: t * (height - 1) });
		points.push({ x: width - 1, y: t * (height - 1) });
	}
	return points;
}

/**
 * Builds the point set a Delaunay triangulation runs on: dense along edges (where the
 * low-poly facets should read as facial features), sparse fill elsewhere, plus a border
 * ring so triangles reach the image bounds instead of stopping short.
 */
export function samplePoints(image: ImageData): Point[] {
	const { width, height } = image;
	const {
		gridStep,
		edgePointCount,
		fillPointCount,
		minPointSpacing,
		borderPointsPerSide,
	} = FaceMeshTune.sampling;

	const { points: grid, weight } = gradientGrid(image, gridStep);

	const accepted: Point[] = borderPoints(width, height, borderPointsPerSide);
	pickWeighted(
		grid,
		weight,
		accepted.length + edgePointCount,
		minPointSpacing,
		accepted,
	);

	const uniformFill = grid.length > 0 ? Array(grid.length).fill(1) : [];
	pickWeighted(
		grid,
		uniformFill,
		accepted.length + fillPointCount,
		minPointSpacing * 1.5,
		accepted,
	);

	return accepted;
}
