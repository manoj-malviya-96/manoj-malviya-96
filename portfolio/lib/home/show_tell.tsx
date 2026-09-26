"use client";

import { Flex, Grid, Progress, Text } from "@manoj-malviya-96/atom";
import { Patents, useGoogleScholarQuery, YearsOfExperience } from "@/lib/data";

type NumberStat = {
	value: number | undefined;
	caption: string;
	loading?: boolean;
};

export default function ShowAndTell() {
	const scholar = useGoogleScholarQuery();

	// Citations drop out on fetch error rather than showing "–" forever.
	const stats: readonly NumberStat[] = [
		...(scholar.isError
			? []
			: [
					{
						value: scholar.data?.citations,
						caption: "Citations",
						loading: scholar.isLoading,
					},
				]),
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Grid
			columns={stats.length === 3 ? 3 : 2}
			className="stat-grid"
			width="content"
			bg="raised"
			blur
			card
			padding={{ y: "md" }}
			radius="md"
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
	);
}
