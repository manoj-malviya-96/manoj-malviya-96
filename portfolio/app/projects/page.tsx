import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { Flex, Typography } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";
import { Icon } from "@/lib/ui";

function ProjectsLoading() {
	return (
		<section className="screen">
			<Icon icon={faSpinner} size="lg" />
		</section>
	);
}

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
			<Suspense fallback={<ProjectsLoading />}>
				<ProjectsClient />
			</Suspense>
		</Flex>
	);
}
