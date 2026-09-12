import {
	getThemeColor,
	type ThemeColor,
	useTheme,
} from "@manoj-malviya-96/atom";
import { type RefObject, useEffect, useRef } from "react";

export type RgbColor = readonly [number, number, number];

// getComputedStyle can serialize a resolved color in whatever color function it was
// declared in (oklch, lab, ...), not just rgb() — Safari does this for the oklch tokens
// this design system uses. Round-tripping through canvas fillStyle normalizes any input
// to a fixed "#rrggbb" (or "rgba(...)" for translucent colors) the browser resolves for us.
function normalizeToRgb(cssColor: string): RgbColor {
	const ctx = document.createElement("canvas").getContext("2d");
	if (!ctx) throw new Error("useThemeColor: 2D canvas context unavailable");
	ctx.fillStyle = cssColor;
	const normalized = ctx.fillStyle;

	if (normalized.startsWith("#")) {
		const r = Number.parseInt(normalized.slice(1, 3), 16);
		const g = Number.parseInt(normalized.slice(3, 5), 16);
		const b = Number.parseInt(normalized.slice(5, 7), 16);
		return [r / 255, g / 255, b / 255];
	}

	const numbers = normalized.match(/[\d.]+/g);
	if (!numbers || numbers.length < 3) {
		throw new Error(
			`useThemeColor: could not parse normalized color "${normalized}"`,
		);
	}
	const [r, g, b] = numbers;
	return [Number(r) / 255, Number(g) / 255, Number(b) / 255];
}

/** Tracks a design-token color as normalized 0..1 rgb, updating when the theme flips. */
export function useThemeColor(token: ThemeColor): RefObject<RgbColor> {
	const colorRef = useRef<RgbColor>([0.6, 0.6, 0.6]);
	const theme = useTheme();

	useEffect(() => {
		colorRef.current = normalizeToRgb(getThemeColor(token));
	}, [theme, token]);

	return colorRef;
}
