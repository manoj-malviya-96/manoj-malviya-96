import { Link as AtomLink } from "@manoj-malviya-96/atom";
import { default as NextLink } from "next/link";
import type { ReactNode } from "react";
import type { UrlObject } from "url";
import type { ExternalURL } from "@/lib/types";
import { mergeCls } from "@/lib/utils";

type LinkProps = {
	url: ExternalURL | UrlObject | string;
	className?: string;
	newTab?: boolean;
	asControl?: "primary" | "secondary";
	children: ReactNode;
};

const controlClass = {
	primary: "control-primary",
	secondary: "control-secondary",
} as const;

/**
 * Atom's Link renders a plain <a> — it has no notion of Next.js routing.
 * Internal paths go through next/link (via atom's polymorphic `as`) to keep
 * client-side navigation; external URLs stay a plain anchor.
 */
export default function Link({
	url,
	children,
	newTab,
	asControl,
	className,
}: LinkProps) {
	if (!url) {
		throw new Error("Link component requires a url prop");
	}
	const isInternal = typeof url === "object" || url.startsWith("/");
	return (
		<AtomLink
			as={isInternal ? NextLink : "a"}
			href={url}
			openNewTab={newTab}
			aria-label={typeof url === "string" ? url : url.toString()}
			className={mergeCls(
				asControl ? controlClass[asControl] : "link-subtle",
				className,
			)}
		>
			{children}
		</AtomLink>
	);
}
