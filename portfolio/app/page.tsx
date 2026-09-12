import { assertNever, Flex, Grid, Text } from "@manoj-malviya-96/atom";
import {
	IconBriefcase,
	IconChartLine,
	IconCode,
	IconLink,
	IconList,
	IconMagnifyingGlass,
	IconPalette,
} from "@manoj-malviya-96/atom/icons";
import { PHASE_IDS, type Phase, type PhaseId, Phases } from "@/lib/data";
import { dottedConcatString, withDefaults } from "@/lib/helper";
import HeroFaceCanvas from "@/lib/home/hero_face_canvas";
import ShowAndTellGrid from "@/lib/home/show_tell";
import {
	Eyebrow,
	InlineBadge,
	Link,
	Section,
	SectionHeader,
} from "@/lib/shared";

export default function Landing() {
	return (
		<>
			<HeroFaceCanvas />
			<Hero />
			<Loop />
			<FeaturedWork />
		</>
	);
}

function Hero() {
	return (
		<HeroSection id="home-hero">
			<Eyebrow>Senior product engineer 📍 Berlin, DE</Eyebrow>
			<Text variant="hero">Engineering Intelligent Products</Text>
			<Text variant="subtitle">
				Hey, I am Manoj Malviya{" "}
				{dottedConcatString([
					"Computation Design",
					"High Performance Software",
					"Product Engineering",
					"Multi Discipline Research",
				])}
			</Text>
			<Flex
				as="span"
				direction="row"
				gap="sm"
				vAlign="center"
				hAlign="start"
				wrap
			>
				<Link
					url="/projects"
					variant="button"
					buttonVariant="filled"
					color="secondary"
					size="sm"
					label="Projects"
					icon={<IconList />}
				/>
				<Link
					url="/resume"
					variant="button"
					buttonVariant="filled"
					color="primary"
					size="sm"
					label="Resume"
					icon={<IconBriefcase />}
				/>
			</Flex>
		</HeroSection>
	);
}

function Loop() {
	return (
		<Section id="home-loop">
			<SectionHeader
				eyebrow="How I work"
				title="Complex problems in. Intelligent products out."
				caption="Understand the problem. Build the right thing. Measure the result."
			/>
			<Grid columns={4} gap="md" className="loop-grid">
				{PHASE_IDS.map((id) => (
					<LoopCard key={id} id={id} {...Phases[id]} />
				))}
			</Grid>
		</Section>
	);
}

function LoopCard({ id, color, label, copy }: { id: PhaseId } & Phase) {
	const PhaseIcon = phaseIcon(id);
	return (
		<FlexCard direction="col">
			<InlineBadge color={color}>
				<PhaseIcon size="sm" />
				{label}
			</InlineBadge>
			<Text variant="body">{copy}</Text>
		</FlexCard>
	);
}

function FeaturedWork() {
	return (
		<Section id="home-feature" gap="lg">
			<SectionHeader
				eyebrow="Shipped work"
				title="Proof, briefly."
				caption="A few things I've built, shipped, and measured"
			/>
			<FlexCard direction="row">
				<Link
					url="/resume"
					icon={<IconLink />}
					variant="button"
					color="secondary"
					collapse
					label="Full history"
				/>
			</FlexCard>
			<ShowAndTellGrid />
		</Section>
	);
}

function phaseIcon(id: PhaseId) {
	switch (id) {
		case "discover":
			return IconMagnifyingGlass;
		case "design":
			return IconPalette;
		case "build":
			return IconCode;
		case "measure":
			return IconChartLine;
		default:
			assertNever(id);
	}
}

const FlexCard = withDefaults(Flex)({
	hAlign: "between",
	vAlign: "center",
	gap: "md",
	padding: "md",
	radius: "lg",
	bg: "surface",
	blur: true,
	wrap: true,
});

const HeroSection = withDefaults(Section)({
	as: "header",
	direction: "col",
	gap: "md",
	width: {
		max: "md",
	},
	variant: "plain",
	padding: {
		y: "lg",
	},
	vAlign: "between",
});
