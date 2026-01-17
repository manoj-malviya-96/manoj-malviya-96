import ProjectCard from "@/lib/projects/project_card";
import { Typography } from "@/lib/ui/text";

export const metadata = {
  title: "HoneyMesh",
  description:
    "Generate and visualize honeycomb lattice structures for scientific and educational use.",
  tags: ["rendering", "high-performance", "open-source", "python"],
  effort: "medium",
} as const;

export default function HoneycombProjectCard() {
  return (
    <ProjectCard
      {...metadata}
      images={[
        "https://upload.wikimedia.org/wikipedia/commons/f/f7/Honey_comb.jpg",
      ]}
      ctas={[
        {
          kind: "github",
          href: "https://github.com/manoj-malviya-96/honeycomb/tree/master",
        },
        {
          kind: "medium",
          href: "https://medium.com/@manojmalviya/honeycomb-visualizer",
        },
      ]}
    >
      <Typography variant="body">{metadata.description}</Typography>
    </ProjectCard>
  );
}

export const project = {
  id: "honeycomb",
  metadata,
  Card: HoneycombProjectCard,
} as const;
