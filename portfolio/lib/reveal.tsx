"use client";

import { Atom, type AtomProps } from "@manoj-malviya-96/atom";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
	children: ReactNode;
	/** Milliseconds, for staggering siblings. */
	delay?: number;
	colSpan?: AtomProps["colSpan"];
	rowSpan?: AtomProps["rowSpan"];
} & Pick<ComponentProps<"div">, "className">;

// Own `.reveal` CSS instead of atom's `enter`: atom's motion rides on
// @starting-style, which only plays when the node is inserted, so a wrapper that
// swaps element types on reveal remounts its subtree and restarts every nested
// reveal inside it. One stable element plus a class flip keeps nested reveals
// independent and lets each play exactly once.
//
// IntersectionObserver, not atom's useScrollEffect — a one-shot "has this entered
// the viewport" check, not a continuous scroll subscription. observe() reports the
// current state immediately, so cards already on screen reveal on mount.
export default function Reveal({
	children,
	delay,
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

	return (
		<Atom
			ref={ref}
			className={className ? `reveal ${className}` : "reveal"}
			data-visible={visible}
			{...(delay !== undefined && { style: { transitionDelay: `${delay}ms` } })}
			{...(colSpan !== undefined && { colSpan })}
			{...(rowSpan !== undefined && { rowSpan })}
		>
			{children}
		</Atom>
	);
}
