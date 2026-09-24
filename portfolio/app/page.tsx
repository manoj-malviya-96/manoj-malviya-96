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
import Reveal from "@/lib/reveal";
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
			<TypewriterText
				variant="body"
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
			<Text variant="body" muted width="md">
				I transform complex problems into intelligent products — focusing on
				correctness, then performance, then everything else.
			</Text>
			<Flex
				as="span"
				direction="row"
				gap="sm"
				vAlign="center"
				hAlign="start"
				wrap
			>
				<MagneticContainer>
					<Link
						url="/work"
						variant="button"
						color="primary"
						size="sm"
						label="View work →"
					/>
				</MagneticContainer>
				<MagneticContainer>
					<Link url="/about" variant="button" size="sm" label="About me" />
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
					<Reveal key={id}>
						<PhaseCol index={index} {...HowIWorkPhase[id]} />
					</Reveal>
				))}
			</Grid>
		</Section>
	);
}

function PhaseCol({ index, label, copy }: { index: number } & Phase) {
	return (
		<Flex
			as="span"
			direction="col"
			gap="sm"
			radius="lg"
			bg="surface"
			padding="md"
		>
			<Text variant="overline" mono>
				{String(index + 1).padStart(2, "0")}
			</Text>
			<Text variant="title">{label}</Text>
			<Text variant="body" muted>
				{copy}
			</Text>
		</Flex>
	);
}

function FeaturedWork() {
	return (
		<Section id="home-feature" gap="lg">
			<Flex as="span" direction="row" vAlign="center" hAlign="between">
				<Text variant="heading">Featured Work</Text>
				<Link url="/work" variant="inline">
					<Text variant="body" muted>
						View all Work
					</Text>
				</Link>
			</Flex>
			<Featured />
		</Section>
	);
}

function FinalCTA() {
	return (
		<Section id="home-cta" gap="lg">
			<Text variant="hero" align="center">
				Got a hard <EmText>problem ? </EmText>
			</Text>
			<Flex direction="col" gap="sm" hAlign="center">
				<MagneticContainer>
					<Link
						url={EmailAddress}
						variant="button"
						color="primary"
						label="Email me"
					/>
				</MagneticContainer>
				<Text variant="caption" mono muted selectable>
					{Email}
				</Text>
			</Flex>
		</Section>
	);
}
