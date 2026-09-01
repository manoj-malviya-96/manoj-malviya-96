"use client";

import { Link as AtomLink } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type Href = ComponentProps<typeof NextLink>["href"];

// Omit over a union only keeps keys common to every branch (keyof distributes
// as an intersection), which silently drops variant-specific props like
// `isActive`/`color` — distribute the Omit over each branch first instead.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
	? Omit<T, K>
	: never;

export type LinkProps = DistributiveOmit<
	ComponentProps<typeof AtomLink<"a">>,
	"as" | "href"
> & {
	url: Href;
};

export default function Link({ url, ...rest }: LinkProps) {
	const isInternal = typeof url === "object" || url.startsWith("/");
	return <AtomLink as={isInternal ? NextLink : "a"} href={url} {...rest} />;
}
