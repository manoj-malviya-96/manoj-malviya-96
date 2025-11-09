import {ReactNode} from 'react';
import {PROFILE, SOCIAL_LINKS, SocialLink} from '@/core/data';


interface ExternalLinkProps {
    href: string;
    label: string;
    className?: string;
    children: ReactNode;
}

function ExternalLink({
                          href,
                          label,
                          className,
                          children,
                      }: ExternalLinkProps) {
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
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
            <div className="space-y-6">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl gradient-text leading-[0.9] tracking-tight w-full">
                    {PROFILE.quote}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {PROFILE.bio}
                </p>
            </div>
            <div className="flex justify-center gap-2 pt-4">
                {SOCIAL_LINKS.map(({icon: Icon, href, label}: SocialLink) => (
                    <ExternalLink
                        key={label}
                        href={href}
                        label={label}
                        className="p-3 bg-muted rounded-lg glow-accent group"
                    >
                        <Icon className="w-5 h-5 icon-glow"/>
                    </ExternalLink>
                ))}
            </div>
            <div className="pt-8">
                <p className="text-sm text-muted-foreground">
                    Currently {PROFILE.role} @ <span className="text-foreground">{PROFILE.company}</span>
                </p>
            </div>
        </div>
    );
}