import type { ColorToken } from "@manoj-malviya-96/atom";
import { Badge, Flex, Grid, Typography } from "@manoj-malviya-96/atom";
import { LinkIcon } from "lucide-react";
import {
	EXPERIENCE_BY_RECENCY,
	getEmployer,
	getExperience,
	YEARS_EXPERIENCE,
} from "@/lib/about_me/work_experience";
import StatGrid from "@/lib/home/stat_grid";
import { getMeta } from "@/lib/projects/registry";
import { Link, MeshCanvas } from "@/lib/ui";
import { uniqueBy } from "@/lib/utils";

export default function Landing() {
	return (
		<Flex direction="col" style={{ gap: "16rem" }}>
			<MeshCanvas />
			<Hero />
			<Loop />
			<FeaturedWork />
		</Flex>
	);
}

function Hero() {
	return (
		<Flex direction="col" vAlign="end" gap="xl" className="hero-panel">
			<Flex
				as="header"
				direction="col"
				gap="lg"
				padding="xl"
				radius="lg"
				backgroundColor="surface"
				className="landing-hero"
			>
				<Typography variant="overline" className="font-mono">
					Software engineer, product-brained — Berlin, DE
				</Typography>
				<Typography variant="hero">
					I care about your users as much as your query plans
				</Typography>
				<Typography variant="subtitle">
					Seven years across hardware, creative tools, and ML — turning
					&quot;wouldn&apos;t it be nice if—&quot; into things that ship, and
					keep working. Mechanical engineer by degree, software engineer by
					trade, product person by compulsion.
				</Typography>
				<Flex direction="row" gap="xl" vAlign="center" hAlign="start" wrap>
					<Link
						url="#loop"
						variant="button"
						buttonVariant="filled"
						color="primary"
					>
						See how I work
					</Link>
					<Link url="/resume" variant="inline">
						Resume
					</Link>
				</Flex>
			</Flex>
			<Flex
				as="span"
				direction="row"
				hAlign="between"
				vAlign="center"
				gap="md"
				padding="lg"
				radius="md"
				backgroundColor="surface"
				wrap
				style={{
					backdropFilter: "var(--material-blur)",
				}}
			>
				<Flex as="span" direction="row" gap="sm" vAlign="center" wrap>
					<Typography variant="body">
						<strong>{YEARS_EXPERIENCE}+</strong> yrs shaping product & systems
					</Typography>
					<Typography variant="body" muted>
						·
					</Typography>
					<Typography variant="body">
						<strong>2×</strong> faster — topopt-py, modernized
					</Typography>
				</Flex>
				<Flex as="span" direction="row" gap="sm" wrap>
					{STACK.map((tech) => (
						<Badge key={tech} color="blue">
							{tech}
						</Badge>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}

function Loop() {
	return (
		<Flex as="section" id="loop" direction="col" gap="xl">
			<Flex direction="col" gap="sm">
				<Typography variant="overline" className="font-mono">
					How I work
				</Typography>
				<Typography variant="heading">
					Requirements in. Shipped, measured software out.
				</Typography>
				<Typography variant="body" muted>
					No middle-management jargon required — I just refuse to skip steps.
				</Typography>
			</Flex>
			<Grid columns={4} gap="md" className="loop-grid">
				{LOOP.map(({ color, stage, copy }) => (
					<Flex
						key={stage}
						direction="col"
						gap="sm"
						padding="lg"
						radius="lg"
						backgroundColor="surface"
						style={{
							backdropFilter: "var(--material-blur)",
						}}
					>
						{/* Todo fix this in Atom */}
						<Badge color={color} style={{ width: "max-content" }}>
							{stage}
						</Badge>
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
				<Typography variant="overline" className="font-mono">
					A few things I&apos;ve shipped
				</Typography>
				<Typography variant="heading">Proof, briefly.</Typography>
				<Typography variant="body" muted>
					The rest — plus the messy parts — live on the full work page.
				</Typography>
			</Flex>
			<Grid columns={2} gap="md" className="mini-work-grid">
				{FEATURED_WORK.map(({ title, blurb, href, cta }) => (
					<Link
						key={title}
						url={href}
						openNewTab={href.startsWith("http")}
						variant="button"
						padding="lg"
						radius="sm"
						color="secondary"
						direction="col" /* @ts-ignore fix in atom */
						hAlign="start"
					>
						<Typography variant="title">{title}</Typography>
						<Typography variant="body" muted grow>
							{blurb}
						</Typography>
						<Typography variant="label">{cta}</Typography>
					</Link>
				))}
			</Grid>
			<StatGrid />
			<WorkExHistory />
		</Flex>
	);
}

function WorkExHistory() {
	return (
		<Flex
			direction="row"
			hAlign="between"
			vAlign="center"
			gap="md"
			padding="lg"
		>
			<Flex direction="row" gap="sm" wrap>
				<Typography variant="body">
					Most recently at <strong>{getEmployer(TRACK[0]).name}</strong>
				</Typography>
				<Typography variant="body" muted>
					·
				</Typography>
				<Typography variant="body">
					previously <strong>{getEmployer(TRACK[1]).name}</strong>
				</Typography>
				<Typography variant="body" muted>
					·
				</Typography>
				<Typography variant="body">
					<strong>{getEmployer(TRACK[2]).name}</strong> before that
				</Typography>
			</Flex>
			<Link
				url="/resume"
				icon={<LinkIcon />}
				variant="button"
				color="secondary"
			>
				Full history
			</Link>
		</Flex>
	);
}

const LOOP: ReadonlyArray<{
	color: ColorToken;
	stage: string;
	copy: string;
}> = [
	{
		color: "blue",
		stage: "Discover",
		copy: "Before I open Figma or an editor, I want to know what's actually broken — for the user, not just the backlog.",
	},
	{
		color: "indigo",
		stage: "Design",
		copy: "A user flow and a database schema are just two ways of drawing the same decision. I try to get both right the first time. I don't always.",
	},
	{
		color: "green",
		stage: "Build",
		copy: "Correct, fast, maintainable — validated at the edges, profiled before optimized, built so future-me doesn't curse present-me.",
	},
	{
		color: "orange",
		stage: "Measure",
		copy: "Ship it, then actually look. About half of what I've built worked as planned. The other half taught me something more useful.",
	},
];

const FEATURED_WORK = [
	{
		title: getMeta("topopt_py").title,
		blurb:
			"Made a 40-year-old optimization algorithm fast again, out of pure spite for slow for-loops.",
		href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
		cta: "Read on Medium",
	},
	{
		title: getMeta("blackhole").title,
		blurb:
			"Built a real-time gravitational lensing simulator, because pre-rendered gravity felt like cheating.",
		href: "https://github.com/manoj-malviya-96/blackhole",
		cta: "View on GitHub",
	},
] as const;

const STACK = ["C++", "Swift", "TypeScript", "Python", "OpenGL"] as const;

const TRACK = uniqueBy(
	[...EXPERIENCE_BY_RECENCY],
	(experience) => getExperience(experience).organization,
).slice(0, 3);
