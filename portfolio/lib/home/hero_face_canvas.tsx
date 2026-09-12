"use client";

import faceSource from "@/lib/face-shader/assets/face-source.jpg";
import FaceCanvas from "@/lib/face-shader/face_canvas";

const CORNER_BOX_SIZE = "min(89vw, 89vh, 1920px)";

/** Homepage corner placement of the triangulated-face tool, in the slot the hex mesh used to fill. */
export default function HeroFaceCanvas() {
	return (
		<FaceCanvas
			src={faceSource.src}
			alt="Triangulated portrait, cursor-reactive"
			decorative
			style={{
				position: "fixed",
				right: 0,
				bottom: 0,
				width: CORNER_BOX_SIZE,
				height: CORNER_BOX_SIZE,
				zIndex: -1,
				pointerEvents: "none",
			}}
		/>
	);
}
