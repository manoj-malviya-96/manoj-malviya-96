"use client";

import { Badge, Grid, Stat } from "@manoj-malviya-96/atom";
import { IconArrowUp } from "@manoj-malviya-96/atom/icons";
import { useGithubQuery, useGoogleScholarQuery } from "@/lib/data";

export default function ShowAndTellGrid() {
	const githubQuery = useGithubQuery();
	const scholarQuery = useGoogleScholarQuery();

	return (
		<Grid columns={4} gap="md">
			<Stat
				label="GitHub"
				value={statValue(4, githubQuery.data?.totalContribution)}
				trend={
					<Badge color="green">
						<IconArrowUp size="sm" />+
						{statValue(4, githubQuery.data?.currentYearContribution)} this year
					</Badge>
				}
			/>
			<Stat
				label="Citations"
				value={statValue(3, scholarQuery.data?.citations)}
				trend={
					<Badge color="green">
						<IconArrowUp size="sm" />+
						{statValue(3, scholarQuery.data?.recentYearCitations)} this yr
					</Badge>
				}
			/>
		</Grid>
	);
}

function statValue(expectedDigits: number, value?: number) {
	return value || "-".repeat(expectedDigits);
}
