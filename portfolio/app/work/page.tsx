"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { WorkItems } from "@/lib/data";
import { Eyebrow } from "@/lib/shared";
import WorkCard from "@/lib/work/work_card";

export default function WorkPage() {
	return (
		<Page variant="content">
			{/* Todo integrate in atom: Header's page-padding compensation is a fixed
			    calc, blind to the extra bottom-slot row HeaderBar shows on this route —
			    padding here makes up the difference so the TOC doesn't overlap this text. */}
			<Flex
				as="article"
				direction="col"
				gap="xl"
				width="full"
				margin={{ top: "xl" }}
			>
				<Eyebrow>Selected work</Eyebrow>
				<Flex direction="col" gap="xl" width="full">
					{WorkItems.map((item, index) => (
						<WorkCard
							key={item.id}
							item={item}
							divider={index < WorkItems.length - 1}
						/>
					))}
				</Flex>
			</Flex>
		</Page>
	);
}
