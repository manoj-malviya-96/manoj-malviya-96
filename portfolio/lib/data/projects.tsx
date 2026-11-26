import { Text } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";
import { getBlob, type ValuesOf } from "@/lib/helper";
import type { ExternalURL, MediaSource } from "@/lib/types";

export type ProjectId = ValuesOf<typeof AllProjectIds>;

export type ProjectTag =
	| ProgrammingFrameworks
	| ProgrammingLanguage
	| SoftwareConcepts
	| SoftSkills;

/**
 * Only list links that resolve. A GitHub link belongs here only if the repo is
 * public; a demo only if the deployment is live.
 */
export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL };

export type Project = {
	title: string;
	summary: ReactNode;
	/** Omit `endsAt` while the project is still in progress. */
	startsAt: Date;
	endsAt?: Date;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	media?: ProjectMedia;
	/** The first link is the primary action; may be empty for unreleased work. */
	links: readonly ProjectLink[];
};

export type ProjectSummary = Project & { id: ProjectId };

/** Native capture dimensions shared by the phone and desktop recordings. */
const mobileSize = { width: 1206, height: 2622 };
const webVideoSize = { width: 3390, height: 2082 };

type SoftwareConcepts = ValuesOf<typeof SOFTWARE_CONCEPTS>;
type SoftSkills = ValuesOf<typeof SOFT_SKILLS>;
type ProgrammingFrameworks = ValuesOf<typeof PROGRAMMING_FRAMEWORKS>;
type ProgrammingLanguage = ValuesOf<typeof PROGRAMMING_LANGUAGES>;

type ProjectEffort = "low" | "medium" | "high";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;

type ProjectMedia = readonly MediaSource[];

const AllProjectIds = [
	"wrapped",
	"atom",
	"muviz",
	"honeycomb",
	"topopt_py",
	"blackhole",
	"ev_sim",
	"suction_cup",
	"name_weave",
	"mosby",
] as const;

const wrappedProject: Project = {
	title: "Wrapped",
	summary: (
		<>
			Life is scattered across photos, steps, sleep and a dozen other apps, and
			nobody looks back at it honestly. <Text.Italic>Wrapped</Text.Italic> is a
			year-in-review that feels real instead of curated for Instagram. It is a{" "}
			<Text.Bold>native SwiftUI app</Text.Bold> that uses on-device Apple
			Foundation Models to turn your own data into recap slides, backed by a
			PostgreSQL database.
		</>
	),
	startsAt: new Date("2026-08-01"),
	tags: ["mobile", "swift", "ai", "ui/ux"],
	effort: "medium",
	links: [],
	media: [
		{
			mockup: "iphone",
			kind: "video",
			src: getBlob("wrapped.webm"),
			...mobileSize,
			alt: "Wrapped's recap flow running on an iPhone.",
		},
		{
			mockup: "iphone",
			kind: "image",
			src: getBlob("wrapped-1.png"),
			...mobileSize,
			alt: "Wrapped's photo recap slide.",
		},
	],
};

const mosbyProject: Project = {
	title: "Mosby",
	summary: (
		<>
			A web interface means learning a UI library, a styling system and a build
			pipeline, then keeping all three in sync. <Text.Italic>Mosby</Text.Italic>{" "}
			replaces them with one <Text.Bold>TypeScript-first UI language</Text.Bold>
			: describe the interface once with typed builders, themes and reactive
			state, and a Rust compiler emits semantic HTML, CSS in cascade layers and
			minimal JavaScript. A bad token or variant is a type error, never a
			runtime surprise.
		</>
	),
	startsAt: new Date("2026-09-01"),
	tags: ["typescript", "rust", "web", "ui-development"],
	effort: "high",
	links: [
		{ kind: "demo", label: "Live site", href: "https://mosby-fw.vercel.app" },
	],
	media: [
		{
			kind: "code",
			language: "typescript",
			filename: "app.ts",
			alt: "A Mosby counter screen written with typed builders.",
			code: `import { App, Button, Screen, Text, VStack, brandTheme } from "@mosby/ui";
import { state } from "@mosby/runtime";

export default App({ theme: brandTheme }, () =>
  Screen("Counter", () => {
    const count = state(0);

    return VStack(
      Text(() => \`Count: \${count.value}\`).style("heading"),
      Button("Add", () => count.value++).variant("primary"),
    ).spacing("md");
  }),
);`,
		},
	],
};

const suctionCupProject: Project = {
	title: "Suction Cup Simulation",
	summary: (
		<>
			In SLA 3D printing, a freshly cured layer can seal against the bottom of
			the resin tank and act like a suction cup during the peel motion. With no
			sharp edge to break the seal, peel force climbs and prints fail.
			<br /> <br />
			While optimizing a printer, I built this interactive tool out of
			curiosity, to show how a simple suction cup produces surprisingly complex
			behavior and powerful forces.
		</>
	),
	startsAt: new Date("2023-05-01"),
	endsAt: new Date("2023-05-04"),
	tags: ["simulation", "optimization", "web"],
	effort: "low",
	links: [
		{
			kind: "demo",
			label: "Try it",
			href: "https://suction-cup.vercel.app",
		},
	],
	media: [
		{
			kind: "video",
			src: getBlob("suction-cup.webm"),
			...webVideoSize,
			alt: "Simulation of Suction Cup",
		},
	],
};

