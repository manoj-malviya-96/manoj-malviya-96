import {
	assertNever,
	Badge,
	Flex,
	Grid,
	Image,
	List,
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
	getBody,
	getLinks,
	getMedia,
	getMeta,
	type ProjectId,
	type ProjectLink,
	type ProjectMedia,
	type ProjectMeta,
} from "@/lib/data";
import { Link } from "@/lib/ui";

export default function ProjectCard({ project }: { project: ProjectId }) {
	const { title, hook, tags } = getMeta(project);
	const body = getBody(project);

	return (
		<Grid
			columns={2}
			gap="lg"
			className="case-grid"
			bg="surface"
			padding="lg"
			radius="lg"
		>
			<Flex direction="col" gap="md" vAlign="center">
				<ProjectCover media={getMedia(project)} />
				<ProjectLinks project={project} />
			</Flex>
			<Flex direction="col" gap="md">
				<Flex as="span" direction="col" gap="xs">
					<Text variant="title">{title}</Text>
					<Text variant="body" muted>
						{hook}
					</Text>
					<ProjectTags tags={tags} />
				</Flex>
				<Step label="Why" body={body.why} />
				<Step label="How" body={body.how} />
				<Step label="What" body={body.what} />
			</Flex>
		</Grid>
	);
}

function ProjectTags({ tags }: { tags: ProjectMeta["tags"] }) {
	return (
		<List direction="row" gap="sm">
			{tags.map((tag) => (
				<Badge as="li" key={tag} color="blue">
					{tag}
				</Badge>
			))}
		</List>
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

function Step({ label, body }: { label: string; body: string }) {
	return (
		<Flex direction="col" gap="xs">
			<Text variant="overline" muted>
				{label}
			</Text>
			<Text variant="body">{body}</Text>
		</Flex>
	);
}

function ProjectLinks({ project }: { project: ProjectId }) {
	const links = getLinks(project);

	return (
		<Flex direction="row" gap="md" wrap padding={{x: "xs"}}>
			{links.map((link) => {
				const LinkIcon = linkIcon(link);
				const label = linkLabel(link);
				return (
					<Link
						key={link.href}
						url={link.href}
						openNewTab
						variant="button"
						buttonVariant="plain"
						label={label}
						size="sm"
						icon={<LinkIcon size="sm" />}
					/>
				);
			})}
		</Flex>
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
