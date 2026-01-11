"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Icon } from "@/components/ui";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  getProjectCardNode,
  type ProjectId,
  ProjectIds,
  sortProjectIdsByEffort,
} from "@/lib/projects";

export default function ProjectShowcase() {
  const ids: ProjectId[] = useMemo(
    () => sortProjectIdsByEffort(ProjectIds).slice(0, 3),
    [],
  );

  const [cards, setCards] = useState<ReactNode[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const nodes = await Promise.all(ids.map((id) => getProjectCardNode(id)));
      if (!cancelled) setCards(nodes);
    })();
    return () => {
      cancelled = true;
    };
  }, [ids]);

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
        {cards.map((node, idx) => (
          <div key={ids[idx]} className="max-w-xl">
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}
