import {
	Badge,
	type ColorToken,
	Flex,
	List,
	Text,
} from "@manoj-malviya-96/atom";
import {
	IconLightbulb,
	IconPaintBrush,
	IconVolumeHigh,
} from "@manoj-malviya-96/atom/icons";
import type { StaticImageData as LocalImage } from "next/image";
import type { ReactNode } from "react";
import type { ValuesOf } from "@/lib/helper";
import type { ExternalURL } from "@/lib/types";
import trussOptScreenshot from "./truss-opt-screenshot.png";

export const AllProjectIds = [
	"portfolio",
	"atom",
	"muviz",
	"honeycomb",
	"topopt_py",
	"blackhole",
	"ev_sim",
	"mesha",
	"simphy",
	"truss_opt",
] as const;

export type ProjectId = ValuesOf<typeof AllProjectIds>;

export const Projects: Record<ProjectId, Project> = {
	portfolio: {
		title: "Portfolio",
		summary: "The portfolio, describing itself.",
		dates: "2025",
		tags: [
			"web",
			"open-source",
			"nextjs",
			"react",
			"typescript",
			"ui/ux",
			"rendering",
		],
		effort: "medium",
		media: {
			kind: "video",
			src: getBlob("portfolio.webm"),
			alt: "This portfolio’s interactive landing page in motion.",
		},
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
			},
			others: [
				{
					kind: "external",
					label: "Previous version",
					href: "https://manoj-malviya-96.github.io/",
				},
			],
		},
		content: (
			<Flex direction="col" gap="sm">
				<Text variant="body" muted>
					Every project I've built, in one catalog — searchable by title, tags,
					or description as you type. Fuse.js runs client-side, so there's no
					server round trip.
				</Text>
			</Flex>
		),
	},
	atom: {
		title: "Atom",
		summary: `I wanted Apple-grade design discipline: one visual language, everywhere.
					Every option out there made me choose, a JS-in-JS styling library dragging its own runtime,
					or CSS that throws out type safety. I got tired of choosing, so I built Atom: one primitive,
					one stylesheet, and a type system that actually checks it.`,
		dates: "2024–2025",
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
		content: (
			<List direction="col" gap="md">
				<li>
					<Text variant="body">
						✅ Styling and motion live in CSS, never JS-in-JS, so nothing pays a
						runtime cost.
					</Text>
				</li>
				<li>
					<Text variant="body">
						✅ Types generate straight from that CSS, so an illegal token can't
						compile. Scripts catch what the type system can't.
					</Text>
				</li>
				<li>
					<Text variant="body">
						✅ 20 KB gzipped for the core. Charts and system components ship
						separately, each under its own budget.
					</Text>
				</li>
			</List>
		),
	},
	muviz: {
		title: "Muviz",
		summary: `I grew up watching Winamp react to whatever was playing, and I never
					stopped wanting that feeling back. So I’m building the real thing
					myself: no AI, no faking it, just DSP that actually understands the
					music.`,
		dates: "2023",
		tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux", "threejs"],
		effort: "high",
		media: {
			kind: "video",
			src: getBlob("muviz.webm"),
			alt: "Muviz reacting to a track in real time.",
		},
		links: {
			primary: {
				kind: "demo",
				label: "Demo",
				href: "https://muviz.vercel.app/",
			},
			others: [],
		},
		content: (
			<List direction="col" gap="md">
				<Flex as="li" direction="row" gap="md" vAlign="center">
					<IconVolumeHigh />
					<Text variant="body">
						A C++ pipeline (FFT, onset detection, key and rhythm extraction)
						compiles to WebAssembly and analyzes a track once, in a Web Worker,
						off the main thread.
					</Text>
				</Flex>
				<Flex as="li" direction="row" gap="md" vAlign="center">
					<IconLightbulb />
					<Text variant="body">
						Every analyzed track is cached in IndexedDB by content hash, so
						replaying it or re-adding the file skips analysis entirely.
					</Text>
				</Flex>
				<Flex as="li" direction="row" gap="md" vAlign="center">
					<IconPaintBrush />
					<Text variant="body">
						The Three.js scene never touches audio directly. It’s just a pure
						function of the extracted features and playback time, so scrubbing
						and switching tracks come for free.
					</Text>
				</Flex>
			</List>
		),
	},
	honeycomb: {
		title: "HoneyMesh",
		summary: "Because hexagons are just better, structurally speaking.",
		dates: "2022",
		tags: ["rendering", "high-performance", "open-source", "c++", "vtk", "cad"],
		effort: "medium",
		media: {
			kind: "video",
			src: getBlob("honeycomb_demo.webm"),
			alt: "A honeycomb lattice generated and rendered in VTK.",
		},
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
			},
			others: [],
		},
		content: (
			<Text variant="body">
				Give it a shape, get back a honeycomb lattice — skeletonized in C++ and
				exported straight to a VTK mesh, ready for your CAD tool. No manual
				triangulation, no format conversion.
			</Text>
		),
	},
	topopt_py: {
		title: "topopt-py",
		summary: `Same 40-year-old topology-optimization algorithm, rewritten to
					actually be fast: the solver's inner loop runs as array operations in
					NumPy instead of nested Python loops -
					2x faster same accuracy, bigger
					problems.`,
		dates: "2021",
		tags: ["simulation", "optimization", "high-performance", "python"],
		effort: "high",
		media: {
			kind: "video",
			src: getBlob("optimization.webm"),
			alt: "A topology optimization converging on a solution.",
		},
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
		summary:
			"Gravity, rendered in real time, because I couldn't wait for the movie.",
		dates: "2023",
		tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
		effort: "high",
		media: {
			kind: "image",
			src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1600&fit=crop",
			alt: "Cover art for the black hole renderer.",
		},
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
			},
			others: [],
		},
		content: (
			<Text variant="body">
				Simulates real black-hole gravity — a raymarching shader that
				numerically integrates light-ray geodesics per pixel, fast enough to
				rotate live instead of watching a pre-rendered clip.
			</Text>
		),
	},
	ev_sim: {
		title: "EV Charging Simulator",
		summary: "How many chargers do you actually need? Simulate it first.",
		dates: "2024",
		tags: ["web", "react", "typescript", "tailwind", "simulation", "ui/ux"],
		effort: "medium",
		media: {
			kind: "image",
			src: "https://github.com/user-attachments/assets/d8adc197-ee42-406b-bed8-8892df091d47",
			alt: "The EV charging simulator's request/response UI, showing simulation results as charts.",
		},
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/ev-sim",
			},
			others: [],
		},
		content: (
			<Text variant="body">
				Answers one question: how many chargers do you actually need? Change the
				inputs — charger count, power draw — and watch demand, cost, and
				concurrency update immediately.
			</Text>
		),
	},
	mesha: {
		title: "Mesha",
		summary: "Mesh repair, from the command line to a real editor.",
		dates: "2025",
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
		content: (
			<List as="ol" direction="col" gap="xs">
				{statusItem(
					"green",
					"Done",
					"CLI — mesh repair as a standalone command-line tool.",
				)}
				{statusItem(
					"green",
					"Done",
					"Server — same C++/Qt backend, exposed over WebSocket.",
				)}
				{statusItem(
					"green",
					"Done",
					"Editor — Tauri + Next.js shell, wired end to end.",
				)}
				{statusItem(
					"orange",
					"Next",
					"Repair algorithm — the actual mesh-repair logic.",
				)}
			</List>
		),
	},
	simphy: {
		title: "Simphy",
		summary: "Simulating the universe. Literally, eventually.",
		dates: "2025",
		tags: ["simulation", "c++", "open-source"],
		effort: "low",
		links: {
			primary: {
				kind: "github",
				href: "https://github.com/manoj-malviya-96/simphy",
			},
			others: [],
		},
		content: (
			<Flex direction="row" gap="xs" vAlign="start">
				<Badge color="orange">In progress</Badge>
				<Text variant="body">
					C++ core scaffolded, no rendering layer committed yet.
				</Text>
			</Flex>
		),
	},
	truss_opt: {
		title: "Truss Optimizer",
		summary: "Draw a truss. Watch it optimize itself.",
		dates: "2025",
		tags: ["simulation", "optimization", "web", "react", "typescript"],
		effort: "medium",
		media: {
			kind: "image",
			src: trussOptScreenshot,
			alt: "The truss optimizer mid-run: a cantilever lattice colored by member stress.",
		},
		links: {
			primary: {
				kind: "demo",
				label: "Try it",
				href: "/demos/truss-opt",
			},
			others: [],
		},
		content: (
			<Text variant="body">
				Place supports and loads on a cantilever lattice and this site's own API
				route solves the FEA and runs an optimality-criteria search to
				redistribute material — the browser only ever draws the answer.
			</Text>
		),
	},
};

