"use client";

import { Badge, Grid, Stat, Text } from "@manoj-malviya-96/atom";
import { useGithubQuery, useGoogleScholarQuery } from "@/lib/data";

export default function ShowAndTellGrid() {
	const githubQuery = useGithubQuery();
	const scholarQuery = useGoogleScholarQuery();

	return (
		<Grid columns={3} gap="md">
			<Stat
				label="GitHub"
				value={wrap(4, githubQuery.data?.totalContribution)}
				trend={
					<Badge color="green">
						+{wrap(4, githubQuery.data?.currentYearContribution)}
					</Badge>
				}
				footer={
					<Text variant="caption">
						Contributions in last 4 years with daily average{" "}
						<Badge color="red">
							{wrap(1, githubQuery.data?.dailyAverage)}{" "}
						</Badge>{" "}
						and longest streak of{" "}
						<Badge color="blue">
							{wrap(2, githubQuery.data?.longestStreak)}
						</Badge>
					</Text>
				}
			/>
			<Stat
				label="Citations"
				value={wrap(3, scholarQuery.data?.citations)}
				trend={
					<Badge color="green">
						+{wrap(3, scholarQuery.data?.recentYearCitations)}
					</Badge>
				}
				footer={
					<Text variant="caption">
						I have published
						<Badge color="indigo">
							{wrap(2, scholarQuery.data?.publications)}{" "}
						</Badge>{" "}
						academic papers and gained a hIndex of
						<Badge color="blue">{wrap(1, scholarQuery.data?.hIndex)}</Badge>
					</Text>
				}
			/>
		</Grid>
	);
}

function wrap(expectedDigits: number, value?: number) {
	return value || "-".repeat(expectedDigits);
}
