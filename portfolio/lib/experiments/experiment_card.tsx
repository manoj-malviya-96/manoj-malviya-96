import {
	Atom,
	assertNever,
	Badge,
	Flex,
	Grid,
	Text,
} from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import type { ProjectLink, WorkItem } from "@/lib/data";
import { formatDates, isProjectInProgress } from "@/lib/data/projects";
import { Macbook } from "@/lib/macbook_mockup";
import { Link, Media } from "@/lib/shared";
import type { MediaSource } from "@/lib/types";

export default function WorkCard({ item }: { item: WorkItem }) {
	return (
		<Flex
			as="section"
			id={item.id}
			direction="col"
			width="full"
			bg="surface"
			radius="md"
			overflow="clip"
			gap="lg"
			padding="lg"
		>
			<Flex direction="col" gap="sm" hAlign="start">
				<Flex direction="row" gap="sm" vAlign="center" wrap>
					<Text.Title>{item.title}</Text.Title>
					{item.kind === "project" ? (
						<Text.Caption ink="muted">
							{formatDates(item.startsAt, item.endsAt)}
						</Text.Caption>
					) : (
						<Text.Caption ink="muted">{item.dates}</Text.Caption>
					)}
					{item.kind === "project" && item.isNew && (
						<Badge ink="green">New</Badge>
					)}
					{item.kind === "project" && isProjectInProgress(item) && (
						<Badge ink="orange">In progress</Badge>
					)}
				</Flex>
				<CardTags item={item} />
			</Flex>

			<Flex direction="row" gap="md" hAlign="start" stack>
				<Flex as="span" vAlign="start" gap="lg" direction="col">
					<Text.Body>{item.summary}</Text.Body>
					<WorkLinks item={item} />
				</Flex>
				{item.kind === "project" && item.media && item.media.length > 0 && (
					<ProjectMedia media={item.media} />
				)}
			</Flex>
		</Flex>
	);
}

function ProjectMedia({ media }: { media: readonly MediaSource[] }) {
	if (media.length > 1) {
		return (
			<Grid
				columns={2}
				gap="sm"
				width="full"
				enter="rise"
				// No Atom token for a half-row share; basis is ignored once the row stacks.
				style={{ flex: "0 0 50%" }}
			>
				{media.map((item, i) => (
					<Media key={i} media={item} layout="natural" />
				))}
			</Grid>
		);
	}
	return (
		<Flex direction="row" hAlign="center" width="full">
			<MediaMockup media={media[0]} />
		</Flex>
	);
}

function MediaMockup({ media }: { media: MediaSource }) {
	switch (media.mockup) {
		case undefined:
			return (
				<Atom as="div" enter="rise" width={{ value: "lg", max: "full" }}>
					<Media media={media} />
				</Atom>
			);
		case "macbook":
			return (
				<Macbook>
					<Media media={media} layout="fill" />
				</Macbook>
			);
		default:
			return assertNever(media.mockup);
	}
}

function CardTags({ item }: { item: WorkItem }) {
	return (
		<Flex
			as="ul"
			direction="row"
			gap="xs"
			wrap
			style={{ listStyle: "none", paddingInlineStart: 0, margin: 0 }}
		>
			{item.tags.map((tag) => (
				<Badge as="li" key={tag}>
					{tag}
				</Badge>
			))}
		</Flex>
	);
}

function WorkLinks({ item }: { item: WorkItem }) {
	if (item.kind === "blog") {
		return (
			<Flex direction="row" gap="sm" wrap>
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
		<Flex direction="row" gap="sm" wrap>
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
		<Link.Button
			url={link.href}
			openNewTab
			{...(color && { color })}
			label={linkLabel(link)}
			size="sm"
			//@ts-expect-error - IDK why ts compiler cant find it.
			collapseOnMobile={false}
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
