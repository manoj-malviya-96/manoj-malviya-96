import {
  getProjectCardNodes,
  ProjectIds,
  sortProjectIdsByEffort,
} from "@/lib/projects";
import { Typography } from "@/components/ui/text";

export default async function Page() {
  const ids = sortProjectIdsByEffort(ProjectIds);
  const cards = await getProjectCardNodes(ids);

  return (
    <main className="screen flex flex-col gap-8 lg:gap-16">
      <span className="space-y-4">
        <Typography variant="heading">My Projects</Typography>
        <Typography variant="caption">
          A collection of my favorite projects that I have worked on over the
          years.
        </Typography>
      </span>

      <section className="flex flex-col gap-16">
        {cards.map((node, idx) => (
          <div key={ids[idx]}>{node}</div>
        ))}
      </section>
    </main>
  );
}
