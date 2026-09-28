"use client";

import {
	type CarouselSlide,
	Flex,
	Grid,
	Image,
	ImageCarousel,
	Text,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	CurrentStatus,
	Hobbies,
	HowIWorkPhase,
	Interests,
	PHASE_IDS,
	type Phase,
	UserAvatar,
} from "@/lib/data";
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
							I'm {CurrentStatus.toLowerCase()}, based in Berlin. I ended up
							here by chasing the same question through a few very different
							industries: what happens when the interface between hardware and
							software is the part nobody wants to own. CAD kernels,
							patient-monitoring firmware, rendering pipelines that miss frame
							budget — the domains changed, the itch didn't.
						</Text.Body>
						<Text.Body>
							Outside of work I'm still doing the same thing at a smaller scale:{" "}
							{Interests.join(", ").toLowerCase()} on the technical side,{" "}
							{Hobbies.join(" and ").toLowerCase()} on the side that has nothing
							to do with a keyboard.
						</Text.Body>
					</Flex>
					<Image
						as={NextImage}
						src={UserAvatar}
						alt="Manoj Malviya"
						style={{ width: "12rem", height: "12rem", objectFit: "contain" }}
					/>
				</Flex>
			</PageSection>
			<ImageCarousel slides={Slides} aria-label="Slides" />
			<PageSection gap="lg">
				<Text.Heading>How I work.</Text.Heading>
				<Grid columns={2} className="loop-grid" gap="lg" padding="sm">
					{PHASE_IDS.map((id, index) => (
						<PhaseCol key={id} index={index} {...HowIWorkPhase[id]} />
					))}
				</Grid>
			</PageSection>
		</Page>
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

const Slides: CarouselSlide[] = [
	{
		alt: "dog",
		src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/250px-Rusty.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail1",
	},
	{
		alt: "dog2",
		src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/250px-Rusty.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail2",
	},
	{
		alt: "dog3",
		src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Rusty.jpg/250px-Rusty.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
	},
];
