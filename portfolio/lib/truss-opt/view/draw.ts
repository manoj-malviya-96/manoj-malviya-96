import { getThemeColor } from "@manoj-malviya-96/atom";
import type { TrussOptResult } from "@/lib/data/truss_opt";
import type { TrussMesh } from "@/lib/truss-opt/engine/mesh";

export interface CanvasSize {
	width: number;
	height: number;
}

const DRAW_SETTINGS = {
	maxLineWidth_px: 7,
	pointRadius_px: 5,
	fixedMarkerHalfSize_px: 9,
	displacementScale: 0.5,
	arrow: {
		length_px: 40,
		headLength_px: 10,
		headAngle_rad: Math.PI / 7,
	},
};

/** Scale mapping mesh units to canvas pixels, sized to fit the mesh's own width/height. */
export function computeScale(
	size: CanvasSize,
	mesh: Pick<TrussMesh, "meshWidth_mm" | "meshHeight_mm">,
): number {
	if (size.width === 0 || size.height === 0) return 0;
	return (
		0.9 *
		Math.min(size.width / mesh.meshWidth_mm, size.height / mesh.meshHeight_mm)
	);
}

/** Top-left offset that centers the scaled mesh bounding box within the canvas. */
export function computeOffset(
	size: CanvasSize,
	mesh: Pick<TrussMesh, "meshWidth_mm" | "meshHeight_mm">,
	scale: number,
): readonly [number, number] {
	return [
		(size.width - mesh.meshWidth_mm * scale) / 2,
		(size.height - mesh.meshHeight_mm * scale) / 2,
	];
}

function toCanvasPoint(
	point: readonly [number, number],
	scale: number,
	offset: readonly [number, number],
): readonly [number, number] {
	return [point[0] * scale + offset[0], point[1] * scale + offset[1]];
}

export function fromCanvasPoint(
	canvasX: number,
	canvasY: number,
	scale: number,
	offset: readonly [number, number],
): readonly [number, number] {
	return [(canvasX - offset[0]) / scale, (canvasY - offset[1]) / scale];
}

export function drawLattice(
	ctx: CanvasRenderingContext2D,
	size: CanvasSize,
	mesh: TrussMesh,
	result: TrussOptResult | null,
): void {
	ctx.clearRect(0, 0, size.width, size.height);
	const scale = computeScale(size, mesh);
	if (scale === 0) return;
	const offset = computeOffset(size, mesh, scale);

	const points = mesh.points.map((point) =>
		toCanvasPoint(point, scale, offset),
	);
	const contentColor = getThemeColor("content");

	if (result) {
		drawStressedMesh(ctx, mesh, points, result, scale);
		drawEdges(
			ctx,
			mesh.connections,
			points,
			mesh.normThickness,
			getThemeColor("muted"),
		);
	} else {
		drawEdges(ctx, mesh.connections, points, mesh.normThickness, contentColor);
	}

	drawNodes(ctx, points, contentColor);
	drawForceArrows(ctx, mesh, points, getThemeColor("red"));
	drawFixedMarkers(ctx, mesh, points, contentColor);
}

function drawStressedMesh(
	ctx: CanvasRenderingContext2D,
	mesh: TrussMesh,
	points: readonly (readonly [number, number])[],
	result: TrussOptResult,
	scale: number,
): void {
	const { displacements, stresses, minStress, maxStress } = result;
	const stressRange = maxStress - minStress || 1;

	const displacedPoints = points.map(([x, y], index) => {
		const dx = displacements[index * 2] ?? 0;
		const dy = displacements[index * 2 + 1] ?? 0;
		return [
			x + DRAW_SETTINGS.displacementScale * dx * scale,
			y + DRAW_SETTINGS.displacementScale * dy * scale,
		] as const;
	});

	for (const [index, [start, end]] of mesh.connections.entries()) {
		const [x1, y1] = displacedPoints[start];
		const [x2, y2] = displacedPoints[end];
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.strokeStyle = stressColor((stresses[index] - minStress) / stressRange);
		ctx.lineWidth = DRAW_SETTINGS.maxLineWidth_px * mesh.normThickness[index];
		ctx.stroke();
	}
}

