"use client";

import {
	Link as AtomLink,
	Section as AtomSection,
	Flex,
	Text,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import NextLink from "next/link";
import {
	type ComponentProps,
	type CSSProperties,
	type ReactNode,
	useEffect,
	useRef,
} from "react";
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

type MediaProps = MediaSource & {
	// Rendered width per viewport, so next/image picks the smallest file that
	// stays sharp. Callers in narrower slots should pass their own.
	sizes?: string;
};

// Sized entirely by `.media-fit` in globals.css: full parent width, capped by
// the parent's `--media-max-h`, always at the file's own ratio — never cropped.
export function Media({
	kind,
	src,
	alt,
	width,
	height,
	sizes = "(min-width: 768px) 50vw, 100vw",
}: MediaProps) {
	const ratio: CSSProperties & Record<`--${string}`, number> = {
		"--media-w": width,
		"--media-h": height,
	};
	if (kind === "video")
		return (
			<InViewVideo
				src={src}
				alt={alt}
				width={width}
				height={height}
				style={ratio}
			/>
		);
	return (
		<NextImage
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			loading="eager"
			className="media-fit"
			style={ratio}
		/>
	);
}

// Plays only while on screen: every card autoplaying meant every video on the
// page downloaded at once. preload="none" defers the fetch to first view.
function InViewVideo({
	src,
	alt,
	width,
	height,
	style,
}: Pick<MediaSource, "src" | "alt" | "width" | "height"> & {
	style: CSSProperties;
}) {
	const ref = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		const video = ref.current;
		if (!video) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry?.isIntersecting) return video.pause();
			// Rejects when a pause interrupts the pending play — expected while scrolling past.
			video.play().catch(() => {});
		});
		observer.observe(video);
		return () => observer.disconnect();
	}, []);
	return (
		<video
			ref={ref}
			src={src}
			aria-label={alt}
			width={width}
			height={height}
			className="media-fit"
			style={style}
			preload="none"
			muted
			loop
			playsInline
		/>
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
export const PageSectionCard = withDefaults(PageSection)({
	gap: "md",
	bg: "surface",
	padding: "xl",
	radius: "lg",
	hAlign: "center",
});

// Todo: [ATOM] should be good helper
export const ButtonRow = withDefaults(Flex)({
	as: "span",
	direction: "row",
	gap: "sm",
	vAlign: "center",
	hAlign: "start",
	wrap: true,
});
export const EmText = withDefaults(Text.Italic)({ ink: "muted" });
