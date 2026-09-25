"use client";

import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { Patents, useGoogleScholarQuery, YearsOfExperience } from "@/lib/data";

type NumberStat = {
	value: number | undefined;
	caption: string;
};

export default function ShowAndTell() {
	const scholar = useGoogleScholarQuery();

	// Citations drop out on fetch error rather than showing "–" forever.
	const stats: readonly NumberStat[] = [
		...(scholar.isError
			? []
			: [{ value: scholar.data?.citations, caption: "Citations" }]),
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Grid
			columns={stats.length === 3 ? 3 : 2}
			width="content"
			bg="raised"
			card
			padding={{ y: "md" }}
			radius="md"
			margin={{ x: "auto" }}
		>
			{stats.map((stat) => (
				<Flex key={stat.caption} direction="col" gap="xs" hAlign="center">
					<Text.Heading align="center">
						{stat.value === undefined ? "–" : stat.value.toLocaleString()}
					</Text.Heading>
					<Text.Overline ink="muted" align="center">
						{stat.caption}
					</Text.Overline>
				</Flex>
			))}
		</Grid>
	);
}
