import ProjectCard from "@/lib/projects/project_card";
import { Typography } from "@/lib/ui/text";
import type { Project } from "@/lib/projects/list/types";

const metadata = {
  title: "Portfolio",
  description: `A modern portfolio website to showcase my projects and skills, 
              built with Next.js, TailwindCSS and TypeScript`,
  tags: ["web", "open-source", "nextjs", "tailwind", "typescript", "ui/ux"],
  effort: "medium",
} as const;

function PortfolioCard() {
  return (
    <ProjectCard
      {...metadata}
      images={[
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fm=jpg&q=60&w=1600&fit=crop",
      ]}
      ctas={[
        {
          kind: "github",
          href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
        },
        {
          kind: "demo",
          label: "Live Demo",
          href: "https://manoj-malviya-96.vercel.app",
        },
      ]}
    >
      <Typography variant="body">{metadata.description}</Typography>
    </ProjectCard>
  );
}

export const project: Project = {
  id: "portfolio",
  metadata,
  Card: PortfolioCard,
} as const;
