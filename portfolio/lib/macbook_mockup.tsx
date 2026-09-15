"use client";

import { Atom, Flex } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";

// Snowflake component: a MacBook's aluminum body and black screen glass are fixed,
// real-world colors, not atom's themed page/surface/brand tokens — hardcoded here via
// style.backgroundColor rather than stretched onto the token system.
const CHASSIS_COLOR = "#3a3a3c";
const SCREEN_COLOR = "#000000";
const NOTCH_COLOR = "#1c1c1e";

// TODO ATOM: radius has no per-corner variant, and no size token this small (hinge bar,
// notch) or this precise (16:9 screen) exists — chassis geometry falls back to style.
// Screen and bezel share the same top-only rounding so the display sits flush against
// the frame; a mismatched radius on the screen's bottom corners left a visible gap
// above the hinge bar where the video didn't reach the edge.
export function MacbookMockup({ children }: { children: ReactNode }) {
	return (
		<Flex direction="col" hAlign="center" width="lg">
			<Atom
				padding="xs"
				width="full"
				style={{
					backgroundColor: CHASSIS_COLOR,
					borderRadius: "1.25rem 1.25rem 0 0",
					boxSizing: "border-box",
				}}
			>
				<Atom
					width="full"
					style={{
						backgroundColor: SCREEN_COLOR,
						aspectRatio: "16 / 9",
						overflow: "hidden",
						borderRadius: "0.85rem 0.85rem 0 0",
					}}
				>
					{children}
				</Atom>
			</Atom>
			<Flex
				direction="row"
				hAlign="center"
				width="full"
				style={{
					backgroundColor: CHASSIS_COLOR,
					height: "0.85rem",
					borderRadius: "0 0 1rem 1rem",
				}}
			>
				<Atom
					style={{
						backgroundColor: NOTCH_COLOR,
						width: "4rem",
						height: "0.25rem",
						borderRadius: "0 0 0.4rem 0.4rem",
					}}
				/>
			</Flex>
		</Flex>
	);
}
