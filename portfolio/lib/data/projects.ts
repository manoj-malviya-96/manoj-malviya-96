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
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
};

export type ProjectMedia =
	| { kind: "image"; src: LocalImage | string; alt: string }
	| { kind: "video"; src: string; alt: string };

export type ProjectBody = { why: string; how: string; what: string };

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
				tags: ["web", "open-source", "nextjs", "typescript", "ui/ux"],
				effort: "medium",
			};
		case "atom":
			return {
				title: "Atom",
				description:
					"A minimal, CSS-first, type-safe React UI library — one primitive and one stylesheet that every other component composes from. Styling and motion live in CSS, not JS, with enforced size budgets and real-browser tests.",
				hook: "One primitive. The whole design system composes from it.",
				tags: ["react", "typescript", "web", "open-source", "ui/ux"],
				effort: "high",
			};
		case "muviz":
			return {
				title: "Muviz",
				description:
					"A GPU-driven 3D music visualizer: a C++ audio pipeline compiled to WebAssembly feeds a Three.js renderer, so the browser never touches raw audio math.",
				hook: "Winamp nostalgia, rebuilt for the GPU.",
				tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux", "threejs"],
				effort: "high",
			};
		case "honeycomb":
			return {
				title: "HoneyMesh",
				description:
					"A C++ skeletonization algorithm that generates honeycomb lattice structures and exports them straight to a VTK mesh for CAD and simulation workflows.",
				hook: "Because hexagons are just better, structurally speaking.",
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
				description: "Fastest 2D Topology Optimization Solver in Python",
				hook: "A 40-year-old optimization algorithm, dragged into this decade.",
				tags: ["simulation", "optimization", "high-performance", "python"],
				effort: "high",
			};
		case "blackhole":
			return {
				title: "Blackhole",
				description:
					"A real-time GLSL raymarcher that integrates light-ray geodesics around a Schwarzschild black hole to render gravitational lensing at interactive frame rates.",
				hook: "Gravity, rendered in real time, because I couldn't wait for the movie.",
				tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
				effort: "high",
			};
		case "ev_sim":
			return {
				title: "EV Charging Simulator",
				description:
					"A Monte Carlo simulator for EV charging-lot demand — Poisson-process car arrivals, per-interval power draw, and the resulting concurrency factor — with a React front end for running scenarios.",
				hook: "How many chargers do you actually need? Simulate it first.",
				tags: ["web", "react", "typescript", "tailwind", "simulation", "ui/ux"],
				effort: "medium",
			};
		case "mesha":
			return {
				title: "Mesha",
				description:
					"An in-progress 3D mesh-repair tool: a C++/Qt backend exposed as both a CLI and a WebSocket service, with a Tauri + Next.js editor on top.",
				hook: "Mesh repair, from the command line to a real editor.",
				tags: ["cad", "c++", "qt/qml", "rendering", "open-source"],
				effort: "low",
			};
		case "simphy":
			return {
				title: "Simphy",
				description:
					"An early-stage physics simulation sandbox — C++ core, no rendering layer committed yet. Active work in progress.",
				hook: "Simulating the universe. Literally, eventually.",
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
				src: `${OG}/simphy`,
				alt: "The Simphy repository.",
			};
		default:
			return assertNever(project);
	}
}

export function getBody(project: ProjectId): ProjectBody {
	switch (project) {
		case "portfolio":
			return {
				why: "A resume and a pile of scattered repos don't show how something actually works, or feels to use.",
				how: "Next.js App Router with server components, Fuse.js-powered fuzzy search over the project catalog, and atom — a CSS-first design system I built from scratch — for every pixel.",
				what: "A living catalog of my projects — fast, searchable, and self-describing.",
			};
		case "atom":
			return {
				why: "Every side project needed its own UI kit — mismatched buttons and spacing, or a generic component library fighting the app instead of fitting it.",
				how: "Styling and motion live in CSS, not JavaScript, so screens stay instant. A small, fixed set of parts — a component ships only when more than one real app needs it. Real-browser tests via Vitest, and a size-budget check enforced in CI on every PR.",
				what: "The design system running this site, its project catalog, and everything else I ship — published on GitHub Packages.",
			};
		case "muviz":
			return {
				why: "Winamp-era visualizers were mesmerizing, but nothing on the web today renders anything close without dropping frames.",
				how: "A C++ feature extractor compiled to WebAssembly runs a full spectral-analysis pass over the track once and caches the result, so the Three.js frontend never does audio math — it only renders.",
				what: "A fast, reactive 3D visualizer that handles complex effects without breaking a sweat.",
			};
		case "honeycomb":
			return {
				why: "Honeycomb lattices are a go-to structure in engineering, but tooling to generate them is scarce.",
				how: "A memory-efficient skeletonization algorithm builds the lattice topology in C++, then exports directly to a VTK mesh — no manual triangulation, no format-conversion step.",
				what: "Open-source constructor and visualizer, ready for CAD workflows.",
			};
		case "topopt_py":
			return {
				why: "Classic topology-optimization research code was too slow to be useful beyond a demo.",
				how: "Vectorized the solver's inner loop — sparse assembly and filtering as array operations in NumPy instead of nested Python loops — without dropping to C++.",
				what: "2× faster, scales to more elements, without leaving Python.",
			};
		case "blackhole":
			return {
				why: "Gravitational lensing is usually only shown offline, in pre-rendered clips.",
				how: "Hand-rolled a raymarching shader in raw OpenGL that numerically integrates light-ray geodesics per pixel, tuned to hold frame budget at interactive rates.",
				what: "Interactive simulation you can orbit and pull apart yourself.",
			};
		case "ev_sim":
			return {
				why: "Sizing an EV charging lot is a probability problem, not a guess — too few chargers and drivers queue, too many and the capex is wasted.",
				how: "Modeled car arrivals per charge-point as a Poisson process (hourly arrival probability split across 15-minute intervals), ran it seeded and unseeded to compare variance, and tracked energy consumed, theoretical vs. actual peak power, and the resulting concurrency factor.",
				what: "A request/response simulator — tune charge-point count and power draw on one panel, read the results as charts on the other.",
			};
		case "mesha":
			return {
				why: "Broken meshes — non-manifold edges, holes, self-intersections — are a constant tax in CAD and 3D-printing pipelines, and most repair tools are closed black boxes.",
				how: "A C++/Qt backend exposes mesh repair as both a CLI and a WebSocket service, decoupled from any UI. A Tauri + Next.js frontend gives it an actual editor instead of a terminal.",
				what: "The scaffolding is live end to end — CLI, server, editor shell. The repair algorithm itself is the next milestone.",
			};
		case "simphy":
			return {
				why: "Wanted a from-scratch physics sandbox — n-body gravity, particle systems — without a game engine sitting in the way.",
				how: "Early days: C++ core is scaffolded, no rendering layer committed yet.",
				what: "In progress — check back, or watch the repo.",
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
