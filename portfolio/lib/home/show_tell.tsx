"use client";

import { Badge, Grid, Stat, Text } from "@manoj-malviya-96/atom";
import { useGithubQuery, useGoogleScholarQuery } from "@/lib/data";

export default function ShowAndTellGrid() {
	const githubQuery = useGithubQuery();
	const scholarQuery = useGoogleScholarQuery();

	const github = githubQuery.data;
	const scholar = scholarQuery.data;

	if (!github && !scholar) {
		return null;
	}

	return (
		<Grid columns={3} gap="md">
			{github && (
				<Stat
					label="GitHub"
					value={github.totalContribution}
					trend={<Badge color="green">+{github.currentYearContribution}</Badge>}
					footer={
						<Text variant="caption">
							Contributions in last 4 years with daily average{" "}
							<Badge color="red">{github.dailyAverage}</Badge> and longest
							streak of <Badge color="blue">{github.longestStreak}</Badge>
						</Text>
					}
				/>
			)}
			{scholar && (
				<Stat
					label="Citations"
					value={scholar.citations}
					trend={<Badge color="green">+{scholar.recentYearCitations}</Badge>}
					footer={
						<Text variant="caption">
							I have published{" "}
							<Badge color="indigo">{scholar.publications}</Badge> academic
							papers and gained a hIndex of{" "}
							<Badge color="blue">{scholar.hIndex}</Badge>
						</Text>
					}
				/>
			)}
		</Grid>
	);
}
