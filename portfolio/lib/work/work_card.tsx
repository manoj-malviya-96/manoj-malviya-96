import { Atom, assertNever, Badge, Flex, Text } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconLink,
	IconMedium,
	IconPlay,
} from "@manoj-malviya-96/atom/icons";
import {
	formatDates,
	getAttributes,
	type ProjectLink,
	type WorkItem,
} from "@/lib/data";
import { Iphone } from "@/lib/iphone_mockup";
import { Macbook } from "@/lib/macbook_mockup";
import { Link, Media } from "@/lib/shared";
import type { MediaSource } from "@/lib/types";

export default function WorkCard({ item }: { item: WorkItem }) {
	const attributes = getAttributes(item);
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
				<Flex direction="row" gap="sm" vAlign="center">
					<Text.Title>{item.title}</Text.Title>
					<Text.Caption ink="muted">{formatDates(item)}</Text.Caption>
					{attributes.includes("new") && <Badge ink="green">New</Badge>}
					{attributes.includes("in_progress") && (
						<Badge ink="orange">In progress</Badge>
					)}
				</Flex>
				<CardTags item={item} />
			</Flex>

			<Flex as="span" vAlign="start" gap="sm" direction="col">
				<Text.Body>{item.summary}</Text.Body>
				<WorkLinks item={item} />
			</Flex>
			{item.kind === "project" && item.media && item.media.length > 0 && (
				<ProjectMedia media={item.media} />
			)}
		</Flex>
	);
}

function ProjectMedia({ media }: { media: readonly MediaSource[] }) {
	return (
		<Flex direction="row" hAlign="center" gap="md" width="full">
			{media.map((item, i) => (
				<MediaMockup media={item} key={i} />
			))}
		</Flex>
	);
}

function MediaMockup({ media }: { media: MediaSource }) {
	if (media.kind === "code") {
		return (
			<Atom as="div" enter="rise" width="full">
				<Media {...media} />
			</Atom>
		);
	}
	switch (media.mockup) {
		case undefined:
			return (
				<Atom as="div" enter="rise" width={{ value: "lg", max: "full" }}>
					<Media {...media} />
				</Atom>
			);
		case "macbook":
			return (
				<Macbook>
					<Media {...media} />
				</Macbook>
			);
		case "iphone":
			return (
				<Iphone>
					<Media {...media} />
				</Iphone>
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
	switch (item.kind) {
		case "blog":
			return (
				<Flex direction="row" gap="sm">
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
		case "project": {
			const { primary, others } = item.links;
			return (
				<Flex direction="row" gap="sm">
					<ProjectLinkButton link={primary} color="primary" />
					{others.map((link) => (
						<ProjectLinkButton key={link.href} link={link} />
					))}
				</Flex>
			);
		}
		default:
			return assertNever(item);
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
