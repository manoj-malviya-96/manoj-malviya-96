"use client";

import { Link as AtomLink, Flex, Text } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import type { ComponentProps, ComponentType, ReactNode } from "react";

export function styled<P extends object>(Component: ComponentType<P>) {
	return function preset<D extends Partial<P>>(defaultProps: D) {
		return function Styled(props: Omit<P, keyof D> & Partial<D>) {
			return <Component {...defaultProps} {...(props as P)} />;
		};
	};
}

type SectionId = "home-loop" | "home-feature" | "home-hero";

type SectionProps = {
	id: SectionId;
} & Omit<ComponentProps<typeof Flex>, "id">;

export function Section({
	id,
	gap = "lg",
	className,
	children,
	...rest
}: SectionProps) {
	return (
		<Flex
			as="section"
			id={id}
			direction="col"
			gap={gap}
			padding={{ y: "lg" }}
			className={className}
			{...rest}
		>
			{children}
		</Flex>
	);
}

type Href = ComponentProps<typeof NextLink>["href"];
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
	? Omit<T, K>
	: never;

export type LinkProps = DistributiveOmit<
	ComponentProps<typeof AtomLink<"a">>,
	"as" | "href"
> & {
	url: Href;
};

export function Link({ url, ...rest }: LinkProps) {
	const isInternal = typeof url === "object" || url.startsWith("/");
	return <AtomLink as={isInternal ? NextLink : "a"} href={url} {...rest} />;
}

type SectionHeaderProps = {
	eyebrow: ReactNode;
	title: ReactNode;
	caption?: ReactNode;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
	return (
		<Flex direction="col" gap="sm">
			<Eyebrow>{eyebrow}</Eyebrow>
			<Text variant="heading">{title}</Text>
			{caption && (
				<Text variant="body" muted>
					{caption}
				</Text>
			)}
		</Flex>
	);
}

export const Eyebrow = styled(Text)({ variant: "overline", mono: true });
