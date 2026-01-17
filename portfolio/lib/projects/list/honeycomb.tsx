import ProjectCard from "@/lib/projects/project_card";
import { Typography } from "@/lib/ui/text";
import { HoneycombDemo } from "@/lib/assets";
import { ProjectMeta } from "@/lib/projects/list/types";

export const metadata: ProjectMeta = {
  title: "HoneyMesh",
  description:
    "Generate and visualize honeycomb lattice structures for scientific and educational use.",
  tags: [
    "rendering",
    "high-performance",
    "open-source",
    "c++",
    "vtk",
    "cad",
  ] as const,
  effort: "medium",
} as const;

export default function HoneycombProjectCard() {
  return (
    <ProjectCard
      {...metadata}
      images={[HoneycombDemo]}
      ctas={[
        {
          kind: "github",
          href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
        },
      ]}
    >
      <Typography variant="body">
        The goal is simple: build a honeycomb lattice constructor and a clean
        visualizer—because honeycomb structures are a classic go-to in
        engineering thanks to their excellent strength-to-weight ratio and
        efficient material use.
        <br />
        <br />
        To get there, I used a <strong>fast, memory-friendly skeleton </strong>
        construction algorithm, optimized to generate the lattice “bones”
        efficiently (See details in github repo). From that skeleton, I then
        construct a VTK mesh for visualization and downstream geometry
        workflows.
      </Typography>
    </ProjectCard>
  );
}

export const project = {
  id: "honeycomb",
  metadata,
  Card: HoneycombProjectCard,
} as const;
