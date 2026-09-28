import { assertNever, Text } from "@manoj-malviya-96/atom";
import type { ReactNode } from "react";
import { getBlob, type ValuesOf } from "@/lib/helper";
import type { ExternalURL, MediaSource } from "@/lib/types";

const AllProjectIds = [
	"wrapped",
	"atom",
	"muviz",
	"honeycomb",
	"topopt_py",
	"blackhole",
	"ev_sim",
	"mesha",
] as const;

export type ProjectId = ValuesOf<typeof AllProjectIds>;

export const Projects: Record<ProjectId, Project> = {
	wrapped: {
		title: "Wrapped",
		summary: (
			<>
				Life happens in photos, steps, sleep, and moments scattered across a
				dozen apps, and nobody actually looks back at it honestly. I wanted a
				recap that felt real instead of curated for Instagram, so I'm building{" "}
				<Text.Italic ink="blue" family="serif">
					Wrapped
				</Text.Italic>
				. Mainly build on SwiftUI, and Core Foundational Models with a
				postgressql based database.
			</>
		),
		startsAt: new Date("2026-08-01"),
		tags: ["mobile", "swift", "ai", "ui/ux"],
		effort: "medium",
		links: {
			primary: {
				kind: "demo",
				label: "Preview",
				href: "https://wrapped.vercel.app",
			},
			others: [],
		},
		media: [
			{
				kind: "image",
				src: getBlob("wrapped-1.png"),
				width: 1206,
				height: 2622,
				alt: "Wrapped's photo recap slide.",
			},
			{
				kind: "image",
				src: getBlob("wrapped-2.png"),
				width: 1206,
				height: 2622,
				alt: "Wrapped's stats slide for a past year.",
			},
		],
	},
	atom: {
		title: "Atom",
		summary: (
			<>
				I wanted Apple-grade design discipline: one visual language, everywhere.
				Every option out there made me choose between a CSS-in-JS styling
				library dragging its own runtime and CSS that throws out type safety. I
				got tired of choosing, so I built <Text.Bold>Atom</Text.Bold>:{" "}
				<Text.Italic>
					one primitive, one stylesheet, and a type system that generates
					straight from that stylesheet
				</Text.Italic>
				, so an invalid token can't compile.
			</>
		),
		startsAt: new Date("2025-01-01"),
		tags: ["react", "typescript", "web", "open-source", "ui/ux"],
		effort: "high",
		links: {
			primary: {
				kind: "demo",
				label: "Playground",
				href: "https://atom-two-tan.vercel.app",
			},
			others: [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/atom",
				},
			],
		},
		media: [
			{
				kind: "video",
				alt: "Atom framework demo",
				src: getBlob("atom.webm"),
				width: 3390,
				height: 2082,
				mockup: "macbook",
			},
		],
	},
	muviz: {
		title: "Muviz",
		summary: (
			<>
				I grew up watching Winamp react to whatever was playing, and I never
				stopped wanting that feeling back. So I'm building the real thing
				myself: a{" "}
				<Text.Bold>C++ DSP pipeline compiled to WebAssembly</Text.Bold>,
				analyzing each track once in a Web Worker and caching the result, so the
				Three.js scene reacts to{" "}
				<Text.Italic>real extracted features</Text.Italic> instead of an AI's
				guess.
			</>
		),
		startsAt: new Date("2026-01-01"),
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
		links: {
			primary: {
				kind: "demo",
				label: "Demo",
				href: "https://muviz.vercel.app/",
			},
			others: [],
		},
	},
	honeycomb: {
		title: "HoneyMesh",
		summary: (
			<>
				I kept needing hexagonal lattices for CAD work and got tired of
				triangulating them by hand, so I wrote a generator:{" "}
				<Text.Bold>
					a 2D skeleton graph in C++, extruded into a real VTK mesh
				</Text.Bold>
				. The part that kept breaking was{" "}
				<Text.Italic>staggering the hexagon centers</Text.Italic> — get that
				wrong and the whole grid drifts.
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
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
			},
			others: [],
		},
	},
	topopt_py: {
		title: "topopt-py",
		summary: (
			<>
				I found DTU's 99-line topology-optimization script and loved how compact
				it was, but the inner loop was nested Python. I rewrote the stiffness
				assembly and filtering as <Text.Bold>vectorized NumPy</Text.Bold>,
				keeping the same SIMP algorithm and accuracy but running faster on the
				same problem —{" "}
				<Text.Italic>
					caching the sparsity pattern instead of rebuilding it every iteration
				</Text.Italic>{" "}
				drops a 5,000-element run from 4.8s to 2.6s.
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
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/topopt-py/tree/master",
			},
			others: [
				{
					kind: "medium",
					href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
				},
			],
		},
	},
	blackhole: {
		title: "Blackhole",
		summary: (
			<>
				Gravity, rendered <Text.Italic>in real time</Text.Italic>, because I
				couldn't wait for the movie. A compute shader integrates each pixel's
				light-ray geodesic against a mass modeled on{" "}
				<Text.Bold>Sagittarius A* (4.3 million solar masses)</Text.Bold>, while
				a lensing fragment shader bends the background grid around it — running
				as a Qt/OpenGL widget so it rotates live instead of playing back a
				rendered clip.
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
				alt: "Cover art for the black hole renderer.",
			},
		],
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
			},
			others: [],
		},
	},
	ev_sim: {
		title: "EV Charging Simulator",
		summary: (
			<>
				I wanted to know how many chargers a lot actually needs before buying
				them, so I simulated a year of demand first:{" "}
				<Text.Bold>
					15-minute intervals with car arrivals drawn from a Poisson
					distribution per charge point
				</Text.Bold>
				, <Text.Italic>no queueing</Text.Italic> — a car that arrives to a busy
				point just leaves. Concurrency turned out to decay roughly exponentially
				as charger count grows.
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
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/ev-sim",
			},
			others: [],
		},
	},
	mesha: {
		title: "Mesha",
		summary: (
			<>
				Mesh repair, <Text.Italic>from the command line</Text.Italic> to a{" "}
				<Text.Bold>real editor</Text.Bold>.
			</>
		),
		startsAt: new Date("2025-01-01"),
		endsAt: new Date("2025-06-01"),
		tags: ["cad", "c++", "qt/qml", "rendering", "open-source"],
		effort: "low",
		links: {
			primary: {
				kind: "demo",
				label: "Preview",
				href: "https://mesha3.vercel.app",
			},
			others: [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/mesha",
				},
			],
		},
	},
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

