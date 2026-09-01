import { Flex, Grid, Typography } from "@manoj-malviya-96/atom";
import {
	WORK_EXPERIENCE_BY_RECENCY,
	type WorkExperience,
} from "@/lib/about_me/work_experience";
import { formatDate } from "@/lib/utils";

export default function WorkHistory() {
	return (
		<Flex direction="col" className="track-list">
			{WORK_EXPERIENCE_BY_RECENCY.map((experience) => (
				<TrackRow key={experience.startDate} {...experience} />
			))}
		</Flex>
	);
}

function TrackRow({
	position,
	company,
	startDate,
	endDate,
	role,
}: WorkExperience) {
	return (
		<Grid columns={2} className="track-row" padding="lg">
			<Typography variant="label" className="font-mono" muted>
				{formatDate(startDate)} — {endDate ? formatDate(endDate) : "Present"}
			</Typography>
			<Flex direction="col" gap="xs">
				<Typography variant="body" bold>
					{position}{" "}
					<Typography variant="caption" muted>
						· {company}
					</Typography>
				</Typography>
				{role && (
					<Typography variant="body" muted>
						{role}
					</Typography>
				)}
			</Flex>
		</Grid>
	);
}
