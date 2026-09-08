import { Flex, Progress } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";
import { SectionHeader } from "@/lib/shared";

export default function Page() {
	return (
		<>
			<Flex as="header" direction="col" gap="sm">
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
				<ProjectsClient />
			</Suspense>
		</>
	);
}
