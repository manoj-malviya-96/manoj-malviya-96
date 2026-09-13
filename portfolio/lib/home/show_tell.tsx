"use client";

import { Badge, Flex, Grid, Stat, Text } from "@manoj-malviya-96/atom";
import { IconPalette } from "@manoj-malviya-96/atom/icons";
import { Projects, useGithubQuery, useGoogleScholarQuery } from "@/lib/data";
import { Media } from "@/lib/shared";

type ProductItem = {
	id: "muviz" | "atom";
	metric: string;
};

const PRODUCTS: readonly ProductItem[] = [
	{ id: "muviz", metric: "C++ DSP → WASM → Three.js" },
	{ id: "atom", metric: "20 KB gzipped · Type-safe tokens" },
];

export default function ShowAndTell() {
	const githubQuery = useGithubQuery();
	const scholarQuery = useGoogleScholarQuery();

	const github = githubQuery.data;
	const scholar = scholarQuery.data;

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
			<Stat
				label="Patents"
				value={2}
				trend={<Badge color="orange">Filed</Badge>}
				footer={
					<Text variant="caption">
						Patent-pending methods in surgical robotics and CAD topology
						optimization
					</Text>
				}
			/>
			{PRODUCTS.map((product) => (
				<ProductCard key={product.id} {...product} />
			))}
		</Grid>
	);
}

function ProductCard({ id, metric }: ProductItem) {
	const { title, summary, media } = Projects[id];

	return (
		<Flex
			direction="row"
			gap="lg"
			padding="lg"
			radius="lg"
			bg="surface"
			blur
			vAlign="center"
			wrap
			colSpan="3"
		>
			<Flex
				direction="col"
				hAlign="center"
				vAlign="center"
				radius="lg"
				width="sm"
				height="sm"
				bg="brand"
			>
				{media ? <Media media={media} /> : <IconPalette size="lg" />}
			</Flex>
			<Flex direction="col" gap="sm" hAlign="start" grow>
				<Flex direction="row" gap="sm" vAlign="center" wrap>
					<Text variant="title">{title}</Text>
					<Badge color="indigo">Product Owner</Badge>
				</Flex>
				<Text variant="body" muted>
					{summary}
				</Text>
				<Badge color="green">{metric}</Badge>
			</Flex>
		</Flex>
	);
}
