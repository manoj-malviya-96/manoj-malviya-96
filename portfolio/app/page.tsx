"use client";

import {
	Flex,
	MagneticContainer,
	Text,
	TypewriterText,
} from "@manoj-malviya-96/atom";
import type { ComponentPropsWithoutRef } from "react";
import { EmailAddress, Hobbies } from "@/lib/data";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import {
	ButtonRow,
	EmText,
	Eyebrow,
	Link,
	Page,
	PageHeroHeader,
	PageHeroSection,
	PageSection,
	PageSectionCard,
} from "@/lib/shared";

export default function Landing() {
	return (
		<Page>
			<PageHeroSection id="home-hero" vAlign="center" padding={{ y: "xl" }}>
				<PageHeroHeader>
					<Eyebrow>Berlin, DE</Eyebrow>
					<Text.Hero className="hero-title">
						Manoj
						<EmText> Malviya </EmText>
					</Text.Hero>
				</PageHeroHeader>
				<Text.Body width="md">
					Thank you for visiting my dungeon. I am Manoj Malviya, a lead software
					engineer at a healthcare startup. <br /> I am using this website as a
					tool to showcase my projects; my thoughts; my interests and my career
					history all in once place.
				</Text.Body>
				<TypewriterWrapped prefix="Also into" words={Hobbies} />
				<ButtonRow>
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
				</ButtonRow>
			</PageHeroSection>
			<PageSection id="home-feature" gap="lg">
				<Flex as="span" direction="row" vAlign="center" hAlign="between">
					<Text.Heading>Featured</Text.Heading>
					<Link url="/work">
						<Text.Body ink="muted">View all Projects</Text.Body>
					</Link>
				</Flex>
				<Featured />
				<ShowAndTell />
			</PageSection>
			<PageSectionCard id="home-cta">
				<Text.Heading as="h2" align="center">
					Interested in <EmText>coffee</EmText> with me ?
				</Text.Heading>
				<MagneticContainer>
					<Link.Button url={EmailAddress} color="primary" label="Say hello →" />
				</MagneticContainer>
			</PageSectionCard>
		</Page>
	);
}

/* TODO:[Atom] should accessibility for Typewriter. */
function TypewriterWrapped({
	prefix,
	words,
	...rest
}: ComponentPropsWithoutRef<typeof TypewriterText>) {
	return (
		<Text.Body ink="muted" width="md">
			<span aria-hidden="true">
				<TypewriterText
					{...(prefix !== undefined && { prefix })}
					words={words}
					{...rest}
				/>
			</span>
			<span className="sr-only">{`${prefix} ${Hobbies.join(", ")}`}.</span>
		</Text.Body>
	);
}
