import {
	assertNever,
	Divider,
	Flex,
	Image,
	Text,
	Video,
} from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import {
	getLinks,
	getMeta,
	type ProjectId,
	type ProjectLink,
	type ProjectMedia,
	type ProjectMeta,
} from "@/lib/data";
import { dottedConcatString } from "@/lib/helper";
import { Link } from "@/lib/shared";
import { getProjectContent } from "./project_content";

export default function ProjectCard({ project }: { project: ProjectId }) {
	const { title, summary: hook, dates, tags, media } = getMeta(project);

	return (
		<Flex
			id={project}
			direction="col"
			gap="lg"
			bg="surface"
			padding="lg"
			radius="lg"
		>
			<Flex as="span" direction="col" gap="xs" vAlign="start">
				<Flex as="span" direction="row" hAlign="between" vAlign="center">
					<Flex as="span" direction="col" gap="xs">
						<Text variant="heading">{title}</Text>
						<ProjectTags tags={tags} date={dates} />
					</Flex>
					<ProjectLinks project={project} />
				</Flex>
				<Divider direction="horizontal" style={{ opacity: "30%" }} />
			</Flex>
			<Flex direction="row" gap="lg" wrap>
				<Flex direction="col" gap="md" grow className="project-panel">
					<Text variant="title" bold>
						{hook}
					</Text>
					{getProjectContent(project)}
				</Flex>
				{media && (
					<Flex
						as="span"
						direction="col"
						gap="md"
						vAlign="start"
						grow
						className="project-panel"
					>
						<ProjectCover media={media} />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

function ProjectTags({
	tags,
	date,
}: {
	tags: ProjectMeta["tags"];
	date: string;
}) {
	return (
		<Text variant="caption" muted>
			{dottedConcatString([date, ...tags])}
		</Text>
	);
}

function ProjectCover({ media }: { media: ProjectMedia }) {
	if (media.kind === "video") {
		return (
			<Video
				src={media.src}
				aria-label={media.alt}
				fit="cover"
				ratio="video"
				radius="md"
				style={{ aspectRatio: "5 / 4" }}
				autoPlay
				muted
				loop
				playsInline
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
					aspectRatio: "5 / 4",
					width: "100%",
					overflow: "hidden",
					borderRadius: "var(--radius-md)",
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
			style={{ aspectRatio: "5 / 4" }}
		/>
	);
}

function ProjectLinks({ project }: { project: ProjectId }) {
	const { primary, others } = getLinks(project);

	return (
		<Flex direction="row" gap="md" wrap padding={{ x: "xs" }}>
			{[...others, primary].map((link) => (
				<ProjectLinkButton
					key={link.href}
					link={link}
					color={link === primary ? "primary" : "secondary"}
				/>
			))}
		</Flex>
	);
}

function ProjectLinkButton({
	link,
	color,
}: {
	link: ProjectLink;
	color: "primary" | "secondary";
}) {
	const LinkIcon = linkIcon(link);
	return (
		<Link
			url={link.href}
			openNewTab
			variant="button"
			label={linkLabel(link)}
			size="sm"
			color={color}
			icon={<LinkIcon size="sm" />}
		/>
	);
}

function linkLabel(link: ProjectLink) {
	switch (link.kind) {
		case "github":
			return "GitHub";
		case "medium":
			return "Blog";
		case "demo":
			return link.label ?? "Demo";
		case "external":
			return link.label;
		default:
			return assertNever(link);
	}
}

function linkIcon(link: ProjectLink) {
	switch (link.kind) {
		case "github":
			return IconGithub;
		case "medium":
			return IconMedium;
		case "demo":
			return IconPlay;
		case "external":
			return IconLink;
		default:
			return assertNever(link);
	}
}
