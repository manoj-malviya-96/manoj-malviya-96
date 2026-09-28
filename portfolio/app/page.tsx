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
			<PageHeroSection
				id="home-hero"
				direction="row"
				hAlign="between"
				stack
				padding={{ y: "xl" }}
			>
				<Flex direction="col" gap="lg">
					<PageHeroHeader>
						<Text.Hero>
							Hello
							<EmText> there! </EmText>
						</Text.Hero>
					</PageHeroHeader>
					<Text.Body width="md">
						I am <Text.Italic ink="blue">Manoj Malviya</Text.Italic>, a Lead
						Software Engineer at a{" "}
						<Link url="https://www.noah-labs.com/">
							<u>health-tech</u>
						</Link>{" "}
						startup.
						<br /> <br />
						Thank you for visiting my dungeon - where you can find all of my
						side projects; my thoughts and experiements; my interests and my
						career history.
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
				<div className="hero-media">
					<Media {...HeroImage} fill sizes="(min-width: 640px) 24rem, 16rem" />
				</div>
			</PageHeroSection>
			<PageSection id="home-feature" gap="lg">
				<Flex as="span" direction="row" vAlign="center" hAlign="between">
					<Text.Title family="serif">Featured</Text.Title>
					<Link url="/work">
						<Text.Body ink="muted">View all Projects</Text.Body>
					</Link>
				</Flex>

				<ShowAndTell />
				<Featured />
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
