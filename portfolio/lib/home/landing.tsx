import type { ColorToken } from "@manoj-malviya-96/atom";
import { Badge, Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { LinkIcon } from "lucide-react";
import NextLink from "next/link";
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
				<Text variant="overline" className="font-mono">
					Software engineer, product-brained — Berlin, DE
				</Text>
				<Text variant="hero">
					I care about your users as much as your query plans
				</Text>
				<Text variant="subtitle">
					Seven years across hardware, creative tools, and ML — turning
					&quot;wouldn&apos;t it be nice if—&quot; into things that ship, and
					keep working. Mechanical engineer by degree, software engineer by
					trade, product person by compulsion.
				</Text>
				<Flex direction="row" gap="xl" vAlign="center" hAlign="start" wrap>
					<Link
						url="#loop"
						variant="button"
						buttonVariant="filled"
						color="primary"
						label="See how I work"
					/>
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
					<Text variant="body">
						<strong>{YEARS_EXPERIENCE}+</strong> yrs shaping product & systems
					</Text>
					<Text variant="body" muted>
						·
					</Text>
					<Text variant="body">
						<strong>2×</strong> faster — topopt-py, modernized
					</Text>
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
				<Text variant="overline" className="font-mono">
					How I work
				</Text>
				<Text variant="heading">
					Requirements in. Shipped, measured software out.
				</Text>
				<Text variant="body" muted>
					No middle-management jargon required — I just refuse to skip steps.
				</Text>
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
						<Text variant="body">{copy}</Text>
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
				<Text variant="overline" className="font-mono">
					A few things I&apos;ve shipped
				</Text>
				<Text variant="heading">Proof, briefly.</Text>
				<Text variant="body" muted>
					The rest — plus the messy parts — live on the full work page.
				</Text>
			</Flex>
			<Grid columns={2} gap="md" className="mini-work-grid">
				{FEATURED_WORK.map(({ title, blurb, href, cta }) => {
					const external = href.startsWith("http");
					return (
						<Flex
							key={title}
							as={external ? "a" : NextLink}
							href={href}
							{...(external
								? { target: "_blank", rel: "noopener noreferrer" }
								: {})}
							direction="col"
							gap="sm"
							padding="lg"
							radius="sm"
							backgroundColor="raised"
							hAlign="start"
						>
							<Text variant="title">{title}</Text>
							<Text variant="body" muted grow>
								{blurb}
							</Text>
							<Text variant="label">{cta}</Text>
						</Flex>
					);
				})}
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
				<Text variant="body">
					Most recently at <strong>{getEmployer(TRACK[0]).name}</strong>
				</Text>
				<Text variant="body" muted>
					·
				</Text>
				<Text variant="body">
					previously <strong>{getEmployer(TRACK[1]).name}</strong>
				</Text>
				<Text variant="body" muted>
					·
				</Text>
				<Text variant="body">
					<strong>{getEmployer(TRACK[2]).name}</strong> before that
				</Text>
			</Flex>
			<Link
				url="/resume"
				icon={<LinkIcon />}
				variant="button"
				color="secondary"
				label="Full history"
			/>
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
