import { ReactNode } from "react";
import { PROFILE, SOCIAL_LINKS, SocialLink } from "@/core/data";

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
      <h1 className="text-3xl sm:text-5xl lg:text-6xl gradient-text tracking-tight w-full">
        {PROFILE.quote}
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {PROFILE.bio}
      </p>
      <div className="flex justify-center gap-2 pt-4">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }: SocialLink) => (
          <ExternalLink
            key={label}
            href={href}
            label={label}
            className="p-3 rounded-lg glow-accent group"
          >
            <Icon className="w-5 h-5 icon-glow" />
          </ExternalLink>
        ))}
      </div>
      <p className="text-sm text-muted-foreground pt-8">
        Currently {PROFILE.role} @{" "}
        <span className="text-foreground">{PROFILE.company}</span>
      </p>
    </div>
  );
}
