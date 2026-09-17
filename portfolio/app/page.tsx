import { assertNever, Flex, Grid, Text } from "@manoj-malviya-96/atom";
import {
	IconChartLine,
	IconCode,
	IconMagnifyingGlass,
	IconPalette,
} from "@manoj-malviya-96/atom/icons";
import { Page } from "@manoj-malviya-96/atom/system";
import { PHASE_IDS, type Phase, type PhaseId, Phases } from "@/lib/data";
import { withDefaults } from "@/lib/helper";
import MeshCanvas from "@/lib/home/mesh_canvas";
import ShowAndTell from "@/lib/home/show_tell";
import Reveal from "@/lib/reveal";
import { Accent, Eyebrow, Link, Section, SectionHeader } from "@/lib/shared";

export default function Landing() {
	return (
		<Page variant="content">
			<MeshCanvas />
			<Hero />
			<Loop />
			<FeaturedWork />
		</Page>
	);
}

function Hero() {
	return (
		<HeroSection id="home-hero">
			<Eyebrow> Senior product engineer 📍 Berlin, DE</Eyebrow>
			<Text variant="hero">
				Building <Accent color="indigo">intelligent products</Accent> people
				actually use.
			</Text>
			<Text variant="subtitle">
				I'm Manoj Malviya. I combine systems engineering, computational design,
				and high-performance C++ with modern product UI to turn technically hard
				problems into fast, intuitive products.
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
					size="sm"
					label="Personal Projects"
				/>
				<Link
					url="/resume"
					variant="button"
					buttonVariant="filled"
					color="primary"
					size="sm"
					label="Past Experience"
				/>
			</Flex>
		</HeroSection>
	);
}

function Loop() {
	return (
		<Section id="home-loop">
			<SectionHeader title="Complex problems in. Intelligent products out." />
			<Grid columns={4} gap="md" className="loop-grid">
				{PHASE_IDS.map((id) => (
					<Reveal key={id}>
						<LoopCard id={id} {...Phases[id]} />
					</Reveal>
				))}
			</Grid>
		</Section>
	);
}

function LoopCard({ id, label, copy }: { id: PhaseId } & Phase) {
	const PhaseIcon = phaseIcon(id);
	return (
		<FlexCard direction="col" className="hover-card">
			<Flex as="span" hAlign="start" gap="sm" vAlign="center" direction="row">
				<PhaseIcon size="sm" />
				<Text variant="title">{label}</Text>
			</Flex>
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
			<ShowAndTell />
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
