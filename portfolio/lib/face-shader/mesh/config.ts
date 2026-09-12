export const FaceMeshTune = {
	sampling: {
		/** Pixel step of the gradient grid; smaller = finer edge detection, slower build. */
		gridStep: 8,
		edgePointCount: 160,
		fillPointCount: 50,
		/** Minimum gap (in source-image px) enforced between accepted edge points. */
		minPointSpacing: 16,
		/**
		 * Gradient magnitude alone can't tell a face outline from a hair or jacket
		 * outline — they're all strong edges. Manually cropped to just the face for
		 * this specific source photo (fractions of image width/height); re-tune this
		 * if the source photo changes.
		 */
		region: { xMin: 0.171, xMax: 0.829, yMin: 0.393, yMax: 0.81 },
	},
	brightness: {
		/** Half-width (px) of the box the per-vertex luminance is averaged over. */
		sampleRadius: 1,
	},
} as const;
