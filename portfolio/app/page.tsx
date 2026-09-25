"use client";

import {
	Flex,
	Grid,
	MagneticContainer,
	Text,
	TypewriterText,
} from "@manoj-malviya-96/atom";
import {
	Email,
	EmailAddress,
	HowIWorkPhase,
	PHASE_IDS,
	type Phase,
} from "@/lib/data";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import {
	EmText,
	Link,
	Page,
	PageHero,
	Section,
	SectionHeader,
} from "@/lib/shared";

export default function Landing() {
	return (
		<Page>
			<Hero />
			<FeaturedWork />
			<ShowAndTell />
			<HowIWork />
			<FinalCTA />
		</Page>
	);
}

function Hero() {
	return (
		<PageHero
			id="home-hero"
			eyebrow="Berlin, DE"
			title={
				<>
					Manoj
					<EmText> Malviya </EmText>
				</>
			}
			vAlign="center"
		>
			<Text.Body>
				<TypewriterText
					prefix="-"
					words={[
						"Lead Software Engineer",
						"High Performance Computing",
						"Product Designer",
						"Computation Design Research",
						"Part-time DJ",
						"3D Printing",
					]}
				/>
			</Text.Body>
			<Text.Body ink="muted" width="md">
				I transform complex problems into intelligent products — focusing on
				correctness, then performance, then everything else.
			</Text.Body>
			<Flex
				as="span"
				direction="row"
				gap="sm"
				vAlign="center"
				hAlign="start"
				wrap
			>
				<MagneticContainer>
					<Link.Button
						url="/work"
						color="primary"
						size="sm"
						label="View work →"
					/>
				</MagneticContainer>
				<MagneticContainer>
					<Link.Button url="/about" size="sm" label="About me" />
				</MagneticContainer>
			</Flex>
		</PageHero>
	);
}

function HowIWork() {
	return (
		<Section id="home-loop">
			<SectionHeader title="The process." eyebrow="How I work" />
			<Grid columns={2} gap="md">
				{PHASE_IDS.map((id, index) => (
					<PhaseCol key={id} index={index} {...HowIWorkPhase[id]} />
				))}
			</Grid>
		</Section>
	);
}

function PhaseCol({ index, label, copy }: { index: number } & Phase) {
	return (
		<Flex
			as="span"
			enter="rise"
			direction="col"
			gap="sm"
			radius="lg"
			bg="surface"
			padding="md"
		>
			<Text.Overline mono>{String(index + 1).padStart(2, "0")}</Text.Overline>
			<Text.Title>{label}</Text.Title>
			<Text.Body ink="muted">{copy}</Text.Body>
		</Flex>
	);
}

function FeaturedWork() {
	return (
		<Section id="home-feature" gap="lg">
			<Flex as="span" direction="row" vAlign="center" hAlign="between">
				<Text.Heading>Featured Work</Text.Heading>
				<Link url="/work">
					<Text.Body ink="muted">View all Work</Text.Body>
				</Link>
			</Flex>
			<Featured />
		</Section>
	);
}

function FinalCTA() {
	return (
		<Section id="home-cta" gap="lg">
			<Text.Hero align="center">
				Got a hard <EmText>problem ? </EmText>
			</Text.Hero>
			<Flex direction="col" gap="sm" hAlign="center">
				<MagneticContainer>
					<Link.Button url={EmailAddress} color="primary" label="Email me" />
				</MagneticContainer>
				<Text.Caption mono ink="muted" selectable>
					{Email}
				</Text.Caption>
			</Flex>
		</Section>
	);
}
