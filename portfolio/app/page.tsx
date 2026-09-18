import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { PHASE_IDS, type Phase, Phases } from "@/lib/data";
import { withDefaults } from "@/lib/helper";
import MeshCanvas from "@/lib/home/mesh_canvas";
import ShowAndTell from "@/lib/home/show_tell";
import Magnetic from "@/lib/magnetic";
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
			<Eyebrow>Senior product engineer · Berlin, DE</Eyebrow>
			<Text variant="hero">
				Manoj <Accent color="indigo">Malviya</Accent>
			</Text>
			<Text variant="body" muted>
				I combine systems engineering, computational design, and
				high-performance C++ with modern product UI to turn technically hard
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
				<Magnetic>
					<Link
						url="/work"
						variant="button"
						buttonVariant="filled"
						color="primary"
						size="sm"
						label="Personal Projects"
					/>
				</Magnetic>
				<Magnetic>
					<Link
						url="/resume"
						variant="button"
						buttonVariant="plain"
						size="sm"
						label="Past Experience"
					/>
				</Magnetic>
			</Flex>
		</HeroSection>
	);
}

function Loop() {
	return (
		<Section id="home-loop">
			<SectionHeader title="Complex problems in. Intelligent products out." />
			<Grid columns={4} gap="md">
				{PHASE_IDS.map((id, index) => (
					<Reveal key={id} delay={index * 120}>
						<PhaseCol index={index} {...Phases[id]} />
					</Reveal>
				))}
			</Grid>
		</Section>
	);
}

function PhaseCol({ index, label, copy }: { index: number } & Phase) {
	return (
		<Flex direction="col" gap="sm">
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
			<SectionHeader
				eyebrow="Shipped work"
				title="Proof, briefly."
				caption="A few things I've built, shipped, and measured"
			/>
			<ShowAndTell />
		</Section>
	);
}

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
