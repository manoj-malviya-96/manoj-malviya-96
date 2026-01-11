import type { ReactNode } from "react";
import ProjectCard from "@/components/projects/project_card";
import { PortfolioMetadata as meta } from "@/lib/projects/metadata";

export default function PortfolioCard(): ReactNode {
  return (
    <ProjectCard
      {...meta}
      body={meta.description}
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
    />
  );
}
