"use client";

import type { PointerEvent, ReactNode } from "react";

export default function Spotlight({ children }: { children: ReactNode }) {
	function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
		if (event.pointerType !== "mouse") return;

		const card = event.currentTarget.querySelector<HTMLElement>(".hover-card");
		if (!card) return;

		const bounds = card.getBoundingClientRect();
		const x = ((event.clientX - bounds.left) / bounds.width) * 100;
		const y = ((event.clientY - bounds.top) / bounds.height) * 100;
		card.style.setProperty("--spotlight-x", `${x}%`);
		card.style.setProperty("--spotlight-y", `${y}%`);
	}

	function handlePointerLeave(event: PointerEvent<HTMLSpanElement>) {
		const card = event.currentTarget.querySelector<HTMLElement>(".hover-card");
		if (!card) return;
		card.style.removeProperty("--spotlight-x");
		card.style.removeProperty("--spotlight-y");
	}

	return (
		<span
			className="spotlight"
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
		>
			{children}
		</span>
	);
}
