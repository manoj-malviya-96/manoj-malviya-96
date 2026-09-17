import { Atom, Flex, GlowCapture, Progress } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { Suspense } from "react";
import { RankedProjects } from "@/lib/data";
import ProjectCard from "@/lib/projects/project_card";
import Reveal from "@/lib/reveal";

export default function ProjectsPage() {
	return (
		<Page variant="full">
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
				{/* RISK: GlowCapture owns the `as` slot, so <article> is its own wrapper. */}
				<Atom as="article" width="full">
					<GlowCapture
						as={Flex}
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
							<Reveal key={id}>
								<ProjectCard project={id} />
							</Reveal>
						))}
					</GlowCapture>
				</Atom>
			</Suspense>
		</Page>
	);
}
