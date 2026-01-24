"use client";

import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "@/lib/ui";
import Fuse, { IFuseOptions } from "fuse.js";
import { Typography } from "@/lib/ui/text";
import type { ProjectTag } from "@/lib/projects/list/types";
import { ALL_PROJECTS } from "@/lib/projects/list";

interface ProjectData {
  id: string;
  Component: ComponentType;
  title: string;
  description: string;
  tags: readonly ProjectTag[];
  effort: "low" | "medium" | "high";
}

const fuseOptions: IFuseOptions<ProjectData> = {
  includeScore: true,
  threshold: 0.35,
  keys: [
    { name: "title", weight: 0.35 },
    { name: "description", weight: 0.25 },
    { name: "tags", weight: 0.2 },
  ],
};

const effortOrder = { low: 1, medium: 2, high: 3 };

function useLoadProjects(ids?: string[]) {
  const [projects, setProjects] = useState<ProjectData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const projectsToShow = ids
          ? ALL_PROJECTS.filter((p) => ids.includes(p.id))
          : ALL_PROJECTS;

        const projectData = projectsToShow.map((project) => ({
          id: project.id,
          Component: project.Card,
          ...project.metadata,
        }));

        if (!cancelled) {
          setProjects(projectData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ids]);

  return { projects, isLoading };
}

function useFilteredProjects(projects: ProjectData[] | null, query: string) {
  return useMemo(() => {
    if (!projects) return [];

    const sorted = [...projects].sort(
      (a, b) => effortOrder[b.effort] - effortOrder[a.effort],
    );

    if (!query.trim()) return sorted;

    const fuse = new Fuse(sorted, fuseOptions);
    return fuse.search(query.trim()).map((r) => r.item);
  }, [projects, query]);
}

interface ProjectsClientProps {
  ids?: string[];
  initialQuery?: string;
}

export default function ProjectsClient({
  ids,
  initialQuery = "",
}: ProjectsClientProps) {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("search") || initialQuery;
  const [query, setQuery] = useState(queryFromUrl);

  const { projects, isLoading } = useLoadProjects(ids);
  const filtered = useFilteredProjects(projects, query);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4 items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-subtle text-sm">Loading projects...</p>
      </section>
    );
  }

  const handleSearch = (value: string) => {
    setQuery(value);
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-16">
      <Search
        value={query}
        onChange={handleSearch}
        placeholder="Search projects (title, tags, description)"
      />

      {filtered.length === 0 ? (
        <Typography variant="caption">
          No projects match that search.
        </Typography>
      ) : (
        <ul className="flex flex-col gap-32">
          {filtered.map((project) => {
            const ProjectComponent = project.Component;
            return (
              <li className="list-none" key={project.id} id={project.id}>
                <ProjectComponent />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
