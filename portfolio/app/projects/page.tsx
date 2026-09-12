import { Flex, Progress } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsView from "@/lib/projects/projects_view";
import { SectionHeader } from "@/lib/shared";

export default function Page() {
	return (
		<>
			{/* Todo integrate in atom: Header's page-padding compensation is a fixed
			    calc, blind to the extra bottom-slot row HeaderBar shows on this route —
			    padding here makes up the difference so the TOC doesn't overlap this text. */}
			<Flex as="header" direction="col" gap="sm" padding={{ y: "xl" }}>
				<SectionHeader
					eyebrow="Selected work"
					title="Worked end to end."
					caption="Source, demo, or write-up — each one links to where it actually lives."
				/>
			</Flex>

			<Suspense
				fallback={
					<Flex
						width="full"
						height="md"
						direction="col"
						hAlign="center"
						vAlign="center"
					>
						<Progress
							value="indeterminate"
							shape="circle"
							aria-label="Loading projects"
						/>
					</Flex>
				}
			>
				<ProjectsView />
			</Suspense>
		</>
	);
}
