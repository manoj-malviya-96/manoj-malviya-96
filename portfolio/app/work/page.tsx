"use client";

import { FilterBar, Flex, Text } from "@manoj-malviya-96/atom";
import { useScrollBar } from "@manoj-malviya-96/atom/system";
import { useState } from "react";
import { type ProjectTag, WorkItems } from "@/lib/data";
import { EmText, Eyebrow, Page, PageHeroHeader } from "@/lib/shared";
import WorkCard from "@/lib/work/work_card";

const WORK_SECTIONS = WorkItems.map(({ id, title }) => ({
	id,
	label: title,
}));

const TOP_TAG_COUNT = 10;
const TOP_TAGS = rankTagsByFrequency(WorkItems).slice(0, TOP_TAG_COUNT);

function rankTagsByFrequency(items: typeof WorkItems): readonly ProjectTag[] {
	const counts = new Map<ProjectTag, number>();
	for (const item of items) {
		for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()]
		.sort(([, a], [, b]) => b - a)
		.map(([tag]) => tag);
}

export default function WorkPage() {
	useScrollBar({ sections: WORK_SECTIONS });
	const [activeTags, setActiveTags] = useState<readonly ProjectTag[]>([]);

	const visibleItems =
		activeTags.length === 0
			? WorkItems
			: WorkItems.filter((item) =>
					item.tags.some((tag) => activeTags.includes(tag)),
				);

	return (
		<Page>
			<PageHeroHeader>
				<Eyebrow>Work</Eyebrow>
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
					<WorkCard key={item.id} item={item} />
				))}
			</Flex>
		</Page>
	);
}
