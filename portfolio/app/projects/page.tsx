import { ProjectIds } from "@/lib/projects/metadata";
import { Typography } from "@/components/ui/text";
import ProjectsClient from "@/components/projects/projects_client";
import { Suspense } from "react";

function ProjectsLoading() {
  return (
    <section className="flex flex-col gap-4 items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-subtle text-sm">Loading projects...</p>
    </section>
  );
}

export default function Page() {
  return (
    <main className="screen flex flex-col gap-8 lg:gap-16">
      <span className="space-y-4">
        <Typography variant="heading">My Projects</Typography>
        <Typography variant="caption">
          A collection of my favorite projects that I have worked on over the
          years.
        </Typography>
      </span>

      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient ids={[...ProjectIds]} />
      </Suspense>
    </main>
  );
}
