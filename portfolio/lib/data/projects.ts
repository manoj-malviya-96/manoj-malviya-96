import {assertNever} from "@manoj-malviya-96/atom";
import type {StaticImageData as LocalImage} from "next/image";
import type {ValuesOf} from "@/lib/helper";
import type {ExternalURL} from "@/lib/types";

export const AllProjectIds = [
    "portfolio",
    "muviz",
    "honeycomb",
    "topopt_py",
    "blackhole",
] as const;

export type ProjectId = ValuesOf<typeof AllProjectIds>;

export type SoftwareConcepts =
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

export type SoftSkills =
    | "communication"
    | "ui/ux"
    | "project-management"
    | "devops"
    | "testing";

export type ProgrammingFrameworks =
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

export function getMeta(project: ProjectId): ProjectMeta {
    switch (project) {
        case "portfolio":
            return {
                title: "Portfolio",
                description:
                    "A modern portfolio website to showcase my projects and skills, built with Next.js, TypeScript, and a design system I maintain separately.",
                hook: "The portfolio, describing itself.",
                tags: ["web", "open-source", "nextjs", "typescript", "ui/ux"],
                effort: "medium",
            };
        case "muviz":
            return {
                title: "Muviz",
                description:
                    "A fast, feature-rich music visualizer for reactive, beautiful 3D visualizations",
                hook: "Winamp nostalgia, rebuilt for the GPU.",
                tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux", "threejs"],
                effort: "high",
            };
        case "honeycomb":
            return {
                title: "HoneyMesh",
                description:
                    "Generate and visualize honeycomb lattice structures for scientific and educational use.",
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
                    "A simulation that simulates and visualizers gravitational effects around black holes.",
                hook: "Gravity, rendered in real time, because I couldn't wait for the movie.",
                tags: ["rendering", "gpu", "optimization", "c++", "opengl"],
                effort: "high",
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
        default:
            return assertNever(project);
    }
}

export function getBody(project: ProjectId): ProjectBody {
    switch (project) {
        case "portfolio":
            return {
                why: "A resume and a pile of scattered repos don't show how something actually works, or feels to use.",
                how: "Built with Next.js and TypeScript on top of a design system I maintain separately, topped with an interactive landing page.",
                what: "A living catalog of my projects — simple, informative, and it works.",
            };
        case "muviz":
            return {
                why: "Winamp-era visualizers were mesmerizing, but nothing on the web today renders anything close without dropping frames.",
                how: "A C++ feature extractor analyzes the full track in one pass and caches the result, freeing the ThreeJS frontend to focus purely on rendering.",
                what: "A fast, reactive 3D visualizer that handles complex effects without breaking a sweat.",
            };
        case "honeycomb":
            return {
                why: "Honeycomb lattices are a go-to structure in engineering, but tooling to generate them is scarce.",
                how: "A fast, memory-friendly skeleton algorithm, exported to a VTK mesh for downstream geometry work.",
                what: "Open-source constructor and visualizer, ready for CAD workflows.",
            };
        case "topopt_py":
            return {
                why: "Classic topology-optimization research code was too slow to be useful beyond a demo.",
                how: "Vectorized the core solver in NumPy instead of rewriting the whole thing in C++.",
                what: "2× faster, scales to more elements, without leaving Python.",
            };
        case "blackhole":
            return {
                why: "Gravitational lensing is usually only shown offline, in pre-rendered clips.",
                how: "Hand-rolled the ray-bending shader in raw OpenGL, tuned for real-time frame budgets.",
                what: "Interactive simulation you can orbit and pull apart yourself.",
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
        case "muviz":
            return [
                {kind: "demo", label: "Demo", href: "https://muviz.vercel.app/"},
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
        default:
            return assertNever(project);
    }
}
