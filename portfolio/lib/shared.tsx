"use client";

import {
	Link as AtomLink,
	Section as AtomSection,
	Flex,
	Text,
	Video,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { withDefaults } from "@/lib/helper";
import type { MediaSource } from "@/lib/types";

type Href = ComponentProps<typeof NextLink>["href"];
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
	? Omit<T, K>
	: never;

export type LinkProps = DistributiveOmit<
	ComponentProps<typeof AtomLink>,
	"as" | "href"
> & {
	url: Href;
};

function LinkInline({ url, ...rest }: LinkProps) {
	if (typeof url === "object" || url.startsWith("/"))
		return (
			<AtomLink
				as={NextLink}
				href={url}
				{...rest}
				// TODO:[Atom] has defaulted to underline in 0.3.3. When its removed and it will be - removed this.
				style={{ textDecoration: "none" }}
			/>
		);
	return (
		// TODO:[Atom] has defaulted to underline in 0.3.3. When its removed and it will be - removed this.
		<AtomLink as="a" href={url} {...rest} style={{ textDecoration: "none" }} />
	);
}

type LinkButtonProps = {
	url: Href;
	label: string;
	icon?: NonNullable<ReactNode>;
	color?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	openNewTab?: boolean;
	rel?: string;
	"aria-label"?: string;
};

function LinkButton({ url, icon, ...rest }: LinkButtonProps) {
	if (typeof url === "object" || url.startsWith("/")) {
		return icon ? (
			<AtomLink.Button
				as={NextLink}
				href={url}
				collapseOnMobile={false} // TODO - [ATOM] needs to make it not default
				icon={icon}
				{...rest}
			/>
		) : (
			<AtomLink.Button as={NextLink} href={url} {...rest} />
		);
	}
	return icon ? (
		<AtomLink.Button
			as="a"
			href={url}
			collapseOnMobile={false}
			icon={icon}
			{...rest}
		/>
	) : (
		<AtomLink.Button as="a" href={url} {...rest} />
	);
}

export const Link = Object.assign(LinkInline, { Button: LinkButton });

export function Media({
	media,
	layout = "frame",
}: {
	media: MediaSource;
	// frame: fixed 16:9 box. fill: the parent's own box, like the MacBook
	// mockup's screen cutout. natural: full width at the image's own ratio.
	layout?: "frame" | "fill" | "natural";
}) {
	const stretch = layout === "fill";
	if (media.kind === "video") {
		return (
			<Video
				src={media.src}
				aria-label={media.alt}
				fit="cover"
				ratio="video"
				radius="md"
				autoPlay
				preload="none"
				muted
				loop
				role="img"
				playsInline
				controls={false}
				{...(stretch && {
					style: { width: "100%", height: "100%", aspectRatio: "auto" },
				})}
			/>
		);
	}
	if (layout === "natural") {
		// Remote blobs carry no intrinsic size; 0×0 lets CSS size it from the loaded image.
		return (
			<NextImage
				src={media.src}
				alt={media.alt}
				width={0}
				height={0}
				sizes="(min-width: 768px) 25vw, 50vw"
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "var(--radius-md)",
				}}
			/>
		);
	}
	// Every src is now a remote blob URL with no build-time intrinsic size, so
	// next/image can only lay it out via `fill` — which needs a sized,
	// positioned ancestor. Own that box here instead of relying on callers to
	// remember to provide one (they didn't, hence images rendering viewport-sized).
	// Non-mockup images sit on their own next to text, so they're shown in full
	// (`contain`) rather than cropped to a fixed ratio; `stretch` images fill a
	// mockup's screen cutout, where `cover` is the correct look.
	return (
		<div
			style={
				stretch
					? { position: "relative", width: "100%", height: "100%" }
					: {
							position: "relative",
							width: "100%",
							aspectRatio: "16 / 9",
							background: "var(--color-surface)",
							borderRadius: "var(--radius-md)",
							overflow: "hidden",
						}
			}
		>
			<NextImage
				src={media.src}
				alt={media.alt}
				fill
				sizes="(min-width: 768px) 50vw, 100vw"
				style={{ objectFit: stretch ? "cover" : "contain" }}
			/>
		</div>
	);
}

type SectionHeaderProps = {
	eyebrow?: ReactNode;
	title?: ReactNode;
	caption?: ReactNode;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
	return (
		<Flex direction="col" gap="sm">
			{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
			{title && <Text.Title>{title}</Text.Title>}
			{caption && <Text.Body ink="muted">{caption}</Text.Body>}
		</Flex>
	);
}

export const Page = withDefaults(Flex)({
	direction: "col",
	gap: "lg",
	width: "content",
});

type PageHeroSectionProps = Omit<ComponentProps<typeof Flex>, "title">;

// Same header shell on every page, so moving between pages feels seamless.
export function PageHeroSection({ children, ...rest }: PageHeroSectionProps) {
	return (
		<Flex
			as="header"
			direction="col"
			gap="lg"
			width="full"
			padding={{ y: "md" }}
			{...rest}
		>
			{children}
		</Flex>
	);
}

type PageHeroHeaderProps = Omit<
	ComponentProps<typeof Flex>,
	"direction" | "gap"
>;

// The eyebrow + title stack at the top of a PageHeroSection — compose it from
// <Eyebrow> and a Text.Heading/Text.Hero child rather than passing props, so
// each page picks its own title element.
export function PageHeroHeader({ children, ...rest }: PageHeroHeaderProps) {
	return (
		<Flex as="span" direction="col" gap="xs" width={{ max: "md" }} {...rest}>
			{children}
		</Flex>
	);
}

export const Eyebrow = withDefaults(Text.Overline)({ mono: true });
export const PageSection = withDefaults(AtomSection)({
	width: "content",
	margin: { x: "auto" },
});
export const EmText = withDefaults(Text.Italic)({ ink: "muted" });
