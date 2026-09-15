"use client";

import { Atom, Flex } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";

// TODO ATOM: radius has no per-corner variant, and no size token this small (hinge bar,
// notch) or this precise (16:9 screen) exists — chassis geometry falls back to style.
export function MacbookMockup({ children }: { children: ReactNode }) {
	return (
		<Flex direction="col" hAlign="center" width="md">
			<Atom
				bg="brand"
				padding="xs"
				width="full"
				style={{ borderRadius: "1rem 1rem 0 0" }}
			>
				<Atom
					bg="page"
					radius="sm"
					width="full"
					style={{ aspectRatio: "16 / 9", overflow: "hidden" }}
				>
					{children}
				</Atom>
			</Atom>
			<Flex
				direction="row"
				hAlign="center"
				width="full"
				bg="brand"
				style={{ height: "0.65rem", borderRadius: "0 0 0.75rem 0.75rem" }}
			>
				<Atom
					bg="page"
					style={{
						width: "3rem",
						height: "0.2rem",
						borderRadius: "0 0 0.3rem 0.3rem",
					}}
				/>
			</Flex>
		</Flex>
	);
}
