import { Typography } from "@/lib/ui/text";
import ProjectsClient from "@/lib/projects/projects_client";
import { Suspense } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { Icon } from "@/lib/ui";

function ProjectsLoading() {
  return (
    <section className="screen">
      <Icon icon={faSpinner} size="lg" />
    </section>
  );
}

export default function Page() {
  return (
    <main className="screen flex flex-col gap-8 lg:gap-16">
      <span className="flex flex-col gap-2">
        <Typography variant="heading">Projects</Typography>
        <Typography variant="body">
          A collection of my favorite projects that I have worked on over the
          years.
        </Typography>
      </span>
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsClient />
      </Suspense>
    </main>
  );
}
