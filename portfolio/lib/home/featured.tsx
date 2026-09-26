import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { RankedProjects } from "@/lib/data";
import { Link, Media } from "@/lib/shared";

export default function Featured() {
	return (
		<Grid columns={3} gap="md">
			{RankedProjects.slice(0, 3).map((item) => (
				<Link key={item.id} url={`/work#${item.id}`} style={{}}>
					<Flex direction="col" gap="sm">
						{item.media?.[0] && <Media media={item.media[0]} />}
						<Text.Title>{item.title}</Text.Title>
						<Text.Body ink="muted" truncate>
							{item.summary}
						</Text.Body>
						{item.heroStat && (
							<Text.Overline mono ink="muted">
								{item.heroStat.value} — {item.heroStat.label}
							</Text.Overline>
						)}
					</Flex>
				</Link>
			))}
		</Grid>
	);
}
