"use client";

import React, { useEffect, useMemo, useState } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import ProjectCard from "./project_card";
import type { ProjectCard as Project } from "@/lib/projects";
import { Search } from "@/components/ui";
import { mergeCls } from "@/lib/utils";

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

const fuseOptions: IFuseOptions<Project> = {
  includeScore: true,
  threshold: 0.35,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "description", weight: 0.25 },
    { name: "body", weight: 0.2 },
    { name: "tags", weight: 0.2 },
  ],
};

const effortOrder: Record<Project["effort"], number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export default function ProjectList({ projects, className }: ProjectListProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(handle);
  }, [query]);

  const sorted = useMemo(() => {
    return [...projects].sort(
      (a, b) => effortOrder[a.effort] - effortOrder[b.effort],
    );
  }, [projects]);

  const fuse = useMemo(() => new Fuse(sorted, fuseOptions), [sorted]);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return sorted;
    return fuse.search(debouncedQuery.trim()).map((r) => r.item);
  }, [fuse, debouncedQuery, sorted]);

  return (
    <section className={mergeCls("flex flex-col gap-6", className)}>
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search projects (title, tags, description)"
      />

      {filtered.length === 0 ? (
        <div className="text-sm text-subtle">
          No projects match that search.
        </div>
      ) : (
        <ul className="flex flex-col gap-16">
          {filtered.map((project, idx) => (
            <li className="list-none" key={project.id}>
              <ProjectCard {...project} highlight={idx === 0} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
