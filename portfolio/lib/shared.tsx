"use client";

import {
	Link as AtomLink,
	Section as AtomSection,
	assertNever,
	Flex,
	Text,
	Video,
	withDefaults,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import NextLink from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { CodeMedia, MediaSource } from "@/lib/types";

/**
 * Sized entirely by `.media-fit` in globals.css: full parent width, capped by
 * the parent's `--media-max-h`, always at the file's own ratio — never cropped.
 */
export function Media(props: MediaProps) {
	const { sizes = "(min-width: 768px) 50vw, 100vw", fill = false } = props;
	if (props.kind === "code") {
		return <CodeBlock {...props} fill={fill} />;
	}
	const { kind, src, alt, width, height } = props;
	const ratio: CSSProperties & Record<`--${string}`, number> = {
		"--media-w": width,
		"--media-h": height,
	};
	switch (kind) {
		case "video":
			return (
				<Video
					autoPlayInView
					src={src}
					aria-label={alt}
					{...(fill ? {} : { className: "media-fit", style: ratio })}
				/>
			);
		case "image":
			return fill ? (
				<NextImage src={src} alt={alt} fill sizes={sizes} loading="eager" />
			) : (
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
		default:
			return assertNever(kind);
	}
}

/** Same header shell on every page, so moving between pages feels seamless. */
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

/**
 * The eyebrow + title stack at the top of a PageHeroSection — compose it from
 * <Eyebrow> and a Text.Heading/Text.Hero child rather than passing props, so
 * each page picks its own title element.
 */
export const PageHeroHeader = withDefaults(Flex)({
	as: "span",
	direction: "col",
	gap: "xs",
	width: { max: "md" },
});

export type LinkProps = DistributiveOmit<
	ComponentProps<typeof AtomLink>,
	"as" | "href"
> & {
	url: Href;
};

export const Link = Object.assign(LinkInline, { Button: LinkButton });

export const Page = withDefaults(Flex)({
	direction: "col",
	gap: "lg",
	width: "content",
});

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

/** Todo: [ATOM] should be good helper */
export const ButtonRow = withDefaults(Flex)({
	as: "span",
	direction: "row",
	gap: "sm",
	vAlign: "center",
	hAlign: "start",
	flexMode: "wrap",
});
export const EmText = withDefaults(Text.Italic)({ ink: "muted" });

type Href = ComponentProps<typeof NextLink>["href"];
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
	? Omit<T, K>
	: never;

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

type MediaProps = MediaSource & {
	/**
	 * Rendered width per viewport, so next/image picks the smallest file that
	 * stays sharp. Callers in narrower slots should pass their own.
	 */
	sizes?: string;
	/**
	 * Fills and crops to its positioned parent instead of keeping the file's own
	 * aspect ratio — for a parent that already defines the shape, e.g. <Backdrop.Media>.
	 */
	fill?: boolean;
};

type PageHeroSectionProps = Omit<ComponentProps<typeof Flex>, "title">;

function CodeBlock({
	code,
	language,
	alt,
	filename,
	fill,
}: CodeMedia & { fill: boolean }) {
	return (
		<figure
			className={fill ? "code-block code-block-fill" : "code-block"}
			aria-label={alt}
		>
			{filename && <figcaption>{filename}</figcaption>}
			<pre>
				<code className={`language-${language}`}>{code}</code>
			</pre>
		</figure>
	);
}

function LinkInline({ url, ...rest }: LinkProps) {
	return (
		<AtomLink
			as={NextLink}
			href={url}
			{...rest}
			/** TODO:[Atom] has defaulted to underline in 0.3.3. When its removed and it will be - removed this. */
			style={{ textDecoration: "none" }}
		/>
	);
}

function LinkButton({ url, icon, ...rest }: LinkButtonProps) {
	return icon ? (
		<AtomLink.Button
			as={NextLink}
			href={url}
			collapseOnMobile={false} /** TODO - [ATOM] needs to make it not default */
			icon={icon}
			{...rest}
		/>
	) : (
		<AtomLink.Button as={NextLink} href={url} {...rest} />
	);
}
