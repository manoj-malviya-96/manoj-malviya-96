"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { ProjectIds, ProjectsMetadata } from "@/lib/projects/metadata";
import { Typography } from "@/components/ui/text";

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
      <div className="bg-muted/30 rounded-xl p-6 backdrop-blur-sm">
        <Typography variant="title" className="mb-4 text-primary">
          All Projects
        </Typography>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ProjectIds.map((id) => (
            <li key={id}>
              <Link
                href={`/projects#${id}`}
                className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Typography
                  variant="caption"
                  className="text-primary opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  →
                </Typography>
                <span className="flex-1">
                  <Typography variant="label" className="block">
                    {ProjectsMetadata[id].title}
                  </Typography>
                  <Typography variant="caption" className="line-clamp-1">
                    {ProjectsMetadata[id].description}
                  </Typography>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
