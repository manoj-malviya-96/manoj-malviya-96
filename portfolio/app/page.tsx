import {
	assertNever,
	Badge,
	Flex,
	Grid,
	invoke,
	Text,
} from "@manoj-malviya-96/atom";
import {
	IconChartLine,
	IconCode,
	IconLink,
	IconMagnifyingGlass,
	IconPalette,
} from "@manoj-malviya-96/atom/icons";
import {
	EXPERIENCE_BY_RECENCY,
	getEmployer,
	getExperience,
	getPhase,
	PHASE_IDS,
	type PhaseId,
} from "@/lib/data";
import { dottedConcatString, uniqueBy } from "@/lib/helper";
import MeshCanvas from "@/lib/home/mesh_canvas";
import ShowAndTellGrid from "@/lib/home/show_tell";
import { Eyebrow, Link, Section, SectionHeader, styled } from "@/lib/shared";

export default function Landing() {
	return (
		<>
			<MeshCanvas />
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
				Over <Badge as="span">7+ years </Badge>, I’ve worked across research,
				software, AI, and computational design to build products that push the
				boundaries of what’s possible. I love taking complex problems from first
				principles and turning them into fast, intuitive, real-world
				experiences.
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
					url="#loop"
					variant="button"
					buttonVariant="filled"
					color="secondary"
					size="sm"
					label="See how I work"
				/>
				<Link
					url="/resume"
					variant="button"
					buttonVariant="filled"
					color="primary"
					size="sm"
					label="Past work"
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
					<LoopCard key={id} id={id} {...getPhase(id)} />
				))}
			</Grid>
		</Section>
	);
}

function LoopCard({
	id,
	color,
	label,
	copy,
}: { id: PhaseId } & ReturnType<typeof getPhase>) {
	const PhaseIcon = invoke(() => {
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
	});
	return (
		<StyledFlex direction="col">
			<Badge color={color} width="fit" padding="sm">
				<PhaseIcon size="sm" />
				{label}
			</Badge>
			<Text variant="body">{copy}</Text>
		</StyledFlex>
	);
}

function FeaturedWork() {
	return (
		<Section id="home-feature" gap="lg">
			<SectionHeader
				eyebrow="Shipped work"
				title="Proof, briefly."
				caption="The messy parts live on the full work page."
			/>
			<WorkExHistory />
			<ShowAndTellGrid />
		</Section>
	);
}

function WorkExHistory() {
	const workExp = uniqueBy(
		[...EXPERIENCE_BY_RECENCY],
		(experience) => getExperience(experience).organization,
	).slice(0, 3);
	const stringToRender = dottedConcatString(
		workExp.map((experience) => getEmployer(experience).name),
	);

	return (
		<StyledFlex direction="row">
			{stringToRender}
			<Link
				url="/resume"
				icon={<IconLink />}
				variant="button"
				color="secondary"
				collapse
				label="Full history"
			/>
		</StyledFlex>
	);
}

const StyledFlex = styled(Flex)({
	hAlign: "between",
	vAlign: "center",
	gap: "md",
	padding: "lg",
	radius: "lg",
	bg: "surface",
	blur: true,
	wrap: true,
});

const HeroSection = styled(Section)({
	as: "header",
	direction: "col",
	gap: "lg",
	width: {
		max: "lg",
	},
	variant: "plain",
	padding: {
		y: "lg",
	},
	vAlign: "between",
});
