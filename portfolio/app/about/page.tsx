"use client";

import { Badge, Flex, Grid, Image, List, Text } from "@manoj-malviya-96/atom";
import {
	IconCircleDot,
	IconLightbulb,
	IconLocationDot,
} from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import type { ComponentType } from "react";
import {
	CurrentLocation,
	CurrentStatus,
	Interests,
	Patents,
	ResumePDF,
	SKILL_GROUPS,
	SocialLinks,
	UserAvatar,
	useGoogleScholarQuery,
} from "@/lib/data";
import Education from "@/lib/resume/education";
import { RESUME_SECTIONS } from "@/lib/resume/sections";
import WorkHistory from "@/lib/resume/work_history";
import { Accent, Eyebrow, Link, SectionHeader } from "@/lib/shared";

export default function AboutPage() {
	return (
		<Flex direction="col" width="content">
			<Flex direction="col" gap="xl" width="full" margin={{ top: "xl" }}>
				<Intro />
				<Flex
					as="section"
					id={RESUME_SECTIONS[0].id}
					direction="col"
					gap="lg"
					padding={{ y: "lg" }}
				>
					<SectionHeader
						eyebrow="Experience"
						title="Where the last seven years went."
					/>
					<WorkHistory />
				</Flex>
				<Flex as="section" id={RESUME_SECTIONS[1].id} direction="col" gap="xl">
					<SectionHeader
						eyebrow="Education"
						title="Where the engineering started."
					/>
					<Education />
				</Flex>
				<TechnicalSurface />
				<Research />
			</Flex>
		</Flex>
	);
}

function Intro() {
	return (
		<Grid columns={2} gap="xl" className="about-intro">
			<Flex direction="col" gap="md" hAlign="start">
				<Text variant="heading">
					The <Accent>Person</Accent>
				</Text>
				<Text variant="body" muted>
					Seven years solving problems that sit between hardware and software:
					CAD tools engineers depend on, patient-monitoring platforms that
					can&apos;t afford downtime, real-time rendering that has to hit budget
					every frame. I own the full path: system design, the algorithm
					underneath, and the interface someone actually has to use.
				</Text>
				<Link url={ResumePDF} openNewTab variant="inline">
					Download PDF
				</Link>
			</Flex>
			<Flex as="aside" direction="col" gap="md" hAlign="start">
				<Image
					as={NextImage}
					src={UserAvatar}
					alt="Manoj Malviya"
					fit="cover"
					ratio="square"
					radius="lg"
					width={{ value: "sm", max: "full" }}
				/>
				<List direction="col" gap="sm">
					<SidebarRow icon={IconLocationDot} label={CurrentLocation} />
					<SidebarRow icon={IconCircleDot} label={CurrentStatus} />
					<SidebarRow icon={IconLightbulb} label={Interests.join(" · ")} />
				</List>
			</Flex>
		</Grid>
	);
}

function SidebarRow({
	icon: RowIcon,
	label,
}: {
	icon: ComponentType<{ size?: "sm" }>;
	label: string;
}) {
	return (
		<Flex as="li" direction="row" gap="xs" vAlign="center">
			<RowIcon size="sm" />
			<Text variant="body" muted>
				{label}
			</Text>
		</Flex>
	);
}

function TechnicalSurface() {
	return (
		<Flex as="section" direction="col" gap="lg">
			<SectionHeader eyebrow="Technical Surface" title="What I reach for." />
			<Flex direction="col" gap="md">
				{SKILL_GROUPS.map((group) => (
					<Flex key={group.label} direction="col" gap="sm">
						<Eyebrow>{group.label}</Eyebrow>
						<Flex as="ul" direction="row" gap="sm" wrap>
							{group.skills.map((skill) => (
								<Badge as="li" key={skill}>
									{skill}
								</Badge>
							))}
						</Flex>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
}

function Research() {
	const { data: scholar, isError } = useGoogleScholarQuery();

	return (
		<Flex as="section" direction="col" gap="lg">
			<SectionHeader eyebrow="Research" title="Patents & publications." />
			<Grid columns={2} gap="lg" className="about-research">
				<Flex direction="col" gap="sm">
					<Eyebrow>Patents</Eyebrow>
					<List direction="col" gap="md">
						{Patents.map((patent) => (
							<li key={patent.title}>
								<Flex direction="col" gap="xs">
									<Text variant="body">{patent.title}</Text>
									<Text variant="caption" muted>
										{patent.field} · {patent.year}
									</Text>
								</Flex>
							</li>
						))}
					</List>
				</Flex>
				<Flex direction="col" gap="sm">
					<Eyebrow>Publications</Eyebrow>
					{scholar ? (
						<List direction="col" gap="md">
							{scholar.papers.map((paper) => (
								<li key={paper.title}>
									<Flex direction="col" gap="xs">
										<Text variant="body">{paper.title}</Text>
										<Text variant="caption" muted>
											{paper.venue} · {paper.year} · {paper.citations} citations
										</Text>
									</Flex>
								</li>
							))}
						</List>
					) : isError ? (
						<Link url={SocialLinks.Scholar} openNewTab variant="inline">
							<Text variant="caption" muted>
								See publications on Google Scholar →
							</Text>
						</Link>
					) : (
						<Text variant="caption" muted>
							Loading from Google Scholar…
						</Text>
					)}
				</Flex>
			</Grid>
		</Flex>
	);
}
