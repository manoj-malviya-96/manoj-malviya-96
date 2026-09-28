import { Backdrop, Grid, Text } from "@manoj-malviya-96/atom";
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
		<Backdrop
			as={Link}
			key={item.id}
			url={`/work#${item.id}`}
			ratio="video"
			radius="md"
		>
			{item.media?.[0] && (
				<Backdrop.Media>
					<Media
						{...item.media[0]}
						fill
						sizes="(min-width: 1024px) 33vw, 100vw"
					/>
				</Backdrop.Media>
			)}
			<Backdrop.Content scrim="bottom" strength="strong" vAlign="end">
				<Text.Title>{item.title}</Text.Title>
			</Backdrop.Content>
		</Backdrop>
	);
}
