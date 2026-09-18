import { Atom, assertNever, Disclosure, Flex, Text } from "@manoj-malviya-96/atom";
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
import { Link, Media } from "@/lib/shared";

export default function WorkRow({
	item,
	defaultOpen,
}: {
	item: WorkItem;
	defaultOpen?: boolean;
}) {
	return (
		<Disclosure
			// RISK: `name` groups every row into one native exclusive accordion —
			// opening one closes the rest without any React state.
			name="work"
			id={item.id}
			{...(defaultOpen !== undefined && { defaultOpen })}
			summary={<RowSummary item={item} />}
		>
			<RowContent item={item} />
		</Disclosure>
	);
}

function RowSummary({ item }: { item: WorkItem }) {
	const { title, summary, tags } = item;

	return (
		<Flex direction="col" gap="xs" width="full">
			<Flex direction="row" gap="md" vAlign="center" wrap>
				<Text variant="caption" mono muted>
					{workYear(item)}
				</Text>
				<Text variant="title">{title}</Text>
				{item.kind === "project" && item.heroStat && (
					<Text variant="caption" mono muted>
						{item.heroStat.value} · {item.heroStat.label}
					</Text>
				)}
			</Flex>
			<Text variant="body" muted>
				{summary}
			</Text>
			<Text variant="caption" mono muted>
				{dottedConcatString([...tags])}
			</Text>
		</Flex>
	);
}

function RowContent({ item }: { item: WorkItem }) {
	if (item.kind === "blog") {
		return (
			<Flex direction="col" gap="md" padding={{ top: "md" }}>
				<Link
					url={item.href}
					openNewTab
					variant="button"
					label="Read on Medium"
					size="sm"
					icon={<IconMedium size="sm" />}
				/>
			</Flex>
		);
	}

	const { media, content, links } = item;
	return (
		<Flex direction="col" gap="lg" padding={{ top: "md" }}>
			<ProjectLinks links={links} />
			{media && <ProjectMediaComponent media={media} />}
			{content}
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

function ProjectLinks({
	links,
}: {
	links: { primary: ProjectLink; others: readonly ProjectLink[] };
}) {
	return (
		<Flex direction="row" gap="md" wrap>
			<ProjectLinkButton link={links.primary} color="primary" />
			{links.others.map((link) => (
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
