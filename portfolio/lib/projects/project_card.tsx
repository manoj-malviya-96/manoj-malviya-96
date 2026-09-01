import { Badge, Flex, Grid, List, Typography } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";
import type { ProjectMeta, ProjectSteps } from "@/lib/projects/list/types";
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
	children,
	ctas,
}: ProjectCardProps) {
	return (
		<Grid columns={2} gap="lg" className="case-grid">
			<Flex direction="col" gap="sm">
				{eyebrow && (
					<Typography variant="overline" className="font-mono">
						{eyebrow}
					</Typography>
				)}
				<Typography variant="title">{title}</Typography>
				<Typography variant="body" muted style={{ fontStyle: "italic" }}>
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
			{steps ? <CaseSteps steps={steps} /> : children}
		</Grid>
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
