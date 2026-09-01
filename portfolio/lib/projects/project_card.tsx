import {
	Badge,
	Flex,
	Grid,
	Image,
	List,
	Typography,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import type { ReactNode } from "react";
import type {
	ProjectMedia,
	ProjectMeta,
	ProjectSteps,
} from "@/lib/projects/list/types";
import type { ExternalURL } from "@/lib/types";
import { Link } from "@/lib/ui";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type CaseStudyPath = `/projects/${string}`;

export type ProjectCTA =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL }
	| { kind: "case-study"; label?: string; href: CaseStudyPath };

type ProjectCardProps = ProjectMeta & {
	children?: ReactNode;
	ctas?: readonly ProjectCTA[];
};

export default function ProjectCard({
	title,
	description,
	eyebrow,
	hook,
	tags,
	steps,
	media,
	children,
	ctas,
}: ProjectCardProps) {
	return (
		<Grid
			columns={2}
			gap="lg"
			className="case-grid"
			backgroundColor="raised"
			padding="lg"
			radius="lg"
		>
			<Flex direction="col" gap="sm" vAlign="center">
				{eyebrow && (
					<Typography variant="overline" className="font-mono">
						{eyebrow}
					</Typography>
				)}
				<Typography variant="title">{title}</Typography>
				<Typography variant="body" muted>
					{hook ?? description}
				</Typography>
				{tags.length > 0 && (
					<List direction="row" gap="sm">
						{tags.map((tag) => (
							<li key={tag}>
								<Badge>{tag}</Badge>
							</li>
						))}
					</List>
				)}
				{ctas && (
					<Flex direction="row" gap="md" wrap>
						{ctas.map((cta) => (
							<CTALink cta={cta} key={cta.href} />
						))}
					</Flex>
				)}
			</Flex>
			<Flex direction="col" gap="md">
				<ProjectCover media={media} title={title} />
				{steps ? <CaseSteps steps={steps} /> : children}
			</Flex>
		</Grid>
	);
}

function ProjectCover({
	media,
	title,
}: {
	media?: ProjectMedia | undefined;
	title: string;
}) {
	if (media) {
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
	return (
		<Flex
			direction="col"
			hAlign="center"
			vAlign="center"
			backgroundColor="raised"
			radius="md"
			className="project-cover-placeholder"
		>
			<Typography variant="title" className="font-mono" muted aria-hidden>
				{title.slice(0, 2).toUpperCase()}
			</Typography>
		</Flex>
	);
}

function CaseSteps({ steps }: { steps: ProjectSteps }) {
	return (
		<Grid columns={3} gap="md" className="case-steps">
			<Step label="Problem" body={steps.problem} />
			<Step label="Approach" body={steps.approach} />
			<Step label="Outcome" body={steps.outcome} />
		</Grid>
	);
}

function Step({ label, body }: { label: string; body: string }) {
	return (
		<Flex direction="col" gap="xs">
			<Typography variant="caption" className="font-mono" muted>
				{label}
			</Typography>
			<Typography variant="body">{body}</Typography>
		</Flex>
	);
}

function CTALink({ cta }: { cta: ProjectCTA }) {
	return (
		<Link url={cta.href} openNewTab={cta.kind !== "case-study"} muted>
			{ctaLabel(cta)}
		</Link>
	);
}

function ctaLabel(cta: ProjectCTA): string {
	switch (cta.kind) {
		case "case-study":
			return `${cta.label ?? "Read the case study"} →`;
		case "github":
			return "GitHub ↗";
		case "medium":
			return "Blog ↗";
		case "demo":
			return `${cta.label ?? "Demo"} ↗`;
	}
}
