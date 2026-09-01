import type { ColorToken } from "@manoj-malviya-96/atom";
import { Badge, Flex, Grid, Typography } from "@manoj-malviya-96/atom";
import { project as MuvizProject } from "@/lib/projects/list/muviz";
import { project as TopOptProject } from "@/lib/projects/list/topopt";
import { Link, MeshCanvas } from "@/lib/ui";

const LOOP: ReadonlyArray<{
	color: ColorToken;
	stage: string;
	copy: string;
}> = [
	{
		color: "blue",
		stage: "Discover",
		copy: "Talk to users, poke at the requirements, find the real problem before touching a keyboard.",
	},
	{
		color: "indigo",
		stage: "Design",
		copy: "UI/UX exploration and data-informed calls — sketch the user flow before it becomes code.",
	},
	{
		color: "green",
		stage: "Build",
		copy: "Correct, fast, maintainable, in that order. Ship the thing that works and keeps working.",
	},
	{
		color: "orange",
		stage: "Measure",
		copy: "Watch what actually happens. Keep what works, cut what doesn't, go again.",
	},
];

const FEATURED_WORK = [
	{
		title: TopOptProject.metadata.title,
		blurb:
			"A 40-year-old optimization algorithm, made 2x faster with nothing but better vectorization.",
		href: `/projects/${TopOptProject.id}`,
		cta: "Read the case study",
	},
	{
		title: MuvizProject.metadata.title,
		blurb:
			"A music visualizer with a C++ feature extractor doing the heavy lifting so the frontend can just render.",
		href: `/projects#${MuvizProject.id}`,
		cta: "See the project",
	},
] as const;

export default function Landing() {
	return (
		<Flex direction="col" gap="xl">
			<MeshCanvas />
			<Hero />
			<Loop />
			<FeaturedWork />
			<TrackStrip />
		</Flex>
	);
}

function Hero() {
	return (
		<Flex
			as="section"
			direction="col"
			gap="lg"
			hAlign="center"
			vAlign="center"
			className="landing-hero"
		>
			<Typography variant="overline" align="center">
				Product builder & tinkerer
			</Typography>
			<Typography variant="hero" align="center">
				I build things, then find out if they actually work.
			</Typography>
			<Typography variant="subtitle" align="center">
				Software engineer with a mechanical engineering brain — idea to shipped
				product, then back to the data to see what to fix next.
			</Typography>
			<Flex direction="row" gap="md" hAlign="center" vAlign="center" wrap>
				<Link url="/projects" padding="sm" radius="md" backgroundColor="brand">
					See the work
				</Link>
				<Link url="/resume" padding="sm" radius="md" backgroundColor="surface">
					Resume
				</Link>
			</Flex>
		</Flex>
	);
}

function Loop() {
	return (
		<Flex as="section" direction="col" gap="lg">
			<Flex direction="col" gap="sm">
				<Typography variant="overline">How it actually goes</Typography>
				<Typography variant="heading">
					Discover, design, build, measure — repeat
				</Typography>
			</Flex>
			<Grid columns={4} gap="md">
				{LOOP.map(({ color, stage, copy }) => (
					<Flex
						key={stage}
						direction="col"
						gap="sm"
						padding="lg"
						radius="md"
						backgroundColor="surface"
					>
						<Badge color={color}>{stage}</Badge>
						<Typography variant="body">{copy}</Typography>
					</Flex>
				))}
			</Grid>
		</Flex>
	);
}

function FeaturedWork() {
	return (
		<Flex as="section" direction="col" gap="lg">
			<Flex direction="col" gap="sm">
				<Typography variant="overline">Selected work</Typography>
				<Typography variant="heading">
					A couple of things I&apos;ve built
				</Typography>
			</Flex>
			<Flex direction="row" gap="md" wrap>
				{FEATURED_WORK.map(({ title, blurb, href, cta }) => (
					<Flex
						key={title}
						direction="col"
						gap="md"
						padding="lg"
						radius="md"
						backgroundColor="surface"
						grow
					>
						<Typography variant="title">{title}</Typography>
						<Typography variant="body" grow>
							{blurb}
						</Typography>
						<Link url={href} padding="sm" radius="md" backgroundColor="chrome">
							{cta}
						</Link>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
}

function TrackStrip() {
	return (
		<Flex
			as="section"
			direction="row"
			hAlign="between"
			vAlign="center"
			gap="md"
			padding="lg"
			radius="md"
			backgroundColor="surface"
			wrap
		>
			<Typography variant="body">
				A few years of CAD/CAM, rendering, and optimization work, distilled onto
				one page.
			</Typography>
			<Link url="/resume" padding="sm" radius="md" backgroundColor="brand">
				Full resume
			</Link>
		</Flex>
	);
}
