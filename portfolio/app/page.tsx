import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { Page } from "@manoj-malviya-96/atom/system";
import { PHASE_IDS, type Phase, Phases } from "@/lib/data";
import { withDefaults } from "@/lib/helper";
import Featured from "@/lib/home/featured";
import ShowAndTell from "@/lib/home/show_tell";
import Magnetic from "@/lib/magnetic";
import Reveal from "@/lib/reveal";
import { Accent, Eyebrow, Link, Section, SectionHeader } from "@/lib/shared";
import TypeWriter from "@/lib/typewriter";

export default function Landing() {
	return (
		<Page variant="content" gap="xl">
			<Hero />
			<Loop />
			<FeaturedWork />
		</Page>
	);
}

function Hero() {
	return (
		<HeroSection id="home-hero" gap="lg">
			<Eyebrow>Berlin, DE</Eyebrow>
			<Text variant="hero">
				<Accent color="indigo">Manoj Malviya </Accent>
			</Text>

			<TypeWriter
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
			<Text variant="body" muted>
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
						buttonVariant="filled"
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
			<SectionHeader title="Proof, briefly." />
			<ShowAndTell />
			<Featured />
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
