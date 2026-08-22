import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { Badge, Flex, Image, Typography } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import type React from "react";
import {
	WORK_EXPERIENCE,
	type WorkExperience,
} from "@/lib/about_me/work_experience";
import { Icon, Link } from "@/lib/ui";
import { calculateDuration, formatDate } from "@/lib/utils";

/** Ongoing roles first, then most recently ended. */
const BY_RECENCY = [...WORK_EXPERIENCE].sort((a, b) => {
	if (!a.endDate && !b.endDate) return a.startDate < b.startDate ? 1 : -1;
	if (!a.endDate) return -1;
	if (!b.endDate) return 1;
	return a.endDate < b.endDate ? 1 : -1;
});

export default function WorkHistory({
	className,
	style,
}: {
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<Flex direction="col" className={className} style={style}>
			{BY_RECENCY.map((experience, index) => (
				<Flex key={experience.startDate} direction="col" hAlign="center">
					<WorkExpCard {...experience} />
					{index !== BY_RECENCY.length - 1 && (
						<span className="work-history-connector" />
					)}
				</Flex>
			))}
		</Flex>
	);
}

const LOGO_SIZE = "2.5rem";

function WorkExpCard({
	startDate,
	endDate,
	type,
	position,
	company,
	logo,
	role,
	location,
	companyURL,
}: WorkExperience) {
	const duration = calculateDuration(startDate, endDate);
	const timeString = `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"} • ${duration}`;

	return (
		<Flex
			direction="col"
			gap="md"
			padding="lg"
			radius="md"
			backgroundColor="surface"
			style={{ flex: 1, width: "100%" }}
		>
			<Flex direction="row" gap="md" vAlign="center">
				<Image
					as={NextImage}
					src={logo}
					alt={`${company} logo`}
					fit="contain"
					radius="md"
					style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
				/>
				<Flex direction="col" style={{ flex: 1 }}>
					<Flex
						direction="row"
						gap="xs"
						vAlign="center"
						hAlign="between"
						style={{ flexWrap: "wrap" }}
					>
						<Flex direction="row" gap="sm" vAlign="center">
							<Typography variant="title">{position}</Typography>
							<Badge className="hide-below-lg">{type}</Badge>
						</Flex>
						<Typography variant="caption">{timeString}</Typography>
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