const atomProject: Project = {
	title: "Atom",
	summary: (
		<>
			I wanted Apple-grade design discipline: one visual language, everywhere.
			Every option made me choose between a CSS-in-JS library that drags its own
			runtime, or plain CSS that throws away type safety. So I built{" "}
			<Text.Bold>Atom</Text.Bold>:{" "}
			<Text.Italic>
				one primitive, one stylesheet, and a type system generated straight from
				that stylesheet
			</Text.Italic>
			. An invalid token can't compile. This site is built with it.
		</>
	),
	startsAt: new Date("2025-01-01"),
	tags: ["react", "typescript", "web", "ui/ux"],
	effort: "high",
	links: [
		{ kind: "demo", label: "Playground", href: "https://atorn.vercel.app" },
	],
	media: [
		{
			kind: "video",
			alt: "Atom framework demo",
			src: getBlob("atom.webm"),
			...webVideoSize,
			mockup: "macbook",
		},
	],
};

const muvizProject: Project = {
	title: "Muviz",
	summary: (
		<>
			I grew up watching Winamp react to whatever was playing and never stopped
			wanting that feeling back. Muviz is a music visualizer built on a{" "}
			<Text.Bold>C++ DSP pipeline compiled to WebAssembly</Text.Bold>. It
			analyzes each track once in a Web Worker and caches the result, so the
			Three.js scene reacts to{" "}
			<Text.Italic>real extracted features</Text.Italic> instead of an AI's
			guess.
		</>
	),
	startsAt: new Date("2026-01-01"),
	endsAt: new Date("2026-09-01"),
	tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux", "threejs"],
	effort: "high",
	media: [
		{
			kind: "video",
			src: getBlob("muviz.webm"),
			width: 3594,
			height: 2052,
			alt: "Muviz reacting to a track in real time.",
		},
	],
	links: [
		{ kind: "demo", label: "Live demo", href: "https://muviz.vercel.app" },
	],
};

const honeycombProject: Project = {
	title: "HoneyMesh",
	summary: (
		<>
			I kept needing hexagonal lattices for CAD work and got tired of
			triangulating them by hand. HoneyMesh is a generator that builds{" "}
			<Text.Bold>
				a 2D skeleton graph in C++ and extrudes it into a real VTK mesh
			</Text.Bold>
			. The part that kept breaking was{" "}
			<Text.Italic>staggering the hexagon centers</Text.Italic>: get that wrong
			and the whole grid drifts.
		</>
	),
	startsAt: new Date("2025-01-01"),
	endsAt: new Date("2025-12-01"),
	tags: ["rendering", "high-performance", "open-source", "c++", "vtk", "cad"],
	effort: "medium",
	media: [
		{
			kind: "video",
			src: getBlob("honeycomb_demo.webm"),
			width: 1920,
			height: 1080,
			alt: "A honeycomb lattice generated and rendered in VTK.",
		},
	],
	links: [
		{ kind: "github", href: "https://github.com/manoj-malviya-96/honeycomb" },
	],
};

const topoptPyProject: Project = {
	title: "topopt-py",
	summary: (
		<>
			DTU's 99-line topology-optimization script is wonderfully compact, but its
			inner loop is nested Python. I rewrote the stiffness assembly and
			filtering as <Text.Bold>vectorized NumPy</Text.Bold>, keeping the same
			SIMP algorithm and accuracy.{" "}
			<Text.Italic>
				Caching the sparsity pattern instead of rebuilding it every iteration
			</Text.Italic>{" "}
			cuts a 5,000-element run from 4.8s to 2.6s.
		</>
	),
	startsAt: new Date("2021-01-01"),
	endsAt: new Date("2021-12-01"),
	tags: ["simulation", "optimization", "high-performance", "python"],
	effort: "medium",
	media: [
		{
			kind: "video",
			src: getBlob("pixel-opt.webm"),
			width: 320,
			height: 240,
			alt: "A topology optimization converging on a solution.",
		},
	],
	links: [
		{ kind: "demo", label: "Live demo", href: "https://topopt-py.vercel.app" },
		{ kind: "github", href: "https://github.com/manoj-malviya-96/topopt-py" },
		{
			kind: "medium",
			href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
		},
	],
};

