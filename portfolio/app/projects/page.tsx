import { Flex, Progress } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { Suspense } from "react";
import { RankedProjects } from "@/lib/data";
import MeshCanvas from "@/lib/mesh_canvas";
import ProjectCard from "@/lib/projects/project_card";

export default function ProjectsPage() {
	return (
		<Page variant="full">
			<MeshCanvas />
			{/* Todo integrate in atom: Header's page-padding compensation is a fixed
			    calc, blind to the extra bottom-slot row HeaderBar shows on this route —
			    padding here makes up the difference so the TOC doesn't overlap this text. */}

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
				<Flex
					as={"article"}
					direction="col"
					gap="xl"
					hAlign="center"
					margin={{
						top: "xl",
					}}
					width="full"
					vAlign="center"
				>
					{/* TODO use DynamicList when its ready */}
					{RankedProjects.map(({ id }) => (
						<ProjectCard key={id} project={id} />
					))}
				</Flex>
			</Suspense>
		</Page>
	);
}
