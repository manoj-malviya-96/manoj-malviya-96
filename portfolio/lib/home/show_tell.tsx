"use client";

import { Flex, Grid, Progress, Text } from "@manoj-malviya-96/atom";
import {
	Patents,
	useGithubContributionsQuery,
	useGoogleScholarQuery,
	YearsOfExperience,
} from "@/lib/data";

type NumberStat = {
	value: number | undefined;
	caption: string;
	loading?: boolean;
	isError?: boolean;
};

export default function ShowAndTell() {
	const scholar = useGoogleScholarQuery();
	const github = useGithubContributionsQuery();

	const stats: readonly [NumberStat, NumberStat, NumberStat, NumberStat] = [
		{
			value: scholar.data?.citations,
			caption: "Citations",
			loading: scholar.isLoading,
			isError: scholar.isError,
		},
		{
			value: github.data,
			caption: "Contributions",
			loading: github.isLoading,
			isError: github.isError,
		},
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Flex direction="col" radius="lg" bg="surface" padding={{ y: "md" }}>
			<Grid
				columns={stats.length}
				className="stat-grid"
				width="content"
				margin={{ x: "auto" }}
			>
				{stats.map((stat) => (
					<Flex key={stat.caption} direction="col" gap="xs" hAlign="center">
						{stat.loading ? (
							<Progress
								shape="circle"
								value="indeterminate"
								aria-label="Loading"
							/>
						) : stat.isError ? (
							<Text.Heading align="center" ink="red">
								N/A
							</Text.Heading>
						) : (
							<Text.Heading align="center">
								{stat.value === undefined ? "–" : stat.value.toLocaleString()}
							</Text.Heading>
						)}
						<Text.Overline ink="muted" align="center">
							{stat.caption}
						</Text.Overline>
					</Flex>
				))}
			</Grid>
		</Flex>
	);
}
