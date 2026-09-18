import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { FeaturedWorkItems } from "@/lib/data";
import { Link, Media } from "@/lib/shared";

export default function Featured() {
	return (
		<Grid columns={3} gap="md">
			{FeaturedWorkItems.map((item) => (
				<Link key={item.id} url={`/work#${item.id}`}>
					<Flex direction="col" gap="sm">
						{item.kind === "project" && item.media && (
							<Media media={item.media} />
						)}
						<Text variant="title">{item.title}</Text>
						<Text variant="caption" muted>
							{item.dates}
						</Text>
					</Flex>
				</Link>
			))}
		</Grid>
	);
}
