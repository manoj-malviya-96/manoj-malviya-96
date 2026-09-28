import { Flex } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";

export function Iphone({ children }: { children: ReactNode }) {
	return (
		<Flex direction="col" hAlign="center" width="sm" enter="rise">
			<svg
				viewBox="0 0 402 820"
				width="100%"
				role="img"
				aria-label="iPhone mockup"
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
				<foreignObject x="10" y="10" width="382" height="800">
					<div
						className="media-slot"
						style={{
							width: "100%",
							height: "100%",
							borderRadius: "48px",
							overflow: "hidden",
						}}
					>
						{children}
					</div>
				</foreignObject>
				<rect
					x="146"
					y="24"
					width="110"
					height="32"
					rx="16"
					fill="#0D0F10"
				/>
			</svg>
		</Flex>
	);
}
