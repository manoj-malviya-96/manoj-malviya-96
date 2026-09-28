"use client";

import { FilterBar, Flex, Text } from "@manoj-malviya-96/atom";
import { useScrollBar } from "@manoj-malviya-96/atom/system";
import { useState } from "react";
import { ExperimentItems, type ProjectTag } from "@/lib/data";
import ExperimentCard from "@/lib/experiments/experiment_card";
import { EmText, Eyebrow, Page, PageHeroHeader } from "@/lib/shared";

const EXPERIMENT_SECTIONS = ExperimentItems.map(({ id, title }) => ({
	id,
	label: title,
}));

const TOP_TAG_COUNT = 10;
const TOP_TAGS = rankTagsByFrequency(ExperimentItems).slice(0, TOP_TAG_COUNT);

function rankTagsByFrequency(
	items: typeof ExperimentItems,
): readonly ProjectTag[] {
	const counts = new Map<ProjectTag, number>();
	for (const item of items) {
		for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()]
		.sort(([, a], [, b]) => b - a)
		.map(([tag]) => tag);
}

export default function ExperimentsPage() {
	useScrollBar({ sections: EXPERIMENT_SECTIONS });
	const [activeTags, setActiveTags] = useState<readonly ProjectTag[]>([]);

	const visibleItems =
		activeTags.length === 0
			? ExperimentItems
			: ExperimentItems.filter((item) =>
					item.tags.some((tag) => activeTags.includes(tag)),
				);

	return (
		<Page>
			<PageHeroHeader>
				<Eyebrow>Experiments</Eyebrow>
				<Text.Heading as="h1">
					Things I've <br /> <EmText>built</EmText>
				</Text.Heading>
			</PageHeroHeader>
			<FilterBar
				mode="multiple"
				aria-label="Filter by tag"
				value={activeTags}
				onChange={setActiveTags}
				options={TOP_TAGS.map((tag) => ({ value: tag, label: tag }))}
			/>
			<Flex as="article" direction="col" gap="lg" width="full">
				{visibleItems.map((item) => (
					<ExperimentCard key={item.id} item={item} />
				))}
			</Flex>
		</Page>
	);
}
