import { StaticImageData } from "next/image";
import { ExternalURL } from "@/lib/types";
import { ReactNode, useMemo } from "react";

export type SoftwareConcepts =
  | "web"
  | "mobile"
  | "ai"
  | "rendering"
  | "open-source"
  | "high-performance"
  | "gpu"
  | "optimization"
  | "micro-services"
  | "clean-code"
  | "tools";

export type ProgrammingFrameworks =
  | "react"
  | "nextjs"
  | "qt/qml"
  | "tailwind"
  | "vtk"
  | "opengl";

export type ProgrammingLanguage =
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
  | SoftwareConcepts;

type GithubRepo = `https://github.com/${string}/${string}`;

type ProjectCTA =
  | { kind: "github"; label?: string; href: GithubRepo }
  | { kind: "medium"; label?: string; href: ExternalURL }
  | { kind: "custom"; label: string; href?: ExternalURL; node?: ReactNode };

export type ProjectRank = 1 | 2 | 3; // Lower the better

export type Project = {
  title: string;
  tagline?: string;
  description?: string;
  tags: ProjectTag[];
  image?: StaticImageData | string; // legacy single image
  images?: (StaticImageData | string)[]; // preferred multiple images
  rank?: ProjectRank; // Lower rank means higher priority
  ctas: ProjectCTA[]; // require at least one CTA
};

export const AllProjectsData: Project[] = [
  {
    title: "Portfolio",
    tagline: "Showcasing My Projects and Skills",
    description:
      "A modern portfolio website to showcase my projects and skills, built with Next.js and Tailwind CSS.",
    tags: ["web", "open-source", "nextjs", "tailwind", "typescript"],
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fm=jpg&q=60&w=1600&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fm=jpg&q=60&w=1200&fit=crop&sat=-20",
    ],
    rank: 1,
    ctas: [
      {
        kind: "github",
        href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
      },
      {
        kind: "custom",
        label: "Live Demo",
        href: "https://manoj-malviya-96.vercel.app",
      },
    ],
  },
  {
    title: "Muviz",
    tagline: "Visualize Your Music in Style",
    description:
      "A web-based music visualizer that creates stunning visual effects synchronized to your favorite tunes.",
    tags: ["web", "tools", "open-source", "typescript", "react"],
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fm=jpg&q=60&w=1600&fit=crop",
    rank: 2,
    ctas: [
      {
        kind: "github",
        href: "https://github.com/manoj-malviya-96/muviz/tree/master",
      },
      {
        kind: "custom",
        label: "Download",
        href: "https://github.com/manoj-malviya-96/muviz/releases/latest",
      },
    ],
  },
  {
    title: "Honeycomb",
    tagline: "Honeycomb Lattice Generator and Visualizer",
    description:
      "A tool to generate and visualize honeycomb lattice structures for scientific and educational purposes.",
    tags: ["rendering", "high-performance", "open-source", "python"],
    images: [
      "https://images.unsplash.com/photo-1526378723913-2d2a8b3f0b6e?fm=jpg&q=60&w=1600&fit=crop",
    ],
    rank: 3,
    ctas: [
      {
        kind: "github",
        href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
      },
      {
        kind: "medium",
        label: "Medium Article",
        href: "https://medium.com/@manojmalviya/honeycomb-visualizer",
      },
    ],
  },
  {
    title: "Blackhole",
    tagline: "Simulating the Mysteries of Black Holes",
    description:
      "A simulation project that visualizes the gravitational effects and phenomena around black holes.",
    tags: ["rendering", "gpu", "optimization", "c++"],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1600&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1400&fit=crop&sat=-15",
    ],
    rank: 1,
    ctas: [
      {
        kind: "github",
        href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
      },
      {
        kind: "custom",
        label: "Video Demo",
        href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
    ],
  },
];

export function useProjects(): Project[] {
  return useMemo(() => AllProjectsData, []);
}

export const AllProjects = AllProjectsData;