type SoftwareConcepts =
	| "web"
	| "mobile"
	| "ai"
	| "rendering"
	| "open-source"
	| "high-performance"
	| "gpu"
	| "optimization"
	| "cad"
	| "simulation"
	| "ui-development"
	| "a/b testing"
	| "micro-services";

type SoftSkills =
	| "communication"
	| "ui/ux"
	| "project-management"
	| "devops"
	| "testing";

type ProgrammingFrameworks =
	| "react"
	| "nextjs"
	| "qt/qml"
	| "tailwind"
	| "vtk"
	| "numpy"
	| "pytorch"
	| "tensorflow"
	| "wasm"
	| "threejs"
	| "opengl";

type ProgrammingLanguage =
	| "typescript"
	| "python"
	| "rust"
	| "go"
	| "c++"
	| "swift";

export type ProjectTag =
	| ProgrammingFrameworks
	| ProgrammingLanguage
	| SoftwareConcepts
	| SoftSkills;

export type ProjectEffort = "low" | "medium" | "high";

export type ProjectMedia =
	| { kind: "image"; src: LocalImage | string; alt: string }
	| { kind: "video"; src: string; alt: string };

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type InternalPath = `/${string}`;

export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL | InternalPath }
	| { kind: "external"; label: string; href: ExternalURL };

export type ProjectLinks = {
	primary: ProjectLink;
	others: readonly ProjectLink[];
};

export type Project = {
	title: string;
	summary: string;
	dates: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	media?: ProjectMedia;
	links: ProjectLinks;
	content?: ReactNode;
};

export type ProjectSummary = Project & { id: ProjectId };

const HIDDEN_PROJECT_IDS: readonly ProjectId[] = [
	"blackhole",
	"simphy",
	"mesha",
];

const EFFORT_RANK: Record<ProjectEffort, number> = {
	high: 3,
	medium: 2,
	low: 1,
};

export const RankedProjects: readonly ProjectSummary[] = AllProjectIds.filter(
	(id) => !HIDDEN_PROJECT_IDS.includes(id),
)
	.map((id) => ({ id, ...Projects[id] }))
	.sort((a, b) => EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort]);

function statusItem(
	color: ColorToken,
	status: string,
	body: ReactNode,
): ReactNode {
	return (
		<Flex as="li" direction="row" gap="xs" vAlign="start">
			<Badge color={color}>{status}</Badge>
			<Text variant="body">{body}</Text>
		</Flex>
	);
}

const BLOB = "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com";

function getBlob(filename: string) {
	return `${BLOB}/${filename}`;
}