type SoftwareConcepts = ValuesOf<typeof SOFTWARE_CONCEPTS>;
type SoftSkills = ValuesOf<typeof SOFT_SKILLS>;
type ProgrammingFrameworks = ValuesOf<typeof PROGRAMMING_FRAMEWORKS>;
type ProgrammingLanguage = ValuesOf<typeof PROGRAMMING_LANGUAGES>;

export const TAG_GROUPS = [
	{ label: "Languages", tags: PROGRAMMING_LANGUAGES },
	{ label: "Frameworks", tags: PROGRAMMING_FRAMEWORKS },
	{ label: "Domains", tags: SOFTWARE_CONCEPTS },
	{ label: "Practice", tags: SOFT_SKILLS },
] as const satisfies ReadonlyArray<{
	label: string;
	tags: readonly ProjectTag[];
}>;

export type ProjectTag =
	| ProgrammingFrameworks
	| ProgrammingLanguage
	| SoftwareConcepts
	| SoftSkills;

type ProjectEffort = "low" | "medium" | "high";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type InternalPath = `/${string}`;

export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL | InternalPath }
	| { kind: "external"; label: string; href: ExternalURL };

type ProjectLinks = {
	primary: ProjectLink;
	others: readonly ProjectLink[];
};

type ProjectMedia = readonly MediaSource[];

export type Project = {
	title: string;
	summary: ReactNode;
	/** Omit `endsAt` while the project is still in progress. */
	startsAt: Date;
	endsAt?: Date;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	media?: ProjectMedia;
	links: ProjectLinks;
};

export type ProjectSummary = Project & { id: ProjectId };

function showProject(id: ProjectId) {
	switch (id) {
		case "wrapped":
		case "atom":
		case "topopt_py":
		case "honeycomb":
		case "muviz":
		case "blackhole":
		case "ev_sim":
			return true;
		case "mesha":
			return false;
		default:
			assertNever(id);
	}
}

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

const VISIBLE_PROJECT_IDS = AllProjectIds.filter((id) => showProject(id));
const LATEST_STARTS_AT = Math.max(
	...VISIBLE_PROJECT_IDS.map((id) => Projects[id].startsAt.getTime()),
);

const isLatest = (project: Project) =>
	project.startsAt.getTime() === LATEST_STARTS_AT;

export const RankedProjects: readonly ProjectSummary[] =
	VISIBLE_PROJECT_IDS.map((id) => ({ id, ...Projects[id] })).sort((a, b) => {
		if (isLatest(a) !== isLatest(b)) return isLatest(a) ? -1 : 1;
		return EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort];
	});
