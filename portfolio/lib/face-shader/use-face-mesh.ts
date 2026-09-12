import { useEffect, useState } from "react";
import faceSource from "./assets/face-source.jpg";
import { buildFaceMesh } from "./mesh/build-face-mesh";
import type { FaceMesh } from "./mesh/types";

type FaceMeshState =
	| { status: "loading" }
	| { status: "ready"; mesh: FaceMesh }
	| { status: "error"; error: Error };

/** Loads the source photo and triangulates it once; the result is static, so no deps to re-run on. */
export function useFaceMesh(): FaceMeshState {
	const [state, setState] = useState<FaceMeshState>({ status: "loading" });

	useEffect(() => {
		let cancelled = false;
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
					error: new Error("Failed to load face source image"),
				});
		};
		image.src = faceSource.src;

		return () => {
			cancelled = true;
		};
	}, []);

	return state;
}
