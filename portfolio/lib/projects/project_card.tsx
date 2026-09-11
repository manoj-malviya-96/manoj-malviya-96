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
	const { title, summary, dates, tags, media } = getMeta(project);

	return (
		<Flex
			id={project}
			direction="col"
			gap="lg"
			bg="surface"
			padding="lg"
			radius="lg"
			as="article"
		>
			<Flex as="span" direction="col" gap="xs" vAlign="start">
				<Flex as="span" direction="row" hAlign="between" vAlign="center">
					<Flex as="span" direction="col" gap="xs" padding="none">
						<Text variant="heading">{title}</Text>
						<ProjectTags tags={tags} date={dates} />
					</Flex>
					<ProjectLinks project={project} />
				</Flex>
				<Divider direction="horizontal" style={{ opacity: "30%" }} />
			</Flex>
			<Flex direction="row" gap="sm" wrap vAlign="start">
				<Flex direction="col" gap="md" grow>
					<Text variant="title" bold>
						{summary}
					</Text>
					{getProjectContent(project)}
				</Flex>
				{media && (
					<Flex as="span" direction="col" gap="md" vAlign="start" grow>
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
					aspectRatio: "16 / 9",
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
		/>
	);
}

function ProjectLinks({ project }: { project: ProjectId }) {
	const { primary, others } = getLinks(project);

	return (
		<Flex direction="row" gap="md" wrap padding={{ x: "xs" }}>
			<ProjectLinkButton link={primary} color="primary" />
			{others.map((link) => (
				<ProjectLinkButton key={link.href} link={link} />
			))}
		</Flex>
	);
}

function ProjectLinkButton({
	link,
	color,
}: {
	link: ProjectLink;
	color?: "primary";
}) {
	const LinkIcon = linkIcon(link);
	return (
		<Link
			url={link.href}
			openNewTab
			variant="button"
			{...(color && { color })}
			label={linkLabel(link)}
			size="sm"
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
