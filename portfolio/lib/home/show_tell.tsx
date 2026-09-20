"use client";

import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import {
	Patents,
	useGithubQuery,
	useGoogleScholarQuery,
	YearsOfExperience,
} from "@/lib/data";

type NumberStat = {
	value: number | undefined;
	caption: string;
};

export default function ShowAndTell() {
	const github = useGithubQuery().data;
	const scholar = useGoogleScholarQuery().data;

	const stats: readonly NumberStat[] = [
		{ value: github?.totalContribution, caption: "Contributions" },
		{ value: scholar?.citations, caption: "Citations" },
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Grid
			columns={4}
			width="content"
			bg="raised"
			card
			padding={{ y: "md" }}
			radius="md"
			margin={{ x: "auto" }}
		>
			{stats.map((stat) => (
				<Flex key={stat.caption} direction="col" gap="xs" hAlign="center">
					<Text variant="heading" align="center">
						{stat.value === undefined ? "–" : stat.value.toLocaleString()}
					</Text>
					<Text variant="overline" muted align="center">
						{stat.caption}
					</Text>
				</Flex>
			))}
		</Grid>
	);
}
