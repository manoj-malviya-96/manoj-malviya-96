import {
	getThemeColor,
	type ThemeColor,
	useTheme,
} from "@manoj-malviya-96/atom";
import { type RefObject, useEffect, useRef } from "react";

export type RgbColor = readonly [number, number, number];

// getComputedStyle can serialize a resolved color in whatever color function it was
// declared in (oklch, lab, ...), not just rgb() — Safari does this for the oklch tokens
// this design system uses, and canvas fillStyle can echo that string straight back
// instead of downgrading it, so string parsing can't be trusted for either. Rasterizing
// one pixel and reading it back is: the canvas's internal buffer is always 8-bit sRGB,
// regardless of what color function the fillStyle was set from.
function resolveToRgb(cssColor: string): RgbColor {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("useThemeColor: 2D canvas context unavailable");
	ctx.fillStyle = cssColor;
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
	return [r / 255, g / 255, b / 255];
}

/** Tracks a design-token color as normalized 0..1 rgb, updating when the theme flips. */
export function useThemeColor(token: ThemeColor): RefObject<RgbColor> {
	const colorRef = useRef<RgbColor>([0.6, 0.6, 0.6]);
	const theme = useTheme();

	useEffect(() => {
		colorRef.current = resolveToRgb(getThemeColor(token));
	}, [theme, token]);

	return colorRef;
}
