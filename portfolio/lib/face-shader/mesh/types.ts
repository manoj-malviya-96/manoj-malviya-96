export type Point = { x: number; y: number };

/** Decoded pixel data, structurally compatible with both DOM ImageData and a raw Buffer. */
export type PixelImage = {
	data: Uint8ClampedArray | Buffer;
	width: number;
	height: number;
};

/** GPU-ready triangulated wireframe: flat buffers so a renderer can upload them as-is. */
export type FaceMesh = {
	/** Clip-space xy pairs, one per vertex. */
	positions: Float32Array;
	/** Per-vertex luminance in 0..1, aligned with `positions` — tinted by the renderer. */
	brightness: Float32Array;
	/** Deduplicated triangle-edge indices into `positions`/`brightness`, two per line. */
	edgeIndices: Uint32Array;
	vertexCount: number;
	edgeCount: number;
};

/** JSON-safe form of `FaceMesh` — what the generator script writes to disk. */
export type SerializedFaceMesh = {
	positions: number[];
	brightness: number[];
	edgeIndices: number[];
	vertexCount: number;
	edgeCount: number;
};
