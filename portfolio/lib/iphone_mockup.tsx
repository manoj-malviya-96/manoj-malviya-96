import { Flex } from "@manoj-malviya-96/atom";
import type { CSSProperties, ReactNode } from "react";

/**
 * The screen is an HTML box over the SVG frame, not a <foreignObject>: WebKit
 * doesn't clip or size foreignObject content inside a scaled SVG, so media
 * spilled out of the phone on iOS Safari.
 */
export function Iphone({ children }: { children: ReactNode }) {
	return (
		<Flex direction="col" hAlign="center" width="sm" enter="rise">
			<div style={FRAME}>
				<svg
					viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
					role="img"
					aria-label="iPhone mockup"
					style={LAYER}
				>
					<title>iPhone frame</title>
					<rect
						x="1"
						y="1"
						width="400"
						height="818"
						rx="56"
						fill="#1E1F1F"
						stroke="#7A7B7D"
						strokeWidth="1.5"
					/>
					<rect x="10" y="10" width="382" height="800" rx="48" fill="black" />
				</svg>
				<div className="media-slot" style={SCREEN}>
					{children}
				</div>
				<div style={NOTCH} />
			</div>
		</Flex>
	);
}

const WIDTH = 402;
const HEIGHT = 820;

const LAYER: CSSProperties = {
	position: "absolute",
	inset: 0,
	width: "100%",
	height: "100%",
};

const FRAME: CSSProperties = {
	position: "relative",
	width: "100%",
	aspectRatio: `${WIDTH} / ${HEIGHT}`,
};

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

const SCREEN: CSSProperties = {
	position: "absolute",
	left: percent(10, WIDTH),
	top: percent(10, HEIGHT),
	width: percent(382, WIDTH),
	height: percent(800, HEIGHT),
	borderRadius: `${percent(48, 382)} / ${percent(48, 800)}`,
	overflow: "hidden",
	background: "black",
};

const NOTCH: CSSProperties = {
	position: "absolute",
	left: percent(146, WIDTH),
	top: percent(24, HEIGHT),
	width: percent(110, WIDTH),
	height: percent(32, HEIGHT),
	borderRadius: "999px",
	background: "#0D0F10",
};
