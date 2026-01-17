import ProjectCard from "@/lib/projects/project_card";
import { Typography } from "@/lib/ui/text";
import type { Project } from "@/lib/projects/list/types";

const metadata = {
  title: "Blackhole",
  description:
    "A simulation that simulates and visualizers gravitational effects around black holes.",
  tags: ["rendering", "gpu", "optimization", "c++", "opengl"] as const,
  effort: "high",
} as const;

function BlackholeProjectCard() {
  return (
    <ProjectCard
      {...metadata}
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
      <Typography variant="body">{metadata.description}</Typography>
    </ProjectCard>
  );
}

export const project: Project = {
  id: "blackhole",
  metadata,
  Card: BlackholeProjectCard,
} as const;
