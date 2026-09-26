import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { RankedProjects } from "@/lib/data";
import { Link, Media } from "@/lib/shared";

export default function Featured() {
	return (
		<Grid columns={3} gap="md" className="bento-grid">
			{RankedProjects.slice(0, 3).map((item, index) => {
				const lead = index === 0;
				return (
					<Link key={item.id} url={`/work#${item.id}`} style={{}}>
						<Flex
							direction="col"
							gap="sm"
							bg="surface"
							blur
							radius="lg"
							card
							padding="lg"
							height="full"
						>
							{item.media?.[0] && <Media media={item.media[0]} />}
							{lead ? (
								<Text.Heading>{item.title}</Text.Heading>
							) : (
								<Text.Title>{item.title}</Text.Title>
							)}
							<Text.Body ink="muted">{item.outcome}</Text.Body>
							{item.heroStat && (
								<Text.Overline mono ink="muted">
									{item.heroStat.value} — {item.heroStat.label}
								</Text.Overline>
							)}
						</Flex>
					</Link>
				);
			})}
		</Grid>
	);
}
