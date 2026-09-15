"use client";

import { Atom, Flex } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";

// TODO ATOM: radius has no per-corner variant, and no size token this small (hinge bar,
// notch) or this precise (16:9 screen) exists — chassis geometry falls back to style.
// Screen and bezel share the same top-only rounding so the display sits flush against
// the frame; a mismatched radius on the screen's bottom corners left a visible gap
// above the hinge bar where the video didn't reach the edge.
export function MacbookMockup({ children }: { children: ReactNode }) {
	return (
		<Flex direction="col" hAlign="center" width="lg">
			<Atom
				bg="brand"
				padding="xs"
				width="full"
				style={{ borderRadius: "1.25rem 1.25rem 0 0", boxSizing: "border-box" }}
			>
				<Atom
					bg="page"
					width="full"
					style={{
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
				bg="brand"
				style={{ height: "0.85rem", borderRadius: "0 0 1rem 1rem" }}
			>
				<Atom
					bg="page"
					style={{
						width: "4rem",
						height: "0.25rem",
						borderRadius: "0 0 0.4rem 0.4rem",
					}}
				/>
			</Flex>
		</Flex>
	);
}
