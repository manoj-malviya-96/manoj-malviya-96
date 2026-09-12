import {
	getThemeColor,
	type ThemeColor,
	useTheme,
} from "@manoj-malviya-96/atom";
import { type RefObject, useEffect, useRef } from "react";

export type RgbColor = readonly [number, number, number];

function parseRgb(computed: string): RgbColor {
	const numbers = computed.match(/[\d.]+/g);
	if (!numbers || numbers.length < 3) {
		throw new Error(
			`useThemeColor: could not parse computed color "${computed}"`,
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
		colorRef.current = parseRgb(getThemeColor(token));
	}, [theme, token]);

	return colorRef;
}
