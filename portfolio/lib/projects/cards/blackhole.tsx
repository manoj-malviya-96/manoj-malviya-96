import ProjectCard from "@/lib/projects/project_card";
import { BlackholeMetadata as meta } from "@/lib/projects/metadata";
import { Typography } from "@/lib/ui/text";

export default function BlackholeProjectCard() {
  return (
    <ProjectCard
      {...meta}
      images={[
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1600&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=1400&fit=crop&sat=-15",
      ]}
      ctas={[
        {
          kind: "github",
          href: "https://github.com/manoj-malviya-96/blackhole/tree/master",
        },
        {
          kind: "demo",
          label: "Video Demo",
          href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ]}
    >
      <Typography variant="body">{meta.description}</Typography>
    </ProjectCard>
  );
}
