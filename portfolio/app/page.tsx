"use client";

import {
	Flex,
	Grid,
	MagneticContainer,
	Text,
	TypewriterText,
} from "@manoj-malviya-96/atom";
import {
	CurrentStatus,
	Email,
	EmailAddress,
	Hobbies,
	HowIWorkPhase,
	Patents,
	PHASE_IDS,
	type Phase,
	ResumePDF,
	RoleTagline,
	YearsOfExperience,
} from "@/lib/data";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import {
	EmText,
	Eyebrow,
	Link,
	Page,
	PageHero,
	PageSection,
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
			heroTitle
			eyebrow="Berlin, DE"
			title={
				<>
					Manoj
					<EmText> Malviya </EmText>
				</>
			}
			aside={<HeroStats />}
			vAlign="center"
			padding={{ y: "xl" }}
		>
			<Text.Body>
				{RoleTagline[0]?.toUpperCase()}
				{RoleTagline.slice(1)}. Currently {CurrentStatus}.
			</Text.Body>
			<Text.Body ink="muted" width="md">
				<span aria-hidden="true">
					<TypewriterText prefix="Also into" words={Hobbies} />
				</span>
				<span className="sr-only">Also into {Hobbies.join(", ")}.</span>
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
				<MagneticContainer>
					<Link.Button url={ResumePDF} openNewTab size="sm" label="Resume" />
				</MagneticContainer>
			</Flex>
		</PageHero>
	);
}

function HeroStats() {
	const stats = [
		{ value: Patents.length, caption: "Patents" },
		{ value: YearsOfExperience, caption: "Years" },
	];

	return (
		<Flex direction="col" gap="sm" className="hero-stats">
			{stats.map((stat) => (
				<Flex
					key={stat.caption}
					as="span"
					direction="row"
					gap="sm"
					vAlign="center"
					bg="surface"
					blur
					radius="lg"
					card
					padding={{ x: "lg", y: "sm" }}
				>
					<Text.Title>{stat.value}</Text.Title>
					<Text.Overline mono ink="muted">
						{stat.caption}
					</Text.Overline>
				</Flex>
			))}
		</Flex>
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
