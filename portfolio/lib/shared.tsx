"use client";

import {
	Link as AtomLink,
	Flex,
	Image,
	makeGradientBackground,
	Text,
	Video,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { withDefaults } from "@/lib/helper";
import type { MediaSource } from "@/lib/types";

type SectionId = "home-loop" | "home-feature" | "home-hero" | "home-cta";

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
			{...rest}
			id={id}
			direction="col"
			width="content"
			gap={gap}
			margin={{ x: "auto" }}
			className={className}
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

export function Media({
	media,
	stretch,
}: {
	media: MediaSource;
	// Fills the parent's own box instead of the media's own fixed ratio — for
	// placing media inside a container with a pre-set aspect ratio, like the
	// MacBook mockup's screen cutout.
	stretch?: boolean;
}) {
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
	if (typeof media.src === "string") {
		// Todo integrate in atom: Image's width/height are its own Size-token scale, so they can't
		// carry the pixel dimensions next/image needs to build a srcset for a remote (non-static-import)
		// source — `fill` is the only next/image sizing mode that doesn't require those. Falls back to a
		// plain sized+clipped box instead of atom's fit/ratio classes, which the same reason rules out.
		return (
			<div
				style={{
					position: "relative",
					aspectRatio: "16 / 9",
					width: "100%",
					overflow: "hidden",
					borderRadius: "var(--radius-md)", // TODO
				}}
			>
				<NextImage
					src={media.src}
					alt={media.alt}
					fill
					sizes="(min-width: 920px) 50vw, 100vw"
					style={{ objectFit: "cover" }}
				/>
			</div>
		);
	}
	return (
		<Image
			as={NextImage}
			src={media.src}
			alt={media.alt}
			fit="cover"
			ratio="video"
			radius="md"
		/>
	);
}

type SectionHeaderProps = {
	eyebrow?: ReactNode;
	title: ReactNode;
	caption?: ReactNode;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
	return (
		<Flex direction="col" gap="sm">
			{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
			<Text variant="heading">{title}</Text>
			{caption && (
				<Text variant="body" muted>
					{caption}
				</Text>
			)}
		</Flex>
	);
}

export const Page = withDefaults(Flex)({
	direction: "col",
	gap: "xl",
	width: "content",
});

type PageHeroProps = SectionHeaderProps &
	Omit<ComponentProps<typeof Flex>, "title">;

// Same eyebrow + hero-title intro on every page, so moving between pages feels seamless.
export function PageHero({
	eyebrow,
	title,
	caption,
	children,
	...rest
}: PageHeroProps) {
	return (
		<Flex
			as="header"
			direction="col"
			gap="sm"
			width="full"
			padding={{ y: "xl" }}
			{...rest}
		>
			<Flex as="span" direction="col" gap="xs">
				{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
				<Text variant="hero">{title}</Text>
			</Flex>
			{caption && (
				<Text variant="body" muted width="sm">
					{caption}
				</Text>
			)}
			{children}
		</Flex>
	);
}

export const Eyebrow = withDefaults(Text)({ variant: "overline", mono: true });

export const Prose = withDefaults(Text)({ variant: "body", width: "lg" });

// Both stops contrast with the page; fading into "surface" left the glyph bottoms unreadable.
const ACCENT_GRADIENT = makeGradientBackground({
	direction: "to bottom",
	stops: ["brand", "indigo"],
});

// RISK: renders as an inline span, not AccentText — AccentText emits its own
// h1/h2/h3, which is invalid nested inside a parent Text heading (hydration error).
export function Accent({ children, className }: ComponentProps<"span">) {
	return (
		<span
			className={className}
			style={{
				backgroundImage: ACCENT_GRADIENT,
				backgroundClip: "text",
				WebkitBackgroundClip: "text",
				color: "transparent",
			}}
		>
			{children}
		</span>
	);
}
