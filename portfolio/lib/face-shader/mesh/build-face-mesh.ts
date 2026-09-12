import { FaceMeshTune } from "./config";
import { triangulate } from "./delaunay";
import { samplePoints } from "./sample-points";
import type { Color, FaceMesh, Point } from "./types";

function decodeImage(source: HTMLImageElement): ImageData {
	const canvas = document.createElement("canvas");
	canvas.width = source.naturalWidth;
	canvas.height = source.naturalHeight;
	const ctx = canvas.getContext("2d");
	if (!ctx)
		throw new Error("2D canvas context unavailable for face image decode");
	ctx.drawImage(source, 0, 0);
	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function colorAt(image: ImageData, p: Point): Color {
	const { data, width, height } = image;
	const radius = FaceMeshTune.color.sampleRadius;
	const x0 = Math.max(0, Math.round(p.x) - radius);
	const x1 = Math.min(width - 1, Math.round(p.x) + radius);
	const y0 = Math.max(0, Math.round(p.y) - radius);
	const y1 = Math.min(height - 1, Math.round(p.y) + radius);

	let r = 0;
	let g = 0;
	let b = 0;
	let count = 0;
	for (let y = y0; y <= y1; y++) {
		for (let x = x0; x <= x1; x++) {
			const i = (y * width + x) * 4;
			r += data[i];
			g += data[i + 1];
			b += data[i + 2];
			count++;
		}
	}
	return { r: r / count / 255, g: g / count / 255, b: b / count / 255 };
}

/**
 * Maps source-image pixels to clip space, mirroring x so the triangulated face reads
 * facing left regardless of which way the source photo faces.
 */
function toClipSpace(p: Point, width: number, height: number): Point {
	const aspect = width / height;
	const nx = (p.x / width) * 2 - 1;
	const ny = 1 - (p.y / height) * 2;
	return { x: -nx * aspect, y: ny };
}

/** Builds a triangulated, per-vertex-colored mesh from a face photo, ready to upload to the GPU. */
export function buildFaceMesh(source: HTMLImageElement): FaceMesh {
	const image = decodeImage(source);
	const points = samplePoints(image);
	const triangles = triangulate(points);

	const positions = new Float32Array(points.length * 2);
	const colors = new Float32Array(points.length * 3);
	points.forEach((p, i) => {
		const clip = toClipSpace(p, image.width, image.height);
		positions[i * 2] = clip.x;
		positions[i * 2 + 1] = clip.y;

		const color = colorAt(image, p);
		colors[i * 3] = color.r;
		colors[i * 3 + 1] = color.g;
		colors[i * 3 + 2] = color.b;
	});

	const indices = new Uint32Array(triangles.length * 3);
	triangles.forEach((t, i) => {
		indices[i * 3] = t.a;
		indices[i * 3 + 1] = t.b;
		indices[i * 3 + 2] = t.c;
	});

	return {
		positions,
		colors,
		indices,
		vertexCount: points.length,
		triangleCount: triangles.length,
	};
}
