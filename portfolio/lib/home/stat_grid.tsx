"use client";

import { Badge, Grid, Stat } from "@manoj-malviya-96/atom";
import { useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import type { ProgrammingLanguage } from "@/lib/about_me/types";
import { ALL_PROJECTS } from "@/lib/projects/list";

const LANGUAGE_TAGS = new Set<ProgrammingLanguage>([
	"typescript",
	"python",
	"rust",
	"go",
	"c++",
	"swift",
]);

const LANGUAGE_COUNT = new Set(
	ALL_PROJECTS.flatMap((project) => project.metadata.tags).filter((tag) =>
		LANGUAGE_TAGS.has(tag as ProgrammingLanguage),
	),
).size;

const MISSING_VALUE = "—";

export default function StatGrid() {
	const { data: github } = useGithubQuery();
	const { data: scholar } = useGoogleScholarQuery();

	return (
		<Grid columns={4} gap="md" className="stat-grid">
			<Stat label="Projects shipped" value={ALL_PROJECTS.length} />
			<Stat label="Languages" value={LANGUAGE_COUNT} />
			<Stat
				label="GitHub contributions"
				value={github?.totalContribution ?? MISSING_VALUE}
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
				value={scholar?.citations ?? MISSING_VALUE}
				trend={
					scholar && (
						<Badge color="green">+{scholar.recentYearCitations} this yr</Badge>
					)
				}
			/>
		</Grid>
	);
}
