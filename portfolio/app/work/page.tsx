"use client";

import { Flex, Grid } from "@manoj-malviya-96/atom";
import { WorkItems } from "@/lib/data";
import { Eyebrow, Link } from "@/lib/shared";
import WorkCard from "@/lib/work/work_card";

export default function WorkPage() {
	return (
		<Flex direction="col" width="content">
			<WorkToc />
			<Flex as="article" direction="col" gap="xs" width="full">
				<Eyebrow>Selected work</Eyebrow>
				<Flex direction="col" gap="xl" width="full">
					{WorkItems.map((item) => (
						<WorkCard key={item.id} item={item} />
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}

function WorkToc() {
	return (
		<Flex direction="col" gap="xs">
			<Eyebrow>Table of Contents</Eyebrow>
			<Grid
				as="nav"
				aria-label="Work sections"
				gap="sm"
				columns={3}
				bg="surface"
				padding="md"
				radius="md"
			>
				{WorkItems.map(({ id, title }) => (
					<Link key={id} url={`/work/#${id}`} variant="inline">
						{title}
					</Link>
				))}
			</Grid>
		</Flex>
	);
}
