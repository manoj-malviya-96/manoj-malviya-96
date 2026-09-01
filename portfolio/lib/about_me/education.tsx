import { Flex, Grid, Typography } from "@manoj-malviya-96/atom";
import { EDUCATION } from "@/lib/about_me/profile";
import { formatDate } from "@/lib/utils";

export default function Education() {
	return (
		<Grid columns={2} gap="md" className="edu-grid">
			{EDUCATION.map((entry) => (
				<Flex
					key={entry.school}
					direction="col"
					gap="sm"
					padding="lg"
					radius="lg"
					backgroundColor="surface"
				>
					<Typography variant="title">{entry.school}</Typography>
					<Typography variant="body" muted>
						{entry.degree}, {entry.field} · {formatDate(entry.graduation)}
					</Typography>
					<Typography variant="caption" className="font-mono" muted>
						{entry.focus}
					</Typography>
				</Flex>
			))}
		</Grid>
	);
}
