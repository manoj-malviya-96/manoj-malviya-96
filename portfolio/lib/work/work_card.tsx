import { Atom, assertNever, Flex, Text } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import type { ProjectLink, ProjectMedia, WorkItem } from "@/lib/data";
import { dottedConcatString } from "@/lib/helper";
import { MacbookMockup } from "@/lib/macbook_mockup";
import { Link, Media } from "@/lib/shared";

export default function WorkCard({ item }: { item: WorkItem }) {
	return (
		<Flex
			as="section"
			id={item.id}
			direction="col"
			width="full"
			bg="raised"
			radius="md"
			card
			padding={{ x: "none", y: "lg" }}
		>
			<Flex
				direction="col"
				gap="lg"
				hAlign="center"
				margin={{ x: "auto" }}
				width={{ value: "content", max: "full" }}
			>
				<Flex
					direction="col"
					gap="md"
					hAlign="start"
					width={{ value: "lg", max: "full" }}
				>
					<Text.Heading>{item.title}</Text.Heading>
					<Text.Body ink="muted">{item.summary}</Text.Body>
					<WorkLinks item={item} />
				</Flex>
				{item.kind === "project" && item.media && (
					<ProjectMediaComponent media={item.media} />
				)}
				{item.kind === "project" && item.content && item.content}
				<CardTags item={item} />
			</Flex>
		</Flex>
	);
}

function CardTags({ item }: { item: WorkItem }) {
	return (
		<Text.Caption ink="muted">
			{dottedConcatString([item.dates, ...item.tags])}
		</Text.Caption>
	);
}

function WorkLinks({ item }: { item: WorkItem }) {
	if (item.kind === "blog") {
		return (
			<Flex direction="row" gap="md" wrap padding={{ x: "xs" }}>
				<Link.Button
					url={item.href}
					openNewTab
					color="primary"
					label="Read on Medium"
					size="sm"
					icon={<IconMedium size="sm" />}
				/>
			</Flex>
		);
	}

	const { primary, others } = item.links;
	return (
		<Flex direction="row" gap="md" wrap padding={{ x: "xs" }}>
			<ProjectLinkButton link={primary} color="primary" />
			{others.map((link) => (
				<ProjectLinkButton key={link.href} link={link} />
			))}
		</Flex>
	);
}

function ProjectMediaComponent({ media }: { media: ProjectMedia }) {
	switch (media.mockup) {
		case undefined:
			return (
				<Atom as="div" enter="rise" width={{ value: "lg", max: "full" }}>
					<Media media={media} />
				</Atom>
			);
		case "macbook":
			return (
				<MacbookMockup>
					<Media media={media} />
				</MacbookMockup>
			);
		default:
			assertNever(media.mockup);
	}
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
		<Link.Button
			url={link.href}
			openNewTab
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
