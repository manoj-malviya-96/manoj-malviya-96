import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { type ProjectSummary, RankedProjects } from "@/lib/data";
import { Link, Media } from "@/lib/shared";

export default function Featured() {
	return (
		<Grid columns={3} gap="md">
			{RankedProjects.slice(0, 3).map((item) => (
				<ExperimentHighlightCard item={item} key={item.id} />
			))}
		</Grid>
	);
}

function ExperimentHighlightCard({ item }: { item: ProjectSummary }) {
	return (
		<Link key={item.id} url={`/experiments#${item.id}`}>
			<Flex direction="col" gap="sm" height="full">
				{item.media?.[0] && (
					<div className="media-slot featured-thumb">
						<Media {...item.media[0]} sizes="(min-width: 1024px) 33vw, 100vw" />
					</div>
				)}
				<Text.Title>{item.title}</Text.Title>
			</Flex>
		</Link>
	);
}
