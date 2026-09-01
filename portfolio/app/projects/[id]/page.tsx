import { Flex, Screen, Typography } from "@manoj-malviya-96/atom";
import {
	caseStudy,
	project as TopOptProject,
} from "@/lib/projects/list/topopt";
import { Link } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
	return [{ id: TopOptProject.id }];
}

export default function CaseStudyPage() {
	const { title, description } = TopOptProject.metadata;

	return (
		<Screen gap="xl">
			<Flex as="header" direction="col" gap="sm">
				<Typography variant="overline">Case study</Typography>
				<Typography variant="heading">{title}</Typography>
				<Typography variant="subtitle">{description}</Typography>
			</Flex>
			<Flex direction="col" gap="lg">
				<Section title="The problem">{caseStudy.problem}</Section>
				<Section title="What I did">{caseStudy.approach}</Section>
				<Section title="The result">{caseStudy.result}</Section>
			</Flex>
			<Link url="/projects" padding="sm" radius="md" backgroundColor="surface">
				← Back to all projects
			</Link>
		</Screen>
	);
}

function Section({ title, children }: { title: string; children: string }) {
	return (
		<Flex
			direction="col"
			gap="sm"
			padding="lg"
			radius="md"
			backgroundColor="surface"
		>
			<Typography variant="title">{title}</Typography>
			<Typography variant="body">{children}</Typography>
		</Flex>
	);
}
