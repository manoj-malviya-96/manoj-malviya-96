"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Icon } from "@/components/ui";
import {
  ProjectId,
  ProjectIds,
  ProjectsMetadata,
} from "@/lib/projects/metadata";
import { Typography } from "@/components/ui/text";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons/faLaptopCode";

export default function ProjectShowcase() {
  return (
    <section className="screen flex flex-col gap-8 lg:gap-16" data-theme="dark">
      <span className="flex flex-row gap-4 items-center justify-between">
        <Typography variant="heading">Projects</Typography>
        <Link
          href="/projects"
          className="bg-muted px-3 py-2 flex flex-row gap-2 items-center rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
          aria-label="View all projects"
        >
          View All
          <Icon icon={faUpRightFromSquare} />
        </Link>
      </span>

      {/* Table of Contents */}
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ProjectIds.map((id) => (
          <li key={id}>
            <ProjectItem projectId={id} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectItem({ projectId }: { projectId: ProjectId }) {
  const meta = ProjectsMetadata[projectId];
  return (
    <Link
      href={`/projects#${projectId}`}
      className="flex gap-4 p-2 rounded-lg hover:bg-muted transition-colors group items-center cursor-pointer"
    >
      <Icon icon={faLaptopCode} />
      <span className="flex-1 flex-col">
        <Typography variant="label" className="block">
          {meta.title}
        </Typography>
        <Typography variant="caption" className="line-clamp-1">
          {meta.description}
        </Typography>
      </span>
    </Link>
  );
}
