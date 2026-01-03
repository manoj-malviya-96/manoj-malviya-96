"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { useMemo } from "react";
import { AllProjects } from "@/lib/showcase";

export default function ProjectShowcase() {
  const projects = useMemo(() => {
    return [...AllProjects]
      .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
      .slice(0, 3);
  }, []);

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
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        {projects.map((project) => (
          <span key={project.title}>{project.title}</span>
        ))}
      </div>
    </section>
  );
}
