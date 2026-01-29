import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { memo, type ReactNode } from "react";
import type { ProjectMeta } from "@/lib/projects/list/types";
import type { ExternalURL } from "@/lib/types";
import { Badge } from "@/lib/ui";
import type { MediaContent } from "@/lib/ui/media";
import { Typography } from "@/lib/ui/text";
import { mergeCls } from "@/lib/utils";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type ProjectCTA =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL }
	| { kind: "custom"; node: ReactNode };

const CTAButton = ({ cta }: { cta: ProjectCTA }) => {
	const base =
		"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-front text-back";
	if (cta.kind === "custom") {
		return <span className={mergeCls(base, "cursor-default")}>{cta.node}</span>;
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
		<a href={cta.href} className={base} target="_blank" rel="noreferrer">
			<span className="inline-flex items-center gap-2">
				{icon}
				{label}
			</span>
		</a>
	);
};

function Media({
	media,
	width = IMG_SIZE,
	height = IMG_SIZE,
	className,
	alt = "project media",
}: {
	media: MediaContent;
	width?: number;
	height?: number;
	className?: string;
	alt?: string;
}) {
	if (typeof media === "string" && media.endsWith(".webm")) {
		return (
			<video
				autoPlay
				loop
				muted
				playsInline
				width={width}
				height={height}
				className={mergeCls("object-cover rounded-xl", className)}
				aria-label={alt}
			>
				<source src={media} type="video/webm" />
			</video>
		);
	}

	return (
		<Image
			src={media}
			alt={alt}
			width={width}
			height={height}
			className={mergeCls("object-cover rounded-xl", className)}
		/>
	);
}

const IMG_SIZE = 720;

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
		<div
			className={mergeCls(
				images.length > 1 ? "flex-col" : "flex-col lg:flex-row",
				"flex gap-8 w-full h-fit items-start",
				className,
			)}
		>
			<div className="flex flex-col gap-4 flex-1">
				{/* Heading */}
				<span className="flex flex-col items-start justify-start gap-0">
					<Typography variant="title">{title}</Typography>
					{description && (
						<Typography variant="caption">{description}</Typography>
					)}
				</span>

				{/* Tags */}
				{!!tags.length && (
					<ul className="flex flex-row flex-wrap gap-2 items-center">
						{tags.map((tag: string) => (
							<Badge key={tag} element="li">
								{tag}
							</Badge>
						))}
					</ul>
				)}

				{children}

				{ctas?.length && (
					<span className="flex flex-wrap gap-2 items-center">
						{ctas.map((cta: ProjectCTA, idx: number) => (
							<CTAButton key={idx} cta={cta} />
						))}
					</span>
				)}
			</div>
			<span className="flex flex-1">
				{images.map((img, idx) => (
					<Media key={idx} media={img} alt={`${title} image`} />
				))}
			</span>
		</div>
	);
}

export default memo(ProjectCard);
