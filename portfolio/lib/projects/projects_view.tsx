import { Flex, Grid } from "@manoj-malviya-96/atom";
import { RankedProjects } from "@/lib/data";
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
				{RankedProjects.map(({ id }) => (
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
			{RankedProjects.map(({ id, title }) => (
				<Link key={id} url={`#${id}`}>
					{title}
				</Link>
			))}
		</Grid>
	);
}
