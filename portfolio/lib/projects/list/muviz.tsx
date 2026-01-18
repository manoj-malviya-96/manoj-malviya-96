import ProjectCard from "@/lib/projects/project_card";
import { Typography } from "@/lib/ui/text";
import type { Project } from "@/lib/projects/list/types";

const metadata = {
  title: "Muviz - Music Visualizer",
  description:
    "A fast, feature-rich music visualizer for reactive beautiful visualizations",
  tags: ["web", "wasm", "c++", "typescript", "react", "ui/ux"],
  effort: "high",
} as const;

function MuvizProjectCard() {
  return (
    <ProjectCard
      {...metadata}
      images={[
        "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/muviz.webm",
      ]}
      ctas={[
        {
          kind: "github",
          href: "https://github.com/manoj-malviya-96/muviz/tree/master",
        },
        {
          kind: "demo",
          label: "Demo",
          href: "https://muviz.vercel.app/",
        },
      ]}
    >
      <Typography variant="body">
        I’ve been obsessed with music visualizers since the Winamp days—there’s
        just something ridiculously satisfying about watching visuals snap to
        the beat. That itch is exactly why I’m building Muviz: a web visualizer
        that stays fast without skimping on features. <br /> <br />
        Under the hood, it uses a <strong>C++ WASM backend</strong> that
        analyzes the full audio track in one pass and keeps the results in
        memory, so the frontend can focus on what it does best: rendering
        smooth, reactive visuals. Using WebGL for rendering means it can handle
        complex effects without breaking a sweat. The result? A music visualizer
        that’s not only feature-rich but also lightning-fast, delivering an
        immersive experience that truly resonates with the music. <br /> <br />
        Next up - adding more modes, connecting with external APIS (soundcloud,
        spotify, etc.), and more!
      </Typography>
    </ProjectCard>
  );
}

export const project: Project = {
  id: "muviz",
  metadata,
  Card: MuvizProjectCard,
} as const;
