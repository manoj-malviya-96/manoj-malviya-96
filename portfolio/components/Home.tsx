import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';

export function Home() {
    const socialLinks = [
        { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
        { icon: Globe, href: 'https://yourwebsite.com', label: 'Website' },
        { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
                {/* Tagline - Primary */}
                <div className="space-y-6">
                    <p className="text-lg sm:text-xl text-muted-foreground italic">
                        &#34;Perfectly balanced - a product should be&#34;
                    </p>

                    <h1 className="text-7xl sm:text-8xl lg:text-9xl gradient-text leading-[0.9] tracking-tight">
                        Manoj Malviya
                    </h1>

                    <p className="text-xl sm:text-2xl text-muted-foreground">
                        Product Builder & Tinkerer
                    </p>

                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Crafting innovative solutions at the intersection of physics simulation, CAD, and web technologies.
                        6+ years turning complex problems into elegant products.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-2 pt-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-muted rounded-lg glow-accent group"
                            aria-label={link.label}
                        >
                            <link.icon className="w-5 h-5 icon-glow" />
                        </a>
                    ))}
                </div>

                {/* Current Role */}
                <div className="pt-8">
                    <p className="text-sm text-muted-foreground">
                        Currently Senior Software Engineer @ <span className="text-foreground">Formlabs</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
