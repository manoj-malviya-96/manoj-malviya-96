import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Flex, Image, Typography, Video } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import { memo, type ReactNode } from "react";
import type { ProjectMeta } from "@/lib/projects/list/types";
import type { ExternalURL } from "@/lib/types";
import type { MediaContent } from "@/lib/ui/media";
import { mergeCls } from "@/lib/utils";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type ProjectCTA =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL }
	| { kind: "custom"; node: ReactNode };

const CTAButton = ({ cta }: { cta: ProjectCTA }) => {
	if (cta.kind === "custom") {
		return <span className="cta-button cta-button--custom">{cta.node}</span>;
	}

	const icon = (() => {
		switch (cta.kind) {
			case "github":
				return <FontAwesomeIcon icon={faGithub} />;
			case "medium":
				return <FontAwesomeIcon icon={faMedium} />;
			case "demo":
				return null;
			default:
				return null;
		}
	})();

	const label = (() => {
		switch (cta.kind) {
			case "github":
				return "GitHub";
			case "medium":
				return "Blog";
			case "demo":
				return cta.label ?? "Demo";
			default:
				return null;
		}
	})();

	return (
		<a href={cta.href} className="cta-button" target="_blank" rel="noreferrer">
			<Flex direction="row" gap="xs" vAlign="center" inline>
				{icon}
				{label}
			</Flex>
		</a>
	);
};

const IMG_SIZE = 720;

function Media({
	media,
	width = IMG_SIZE,
	height = IMG_SIZE,
	alt = "project media",
}: {
	media: MediaContent;
	width?: number;
	height?: number;
	alt?: string;
}) {
	if (typeof media === "string" && media.endsWith(".webm")) {
		return (
			<Video
				autoPlay
				loop
				muted
				playsInline
				width={width}
				height={height}
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
			width={width}
			height={height}
			fit="cover"
			radius="md"
		/>
	);
}

function ProjectCard({
	title,
	description,
	children,
	tags,
	images,
	ctas,
	className,
}: ProjectMeta & {
	children: ReactNode;
	images: MediaContent[];
	ctas?: ProjectCTA[];
	className?: string;
}) {
	return (
		<Flex
			direction="col"
			gap="lg"
			hAlign="start"
			className={mergeCls(
				images.length <= 1 && "direction-responsive-row",
				className,
			)}
		>
			<Flex direction="col" gap="md" style={{ flex: 1 }}>
				{/* Heading */}
				<Flex direction="col" hAlign="start" vAlign="start">
					<Typography variant="title">{title}</Typography>
					{description && (
						<Typography variant="caption">{description}</Typography>
					)}
				</Flex>

				{/* Tags */}
				{!!tags.length && (
					<Flex
						as="ul"
						direction="row"
						gap="sm"
						vAlign="center"
						style={{ flexWrap: "wrap" }}
					>
						{tags.map((tag: string) => (
							<li key={tag}>
								<Badge>{tag}</Badge>
							</li>
						))}
					</Flex>
				)}

				{children}

				{ctas?.length && (
					<Flex
						direction="row"
						gap="sm"
						vAlign="center"
						style={{ flexWrap: "wrap" }}
					>
						{ctas.map((cta: ProjectCTA, idx: number) => (
							<CTAButton key={idx} cta={cta} />
						))}
					</Flex>
				)}
			</Flex>
			<Flex direction="row" style={{ flex: 1 }}>
				{images.map((img, idx) => (
					<Media key={idx} media={img} alt={`${title} image`} />
				))}
			</Flex>
		</Flex>
	);
}

export default memo(ProjectCard);
