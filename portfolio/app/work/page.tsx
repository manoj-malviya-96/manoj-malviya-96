"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { useScrollBar } from "@manoj-malviya-96/atom/system";
import { WorkItems } from "@/lib/data";
import { Page, PageHero } from "@/lib/shared";
import WorkCard from "@/lib/work/work_card";

const WORK_SECTIONS = WorkItems.map(({ id, title }) => ({
	id,
	label: title,
}));

export default function WorkPage() {
	useScrollBar({ sections: WORK_SECTIONS });

	return (
		<Page>
			<PageHero eyebrow="Work" title="Things I've built." />
			<Flex as="article" direction="col" gap="xl" width="full">
				{WorkItems.map((item) => (
					<WorkCard key={item.id} item={item} />
				))}
			</Flex>
		</Page>
	);
}
