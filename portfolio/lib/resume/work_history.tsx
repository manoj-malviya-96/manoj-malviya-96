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
import { IconBriefcase } from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import {
	EXPERIENCE_BY_RECENCY,
	type Experience,
	type ExperienceId,
	getEmployer,
	getExperience,
	type OrganizationId,
} from "@/lib/data";
import { formatDate } from "@/lib/helper";

type ExperienceGroup = {
	organization: OrganizationId;
	experiences: ExperienceId[];
};

function groupByOrganization(ids: readonly ExperienceId[]): ExperienceGroup[] {
	const groups: ExperienceGroup[] = [];
	for (const id of ids) {
		const { organization } = getExperience(id);
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
	const { start } = getExperience(experiences[experiences.length - 1]);
	const { end } = getExperience(experiences[0]);

	return (
		<Grid columns={2} className="track-row" padding="lg" bg="surface">
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
				<Text variant="title" muted>
					{name}
				</Text>
				<Text variant="caption" muted>
					{formatDate(start)} — {end ? formatDate(end) : "Present"}
				</Text>
			</Flex>
			<Timeline events={experiences.map(roleEvent)} />
		</Grid>
	);
}

function roleEvent(experience: ExperienceId): TimelineEvent {
	const { position, start, end, type, skills, summary } =
		getExperience(experience);

	return {
		key: experience,
		label: `${formatDate(start)} — ${end ? formatDate(end) : "Present"}`,
		children: (
			<Flex direction="col" gap="xs" hAlign="start">
				<Flex direction="row" gap="sm" wrap vAlign="center">
					<Text variant="body" bold>
						{position}
					</Text>
					<Badge>
						<IconBriefcase size="sm" />
						{type}
					</Badge>
				</Flex>
				<Text variant="body" muted>
					{summary}
				</Text>
				<ExperienceSkills skills={skills} />
			</Flex>
		),
	};
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
