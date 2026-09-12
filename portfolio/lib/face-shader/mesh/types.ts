export type Point = { x: number; y: number };
export type Color = { r: number; g: number; b: number };

/** GPU-ready triangulated mesh: flat buffers so a renderer can upload them as-is. */
export type FaceMesh = {
	/** Clip-space xy pairs, one per vertex. */
	positions: Float32Array;
	/** rgb triples in 0..1, one per vertex, aligned with `positions`. */
	colors: Float32Array;
	/** Triangle corner indices into `positions`/`colors`, three per triangle. */
	indices: Uint32Array;
	vertexCount: number;
	triangleCount: number;
};
