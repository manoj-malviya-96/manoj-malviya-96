import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import {
	Badge,
	Flex,
	Image,
	Timeline,
	Typography,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import type React from "react";
import {
	WORK_EXPERIENCE_BY_RECENCY,
	type WorkExperience,
} from "@/lib/about_me/work_experience";
import { Icon, Link } from "@/lib/ui";
import { calculateDuration, formatDate } from "@/lib/utils";

export default function WorkHistory({
	className,
	style,
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<Timeline
			className={className}
			style={style}
			events={WORK_EXPERIENCE_BY_RECENCY.map((experience) => ({
				key: experience.startDate,
				label: `${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : "Present"} • ${calculateDuration(experience.startDate, experience.endDate)}`,
				children: <WorkExpCard {...experience} />,
			}))}
		/>
	);
}

const LOGO_SIZE = "2.5rem";

function WorkExpCard({
	type,
	position,
	company,
	logo,
	role,
	location,
	companyURL,
}: WorkExperience) {
	return (
		<Flex
			direction="col"
			gap="md"
			padding="lg"
			radius="md"
			backgroundColor="surface"
			grow
			width="100%"
		>
			<Flex direction="row" gap="md" vAlign="center">
				<Image
					as={NextImage}
					src={logo}
					alt={`${company} logo`}
					fit="contain"
					ratio="square"
					radius="md"
					style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
				/>
				<Flex direction="col" grow>
					<Flex direction="row" gap="sm" vAlign="center">
						<Typography variant="title">{position}</Typography>
						<Badge className="hide-below-lg">{type}</Badge>
					</Flex>
					<Flex direction="row" gap="md" vAlign="center">
						<Typography variant="caption">
							<Link url={companyURL} openNewTab>
								{company}
							</Link>
						</Typography>
						<Typography variant="caption">
							<Flex direction="row" gap="sm" vAlign="center" inline>
								<Icon icon={faLocationArrow} aria-label="Location" />
								{location}
							</Flex>
						</Typography>
					</Flex>
				</Flex>
			</Flex>
			{role && (
				<Typography variant="body" padding="sm">
					{role}
				</Typography>
			)}
		</Flex>
	);
}
