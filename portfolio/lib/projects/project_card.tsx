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
import NextImage from "next/image";
import {
	getBody,
	getLinks,
	getMedia,
	getMeta,
	type ProjectBody,
	type ProjectId,
	type ProjectLink,
	type ProjectMedia,
} from "@/lib/data";
import { Link } from "@/lib/ui";

export default function ProjectCard({ project }: { project: ProjectId }) {
	const { title, hook, tags } = getMeta(project);

	return (
		<Grid
			columns={2}
			gap="lg"
			className="case-grid"
			bg="surface"
			padding="lg"
			radius="lg"
		>
			<Flex direction="col" gap="sm" vAlign="center">
				<ProjectCover media={getMedia(project)} />
				<Text variant="title">{title}</Text>
				<Text variant="body" muted>
					{hook}
				</Text>
			</Flex>
			<Flex direction="col" gap="md">
				<ProjectBodyView body={getBody(project)} />
				<ProjectTags tags={tags} />
				<ProjectLinks project={project} />
			</Flex>
		</Grid>
	);
}

export function ProjectTags({ tags }: { tags: readonly string[] }) {
	return (
		<List direction="row" gap="sm">
			{tags.map((tag) => (
				<li key={tag}>
					<Badge color="blue">{tag}</Badge>
				</li>
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
	return (
		<Image
			// next/image needs an intrinsic size, which only an imported image
			// carries; passing width/height for a remote URL is not an option
			// here because Atom already claims those props for its size scale.
			// So remote covers go through a plain <img> instead.
			{...(typeof media.src === "string" ? {} : { as: NextImage })}
			src={media.src}
			alt={media.alt}
			fit="cover"
			ratio="video"
			radius="md"
		/>
	);
}

function ProjectBodyView({ body }: { body: ProjectBody }) {
	switch (body.kind) {
		case "steps":
			return (
				<Grid columns={3} gap="md" className="case-steps">
					<Step label="Problem" body={body.problem} />
					<Step label="Approach" body={body.approach} />
					<Step label="Outcome" body={body.outcome} />
				</Grid>
			);
		case "narrative":
			return (
				<Flex direction="col" gap="sm">
					{body.paragraphs.map((paragraph, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are a fixed, order-authored list — index is stable.
						<Text key={index} variant="body">
							{paragraph}
						</Text>
					))}
				</Flex>
			);
		default:
			return assertNever(body);
	}
}

function Step({ label, body }: { label: string; body: string }) {
	return (
		<Flex direction="col" gap="xs">
			<Text variant="caption" className="font-mono" muted>
				{label}
			</Text>
			<Text variant="body">{body}</Text>
		</Flex>
	);
}

function ProjectLinks({ project }: { project: ProjectId }) {
	return (
		<Flex direction="row" gap="md" wrap>
			{getLinks(project).map((link) => (
				<Link
					key={link.href}
					url={link.href}
					openNewTab
					// Todo integrate in atom: Button (which Link variant="button" renders through)
					// dropped `muted` — plain variant has no color prop and no de-emphasis equivalent.
					style={{ color: "var(--color-muted)" }}
					variant="button"
					buttonVariant="plain"
					label={linkLabel(link)}
				/>
			))}
		</Flex>
	);
}

function linkLabel(link: ProjectLink): string {
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
