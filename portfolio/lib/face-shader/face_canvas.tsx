"use client";

import { Canvas, type ThemeColor } from "@manoj-malviya-96/atom";
import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";
import { deserializeFaceMesh } from "./mesh/serialize";
import type { SerializedFaceMesh } from "./mesh/types";
import { useFaceShaderRenderer } from "./use-face-shader-renderer";
import { useThemeColor } from "./use-theme-color";

type FaceCanvasProps = {
	/** Precomputed mesh from `pnpm mesh:generate` — see scripts/generate-face-mesh.ts. */
	mesh: SerializedFaceMesh;
	alt: string;
	/** Design-system color the mesh is tinted with; defaults to the page's content color. */
	themeColor?: ThemeColor;
	/** True for purely decorative background use (hides it from the accessibility tree). */
	decorative?: boolean;
	className?: string;
	style?: CSSProperties;
};

/** Renders a precomputed triangulated wireframe as a monochrome, theme-tinted, cursor-reactive mesh. */
export default function FaceCanvas({
	mesh: serializedMesh,
	alt,
	themeColor = "content",
	decorative,
	className,
	style,
}: FaceCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mesh = useMemo(
		() => deserializeFaceMesh(serializedMesh),
		[serializedMesh],
	);
	const themeColorRef = useThemeColor(themeColor);
	const handleResize = useFaceShaderRenderer(canvasRef, mesh, themeColorRef);

	return (
		<Canvas
			ref={canvasRef}
			onResize={handleResize}
			{...(decorative
				? { "aria-hidden": true }
				: { role: "img", "aria-label": alt })}
			className={className}
			style={{ width: "100%", height: "100%", ...style }}
		/>
	);
}
