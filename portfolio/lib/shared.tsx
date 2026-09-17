"use client";

import type { ColorToken } from "@manoj-malviya-96/atom";
import {
	Link as AtomLink,
	Flex,
	Image,
	Text,
	Video,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import NextLink from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { withDefaults } from "@/lib/helper";
import type { MediaSource } from "@/lib/types";

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
			width="full"
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

export const Eyebrow = withDefaults(Text)({ variant: "overline", mono: true });

export const Prose = withDefaults(Text)({ variant: "body", width: "lg" });

export function Accent({
	children,
	color = "indigo",
}: {
	children: ReactNode;
	color?: ColorToken;
}) {
	return (
		<span
			className="accent"
			style={{ color: `var(--color-${color})` } as CSSProperties}
		>
			{children}
		</span>
	);
}
