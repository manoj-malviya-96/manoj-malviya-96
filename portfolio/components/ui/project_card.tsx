"use client";

import React, { memo, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { Project, ProjectCTA } from "@/lib/showcase";
import { cn } from "@/lib/utils";
import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ProjectCardProps = {
  project: Project;
  highlight?: boolean;
  minimal?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  dateOrRead?: string;
};

const CTAButton = ({ cta }: { cta: ProjectCTA }) => {
  const base =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] bg-white/10 hover:bg-white/20 backdrop-blur";
  const content = (label: string, icon?: ReactNode) => (
    <span className="inline-flex items-center gap-2">
      {icon}
      {label}
    </span>
  );

  if (cta.kind === "github") {
    return (
      <a
        href={cta.href}
        className={base}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {content(
          cta.label ?? "GitHub",
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />,
        )}
      </a>
    );
  }
  if (cta.kind === "medium") {
    return (
      <a
        href={cta.href}
        className={base}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {content(
          cta.label ?? "Medium",
          <FontAwesomeIcon icon={faMedium} className="w-4 h-4" />,
        )}
      </a>
    );
  }
  // custom
  if (cta.node) {
    return <span className={cn(base, "cursor-default")}>{cta.node}</span>;
  }
  if (cta.href) {
    return (
      <a
        href={cta.href}
        className={base}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {content(
          cta.label,
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="w-4 h-4"
          />,
        )}
      </a>
    );
  }
  return <span className={base}>{content(cta.label)}</span>;
};

const ImagesBlock = ({ images }: { images: (string | StaticImageData)[] }) => {
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className="relative w-full md:w-60 h-36 md:h-40 overflow-hidden rounded-lg">
        <Image
          src={img}
          alt="project image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 240px"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-row flex-wrap gap-3 mt-3">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative w-36 h-24 rounded-lg overflow-hidden"
        >
          <Image
            src={img}
            alt={`project image ${idx + 1}`}
            fill
            className="object-cover"
            sizes="180px"
          />
        </div>
      ))}
    </div>
  );
};

const ProjectCard = memo(function _ProjectCard({
  project,
  highlight = false,
  onClick,
  minimal = false,
  className,
  icon,
  dateOrRead,
}: ProjectCardProps) {
  const { title, tagline, description, tags, images, image, ctas } = project;
  const mergedImages = images ?? (image ? [image] : []);

  return (
    <div
      className={cn(
        "relative w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:border-white/20 transition-all duration-200",
        highlight && "ring-2 ring-white/40",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">{icon}</div>
            {dateOrRead && (
              <span className="text-xs opacity-70">{dateOrRead}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold leading-tight">{title}</span>
            {tagline && <span className="text-sm text-subtle">{tagline}</span>}
          </div>

          {!minimal && description && (
            <p className="text-sm text-subtle leading-relaxed">{description}</p>
          )}

          {!!tags.length && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {ctas?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {ctas.map((cta, idx) => (
                <CTAButton key={idx} cta={cta} />
              ))}
            </div>
          ) : null}

          {mergedImages.length > 1 && <ImagesBlock images={mergedImages} />}
        </div>

        {mergedImages.length === 1 && <ImagesBlock images={mergedImages} />}
      </div>
    </div>
  );
});

export default ProjectCard;
