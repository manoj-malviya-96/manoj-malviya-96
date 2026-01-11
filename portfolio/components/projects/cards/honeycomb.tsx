import type { ReactNode } from "react";
import ProjectCard from "@/components/projects/project_card";
import { HoneyCombMetadata as meta } from "@/lib/projects/metadata";

export default function HoneycombProjectCard(): ReactNode {
  return (
    <ProjectCard
      {...meta}
      body={meta.description}
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
    />
  );
}
