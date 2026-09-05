"use client";

import { Badge, Grid, Progress, Stat } from "@manoj-malviya-96/atom";
import {
	AllProjectIds,
	getMeta,
	type ProgrammingLanguage,
	useGithubQuery,
	useGoogleScholarQuery,
} from "@/lib/data";

const LANGUAGE_TAGS = new Set<ProgrammingLanguage>([
	"typescript",
	"python",
	"rust",
	"go",
	"c++",
	"swift",
]);

const LANGUAGE_COUNT = new Set(
	AllProjectIds.flatMap((project) => getMeta(project).tags).filter((tag) =>
		LANGUAGE_TAGS.has(tag as ProgrammingLanguage),
	),
).size;

export default function StatGrid() {
	const { data: github, isLoading: githubLoading } = useGithubQuery();
	const { data: scholar, isLoading: scholarLoading } = useGoogleScholarQuery();

	return (
		// Todo integrate in atom: Stat is a sealed primitive (FixedAtomProps excludes Geometry/Material),
		// so it already renders its own bg="surface" card and can't take radius="lg"/blur overrides here.
		// Left bare (no bg/blur) rather than layering a second "surface" on the container — matching the
		// leaf-carries-the-surface pattern used by Loop/FeaturedWork, minus the blur Stat can't expose.
		<Grid columns={4} gap="md" className="stat-grid">
			<Stat label="Projects shipped" value={AllProjectIds.length} />
			<Stat label="Languages" value={LANGUAGE_COUNT} />
			<Stat
				label="GitHub contributions"
				value={statValue(github?.totalContribution, githubLoading)}
				trend={
					github && (
						<Badge color="green">
							+{github.currentYearContribution} this yr
						</Badge>
					)
				}
			/>
			<Stat
				label="Citations"
				value={statValue(scholar?.citations, scholarLoading)}
				trend={
					scholar && (
						<Badge color="green">+{scholar.recentYearCitations} this yr</Badge>
					)
				}
			/>
		</Grid>
	);
}

function statValue(value: number | undefined, loading: boolean) {
	if (loading) {
		return (
			<Progress shape="circle" value="indeterminate" aria-label="Loading" />
		);
	}
	return value ?? "—";
}
