"use client";
import { ReactNode } from "react";
import { PROFILE, SOCIAL_LINKS, SocialLink } from "@/core/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Parallax } from "@/components/parallax";

interface ExternalLinkProps {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}

function ExternalLink({ href, label, className, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="text-center space-y-8 animate-fadeIn">
      <Parallax speed={0.3}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl gradient-text tracking-tight w-full">
          {PROFILE.quote}
        </h1>
      </Parallax>

      <Parallax speed={0.5}>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {PROFILE.bio}
        </p>
      </Parallax>

      <Parallax speed={0.7}>
        <div className="flex justify-center gap-2 pt-4">
          {SOCIAL_LINKS.map(({ icon, href, label }: SocialLink) => (
            <ExternalLink
              key={label}
              href={href}
              label={label}
              className="p-3 rounded-lg glow-accent group"
            >
              <FontAwesomeIcon icon={icon} className="w-5 h-5 icon-glow" />
            </ExternalLink>
          ))}
        </div>
      </Parallax>

      <Parallax speed={0.4}>
        <p className="text-sm text-muted-foreground pt-8">
          Currently {PROFILE.role} @{" "}
          <span className="text-foreground">{PROFILE.company}</span>
        </p>
      </Parallax>
    </div>
  );
}
