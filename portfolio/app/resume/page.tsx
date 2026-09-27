"use client";

import { Flex, List, Marquee, Text } from "@manoj-malviya-96/atom";
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
import type { ComponentType } from "react";
import {
	CurrentLocation,
	Interests,
	type ProjectTag,
	ResumePDF,
	SKILL_GROUPS,
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

export default function ResumePage() {
	return (
		<Page>
			<PageHeroSection padding={{ y: "sm" }}>
				<PageHeroHeader>
					<Eyebrow>Resume</Eyebrow>
					<Text.Heading as="h1">
						The <EmText>Paperwork</EmText>
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
		<Flex direction="col" gap="md" hAlign="start">
			<List direction="col" gap="sm">
				<SidebarRow icon={IconLocationDot} label={CurrentLocation} />
				<SidebarRow icon={IconLightbulb} label={Interests.join(" · ")} />
			</List>
			<Text.Body ink="muted">
				Everything below, but formatted for a robot to skim in six seconds.
			</Text.Body>
			<Link url={ResumePDF} openNewTab>
				Download PDF
			</Link>
		</Flex>
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
		<Marquee aria-label="Languages, frameworks, and practices I use">
			{SKILL_GROUPS.flatMap((group) => [
				group.skills.map((skill) => <SkillPill key={skill} skill={skill} />),
			])}
		</Marquee>
	);
}

function SkillPill({ skill }: { skill: ProjectTag }) {
	const SkillIcon = SKILL_ICONS[skill];
	return (
		<Flex as="span" direction="row" gap="xs" vAlign="center">
			{SkillIcon && <SkillIcon size="sm" ink="muted" />}
			<Text.Label as="span">{skill}</Text.Label>
		</Flex>
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
