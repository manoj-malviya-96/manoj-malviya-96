import { Flex, Progress, Typography } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";

export default function Page() {
	return (
		<Flex
			as="main"
			direction="col"
			gap="lg"
			className="screen gap-responsive-lg"
		>
			<Flex direction="col" gap="xs">
				<Typography variant="heading">Projects</Typography>
				<Typography variant="body">
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
		</Flex>
	);
}
