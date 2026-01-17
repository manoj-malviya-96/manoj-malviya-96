import ProjectCard from "@/lib/projects/project_card";
import { HoneyCombMetadata as meta } from "@/lib/projects/metadata";
import { Typography } from "@/lib/ui/text";

export default function HoneycombProjectCard() {
  return (
    <ProjectCard
      {...meta}
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
      <Typography variant="body">{meta.description}</Typography>
    </ProjectCard>
  );
}
