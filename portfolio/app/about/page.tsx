"use client";

import {
	Badge,
	Flex,
	Grid,
	Image,
	List,
	Marquee,
	Text,
} from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconGlobe,
	IconGolang,
	IconLightbulb,
	IconLocationDot,
	IconPython,
	IconReact,
	IconRust,
	IconSwift,
} from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import type { ComponentType } from "react";
import {
	CurrentLocation,
	Interests,
	type ProjectTag,
	ResumePDF,
	SKILL_GROUPS,
	UserAvatar,
} from "@/lib/data";
import Education from "@/lib/resume/education";
import { RESUME_SECTIONS } from "@/lib/resume/sections";
import WorkHistory from "@/lib/resume/work_history";
import {
	EmText,
	Eyebrow,
	Link,
	Page,
	PageHeroHeader,
	PageHeroSection,
	SectionHeader,
} from "@/lib/shared";

export default function AboutPage() {
	return (
		<Page>
			<PageHeroSection padding={{ y: "sm" }}>
				<PageHeroHeader>
					<Eyebrow>About</Eyebrow>
					<Text.Heading as="h1">
						The <EmText>Engineer</EmText>
					</Text.Heading>
				</PageHeroHeader>
			</PageHeroSection>
			<Flex direction="col" gap="lg" width="full">
				<Intro />
				<TechnicalSurface />
				<Flex
					as="section"
					id={RESUME_SECTIONS[0].id}
					direction="col"
					gap="lg"
					padding={{ y: "md" }}
				>
					<SectionHeader eyebrow="Experience" />
					<WorkHistory />
				</Flex>
				<Flex as="section" id={RESUME_SECTIONS[1].id} direction="col" gap="lg">
					<SectionHeader eyebrow="Education" />
					<Education />
				</Flex>
			</Flex>
		</Page>
	);
}

function Intro() {
	return (
		<Grid columns={2} gap="xl" className="about-intro">
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
					<SidebarRow icon={IconLightbulb} label={Interests.join(" · ")} />
				</List>
			</Flex>
			<Flex direction="col" gap="md" hAlign="start">
				<Text.Body ink="muted">
					Seven years solving problems that sit between hardware and software:
					CAD tools engineers depend on, patient-monitoring platforms that
					can&apos;t afford downtime, real-time rendering that has to hit budget
					every frame. I own the full path: system design, the algorithm
					underneath, and the interface someone actually has to use.
				</Text.Body>
				<Link url={ResumePDF} openNewTab>
					Download PDF
				</Link>
			</Flex>
		</Grid>
	);
}

function SidebarRow({
	icon: RowIcon,
	label,
}: {
	icon: ComponentType<{ size?: "text"; ink?: "muted" }>;
	label: string;
}) {
	return (
		<Flex as="li" direction="row" gap="xs" vAlign="center">
			<RowIcon size="text" ink="muted" />
			<Text.Body ink="muted">{label}</Text.Body>
		</Flex>
	);
}

function TechnicalSurface() {
	return (
		<Flex as="section" direction="col" gap="lg">
			<SectionHeader eyebrow="Technical Surface" />
			<Marquee aria-label="Languages, frameworks, and practices I use">
				{SKILL_GROUPS.flatMap((group) => [
					<GroupLabel key={`label-${group.label}`} label={group.label} />,
					...group.skills.map((skill) => (
						<SkillPill key={skill} skill={skill} />
					)),
				])}
			</Marquee>
		</Flex>
	);
}

function GroupLabel({ label }: { label: string }) {
	return (
		<Text.Overline mono ink="muted">
			{label}
		</Text.Overline>
	);
}

function SkillPill({ skill }: { skill: ProjectTag }) {
	const SkillIcon = SKILL_ICONS[skill];
	return (
		<Badge as="span">
			<Flex as="span" direction="row" gap="xs" vAlign="center">
				{SkillIcon && <SkillIcon size="sm" ink="muted" />}
				<Text.Label as="span">{skill}</Text.Label>
			</Flex>
		</Badge>
	);
}

const SKILL_ICONS: Partial<
	Record<ProjectTag, ComponentType<{ size?: "sm"; ink?: "muted" }>>
> = {
	react: IconReact,
	python: IconPython,
	rust: IconRust,
	go: IconGolang,
	swift: IconSwift,
	"open-source": IconGithub,
	web: IconGlobe,
};
