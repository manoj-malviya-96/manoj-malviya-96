export const ProjectIds = [
  "portfolio",
  "muviz",
  "honeycomb",
  "blackhole",
] as const;

export type ProjectId = (typeof ProjectIds)[number];

type ProjectMeta = {
  title: string;
  description: string;
  tags: ProjectTag[];
  effort: ProjectEffort;
};

export const PortfolioMetadata: ProjectMeta = {
  title: "Portfolio",
  description:
    "A modern portfolio website to showcase my projects and skills, built with Next.js and Tailwind CSS.",
  tags: ["web", "open-source", "nextjs", "tailwind", "typescript", "ui/ux"],
  effort: "medium",
};

export const MuvizMetadata: ProjectMeta = {
  title: "Muviz - Music Visualizer",
  description:
    "A fast, feature-rich music visualizer for the web (inspired by the Winamp days).",
  tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux"],
  effort: "high",
};

export const HoneyCombMetadata: ProjectMeta = {
  title: "HoneyMesh",
  description:
    "Generate and visualize honeycomb lattice structures for scientific and educational use.",
  tags: ["rendering", "high-performance", "open-source", "python"],
  effort: "medium",
};

export const BlackholeMetadata: ProjectMeta = {
  title: "Blackhole",
  description:
    "A simulation that visualizes gravitational effects and phenomena around black holes.",
  tags: ["rendering", "gpu", "optimization", "c++"],
  effort: "high",
};

// Dont import this for atomic stuff. Use the constants directly.
export const ProjectsMetadata: Record<ProjectId, ProjectMeta> = {
  portfolio: PortfolioMetadata,
  muviz: MuvizMetadata,
  honeycomb: HoneyCombMetadata,
  blackhole: BlackholeMetadata,
};

// Types ---
type SoftwareConcepts =
  | "web"
  | "mobile"
  | "ai"
  | "rendering"
  | "open-source"
  | "high-performance"
  | "gpu"
  | "optimization"
  | "micro-services";

type OtherSkills =
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
  | "wasm"
  | "opengl";

type ProgrammingLanguage =
  | "typescript"
  | "python"
  | "rust"
  | "go"
  | "c++"
  | "ruby"
  | "swift";

type ProjectTag =
  | ProgrammingFrameworks
  | ProgrammingLanguage
  | SoftwareConcepts
  | OtherSkills;

type ProjectEffort = "low" | "medium" | "high";
