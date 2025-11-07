import { StaticImageData } from "next/image";

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

export type ProjectRank = 1 | 2 | 3; // Lower the better

type GithubRepo = `https://github.com/${string}/${string}`;

export type Project = {
  title: string;
  tagline?: string;
  description?: string;
  tags: ProjectTag[];
  image: StaticImageData | string;
  rank?: ProjectRank; // Lower rank means higher priority
  githubRepo?: GithubRepo;
};

export const AllProjects: Project[] = [
  {
    title: "Portfolio",
    tagline: "Showcasing My Projects and Skills",
    description:
      "A modern portfolio website to showcase my projects and skills, built with Next.js and Tailwind CSS.",
    tags: ["web", "open-source"],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGF1dG9tYXRpb258ZW58MHx8MHx8",
    rank: 1,
    githubRepo:
      "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
  },
  {
    title: "Muviz",
    tagline: "Visualize Your Music in Style",
    description:
      "A web-based music visualizer that creates stunning visual effects synchronized to your favorite tunes.",
    tags: ["web", "tools", "open-source"],
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjB2aXN1YWxpemVyfGVufDB8fDB8fA==",
    rank: 2,
    githubRepo: "https://github.com/manoj-malviya-96/muviz/tree/master",
  },
  {
    title: "Honeycomb",
    tagline: "Honeycomb Lattice Generator and Visualizer",
    description:
      "A tool to generate and visualize honeycomb lattice structures for scientific and educational purposes.",
    tags: ["rendering", "high-performance", "open-source"],
    image:
      "https://images.unsplash.com/photo-1526378723913-2d2a8b3f0b6e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZXljb21ifGVufDB8fDB8fA==",
    rank: 3,
    githubRepo: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
  },
  {
    title: "Blackhole",
    tagline: "Simulating the Mysteries of Black Holes",
    description:
      "A simulation project that visualizes the gravitational effects and phenomena around black holes.",
    tags: ["rendering", "gpu", "optimization"],
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2tob2xlfGVufDB8fDB8fA==",
    githubRepo: "https://github.com/manoj-malviya-96/blackhole/tree/master",
    rank: 1,
  },
];
