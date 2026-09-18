"use client";

import { Badge, Flex } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { useMemo, useState } from "react";
import { type ProjectTag, WorkItems, WorkTags } from "@/lib/data";
import Reveal from "@/lib/reveal";
import { Eyebrow } from "@/lib/shared";
import WorkRow from "@/lib/work/work_row";

export default function WorkPage() {
	const [activeTag, setActiveTag] = useState<ProjectTag | null>(null);

	const items = useMemo(
		() =>
			activeTag
				? WorkItems.filter((item) => item.tags.includes(activeTag))
				: WorkItems,
		[activeTag],
	);

	return (
		<Page variant="full">
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
				<Flex direction="col" gap="md">
					<Eyebrow>Selected work</Eyebrow>
					<TagFilter active={activeTag} onChange={setActiveTag} />
				</Flex>
				<Flex direction="col" gap="lg" width="full">
					{items.map((item, index) => (
						<Reveal key={item.id} delay={index * 60}>
							<WorkRow item={item} defaultOpen={index === 0} />
						</Reveal>
					))}
				</Flex>
			</Flex>
		</Page>
	);
}

function TagFilter({
	active,
	onChange,
}: {
	active: ProjectTag | null;
	onChange: (tag: ProjectTag | null) => void;
}) {
	return (
		<Flex
			as="nav"
			aria-label="Filter work by tag"
			direction="row"
			gap="sm"
			wrap
		>
			{WorkTags.map((tag) => (
				<Badge
					key={tag}
					as="button"
					type="button"
					color={tag === active ? "indigo" : "surface"}
					onClick={() => onChange(tag === active ? null : tag)}
				>
					{tag}
				</Badge>
			))}
		</Flex>
	);
}
