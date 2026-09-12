import { FaceMeshTune } from "./config";
import type { PixelImage, Point } from "./types";

function luminanceAt(
	data: PixelImage["data"],
	width: number,
	x: number,
	y: number,
): number {
	const i = (y * width + x) * 4;
	return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
}

/** Sobel gradient magnitude on a coarse grid; cheap enough to run once at load. */
function gradientGrid(
	image: PixelImage,
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
		if (weight[i] <= 0) break; // ranked descending, so nothing after this carries signal
		const p = candidates[i];
		if (!tooClose(p, accepted, minSpacing)) accepted.push(p);
	}
}

function boundingBox(points: Point[]): {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
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
	return { minX, minY, maxX, maxY };
}

/**
 * Gradient magnitude can't distinguish a face outline from a hair or jacket one — they're
 * all strong edges — so candidates outside the manually-cropped face region are dropped
 * before ranking, not just left to lose on weight. The region is an ellipse, not a box:
 * a uniform fill over a rectangle always has points near all 4 corners, so its convex
 * hull is a rectangle no matter how tight the crop — an ellipse's hull reads as a face
 * outline instead.
 */
function withinRegion(p: Point, image: PixelImage): boolean {
	const { region } = FaceMeshTune.sampling;
	const cx = ((region.xMin + region.xMax) / 2) * image.width;
	const cy = ((region.yMin + region.yMax) / 2) * image.height;
	const rx = ((region.xMax - region.xMin) / 2) * image.width;
	const ry = ((region.yMax - region.yMin) / 2) * image.height;
	const dx = (p.x - cx) / rx;
	const dy = (p.y - cy) / ry;
	return dx * dx + dy * dy <= 1;
}

/**
 * Builds the point set a Delaunay triangulation runs on: dense along the strongest
 * edges within the face region (jaw, sunglasses, beard — where the low-poly facets
 * read as facial features), sparse fill inside their bounding box. There's no forced
 * border ring, so the triangulated hull stops near where the actual edges are instead
 * of the whole cropped region.
 */
export function samplePoints(image: PixelImage): Point[] {
	const { gridStep, edgePointCount, fillPointCount, minPointSpacing } =
		FaceMeshTune.sampling;

	const { points: fullGrid, weight: fullWeight } = gradientGrid(
		image,
		gridStep,
	);
	const grid: Point[] = [];
	const weight: number[] = [];
	fullGrid.forEach((p, i) => {
		if (!withinRegion(p, image)) return;
		grid.push(p);
		weight.push(fullWeight[i]);
	});

	const accepted: Point[] = [];
	pickWeighted(grid, weight, edgePointCount, minPointSpacing, accepted);
	if (accepted.length === 0) return accepted;

	const box = boundingBox(accepted);
	const interior = grid.filter(
		(p) =>
			p.x >= box.minX && p.x <= box.maxX && p.y >= box.minY && p.y <= box.maxY,
	);
	const uniformWeight = interior.map(() => 1);
	pickWeighted(
		interior,
		uniformWeight,
		accepted.length + fillPointCount,
		minPointSpacing * 1.5,
		accepted,
	);

	return accepted;
}
