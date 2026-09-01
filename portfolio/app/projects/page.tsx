import { Flex, Progress, Screen, Typography } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";

export default function Page() {
	return (
		<Screen gap="xl">
			<Flex as="header" direction="col" gap="sm">
				<Typography variant="overline">Selected work</Typography>
				<Typography variant="heading">Projects</Typography>
				<Typography variant="subtitle">
					A collection of my favorite projects that I have worked on over the
					years.
				</Typography>
			</Flex>
			<Suspense
				fallback={
					<Progress value="indeterminate" aria-label="Loading projects" />
				}
			>
				<ProjectsClient />
			</Suspense>
		</Screen>
	);
}
