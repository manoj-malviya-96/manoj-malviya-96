"use client";

// Add React import at the top
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type ProjectId, ProjectsMetadata } from "@/lib/projects/metadata";
import { getProjectCardNode } from "@/lib/projects/cards";
import { Search } from "@/components/ui";
import Fuse, { IFuseOptions } from "fuse.js";

interface ProjectData {
  id: ProjectId;
  node: ReactNode;
  title: string;
  description: string;
  tags: string[];
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

interface ProjectsClientProps {
  ids: ProjectId[];
  initialQuery?: string;
}

export default function ProjectsClient({
  ids,
  initialQuery = "",
}: ProjectsClientProps) {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<ProjectData[] | null>(null);
  const queryFromUrl = searchParams.get("search") || initialQuery;
  const [query, setQuery] = useState(queryFromUrl);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const nodes = await Promise.all(
          ids.map((id) => getProjectCardNode(id)),
        );
        const projectData: ProjectData[] = ids.map((id, idx) => ({
          id,
          node: nodes[idx],
          ...ProjectsMetadata[id],
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

  // Filter and sort projects
  const filtered = useMemo(() => {
    if (!projects) return [];

    const sorted = [...projects].sort(
      (a, b) => effortOrder[b.effort] - effortOrder[a.effort],
    );

    if (!query.trim()) return sorted;

    const fuse = new Fuse(sorted, fuseOptions);
    return fuse.search(query.trim()).map((r) => r.item);
  }, [projects, query]);

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
    <section className="flex flex-col gap-8">
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
        <ul className="flex flex-col gap-16">
          {filtered.map((project) => (
            <li className="list-none" key={project.id} id={project.id}>
              {project.node}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