const blackholeProject: Project = {
	title: "Blackhole",
	summary: (
		<>
			Gravity, rendered <Text.Italic>in real time</Text.Italic>. A compute
			shader integrates each pixel's light-ray geodesic around a mass modeled on{" "}
			<Text.Bold>Sagittarius A* (4.3 million solar masses)</Text.Bold>, and a
			lensing fragment shader bends the background grid around it. It runs as a
			Qt/OpenGL widget, so you can rotate the view live instead of watching a
			pre-rendered clip.
		</>
	),
	startsAt: new Date("2026-01-01"),
	endsAt: new Date("2026-06-01"),
	tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
	effort: "high",
	media: [
		{
			kind: "video",
			src: getBlob("blackhole.webm"),
			width: 640,
			height: 480,
			alt: "The black hole renderer bending a background grid.",
		},
	],
	links: [
		{ kind: "github", href: "https://github.com/manoj-malviya-96/blackhole" },
	],
};

const evSimProject: Project = {
	title: "EV Charging Simulator",
	summary: (
		<>
			How many chargers does a lot actually need? Before buying any, I simulated
			a year of demand:{" "}
			<Text.Bold>
				15-minute intervals, with car arrivals drawn from a Poisson distribution
				per charge point
			</Text.Bold>
			, and <Text.Italic>no queueing</Text.Italic>, so a car that finds a busy
			point just leaves. Concurrency decays roughly exponentially as charger
			count grows.
		</>
	),
	startsAt: new Date("2024-01-01"),
	endsAt: new Date("2024-12-01"),
	tags: ["web", "react", "typescript", "tailwind", "simulation", "ui/ux"],
	effort: "medium",
	media: [
		{
			kind: "image",
			src: "https://github.com/user-attachments/assets/d8adc197-ee42-406b-bed8-8892df091d47",
			width: 2612,
			height: 1392,
			alt: "The EV charging simulator's request/response UI, showing simulation results as charts.",
		},
	],
	links: [
		{ kind: "github", href: "https://github.com/manoj-malviya-96/ev-sim" },
	],
};

const nameWeaveProject: Project = {
	title: "NameWeave",
	summary: (
		<>
			A nameplate that reads one name from the left diagonal and a different
			name from the right. Each letter pair is two glyph outlines from
			opentype.js, <Text.Bold>extruded, rotated ±45° and intersected</Text.Bold>{" "}
			with Manifold's WASM booleans, so what survives reads as one letter from
			each side.
			<br /> <br /> It all runs in the browser: a Web Worker builds the mesh,
			Three.js previews it, and a binary STL comes out ready to print.{" "}
			<Text.Italic>Not every pair works</Text.Italic>. Some letter combinations
			leave no usable solid, and the app names the pair instead of faking one.
		</>
	),
	startsAt: new Date("2024-07-01"),
	endsAt: new Date("2024-07-03"),
	tags: ["web", "react", "typescript", "threejs", "wasm", "rendering", "cad"],
	effort: "medium",
	media: [
		{
			kind: "video",
			src: getBlob("name-weave.webm"),
			...webVideoSize,
			alt: "NameWeave previewing a nameplate that reads a different name from each diagonal.",
		},
	],
	links: [
		{ kind: "demo", label: "Try it", href: "https://name-weave.vercel.app" },
	],
};

export const Projects: Record<ProjectId, Project> = {
	wrapped: wrappedProject,
	atom: atomProject,
	muviz: muvizProject,
	honeycomb: honeycombProject,
	topopt_py: topoptPyProject,
	blackhole: blackholeProject,
	ev_sim: evSimProject,
	suction_cup: suctionCupProject,
	name_weave: nameWeaveProject,
	mosby: mosbyProject,
};

const SOFTWARE_CONCEPTS = [
	"web",
	"mobile",
	"ai",
	"rendering",
	"open-source",
	"high-performance",
	"gpu",
	"optimization",
	"cad",
	"simulation",
	"ui-development",
	"a/b testing",
	"micro-services",
] as const;

const SOFT_SKILLS = [
	"communication",
	"ui/ux",
	"project-management",
	"devops",
	"testing",
] as const;

const PROGRAMMING_FRAMEWORKS = [
	"react",
	"nextjs",
	"qt/qml",
	"tailwind",
	"vtk",
	"numpy",
	"pytorch",
	"tensorflow",
	"wasm",
	"threejs",
	"opengl",
] as const;

const PROGRAMMING_LANGUAGES = [
	"typescript",
	"python",
	"rust",
	"go",
	"c++",
	"swift",
] as const;

export const TAG_GROUPS = [
	{ label: "Languages", tags: PROGRAMMING_LANGUAGES },
	{ label: "Frameworks", tags: PROGRAMMING_FRAMEWORKS },
	{ label: "Domains", tags: SOFTWARE_CONCEPTS },
	{ label: "Practice", tags: SOFT_SKILLS },
] as const satisfies ReadonlyArray<{
	label: string;
	tags: readonly ProjectTag[];
}>;

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

export const RankedProjects: readonly ProjectSummary[] = rankProjects();

/** Highest effort first; within the same effort, the most recently started. */
function rankProjects(): readonly ProjectSummary[] {
	return AllProjectIds.map((id) => ({ id, ...Projects[id] })).sort(
		(a, b) =>
			EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort] ||
			b.startsAt.getTime() - a.startsAt.getTime(),
	);
}
