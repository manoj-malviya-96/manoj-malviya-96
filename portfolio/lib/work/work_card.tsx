import { Atom, assertNever, Flex, Text } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import type { ProjectLink, ProjectMedia, WorkItem } from "@/lib/data";
import { workYear } from "@/lib/data";
import { dottedConcatString } from "@/lib/helper";
import { MacbookMockup } from "@/lib/macbook_mockup";
import Reveal from "@/lib/reveal";
import { Link, Media } from "@/lib/shared";

export default function WorkCard({ item }: { item: WorkItem }) {
	return (
		<Flex
			as="section"
			id={item.id}
			direction="col"
			gap="lg"
			width="full"
			bg="raised"
			radius="md"
			padding="lg"
		>
			<Reveal>
				<Flex
					direction="col"
					gap="md"
					hAlign="start"
					width={{ value: "lg", max: "full" }}
				>
					<CardHeading item={item} />
					<Text variant="subtitle" muted>
						{item.summary}
					</Text>
					<WorkLinks item={item} />
				</Flex>
			</Reveal>
			{item.kind === "project" && item.media && (
				<Reveal delay={140}>
					<ProjectMediaComponent media={item.media} />
				</Reveal>
			)}
			{item.kind === "project" && item.content && (
				<Reveal delay={220}>{item.content}</Reveal>
			)}
			<Reveal delay={300}>
				<CardTags item={item} />
			</Reveal>
		</Flex>
	);
}

function CardHeading({ item }: { item: WorkItem }) {
	return (
		<Flex direction="row" gap="md" vAlign="center" wrap>
			<Text variant="caption" mono muted>
				{workYear(item)}
			</Text>
			<Text variant="hero">{item.title}</Text>
			{item.kind === "project" && item.heroStat && (
				<Text variant="caption" mono muted>
					{item.heroStat.value} · {item.heroStat.label}
				</Text>
			)}
		</Flex>
	);
}

function CardTags({ item }: { item: WorkItem }) {
	return (
		<Text variant="caption" muted>
			{dottedConcatString([...item.tags])}
		</Text>
	);
}

function WorkLinks({ item }: { item: WorkItem }) {
	if (item.kind === "blog") {
		return (
			<Flex direction="row" gap="md" wrap padding={{ x: "xs" }}>
				<Link
					url={item.href}
					openNewTab
					variant="button"
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
				<Atom as="div" width={{ value: "lg", max: "full" }}>
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
