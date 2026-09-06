import { assertNever } from "@manoj-malviya-96/atom";
import type { StaticImageData as LocalImage } from "next/image";
import type { ExternalURL } from "@/lib/types";
import type { ValuesOf } from "@/lib/utils";

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
] as const;

export type ProjectId = ValuesOf<typeof AllProjectIds>;

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

export type ProjectMeta = {
	title: string;
	description: string;
	hook: string;
	dates: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
};

export type ProjectMedia =
	| { kind: "image"; src: LocalImage | string; alt: string }
	| { kind: "video"; src: string; alt: string };

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;

export type ProjectLink =
	| { kind: "github"; href: GithubRepo }
	| { kind: "medium"; href: MediumPost }
	| { kind: "demo"; label?: string; href: ExternalURL }
	| { kind: "external"; label: string; href: ExternalURL };

const BLOB = "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com";
const OG = "https://opengraph.githubassets.com/1/manoj-malviya-96";

export function getMeta(project: ProjectId): ProjectMeta {
	switch (project) {
		case "portfolio":
			return {
				title: "Portfolio",
				description:
					"This site: a Next.js App Router build on top of atom, a design system I wrote and maintain separately, with a fuzzy-searchable project catalog.",
				hook: "The portfolio, describing itself.",
				dates: "2025",
				tags: ["web", "open-source", "nextjs", "typescript", "ui/ux"],
				effort: "medium",
			};
		case "atom":
			return {
				title: "Atom",
				description:
					"A minimal, CSS-first, type-safe React UI library — one primitive and one stylesheet that every other component composes from. Styling and motion live in CSS, not JS, with enforced size budgets and real-browser tests.",
				hook: "One primitive. The whole design system composes from it.",
				dates: "2024–2025",
				tags: ["react", "typescript", "web", "open-source", "ui/ux"],
				effort: "high",
			};
		case "muviz":
			return {
				title: "Muviz",
				description:
					"A GPU-driven 3D music visualizer: a C++ audio pipeline compiled to WebAssembly feeds a Three.js renderer, so the browser never touches raw audio math.",
				hook: "Winamp nostalgia, rebuilt for the GPU.",
				dates: "2023",
				tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux", "threejs"],
				effort: "high",
			};
		case "honeycomb":
			return {
				title: "HoneyMesh",
				description:
					"A C++ skeletonization algorithm that generates honeycomb lattice structures and exports them straight to a VTK mesh for CAD and simulation workflows.",
				hook: "Because hexagons are just better, structurally speaking.",
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
			};
		case "topopt_py":
			return {
				title: "topopt-py",
				description: "A 2D topology-optimization solver, rewritten for speed.",
				hook: "A 40-year-old optimization algorithm, dragged into this decade.",
				dates: "2021",
				tags: ["simulation", "optimization", "high-performance", "python"],
				effort: "high",
			};
		case "blackhole":
			return {
				title: "Blackhole",
				description:
					"A real-time GLSL raymarcher that integrates light-ray geodesics around a Schwarzschild black hole to render gravitational lensing at interactive frame rates.",
				hook: "Gravity, rendered in real time, because I couldn't wait for the movie.",
				dates: "2023",
				tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
				effort: "high",
			};
		case "ev_sim":
			return {
				title: "EV Charging Simulator",
				description:
					"A Monte Carlo simulator for EV charging-lot demand — Poisson-process car arrivals, per-interval power draw, and the resulting concurrency factor — with a React front end for running scenarios.",
				hook: "How many chargers do you actually need? Simulate it first.",
				dates: "2024",
				tags: ["web", "react", "typescript", "tailwind", "simulation", "ui/ux"],
				effort: "medium",
			};
		case "mesha":
			return {
				title: "Mesha",
				description:
					"An in-progress 3D mesh-repair tool: a C++/Qt backend exposed as both a CLI and a WebSocket service, with a Tauri + Next.js editor on top.",
				hook: "Mesh repair, from the command line to a real editor.",
				dates: "2025",
				tags: ["cad", "c++", "qt/qml", "rendering", "open-source"],
				effort: "low",
			};
		case "simphy":
			return {
				title: "Simphy",
				description:
					"An early-stage physics simulation sandbox — C++ core, no rendering layer committed yet. Active work in progress.",
				hook: "Simulating the universe. Literally, eventually.",
				dates: "2025",
				tags: ["simulation", "c++", "open-source"],
				effort: "low",
			};
		default:
			return assertNever(project);
	}
}

export function getMedia(project: ProjectId): ProjectMedia {
	switch (project) {
		case "portfolio":
			return {
				kind: "video",
				src: `${BLOB}/portfolio.webm`,
				alt: "This portfolio’s interactive landing page in motion.",
			};
		case "atom":
			return {
				kind: "image",
				src: `${OG}/atom`,
				alt: "The atom design-system repository.",
			};
		case "muviz":
			return {
				kind: "video",
				src: `${BLOB}/muviz.webm`,
				alt: "Muviz reacting to a track in real time.",
			};
		case "honeycomb":
			return {
				kind: "video",
				src: `${BLOB}/honeycomb_demo.webm`,
				alt: "A honeycomb lattice generated and rendered in VTK.",
			};
		case "topopt_py":
			return {
				kind: "video",
				src: `${BLOB}/optimization.webm`,
				alt: "A topology optimization converging on a solution.",
			};
		case "blackhole":
			return {
				kind: "image",
				src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1600&fit=crop",
				alt: "Cover art for the black hole renderer.",
			};
		case "ev_sim":
			return {
				kind: "image",
				src: "https://github.com/user-attachments/assets/d8adc197-ee42-406b-bed8-8892df091d47",
				alt: "The EV charging simulator's request/response UI, showing simulation results as charts.",
			};
		case "mesha":
			return {
				kind: "image",
				src: `${OG}/mesha`,
				alt: "The Mesha mesh-repair-tool repository.",
			};
		case "simphy":
			return {
				kind: "image",
				src: `${OG}/mesha`,
				alt: "The Mesha mesh-repair-tool repository.",
			};
		default:
			return assertNever(project);
	}
}

export function getLinks(project: ProjectId): readonly ProjectLink[] {
	switch (project) {
		case "portfolio":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
				},
				{
					kind: "external",
					label: "Previous version",
					href: "https://manoj-malviya-96.github.io/",
				},
			];
		case "atom":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/atom",
				},
				{
					kind: "demo",
					label: "Playground",
					href: "https://atom-two-tan.vercel.app",
				},
			];
		case "muviz":
			return [
				{ kind: "demo", label: "Demo", href: "https://muviz.vercel.app/" },
			];
		case "honeycomb":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
				},
			];
		case "topopt_py":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/topopt-py/tree/master",
				},
				{
					kind: "medium",
					href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
				},
			];
		case "blackhole":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
				},
			];
		case "ev_sim":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/ev-sim",
				},
			];
		case "mesha":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/mesha",
				},
				{
					kind: "demo",
					label: "Preview",
					href: "https://mesha3.vercel.app",
				},
			];
		case "simphy":
			return [
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/simphy",
				},
			];
		default:
			return assertNever(project);
	}
}
