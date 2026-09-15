import { Atom, assertNever, Flex, Text } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import { useMemo } from "react";
import {
	type Project,
	type ProjectId,
	type ProjectLink,
	type ProjectMedia,
	Projects,
} from "@/lib/data";
import { dottedConcatString } from "@/lib/helper";
import { MacbookMockup } from "@/lib/macbook_mockup";
import { Link, Media } from "@/lib/shared";

export default function ProjectCard({ project }: { project: ProjectId }) {
	const { title, summary, dates, tags, media, content } = Projects[project];

	return (
		<Flex
			id={project}
			direction="col"
			gap="lg"
			radius="sm"
			hAlign="center"
			as="section"
			width="full"
			bg="surface"
			padding={{ x: "sm", y: "lg" }}
		>
			<Flex direction="col" gap="lg" hAlign="center" width="content">
				<Flex
					direction="col"
					gap="md"
					hAlign="center"
					width="lg"
					style={{
						textAlign: "center",
					}} /* TODO ATOM should support textAlign on Atom */
				>
					<Text variant="hero">{title}</Text>
					<Text variant="subtitle" muted>
						{summary}
					</Text>
					<ProjectLinks project={project} />
				</Flex>
				{media && <ProjectMediaComponent media={media} />}
				{content}
				<ProjectTags tags={tags} date={dates} />
			</Flex>
		</Flex>
	);
}

function ProjectMediaComponent({ media }: { media: ProjectMedia }) {
	const child = useMemo(() => <Media media={media} />, [media]);
	switch (media.mockup) {
		case undefined:
			return (
				<Atom as="div" width="content">
					{child}
				</Atom>
			);
		case "macbook":
			return <MacbookMockup>{child}</MacbookMockup>;
		default:
			assertNever(media.mockup);
	}
}

function ProjectTags({ tags, date }: { tags: Project["tags"]; date: string }) {
	return (
		<Text variant="caption" muted>
			{dottedConcatString([date, ...tags])}
		</Text>
	);
}

function ProjectLinks({ project }: { project: ProjectId }) {
	const { primary, others } = Projects[project].links;

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
