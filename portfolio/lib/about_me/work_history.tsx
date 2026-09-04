import { Badge, Flex, Grid, Image, List, Text } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	EXPERIENCE_BY_RECENCY,
	type Experience,
	type ExperienceId,
	getEmployer,
	getExperience,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type {ComponentProps} from "react";


export default function WorkHistory() {
	return (
		<Flex direction="col" className="track-list">
			{EXPERIENCE_BY_RECENCY.map((experience) => (
				<TrackRow key={experience} experience={experience} />
			))}
		</Flex>
	);
}

function NextImageForWork(props: ComponentProps<typeof NextImage>){
	return <NextImage width={500} height={500} {...props} />
}

function TrackRow({ experience }: { experience: ExperienceId }) {
	const { position, start, end, type, skills, summary } =
		getExperience(experience);
	const { name, logo } = getEmployer(experience);

	return (
		<Grid columns={2} className="track-row" padding="lg" bg="surface">
			<Flex direction="col" gap="xs" vAlign="start" hAlign="start">
				<Image
					as={NextImageForWork}
					src={logo}
					alt={`${name} logo`}
					fit="contain"
					ratio="square"
					radius="md"
				/>
				<Text variant="title" muted>
					{name}
				</Text>
				<Text variant="caption" muted>
					{formatDate(start)} — {end ? formatDate(end) : "Present"}
				</Text>
			</Flex>
			<Flex direction="col" gap="xs">
				<Flex direction="row" gap="sm" wrap vAlign="center">
					<Text variant="body" bold>
						{position}
					</Text>
					<Badge>{type}</Badge>
				</Flex>
				<Text variant="body" muted>
					{summary}
				</Text>
				<ExperienceSkills skills={skills} />
			</Flex>
		</Grid>
	);
}

function ExperienceSkills({ skills }: { skills: Experience["skills"] }) {
	return (
		<List direction="row" gap="sm">
			{skills.map((skill) => (
				<Badge as="li" key={skill} color="blue">
					{skill}
				</Badge>
			))}
		</List>
	);
}
