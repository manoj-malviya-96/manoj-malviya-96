"use client";

import { Flex, Grid, Progress, Text } from "@manoj-malviya-96/atom";
import { useDynamicIsland } from "@manoj-malviya-96/atom/system";
import { useEffect } from "react";
import { Patents, useGoogleScholarQuery, YearsOfExperience } from "@/lib/data";

type NumberStat = {
	value: number | undefined;
	caption: string;
	loading?: boolean;
};

export default function ShowAndTell() {
	const scholar = useGoogleScholarQuery();
	const { push } = useDynamicIsland();

	useEffect(() => {
		if (!scholar.isError) return;
		push({
			kind: "toast",
			message: "Couldn't load Google Scholar citations.",
			variant: "error",
		});
	}, [scholar.isError, push]);

	const stats: readonly NumberStat[] = [
		{
			value: scholar.data?.citations,
			caption: "Citations",
			loading: scholar.isLoading,
		},
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Flex direction="col" radius="lg" bg="surface" padding={{ y: "md" }}>
			<Grid
				columns={stats.length === 3 ? 3 : 2}
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
