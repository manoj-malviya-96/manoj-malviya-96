"use client";

import {
	Atom,
	type CarouselSlide,
	Flex,
	ImageCarousel,
	Text,
} from "@manoj-malviya-96/atom";
import { getBlob } from "@/lib/helper";
import {
	EmText,
	Eyebrow,
	Page,
	PageHeroHeader,
	PageSection,
} from "@/lib/shared";

export default function AboutPage() {
	return (
		<Page>
			<PageHeroHeader>
				<Eyebrow>About</Eyebrow>
				<Text.Heading as="h1">
					The <EmText>Person</EmText>
				</Text.Heading>
			</PageHeroHeader>
			<PageSection gap="md">
				<Flex direction="row" gap="lg" hAlign="start">
					<Flex direction="col" gap="md">
						<Text.Body>
							Hello there again! Wow, you really are stalking me — fine, here's
							my story.
							<br />I was born in Udaipur, a small town in India, and grew up
							like most middle-class kids do: pressure, ideal-life aspirations,
							and a stubborn streak of passion. Somewhere along the way I picked
							up a habit of solving problems in an elegant, thorough way — no
							half measures. I still aim to be efficient about it, though.
							<br />
							<strong>Controversial opinions</strong>, since you asked: maths is
							the language of the universe, sleep is everything, AI is a tool,
							20% of the work drives 80% of the impact, and the butterfly effect
							is real.
							<br />
							Outside of work I'm doing the same thing at a smaller scale —
							generative design, real-time rendering, and robotics keep my hands
							busy on the technical side; DJing part-time, 3D printing, and
							photography keep them busy everywhere else.
						</Text.Body>
					</Flex>
				</Flex>
			</PageSection>
			<Atom margin={{ x: "auto" }} width="md" padding="lg">
				<ImageCarousel slides={Slides} aria-label="Slides" ratio="portrait" />
			</Atom>
		</Page>
	);
}

const Slides: CarouselSlide[] = [
	{
		alt: "DJing",
		src: getBlob("about-1.jpg"),
	},
	{
		alt: "DJing",
		src: getBlob("about-2.jpg"),
	},
	{
		alt: "App development in Swift UI at my fav place - called any cafe in world",
		src: getBlob("about-3.jpg"),
	},
	{
		alt: "Before AI, there was whiteboard and a nightowl solving complex linear algebra to get the patent",
		src: getBlob("about-5.jpg"),
	},
	{
		alt: "Hypothesised a true agentic workflow for better problem solving in Oct 2019",
		src: getBlob("about-6.jpg"),
	},
];
