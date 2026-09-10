import { assertNever } from "@manoj-malviya-96/atom";
import type { StaticImageData as LocalImage } from "next/image";
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

export function getMeta(project: ProjectId): ProjectMeta {
	switch (project) {
		case "portfolio":
			return {
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
					src: getBlobUrl("portfolio.webm"),
					alt: "This portfolio’s interactive landing page in motion.",
				},
			};
		case "atom":
			return {
				title: "Atom",
				summary: "Fast, Typed and Extremely Small React UI Library",
				dates: "2024–2025",
				tags: ["react", "typescript", "web", "open-source", "ui/ux"],
				effort: "high",
			};
		case "muviz":
			return {
				title: "Muviz",
				summary: "Winamp nostalgia, rebuilt for the GPU.",
				dates: "2023",
				tags: [
					"web",
					"wasm",
					"c++",
					"typescript",
					"dsp",
					"react",
					"ui/ux",
					"threejs",
				],
				effort: "high",
				media: {
					kind: "video",
					src: getBlobUrl("muviz.webm"),
					alt: "Muviz reacting to a track in real time.",
				},
			};
		case "honeycomb":
			return {
				title: "HoneyMesh",
				summary: "Because hexagons are just better, structurally speaking.",
				dates: "2022",
				tags: [
					"rendering",
					"high-performance",
					"open-source",
					"c++",
					"vtk",
					"cad",
				],
				effort: "medium",
				media: {
					kind: "video",
					src: getBlobUrl("honeycomb_demo.webm"),
					alt: "A honeycomb lattice generated and rendered in VTK.",
				},
			};
		case "topopt_py":
			return {
				title: "topopt-py",
				summary:
					"A 40-year-old optimization algorithm, dragged into this decade.",
				dates: "2021",
				tags: ["simulation", "optimization", "high-performance", "python"],
				effort: "high",
				media: {
					kind: "video",
					src: getBlobUrl("optimization.webm"),
					alt: "A topology optimization converging on a solution.",
				},
			};
		case "blackhole":
			return {
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
			};
		case "ev_sim":
			return {
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
			};
		case "mesha":
			return {
				title: "Mesha",
				summary: "Mesh repair, from the command line to a real editor.",
				dates: "2025",
				tags: ["cad", "c++", "qt/qml", "rendering", "open-source"],
				effort: "low",
				media: {
					kind: "image",
					src: getOgUrl("mesha"),
					alt: "The Mesha mesh-repair-tool repository.",
				},
			};
		case "simphy":
			return {
				title: "Simphy",
				summary: "Simulating the universe. Literally, eventually.",
				dates: "2025",
				tags: ["simulation", "c++", "open-source"],
				effort: "low",
				media: {
					kind: "image",
					src: getOgUrl("simphy"),
					alt: "The Simphy physics-simulation-sandbox repository.",
				},
			};
		case "truss_opt":
			return {
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
			};
		default:
			return assertNever(project);
	}
}

export function getLinks(project: ProjectId): ProjectLinkSet {
	switch (project) {
		case "portfolio":
			return {
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
			};
		case "atom":
			return {
				others: [
					{
						kind: "github",
						href: "https://github.com/manoj-malviya-96/atom",
					},
				],
				primary: {
					kind: "demo",
					label: "Showcase",
					href: "https://atom-two-tan.vercel.app",
				},
			};
		case "muviz":
			return {
				primary: {
					kind: "demo",
					label: "App",
					href: "https://muviz.vercel.app/",
				},
				others: [
					{
						kind: "github",
						href: "https://github.com/manoj-malviya-96/muviz",
					},
				],
			};
		case "honeycomb":
			return {
				others: [],
				primary: {
					kind: "github",
					href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
				},
			};
		case "topopt_py":
			return {
				others: [
					{
						kind: "github",
						href: "https://github.com/manoj-malviya-96/topopt-py/tree/master",
					},
				],
				primary: {
					kind: "medium",
					href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
				},
			};
		case "blackhole":
			return {
				others: [],
				primary: {
					kind: "github",
					href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
				},
			};
		case "ev_sim":
			return {
				others: [],
				primary: {
					kind: "github",
					href: "https://github.com/manoj-malviya-96/ev-sim",
				},
			};
		case "mesha":
			return {
				others: [
					{
						kind: "github",
						href: "https://github.com/manoj-malviya-96/mesha",
					},
				],
				primary: {
					kind: "demo",
					label: "Preview",
					href: "https://mesha3.vercel.app",
				},
			};
		case "simphy":
			return {
				others: [],
				primary: {
					kind: "github",
					href: "https://github.com/manoj-malviya-96/simphy",
				},
			};
		case "truss_opt":
			return {
				others: [],
				primary: {
					kind: "demo",
					label: "Try it",
					href: "/demos/truss-opt",
				},
			};
		default:
			return assertNever(project);
	}
}

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
	| "dsp"
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

export type ProgrammingLanguage =
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

export type ProjectMeta = {
	title: string;
	summary: string;
	dates: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	media?: ProjectMedia;
};

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type InternalPath = `/${string}`;

export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL | InternalPath }
	| { kind: "external"; label: string; href: ExternalURL };

export type ProjectLinkSet = {
	primary: ProjectLink;
	others: readonly ProjectLink[];
};

const BLOB = "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com";
const OG = "https://opengraph.githubassets.com/1/manoj-malviya-96";

function getBlobUrl(filename: string): string {
	return `${BLOB}/${filename}`;
}

function getOgUrl(repo: string): string {
	return `${OG}/${repo}`;
}