/** Cold-to-hot ramp for relative member stress: blue (low) -> grey (mid) -> red (high). */
function stressColor(t: number): string {
	const clamped = Math.min(1, Math.max(0, t));
	const cold: [number, number, number] = [64, 128, 240];
	const mid: [number, number, number] = [148, 148, 148];
	const hot: [number, number, number] = [230, 70, 60];

	const [from, to, localT] =
		clamped < 0.5 ? [cold, mid, clamped * 2] : [mid, hot, (clamped - 0.5) * 2];
	const r = Math.round(from[0] + (to[0] - from[0]) * localT);
	const g = Math.round(from[1] + (to[1] - from[1]) * localT);
	const b = Math.round(from[2] + (to[2] - from[2]) * localT);
	return `rgb(${r}, ${g}, ${b})`;
}

function drawEdges(
	ctx: CanvasRenderingContext2D,
	connections: TrussMesh["connections"],
	points: readonly (readonly [number, number])[],
	thickness: readonly number[],
	color: string,
): void {
	for (const [index, [start, end]] of connections.entries()) {
		const [x1, y1] = points[start];
		const [x2, y2] = points[end];
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.strokeStyle = color;
		ctx.lineWidth = DRAW_SETTINGS.maxLineWidth_px * thickness[index];
		ctx.stroke();
	}
}

function drawNodes(
	ctx: CanvasRenderingContext2D,
	points: readonly (readonly [number, number])[],
	color: string,
): void {
	ctx.fillStyle = color;
	for (const [x, y] of points) {
		ctx.beginPath();
		ctx.arc(x, y, DRAW_SETTINGS.pointRadius_px, 0, Math.PI * 2);
		ctx.fill();
	}
}

function drawForceArrows(
	ctx: CanvasRenderingContext2D,
	mesh: TrussMesh,
	points: readonly (readonly [number, number])[],
	color: string,
): void {
	for (const index of mesh.forcePointsX) {
		drawArrow(ctx, points[index], 0, color);
	}
	for (const index of mesh.forcePointsY) {
		drawArrow(ctx, points[index], Math.PI / 2, color);
	}
}

function drawArrow(
	ctx: CanvasRenderingContext2D,
	[x, y]: readonly [number, number],
	angle: number,
	color: string,
): void {
	const endX = x + DRAW_SETTINGS.arrow.length_px * Math.cos(angle);
	const endY = y + DRAW_SETTINGS.arrow.length_px * Math.sin(angle);

	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endX, endY);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(endX, endY);
	ctx.lineTo(
		endX -
			DRAW_SETTINGS.arrow.headLength_px *
				Math.cos(angle - DRAW_SETTINGS.arrow.headAngle_rad),
		endY -
			DRAW_SETTINGS.arrow.headLength_px *
				Math.sin(angle - DRAW_SETTINGS.arrow.headAngle_rad),
	);
	ctx.lineTo(
		endX -
			DRAW_SETTINGS.arrow.headLength_px *
				Math.cos(angle + DRAW_SETTINGS.arrow.headAngle_rad),
		endY -
			DRAW_SETTINGS.arrow.headLength_px *
				Math.sin(angle + DRAW_SETTINGS.arrow.headAngle_rad),
	);
	ctx.closePath();
	ctx.fill();
}

function drawFixedMarkers(
	ctx: CanvasRenderingContext2D,
	mesh: TrussMesh,
	points: readonly (readonly [number, number])[],
	color: string,
): void {
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	for (const index of mesh.fixedPoints) {
		const [x, y] = points[index];
		ctx.beginPath();
		ctx.moveTo(
			x - DRAW_SETTINGS.fixedMarkerHalfSize_px,
			y - DRAW_SETTINGS.fixedMarkerHalfSize_px,
		);
		ctx.lineTo(
			x + DRAW_SETTINGS.fixedMarkerHalfSize_px,
			y + DRAW_SETTINGS.fixedMarkerHalfSize_px,
		);
		ctx.moveTo(
			x + DRAW_SETTINGS.fixedMarkerHalfSize_px,
			y - DRAW_SETTINGS.fixedMarkerHalfSize_px,
		);
		ctx.lineTo(
			x - DRAW_SETTINGS.fixedMarkerHalfSize_px,
			y + DRAW_SETTINGS.fixedMarkerHalfSize_px,
		);
		ctx.stroke();
	}
}
