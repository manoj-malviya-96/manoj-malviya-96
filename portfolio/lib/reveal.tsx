"use client";

import { Atom, type AtomProps, type MotionEnter } from "@manoj-malviya-96/atom";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
	children: ReactNode;
	as?: MotionEnter;
	colSpan?: AtomProps["colSpan"];
	rowSpan?: AtomProps["rowSpan"];
} & Pick<ComponentProps<"div">, "className">;

// IntersectionObserver, not atom's useScrollEffect — this only needs a
// one-shot "has this entered the viewport" check per card, not a continuous
// scroll subscription. display: contents keeps the pre-reveal wrapper out of
// CSS grid/flex layout, so a plain, visible, no-JS render matches the final
// layout exactly (no FOUC).
export default function Reveal({
	children,
	as = "rise",
	colSpan,
	rowSpan,
	className,
}: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	if (!visible) {
		return (
			<div ref={ref} style={{ display: "contents" }} className={className}>
				{children}
			</div>
		);
	}

	return (
		<Atom
			enter={as}
			{...(colSpan !== undefined && { colSpan })}
			{...(rowSpan !== undefined && { rowSpan })}
			{...(className !== undefined && { className })}
		>
			{children}
		</Atom>
	);
}
