import { Flex, Grid, List } from "@manoj-malviya-96/atom";
import {
	AllProjectIds,
	getMeta,
	type ProjectEffort,
	type ProjectId,
	type ProjectMeta,
} from "@/lib/data";
import ProjectCard from "@/lib/projects/project_card";
import { Link } from "@/lib/ui";

export default function ProjectsClient() {
	return (
		<Flex direction="col" gap="xl" vAlign="start">
			<ProjectsToc />
			<List direction="col" gap="xl">
				{/* TODO use DynamicList when its ready */}
				{BY_EFFORT.map(({ id }) => (
					<li key={id}>
						<ProjectCard project={id} />
					</li>
				))}
			</List>
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
			className="project-toc"
		>
			{BY_EFFORT.map(({ id, title }) => (
				<Link key={id} url={`#${id}`}>
					{title}
				</Link>
			))}
		</Grid>
	);
}

type ProjectSummary = ProjectMeta & { id: ProjectId };

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const BY_EFFORT: ProjectSummary[] = AllProjectIds.map((id) => ({
	id,
	...getMeta(id),
})).sort((a, b) => EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort]);
