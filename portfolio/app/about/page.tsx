"use client";

import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import {
	CurrentStatus,
	Hobbies,
	HowIWorkPhase,
	Interests,
	PHASE_IDS,
	type Phase,
	SocialLinks,
} from "@/lib/data";
import {
	EmText,
	Eyebrow,
	Link,
	Page,
	PageHeroHeader,
	PageHeroSection,
	PageSection,
} from "@/lib/shared";

export default function AboutPage() {
	return (
		<Page>
			<PageHeroSection padding={{ y: "sm" }}>
				<PageHeroHeader>
					<Eyebrow>About</Eyebrow>
					<Text.Heading as="h1">
						The <EmText>Person</EmText>
					</Text.Heading>
				</PageHeroHeader>
			</PageHeroSection>
			<Story />
			<HowIWork />
			<Elsewhere />
		</Page>
	);
}

function Story() {
	return (
		<PageSection gap="md">
			<Text.Body>
				I'm {CurrentStatus.toLowerCase()}, based in Berlin. I ended up here by
				chasing the same question through a few very different industries:
				what happens when the interface between hardware and software is the
				part nobody wants to own. CAD kernels, patient-monitoring firmware,
				rendering pipelines that miss frame budget — the domains changed, the
				itch didn't.
			</Text.Body>
			<Text.Body>
				Outside of work I'm still doing the same thing at a smaller scale:{" "}
				{Interests.join(", ").toLowerCase()} on the technical side,{" "}
				{Hobbies.join(" and ").toLowerCase()} on the side that has nothing to
				do with a keyboard.
			</Text.Body>
		</PageSection>
	);
}

function HowIWork() {
	return (
		<PageSection gap="lg">
			<Text.Heading>How I work.</Text.Heading>
			<Grid columns={2} className="loop-grid" gap="lg" padding="sm">
				{PHASE_IDS.map((id, index) => (
					<PhaseCol key={id} index={index} {...HowIWorkPhase[id]} />
				))}
			</Grid>
		</PageSection>
	);
}

function PhaseCol({ index, label, copy }: { index: number } & Phase) {
	return (
		<Flex as="span" enter="rise" direction="col" gap="sm">
			<Text.Overline mono>{String(index + 1).padStart(2, "0")}</Text.Overline>
			<Text.Title>{label}</Text.Title>
			<Text.Body ink="muted">{copy}</Text.Body>
		</Flex>
	);
}

function Elsewhere() {
	return (
		<PageSection gap="md">
			<Text.Heading>Elsewhere.</Text.Heading>
			<Text.Body ink="muted">
				<Link url={SocialLinks.Linktree} openNewTab>
					linktr.ee/manoj_malviya
				</Link>{" "}
				has the rest of the links in one place.
			</Text.Body>
		</PageSection>
	);
}
