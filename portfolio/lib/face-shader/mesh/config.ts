export const FaceMeshTune = {
	sampling: {
		/** Pixel step of the gradient grid; smaller = finer edge detection, slower build. */
		gridStep: 4,
		edgePointCount: 900,
		fillPointCount: 260,
		/** Minimum gap (in source-image px) enforced between accepted edge points. */
		minPointSpacing: 6,
		borderPointsPerSide: 6,
	},
	color: {
		/** Half-width (px) of the box the per-vertex color is averaged over. */
		sampleRadius: 1,
	},
} as const;
