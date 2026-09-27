"use client";

import { Flex, MagneticContainer, Text, TypewriterText } from "@manoj-malviya-96/atom";
import type { ComponentPropsWithoutRef } from "react";
import { CurrentStatus, EmailAddress, Hobbies, RoleTagline } from "@/lib/data";
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
		<PageSection
			id="home-cta"
			gap="sm"
			bg="surface"
			padding="xl"
			radius="lg"
			hAlign="center"
		>
			<Text.Heading as="h2" align="center">
				Got a complex <EmText>problem?</EmText>
			</Text.Heading>
			<Text.Caption ink="muted" align="center" width="sm">
				I'm selective. If it's genuinely interesting and the constraints are
				real, let's talk.
			</Text.Caption>
			<MagneticContainer>
				<Link.Button url={EmailAddress} color="primary" label="Say hello →" />
			</MagneticContainer>
		</PageSection>
	);
}
