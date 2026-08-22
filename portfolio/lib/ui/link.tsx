import { Link as AtomLink } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type Href = ComponentProps<typeof NextLink>["href"];

export type LinkProps = Omit<
	ComponentProps<typeof AtomLink<"a">>,
	"as" | "href"
> & {
	url: Href;
};

/**
 * atom's Link renders a plain <a> and knows nothing about the router, so
 * internal paths are handed to next/link through atom's polymorphic `as` to
 * keep client-side navigation; external URLs stay a plain anchor.
 */
export default function Link({ url, ...rest }: LinkProps) {
	const isInternal = typeof url === "object" || url.startsWith("/");
	return <AtomLink as={isInternal ? NextLink : "a"} href={url} {...rest} />;
}
