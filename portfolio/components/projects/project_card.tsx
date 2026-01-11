import React, { memo, ReactNode } from "react";
import Image from "next/image";
import { type ProjectMeta } from "@/lib/projects/metadata";
import { mergeCls } from "@/lib/utils";
import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextImage } from "@/components/ui/image";
import { Typography } from "@/components/ui/text";
import { Badge } from "@/components/ui";
import { ExternalURL } from "@/lib/types";

type GithubRepo = `https://github.com/${string}/${string}`;
type MediumPost = `https://medium.com/@${string}/${string}`;
type ProjectCTA =
  | { kind: "github"; href: GithubRepo }
  | { kind: "medium"; href: MediumPost }
  | { kind: "demo"; label?: string; href: ExternalURL }
  | { kind: "custom"; node: ReactNode };

const CTAButton = ({ cta }: { cta: ProjectCTA }) => {
  const base = "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm";
  if (cta.kind === "custom") {
    return <span className={mergeCls(base, "cursor-default")}>{cta.node}</span>;
  }

  const icon = (() => {
    switch (cta.kind) {
      case "github":
        return <FontAwesomeIcon icon={faGithub} />;
      case "medium":
        return <FontAwesomeIcon icon={faMedium} />;
      case "demo":
        return null;
      default:
        return null;
    }
  })();

  const label = (() => {
    switch (cta.kind) {
      case "github":
        return "GitHub";
      case "medium":
        return "Blog";
      case "demo":
        return cta.label ?? "Demo";
      default:
        return null;
    }
  })();

  return (
    <a href={cta.href} className={base} target="_blank" rel="noreferrer">
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
    </a>
  );
};

const IMG_SIZE = 240;

const ImagesBlock = ({ images }: { images: NextImage[] }) => {
  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt="project image"
        width={IMG_SIZE}
        height={IMG_SIZE}
        loading="lazy"
        className="flex-1"
      />
    );
  }
  return (
    <div className="flex flex-row flex-wrap gap-3 mt-3">
      {images.map((img, idx) => (
        <Image
          key={idx}
          src={img}
          width={IMG_SIZE}
          height={IMG_SIZE}
          loading="lazy"
          alt={`project image ${idx + 1}`}
        />
      ))}
    </div>
  );
};

function ProjectCard({
  title,
  description,
  body,
  tags,
  images,
  ctas,
  highlight = false,
  className,
}: ProjectMeta & {
  body: ReactNode;
  images: NextImage[];
  ctas?: ProjectCTA[];
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={mergeCls(
        "flex flex-row flex-wrap gap-4 p-6 lg:p-8 rounded-xl w-full h-fit items-start",
        highlight && "bg-gradient-to-l from-muted to-muted/20",
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-4 md:p-6 flex-1">
        {/* Heading */}
        <span className="flex flex-col items-start justify-start gap-0">
          <Typography variant="title">{title}</Typography>
          {description && (
            <Typography variant="caption">{description}</Typography>
          )}
        </span>

        {/* Tags */}
        {!!tags.length && (
          <ul className="flex flex-row flex-wrap gap-2 items-center">
            {tags.map((tag: string) => (
              <Badge key={tag} element="li">
                {tag}
              </Badge>
            ))}
          </ul>
        )}

        {body && <Typography variant="body">{body}</Typography>}

        {ctas?.length && (
          <span className="flex flex-wrap gap-2 items-center">
            {ctas.map((cta: ProjectCTA, idx: number) => (
              <CTAButton key={idx} cta={cta} />
            ))}
          </span>
        )}
        {images.length > 1 && <ImagesBlock images={images} />}
      </div>
      {images.length === 1 && <ImagesBlock images={images} />}
    </div>
  );
}

export default memo(ProjectCard);
