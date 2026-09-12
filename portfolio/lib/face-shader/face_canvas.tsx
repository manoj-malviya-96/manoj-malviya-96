"use client";

import { Canvas, Text, type ThemeColor } from "@manoj-malviya-96/atom";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { useFaceMesh } from "./use-face-mesh";
import { useFaceShaderRenderer } from "./use-face-shader-renderer";
import { useThemeColor } from "./use-theme-color";

type FaceCanvasProps = {
	/** URL of the source photo to triangulate — any same-origin image works. */
	src: string;
	alt: string;
	/** Design-system color the mesh is tinted with; defaults to the page's content color. */
	themeColor?: ThemeColor;
	/** True for purely decorative background use (hides it from the accessibility tree). */
	decorative?: boolean;
	className?: string;
	style?: CSSProperties;
};

/** Triangulates `src` into a monochrome, theme-tinted, cursor-reactive WebGL mesh facing left. */
export default function FaceCanvas({
	src,
	alt,
	themeColor = "content",
	decorative,
	className,
	style,
}: FaceCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const state = useFaceMesh(src);
	const mesh = state.status === "ready" ? state.mesh : null;
	const themeColorRef = useThemeColor(themeColor);
	const handleResize = useFaceShaderRenderer(canvasRef, mesh, themeColorRef);

	if (state.status === "error") {
		if (decorative) return null;
		return (
			<Text variant="caption" muted>
				Face mesh failed to load: {state.error.message}
			</Text>
		);
	}

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
