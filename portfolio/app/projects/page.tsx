import { Flex, Progress, Text } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";

export default function Page() {
	return (
		<>
			<Flex as="header" direction="col" gap="sm">
				<Text variant="overline" className="font-mono">
					Selected work
				</Text>
				<Text variant="heading">Worked end to end.</Text>
				<Text variant="subtitle">
					Source, demo, or write-up — each one links to where it actually lives.
				</Text>
			</Flex>
			<Suspense
				fallback={
					<Progress value="indeterminate" aria-label="Loading projects" />
				}
			>
				<ProjectsClient />
			</Suspense>
		</>
	);
}
