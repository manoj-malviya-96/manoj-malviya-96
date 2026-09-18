"use client";

import { Flex, Text } from "@manoj-malviya-96/atom";
import {
	Patents,
	useGithubQuery,
	useGoogleScholarQuery,
	YearsOfExperience,
} from "@/lib/data";

type NumberStat = {
	value: number;
	caption: string;
};

export default function ShowAndTell() {
	const github = useGithubQuery().data;
	const scholar = useGoogleScholarQuery().data;

	const stats: readonly NumberStat[] = [
		...(github
			? [{ value: github.totalContribution, caption: "Contributions" }]
			: []),
		...(scholar ? [{ value: scholar.citations, caption: "Citations" }] : []),
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Flex direction="row" gap="lg" wrap>
			{stats.map((stat) => (
				<Flex key={stat.caption} direction="col" gap="xs">
					<Text variant="title">{stat.value.toLocaleString()}</Text>
					<Text variant="overline" mono muted>
						{stat.caption}
					</Text>
				</Flex>
			))}
		</Flex>
	);
}
