import { Github, Linkedin, Mail, Globe, Twitter, ArrowUpRight } from 'lucide-react';

export function Footer() {
    const socialLinks = [
        { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
        { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
    ];

    const quickLinks = [
        { label: 'Work Experience', href: '#workex' },
        { label: 'Projects & Blogs', href: '#showcase' },
        { label: 'Resume PDF', href: '#' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg mb-3">Manoj Malviya</h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                            Product Builder & Tinkerer crafting innovative solutions in simulation, CAD, and web technologies.
                        </p>
                        <a
                            href="mailto:your.email@example.com"
                            className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-muted-foreground transition-all"
                        >
                            Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg mb-3">Quick Links</h3>
                        <ul className="space-y-1.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-all"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & CTA */}
                    <div>
                        <h3 className="text-lg mb-3">Connect</h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                            Follow my work and connect with me
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background rounded-lg glow-subtle"
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-4 h-4 icon-glow" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        &copy; 2025 Manoj Malviya. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-all">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-all">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
