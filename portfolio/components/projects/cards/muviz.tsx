import type { ReactNode } from "react";
import ProjectCard from "@/components/projects/project_card";
import { MuvizMetadata as meta } from "@/lib/projects/metadata";
import { MuvizDemo } from "@/lib/assets";

function MusicDescription() {
  return (
    <>
      I am obssesed with music visualizer - since winamp days. Its something so
      satisfying to have video react to music. I am building Muviz to be
      performant and yet feature rich for web.
    </>
  );
}

export default function MuvizProjectCard(): ReactNode {
  return (
    <ProjectCard
      {...meta}
      body={<MusicDescription />}
      images={[MuvizDemo]}
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
    />
  );
}
