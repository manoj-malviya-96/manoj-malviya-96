"use client";

import {
	Flex,
	Grid,
	MagneticContainer,
	Text,
	TypewriterText,
} from "@manoj-malviya-96/atom";
import type { ComponentPropsWithoutRef } from "react";
import {
	CurrentStatus,
	Email,
	EmailAddress,
	Hobbies,
	HowIWorkPhase,
	PHASE_IDS,
	type Phase,
	RoleTagline,
} from "@/lib/data";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import {
	EmText,
	Eyebrow,
	Link,
	Page,
	PageHeroHeader,
	PageHeroSection,
	PageSection,
} from "@/lib/shared";

export default function Landing() {
	return (
		<Page>
			<Hero />
			<FeaturedWork />
			<HowIWork />
			<FinalCTA />
		</Page>
	);
}

function Hero() {
	return (
		<PageHeroSection id="home-hero" vAlign="center" padding={{ y: "xl" }}>
			<PageHeroHeader>
				<Eyebrow>Berlin, DE</Eyebrow>
				<Text.Hero className="hero-title">
					Manoj
					<EmText> Malviya </EmText>
				</Text.Hero>
			</PageHeroHeader>
			<Text.Body width="lg">
				{RoleTagline[0]?.toUpperCase()}
				{RoleTagline.slice(1)}. Currently {CurrentStatus}.
			</Text.Body>
			<Text.Body ink="muted" width="md">
				<TypewriterWrapped prefix="Also into" words={Hobbies} />
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
		</PageHeroSection>
	);
}

/* TODO:[Atom] should accessibility for Typewriter. */
function TypewriterWrapped({
	prefix,
	words,
	...rest
}: ComponentPropsWithoutRef<typeof TypewriterText>) {
	return (
		<>
			<span aria-hidden="true">
				<TypewriterText
					{...(prefix !== undefined && { prefix })}
					words={words}
					{...rest}
				/>
			</span>
			<span className="sr-only">{`${prefix} ${Hobbies.join(", ")}`}.</span>
		</>
	);
}

function HowIWork() {
	return (
		<PageSection id="home-loop" gap="lg">
			<Flex direction="col" gap="xs">
				<Eyebrow>How I work</Eyebrow>
				<Text.Hero as="h2">The process.</Text.Hero>
			</Flex>
			<Grid
				columns={2}
				className="loop-grid"
				gap="lg"
				bg="surface"
				blur
				radius="lg"
				card
				padding="lg"
			>
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

function FeaturedWork() {
	return (
		<PageSection id="home-feature" gap="lg">
			<Flex as="span" direction="row" vAlign="center" hAlign="between">
				<Text.Heading>Featured Work</Text.Heading>
				<Link url="/work">
					<Text.Body ink="muted">View all Work</Text.Body>
				</Link>
			</Flex>
			<Featured />
			<ShowAndTell />
		</PageSection>
	);
}

function FinalCTA() {
	return (
		<PageSection id="home-cta" gap="lg" bg="surface" radius="lg" card>
			<Flex direction="col" gap="lg" hAlign="center" padding={{ y: "xl" }}>
				<Text.Hero as="h2" align="center">
					Got a hard <EmText>problem?</EmText>
				</Text.Hero>
				<MagneticContainer>
					<Link.Button url={EmailAddress} color="primary" label="Email me" />
				</MagneticContainer>
				<Text.Body ink="muted" selectable>
					{Email}
				</Text.Body>
			</Flex>
		</PageSection>
	);
}
