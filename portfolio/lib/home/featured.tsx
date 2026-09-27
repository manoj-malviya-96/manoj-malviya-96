import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { type ProjectSummary, RankedProjects } from "@/lib/data";
import { Link, Media } from "@/lib/shared";

export default function Featured() {
	return (
		<Grid columns={3} gap="md">
			{RankedProjects.slice(0, 3).map((item) => (
				<WorkHighlightCard item={item} key={item.id} />
			))}
		</Grid>
	);
}

function WorkHighlightCard({ item }: { item: ProjectSummary }) {
	return (
		<Link key={item.id} url={`/work#${item.id}`}>
			<Flex direction="col" gap="sm" padding="lg" height="full">
				{item.media?.[0] && <Media media={item.media[0]} />}
				<Text.Title>{item.title}</Text.Title>
				<Text.Body ink="muted">{item.outcome}</Text.Body>
			</Flex>
		</Link>
	);
}
