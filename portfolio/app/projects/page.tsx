import { Flex, Progress, Screen, Text } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";
import { Eyebrow } from "@/lib/ui";

export default function Page() {
	return (
		<Screen as="main" variant="page">
			<Flex as="header" direction="col" gap="sm">
				<Eyebrow>Selected work</Eyebrow>
				<Text variant="heading">Worked end to end.</Text>
				<Text variant="subtitle">
					Source, demo, or write-up — each one links to where it actually lives.
				</Text>
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
		</Screen>
	);
}
