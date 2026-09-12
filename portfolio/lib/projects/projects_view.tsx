import { Flex, Grid } from "@manoj-malviya-96/atom";
import {
	AllProjectIds,
	type Project,
	type ProjectEffort,
	type ProjectId,
	Projects,
} from "@/lib/data";
import ProjectCard from "@/lib/projects/project_card";
import { Link } from "@/lib/shared";

export default function ProjectsView() {
	return (
		<Flex
			direction="col"
			gap="xl"
			width="content"
			hAlign="center"
			vAlign="center"
		>
			<ProjectsToc />
			<Flex
				direction="col"
				gap="xl"
				hAlign="center"
				vAlign="center"
				padding="lg"
			>
				{/* TODO use DynamicList when its ready */}
				{rankedProjects.map(({ id }) => (
					<ProjectCard project={id} />
				))}
			</Flex>
		</Flex>
	);
}

function ProjectsToc() {
	return (
		<Grid
			as="nav"
			aria-label="Project sections"
			columns={3}
			gap="sm"
			width="full"
		>
			{rankedProjects.map(({ id, title }) => (
				<Link key={id} url={`#${id}`}>
					{title}
				</Link>
			))}
		</Grid>
	);
}

type ProjectSummary = Project & { id: ProjectId };

const effortRank: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const projectsToHide: ProjectId[] = ["blackhole", "simphy", "mesha"] as const;
const projectsToShow: ProjectId[] = AllProjectIds.filter(
	(id) => !projectsToHide.includes(id),
);

const rankedProjects: ProjectSummary[] = projectsToShow
	.map((id) => ({
		id,
		...Projects[id],
	}))
	.sort((a, b) => effortRank[b.effort] - effortRank[a.effort]);
