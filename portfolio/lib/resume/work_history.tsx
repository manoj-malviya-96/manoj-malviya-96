import type { TimelineEvent } from "@manoj-malviya-96/atom";
import {
	Badge,
	Flex,
	Grid,
	Image,
	List,
	Text,
	Timeline,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	EXPERIENCE_BY_RECENCY,
	type Experience,
	type ExperienceId,
	Experiences,
	getEmployer,
	type OrganizationId,
} from "@/lib/data";
import { formatDate } from "@/lib/helper";
import { Media } from "@/lib/shared";

type ExperienceGroup = {
	organization: OrganizationId;
	experiences: ExperienceId[];
};

function groupByOrganization(ids: readonly ExperienceId[]): ExperienceGroup[] {
	const groups: ExperienceGroup[] = [];
	for (const id of ids) {
		const { organization } = Experiences[id];
		const current = groups[groups.length - 1];
		if (current && current.organization === organization) {
			current.experiences.push(id);
		} else {
			groups.push({ organization, experiences: [id] });
		}
	}
	return groups;
}

const EXPERIENCE_GROUPS = groupByOrganization(EXPERIENCE_BY_RECENCY);

export default function WorkHistory() {
	return (
		<Flex direction="col" className="track-list">
			{EXPERIENCE_GROUPS.map((group) => (
				<TrackRow key={group.organization} group={group} />
			))}
		</Flex>
	);
}

function TrackRow({ group }: { group: ExperienceGroup }) {
	const { experiences } = group;
	const { name, logo } = getEmployer(experiences[0]);
	const { start } = Experiences[experiences[experiences.length - 1]];
	const { end } = Experiences[experiences[0]];

	return (
		<Grid
			columns={2}
			enter="rise"
			className="track-row"
			padding="lg"
			bg="surface"
		>
			<Flex direction="col" gap="xs" vAlign="start" hAlign="start">
				<Image
					as={NextImage}
					src={logo}
					alt={`${name} logo`}
					fit="contain"
					ratio="square"
					radius="md"
					className="track-logo"
				/>
				<Text.Title ink="muted">{name}</Text.Title>
				<Text.Caption ink="muted">
					{formatDate(start)} — {end ? formatDate(end) : "Present"}
				</Text.Caption>
			</Flex>
			{/* A lone role skips Timeline: its marker and rail mean nothing without a second event. */}
			{experiences.length === 1 ? (
				roleEvent(experiences[0]).children
			) : (
				<Timeline events={experiences.map(roleEvent)} />
			)}
		</Grid>
	);
}

function roleEvent(experience: ExperienceId): TimelineEvent {
	const { position, start, end, skills, summary, media } =
		Experiences[experience];

	return {
		key: experience,
		label: `${formatDate(start)} — ${end ? formatDate(end) : "Present"}`,
		children: (
			<Flex direction="col" gap="md" hAlign="start">
				<Flex direction="col" gap="sm" vAlign="center">
					<Text.Title>{position}</Text.Title>
					<ExperienceSkills skills={skills} />
				</Flex>
				{summary}
				{media && <Media media={media} />}
			</Flex>
		),
	};
}

function ExperienceSkills({ skills }: { skills: Experience["skills"] }) {
	return (
		<List direction="row" gap="sm">
			{skills.map((skill) => (
				<Badge as="li" key={skill}>
					{skill}
				</Badge>
			))}
		</List>
	);
}
