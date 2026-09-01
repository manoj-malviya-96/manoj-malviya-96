import { Flex, Progress, Screen, Typography } from "@manoj-malviya-96/atom";
import { Suspense } from "react";
import ProjectsClient from "@/lib/projects/projects_client";

export default function Page() {
	return (
		<Screen gap="xl">
			<Flex as="header" direction="col" gap="sm">
				<Typography variant="overline" className="font-mono">
					Selected work
				</Typography>
				<Typography variant="heading">Worked end to end.</Typography>
				<Typography variant="subtitle">
					A case study where I have one written up — a GitHub link where I
					don&apos;t.
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
