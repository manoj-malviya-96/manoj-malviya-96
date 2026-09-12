export type Point = { x: number; y: number };

/** GPU-ready triangulated mesh: flat buffers so a renderer can upload them as-is. */
export type FaceMesh = {
	/** Clip-space xy pairs, one per vertex. */
	positions: Float32Array;
	/** Per-vertex luminance in 0..1, aligned with `positions` — tinted by the renderer. */
	brightness: Float32Array;
	/** Triangle corner indices into `positions`/`brightness`, three per triangle. */
	indices: Uint32Array;
	vertexCount: number;
	triangleCount: number;
};
