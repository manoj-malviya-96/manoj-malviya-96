import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { memo, ReactNode } from 'react';

const SOCIAL_LINKS = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Globe, href: 'https://yourwebsite.com', label: 'Website' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
] as const;

const PROFILE = {
    name: 'Manoj Malviya',
    tagline: 'Product Builder & Tinkerer',
    quote: '"Perfectly balanced"',
    bio: 'Crafting innovative solutions at the intersection of physics simulation, CAD, and web technologies. 6+ years turning complex problems into elegant products.',
    role: 'Senior Software Engineer',
    company: 'Formlabs',
} as const;

const ExternalLink = memo<{ href: string; label: string; className?: string; children: ReactNode }>(
    function ExternalLink({ href, label, className, children }) {
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
);

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
                <div className="space-y-6">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl gradient-text leading-[0.9] tracking-tight w-full">
                        {PROFILE.quote}
                    </h1>

                    <p className="text-6xl">
                        {PROFILE.name}
                    </p>
                    <p className="text-lg sm:text-xl text-muted-foreground italic">
                        {PROFILE.tagline}
                    </p>

                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {PROFILE.bio}
                    </p>
                </div>

                <div className="flex justify-center gap-2 pt-4">
                    {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                        <ExternalLink
                            key={label}
                            href={href}
                            label={label}
                            className="p-3 bg-muted rounded-lg glow-accent group"
                        >
                            <Icon className="w-5 h-5 icon-glow" />
                        </ExternalLink>
                    ))}
                </div>

                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">
                        Currently {PROFILE.role} @ <span className="text-foreground">{PROFILE.company}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}