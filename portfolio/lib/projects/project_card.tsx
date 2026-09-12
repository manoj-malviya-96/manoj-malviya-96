import { assertNever, Flex, Image, Text, Video } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import {
	getLinks,
	type Project,
	type ProjectId,
	type ProjectLink,
	type ProjectMedia,
	Projects,
} from "@/lib/data";
import { dottedConcatString } from "@/lib/helper";
import { Link } from "@/lib/shared";

export default function ProjectCard({ project }: { project: ProjectId }) {
	const { title, summary, dates, tags, media, content } = Projects[project];

	return (
		<Flex
			id={project}
			direction="col"
			gap="lg"
			bg="surface"
			padding="lg"
			radius="lg"
			hAlign="center"
			as="section"
			width="full"
		>
			<Flex
				direction="col"
				gap="md"
				hAlign="center"
				width="lg"
				style={{ textAlign: "center" }}
			>
				<Text variant="hero">{title}</Text>
				<Text variant="subtitle" muted>
					{summary}
				</Text>
				<ProjectLinks project={project} />
			</Flex>
			{media && <ProjectCover media={media} />}
			{content}
			<ProjectTags tags={tags} date={dates} />
		</Flex>
	);
}

function ProjectTags({ tags, date }: { tags: Project["tags"]; date: string }) {
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
				preload="none"
				muted
				loop
				role="img"
				playsInline
				controls={false}
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
