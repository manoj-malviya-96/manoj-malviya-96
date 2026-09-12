export const FaceMeshTune = {
	sampling: {
		/** Pixel step of the gradient grid; smaller = finer edge detection, slower build. */
		gridStep: 8,
		edgePointCount: 160,
		fillPointCount: 50,
		/** Minimum gap (in source-image px) enforced between accepted edge points. */
		minPointSpacing: 16,
	},
	brightness: {
		/** Half-width (px) of the box the per-vertex luminance is averaged over. */
		sampleRadius: 1,
	},
} as const;
