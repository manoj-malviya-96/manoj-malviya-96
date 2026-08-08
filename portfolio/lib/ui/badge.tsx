import { Atom } from "@manoj-malviya-96/atom";
import { type ElementType, memo, type ReactNode } from "react";
import { mergeCls } from "@/lib/utils";

function Badge({
	children,
	className = "",
	element = "span",
	active = false,
}: {
	children: ReactNode;
	className?: string;
	element?: ElementType;
	active?: boolean;
}) {
	return (
		<Atom
			as={element}
			radius="md"
			backgroundColor={active ? undefined : "surface"}
			className={mergeCls(
				// atom's padding scale is uniform, so the badge's asymmetric
				// inset stays here; likewise display and text size, which the
				// box primitive deliberately doesn't own
				"inline-block px-2 py-1 text-sm",
				// atom has no inverted surface/text pair — backgroundColor
				// takes page/surface/accents, content is text-only — so the
				// active badge stays on the portfolio's own tokens
				active && "bg-front text-back",
				className,
			)}
		>
			{children}
		</Atom>
	);
}

Badge.displayName = "Badge";

export default memo(Badge);
