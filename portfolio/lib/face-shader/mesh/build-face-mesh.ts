import { FaceMeshTune } from "./config";
import { type Triangle, triangulate } from "./delaunay";
import { samplePoints } from "./sample-points";
import type { FaceMesh, Point } from "./types";

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

function brightnessAt(image: ImageData, p: Point): number {
	const { data, width, height } = image;
	const radius = FaceMeshTune.brightness.sampleRadius;
	const x0 = Math.max(0, Math.round(p.x) - radius);
	const x1 = Math.min(width - 1, Math.round(p.x) + radius);
	const y0 = Math.max(0, Math.round(p.y) - radius);
	const y1 = Math.min(height - 1, Math.round(p.y) + radius);

	let luminance = 0;
	let count = 0;
	for (let y = y0; y <= y1; y++) {
		for (let x = x0; x <= x1; x++) {
			const i = (y * width + x) * 4;
			luminance += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
			count++;
		}
	}
	return luminance / count / 255;
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

/** Each triangle's 3 edges, deduplicated so a shared edge isn't drawn twice. */
function triangleEdges(triangles: Triangle[]): Array<[number, number]> {
	const seen = new Set<string>();
	const edges: Array<[number, number]> = [];

	function addEdge(a: number, b: number): void {
		const [lo, hi] = a < b ? [a, b] : [b, a];
		const key = `${lo}:${hi}`;
		if (seen.has(key)) return;
		seen.add(key);
		edges.push([lo, hi]);
	}

	for (const t of triangles) {
		addEdge(t.a, t.b);
		addEdge(t.b, t.c);
		addEdge(t.c, t.a);
	}
	return edges;
}

/** Builds a triangulated, per-vertex-brightness wireframe from a photo, ready to upload to the GPU. */
export function buildFaceMesh(source: HTMLImageElement): FaceMesh {
	const image = decodeImage(source);
	const points = samplePoints(image);
	const triangles = triangulate(points);
	const edges = triangleEdges(triangles);

	const positions = new Float32Array(points.length * 2);
	const brightness = new Float32Array(points.length);
	points.forEach((p, i) => {
		const clip = toClipSpace(p, image.width, image.height);
		positions[i * 2] = clip.x;
		positions[i * 2 + 1] = clip.y;
		brightness[i] = brightnessAt(image, p);
	});

	const edgeIndices = new Uint32Array(edges.length * 2);
	edges.forEach(([a, b], i) => {
		edgeIndices[i * 2] = a;
		edgeIndices[i * 2 + 1] = b;
	});

	return {
		positions,
		brightness,
		edgeIndices,
		vertexCount: points.length,
		edgeCount: edges.length,
	};
}
