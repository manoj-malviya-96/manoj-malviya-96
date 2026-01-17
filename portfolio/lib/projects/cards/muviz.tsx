import ProjectCard from "@/lib/projects/project_card";
import { MuvizMetadata as meta } from "@/lib/projects/metadata";
import { MuvizDemo } from "@/lib/assets";
import { Typography } from "@/lib/ui/text";

function MusicDescription() {
  return (
    <Typography variant="body">
      I am obssesed with music visualizer - since winamp days. Its something so
      satisfying to have video react to music. I am building Muviz to be
      performant and yet feature rich for web.
    </Typography>
  );
}

export default function MuvizProjectCard() {
  return (
    <ProjectCard
      {...meta}
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
    >
      <MusicDescription />
    </ProjectCard>
  );
}
