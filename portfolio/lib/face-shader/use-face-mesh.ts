import { useEffect, useState } from "react";
import { buildFaceMesh } from "./mesh/build-face-mesh";
import type { FaceMesh } from "./mesh/types";

type FaceMeshState =
	| { status: "loading" }
	| { status: "ready"; mesh: FaceMesh }
	| { status: "error"; error: Error };

/** Loads `src` and triangulates it once; re-runs only if the image itself changes. */
export function useFaceMesh(src: string): FaceMeshState {
	const [state, setState] = useState<FaceMeshState>({ status: "loading" });

	useEffect(() => {
		let cancelled = false;
		setState({ status: "loading" });
		const image = new Image();
		image.decoding = "async";
		image.onload = () => {
			if (cancelled) return;
			try {
				const mesh = buildFaceMesh(image);
				setState({ status: "ready", mesh });
			} catch (error) {
				setState({ status: "error", error: error as Error });
			}
		};
		image.onerror = () => {
			if (!cancelled)
				setState({
					status: "error",
					error: new Error(`Failed to load image: ${src}`),
				});
		};
		image.src = src;

		return () => {
			cancelled = true;
		};
	}, [src]);

	return state;
}
