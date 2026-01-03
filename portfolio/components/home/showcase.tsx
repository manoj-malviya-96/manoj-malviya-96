"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Icon, ProjectCard } from "@/components/ui";
import { useProjects } from "@/lib/showcase";

export default function ProjectShowcase() {
  const Projects = useProjects().slice(0, 2);
  return (
    <section className="screen flex flex-col gap-8 lg:gap-16" data-theme="dark">
      <span className="flex flex-row gap-4 items-center justify-between">
        <h2 className="text-6xl font-bold">Projects</h2>
        <Link
          href="/projects"
          className="bg-muted px-3 py-2 flex flex-row gap-2 items-center rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
          aria-label="View all projects"
        >
          View All
          <Icon icon={faUpRightFromSquare} />
        </Link>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Projects.map((project) => (
          <ProjectCard
            key={project.title}
            className="h-full"
            project={project}
            minimal
          />
        ))}
      </div>
    </section>
  );
}
