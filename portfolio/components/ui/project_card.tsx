"use client";

import React, { memo, ReactNode } from "react";
import Image from "next/image";
import { Project } from "@/core/showcase";
import { cn } from "@/core/utils";

export type ProjectCardProps = {
  project: Project;
  highlight?: boolean;
  minimal?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  dateOrRead?: string;
};

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.93 3.19 9.11 7.61 10.59.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.96-3.09.67-3.74-1.49-3.74-1.49-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.47-.28-5.07-1.24-5.07-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.41.11-2.94 0 0 .95-.31 3.12 1.17a10.8 10.8 0 012.84-.38c.96.01 1.93.13 2.84.38 2.17-1.49 3.12-1.17 3.12-1.17.61 1.53.23 2.66.11 2.94.72.78 1.16 1.78 1.16 3 0 4.3-2.61 5.25-5.09 5.52.39.34.74 1 .74 2.02 0 1.46-.01 2.64-.01 3 .01.3.21.65.78.54 4.42-1.48 7.61-5.66 7.61-10.59C23.25 5.48 18.27.5 12 .5z" />
  </svg>
);

const GitHubCTA = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-2 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-md text-xs font-medium transition-all duration-200 hover:scale-105"
    onClick={(e) => e.stopPropagation()}
  >
    <GitHubIcon />
    GitHub
  </a>
);

const ProjectCard = memo(function _ProjectCard({
  project,
  highlight = false,
  onClick,
  minimal = false,
  className,
  icon,
  dateOrRead,
}: ProjectCardProps) {
  const { title, tagline, description, tags, image, githubRepo } = project;

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer group glow-accent",
        highlight &&
          "md:col-span-2 lg:col-span-2 lg:row-span-2 md:min-h-[20rem] lg:min-h-[26rem]",
        className,
      )}
      onClick={onClick}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          className="absolute inset-0 object-cover transition-all duration-700
          brightness-70
          group-hover:scale-110 group-hover:brightness-110"
          priority={false}
          quality={75}
        />
      )}
      <div
        className="absolute bottom-0 left-0 h-fit w-full
        flex flex-col justify-between p-4 sm:p-5
        bg-gradient-to-t text-front from-back via-back/50 to-transparent"
        data-theme="dark"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">{icon}</div>
          {dateOrRead && (
            <span className="text-xs opacity-75">{dateOrRead}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl sm:text-2xl uppercase font-extrabold">
            {title}
          </span>
          {tagline && (
            <span className="text-sm opacity-90 drop-shadow">{tagline}</span>
          )}
          {!minimal && description && (
            <span className="text-xs sm:text-sm line-clamp-2 leading-relaxed drop-shadow">
              {description}
            </span>
          )}
          <div className="flex items-center justify-between">
            {!!tags.length && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {githubRepo && <GitHubCTA href={githubRepo} />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
