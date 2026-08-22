import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import {
	Badge,
	Flex,
	Image,
	List,
	Typography,
	Video,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import type { ReactNode } from "react";
import type { ProjectMeta } from "@/lib/projects/list/types";
import type { ExternalURL } from "@/lib/types";
import { Icon, Link } from "@/lib/ui";
import type { MediaContent } from "@/lib/ui/media";
import { mergeCls } from "@/lib/utils";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;

export type ProjectCTA =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL };

type ProjectCardProps = ProjectMeta & {
	children: ReactNode;
	images: readonly MediaContent[];
	ctas?: readonly ProjectCTA[];
};

export default function ProjectCard({
	title,
	description,
	children,
	tags,
	images,
	ctas,
}: ProjectCardProps) {
	return (
		<Flex
			direction="col"
			gap="lg"
			hAlign="start"
			padding="lg"
			radius="md"
			backgroundColor="surface"
			className={mergeCls(
				"frosted",
				images.length <= 1 && "direction-responsive-row",
			)}
		>
			<Flex direction="col" gap="md" style={{ flex: 1 }}>
				<Flex direction="col" hAlign="start" vAlign="start">
					<Typography variant="title">{title}</Typography>
					{description && (
						<Typography variant="caption">{description}</Typography>
					)}
				</Flex>

				{tags.length > 0 && (
					<List direction="row" gap="sm">
						{tags.map((tag) => (
							<li key={tag}>
								<Badge>{tag}</Badge>
							</li>
						))}
					</List>
				)}

				{children}

				{ctas && ctas.length > 0 && (
					<List direction="row" gap="sm">
						{ctas.map((cta) => (
							<li key={cta.href}>
								<CTALink cta={cta} />
							</li>
						))}
					</List>
				)}
			</Flex>
			<Flex direction="row" gap="md" style={{ flex: 1 }}>
				{images.map((media) => (
					<Media key={mediaKey(media)} media={media} alt={`${title} image`} />
				))}
			</Flex>
		</Flex>
	);
}

function CTALink({ cta }: { cta: ProjectCTA }) {
	return (
		<Link
			url={cta.href}
			openNewTab
			padding="sm"
			radius="md"
			backgroundColor="brand"
		>
			<Flex direction="row" gap="xs" vAlign="center" inline>
				{cta.kind === "github" && <Icon icon={faGithub} />}
				{cta.kind === "medium" && <Icon icon={faMedium} />}
				{ctaLabel(cta)}
			</Flex>
		</Link>
	);
}

function ctaLabel(cta: ProjectCTA): string {
	switch (cta.kind) {
		case "github":
			return "GitHub";
		case "medium":
			return "Blog";
		case "demo":
			return cta.label ?? "Demo";
	}
}

const MEDIA_SIZE = 720;

function mediaKey(media: MediaContent): string {
	return typeof media === "string" ? media : media.src;
}

function Media({ media, alt }: { media: MediaContent; alt: string }) {
	if (typeof media === "string" && media.endsWith(".webm")) {
		return (
			<Video
				autoPlay
				loop
				muted
				playsInline
				width={MEDIA_SIZE}
				height={MEDIA_SIZE}
				fit="cover"
				radius="md"
				aria-label={alt}
			>
				<source src={media} type="video/webm" />
			</Video>
		);
	}

	return (
		<Image
			as={NextImage}
			src={media}
			alt={alt}
			width={MEDIA_SIZE}
			height={MEDIA_SIZE}
			fit="cover"
			radius="md"
		/>
	);
}
