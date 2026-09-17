"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";

type MagneticProps = {
	children: ReactNode;
};

const MAX_OFFSET = 8;

export default function Magnetic({ children }: MagneticProps) {
	const ref = useRef<HTMLSpanElement>(null);

	function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
		const node = ref.current;
		if (!node || event.pointerType !== "mouse") return;

		const bounds = node.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
		const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
		node.style.setProperty("--magnetic-x", `${x * MAX_OFFSET}px`);
		node.style.setProperty("--magnetic-y", `${y * MAX_OFFSET}px`);
	}

	function handlePointerLeave() {
		const node = ref.current;
		if (!node) return;
		node.style.setProperty("--magnetic-x", "0px");
		node.style.setProperty("--magnetic-y", "0px");
	}

	return (
		<span
			ref={ref}
			className="magnetic"
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			style={
				{
					"--magnetic-x": "0px",
					"--magnetic-y": "0px",
				} as CSSProperties
			}
		>
			{children}
		</span>
	);
}
