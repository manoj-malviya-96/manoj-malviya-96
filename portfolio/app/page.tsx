"use client";

import { Flex, MagneticContainer, Text } from "@manoj-malviya-96/atom";
import { EmailAddress, HeroImage } from "@/lib/data";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import {
	ButtonRow,
	EmText,
	Link,
	Media,
	Page,
	PageHeroHeader,
	PageHeroSection,
	PageSection,
	PageSectionCard,
} from "@/lib/shared";

export default function Landing() {
	return (
		<Page>
			<PageHeroSection id="home-hero" direction="row" className="hero-row">
				<Flex direction="col" gap="lg">
					<PageHeroHeader>
						<Text.Hero className="hero-title">
							Hello
							<EmText> there </EmText>
						</Text.Hero>
					</PageHeroHeader>
					<Text.Body width="md">
						Hi there, I am <Text.Italic ink="blue">Manoj Malviya</Text.Italic>,
						a Lead Software engineer at a{" "}
						<Link url="https://www.noah-labs.com/">
							<u>Health Tech Startup</u>
						</Link>
						.
						<br /> <br />
						Thank you for visiting my dungeon - where you can find all of my
						side projects; my thoughts; my interests and my career history all
						in once place.
					</Text.Body>
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
				</Flex>
				<div className="media-slot hero-media">
					<Media {...HeroImage} sizes="(min-width: 768px) 40vw, 100vw" />
				</div>
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
