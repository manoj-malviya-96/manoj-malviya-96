import { assertNever, Flex, List, Text } from "@manoj-malviya-96/atom";
import {
	IconLightbulb,
	IconPaintBrush,
	IconVolumeHigh,
} from "@manoj-malviya-96/atom/icons";
import type { ReactNode } from "react";
import faceShaderPhoto from "@/lib/face-shader/assets/face-source.jpg";
import type { ValuesOf } from "@/lib/helper";
import { Prose } from "@/lib/shared";
import type { ExternalURL, MediaSource } from "@/lib/types";

const AllProjectIds = [
	"atom",
	"muviz",
	"honeycomb",
	"topopt_py",
	"blackhole",
	"ev_sim",
	"mesha",
	"truss_opt",
	"face_shader",
] as const;

export type ProjectId = ValuesOf<typeof AllProjectIds>;

export const Projects: Record<ProjectId, Project> = {
	atom: {
		title: "Atom",
		summary: `I wanted Apple-grade design discipline: one visual language, everywhere.
					Every option out there made me choose between a CSS-in-JS styling library dragging
					its own runtime and CSS that throws out type safety. I got tired of choosing, so I
					built Atom: one primitive, one stylesheet, and a type system that actually checks it.`,
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
		media: {
			mockup: "macbook",
			kind: "video",
			alt: "Atom framework demo",
			src: getBlob("atom.webm"),
		},
		content: (
			<List direction="col" gap="md" width="lg">
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
			mockup: "macbook",
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
			<List direction="col" gap="md" width="lg">
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
		summary:
			"I kept needing hexagonal lattices for CAD work and got tired of triangulating them by hand, so I wrote a generator: a 2D skeleton graph in C++, extruded into a real mesh with VTK.",
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
			<Prose>
				Give it a shape and get back a honeycomb lattice, skeletonized in C++
				and exported straight to a VTK mesh, ready for your CAD tool. No manual
				triangulation, no format conversion. The skeleton is a functional
				pipeline: an unordered_set for edges, a sorted map for vertices, every
				function pure input to output. The part that kept breaking was
				staggering the hexagon centers correctly. Get that wrong and the whole
				grid drifts.
			</Prose>
		),
	},
	topopt_py: {
		title: "topopt-py",
		summary: `I found DTU's 99-line topology-optimization script and loved how
					compact it was, but the inner loop was nested Python. I rewrote the
					stiffness assembly and filtering as vectorized NumPy, keeping the same
					SIMP algorithm and accuracy but running faster on the same problem.`,
		dates: "2021",
		tags: ["simulation", "optimization", "high-performance", "python"],
		effort: "high",
		media: {
			kind: "video",
			src: getBlob("pixel-opt.webm"),
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
		content: (
			<Prose>
				The stiffness assembler now caches its sparsity pattern instead of
				rebuilding it every iteration, and strain energy is a single einsum call
				instead of a manual reshape-and-sum. Filtering swapped four nested loops
				for one scipy.ndimage.convolve. Solver time still dominates, which is
				inherent to FEM, but on a 5,000-element MBB beam the run drops from 4.8s
				to 2.6s.
			</Prose>
		),
	},
	blackhole: {
		title: "Blackhole",
		summary:
			"Gravity, rendered in real time, because I couldn't wait for the movie.",
		dates: "2023",
		tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
		effort: "high",
		media: {
			kind: "video",
			src: getBlob("blackhole.webm"),
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
			<Prose>
				Simulates real black-hole gravity. A compute shader integrates each
				pixel's light-ray geodesic against a mass modeled on Sagittarius A* (4.3
				million solar masses), and a separate lensing fragment shader bends the
				background grid around it. It runs as a Qt/OpenGL widget, falling back
				to GL_ARB_compute_shader on GPUs without core GL 4.3, so it still
				rotates live instead of playing back a pre-rendered clip.
			</Prose>
		),
	},
	ev_sim: {
		title: "EV Charging Simulator",
		summary:
			"I wanted to know how many chargers a lot actually needs before buying them, so I simulated a year of demand first.",
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
			<Prose>
				Answers one question: how many chargers do you actually need? Each run
				simulates a year of 15-minute intervals, drawing car arrivals from a
				Poisson-derived probability per charge point, with no queueing: a car
				that arrives to a busy point just leaves. Change the charger count or
				power draw and watch demand, cost, and concurrency update immediately;
				concurrency turned out to decay roughly exponentially as charger count
				grows.
			</Prose>
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
		content: <Prose>Todo</Prose>,
	},
	truss_opt: {
		title: "Truss Optimizer",
		summary:
			"I wanted to watch material redistribute itself in real time, so I built a truss you can draw into and optimize on the spot.",
		dates: "2025",
		tags: ["simulation", "optimization", "web", "react", "typescript"],
		effort: "medium",
		media: {
			kind: "video",
			src: getBlob("pixel-opt.webm"),
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
			<Prose>
				Place supports and loads on a cantilever lattice and this site's own API
				route solves the FEA and runs an optimality-criteria search to
				redistribute material. The browser only ever draws the answer. Each of
				the 200 iterations re-solves the FEA, then bisects on the Lagrange
				multiplier to hold total volume at 40% of the start, with a minimum
				thickness clamp so no member vanishes to zero.
			</Prose>
		),
	},
	face_shader: {
		title: "Face Shader",
		summary: "Any photo, triangulated into a cursor-reactive WebGL mesh.",
		dates: "2026",
		tags: ["web", "react", "typescript", "rendering", "opengl"],
		effort: "low",
		media: {
			kind: "image",
			src: faceShaderPhoto,
			alt: "The source photo this demo triangulates into a low-poly mesh.",
		},
		links: {
			primary: {
				kind: "demo",
				label: "Try it",
				href: "/demos/face-shader",
			},
			others: [],
		},
		content: (
			<Prose>
				Feed it a photo and it samples points along the strongest edges, runs a
				Bowyer-Watson triangulation in the browser, and hands the result to a
				custom WebGL2 shader that mirrors the mesh and lights it up around the
				cursor.
			</Prose>
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
	| "opengl"
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

export type ProjectMedia = { mockup?: "macbook" } & MediaSource;

export type Project = {
	title: string;
	summary: ReactNode;
	dates: string;
	tags: readonly ProjectTag[];
	effort: ProjectEffort;
	media?: ProjectMedia;
	links: ProjectLinks;
	content?: ReactNode;
};

export type ProjectSummary = Project & { id: ProjectId };

function showProject(id: ProjectId) {
	switch (id) {
		case "atom":
		case "ev_sim":
		case "topopt_py":
		case "honeycomb":
		case "muviz":
		case "blackhole":
		case "truss_opt":
		case "face_shader":
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

export const RankedProjects: readonly ProjectSummary[] = AllProjectIds.filter(
	(id) => showProject(id),
)
	.map((id) => ({ id, ...Projects[id] }))
	.sort((a, b) => EFFORT_RANK[b.effort] - EFFORT_RANK[a.effort]);

function getBlob(filename: string) {
	return `https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/${filename}`;
}
