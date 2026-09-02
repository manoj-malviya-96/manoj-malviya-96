import { Flex, Grid, Image, Text } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	EXPERIENCE_BY_RECENCY,
	type ExperienceId,
	getEmployer,
	getExperience,
} from "@/lib/about_me/work_experience";
import { formatDate } from "@/lib/utils";

const LOGO_SIZE = "2.5rem";

export default function WorkHistory() {
	return (
		<Flex direction="col" className="track-list">
			{EXPERIENCE_BY_RECENCY.map((experience) => (
				<TrackRow key={experience} experience={experience} />
			))}
		</Flex>
	);
}

function TrackRow({ experience }: { experience: ExperienceId }) {
	const { position, start, end, summary } = getExperience(experience);
	const { name, logo } = getEmployer(experience);

	return (
		<Grid
			columns={2}
			className="track-row"
			padding="lg"
			backgroundColor="surface"
		>
			<Text variant="caption" className="font-mono" muted>
				{formatDate(start)} — {end ? formatDate(end) : "Present"}
			</Text>
			<Flex direction="row" gap="md" vAlign="center" hAlign="center">
				<Image
					as={NextImage}
					src={logo}
					alt={`${name} logo`}
					fit="contain"
					ratio="square"
					radius="md"
					style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
				/>
				<Flex direction="col" gap="xs">
					<Text variant="body" bold>
						{position}{" "}
						<Text variant="caption" muted>
							· {name}
						</Text>
					</Text>
					<Text variant="body" muted>
						{summary}
					</Text>
				</Flex>
			</Flex>
		</Grid>
	);
}
