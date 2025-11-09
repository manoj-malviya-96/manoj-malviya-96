import {ArrowUpRight} from 'lucide-react';
import Link from '@/components/Link';
import {FOOTER_DATA} from "@/core/data";


export default function Footer() {
    const {social, quickLinks, profile} = FOOTER_DATA
    return (
        <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-lg mb-3">{profile.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {profile.tagline}
                    </p>
                    <Link
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-muted-foreground transition-all"
                    >
                        Get in touch <ArrowUpRight className="w-3.5 h-3.5"/>
                    </Link>
                </div>

                <div>
                    <h3 className="text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-1.5">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-all"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg mb-3">Connect</h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        Follow my work and connect with me
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {social.map(({icon: Icon, href, label}) => (
                            <Link
                                key={label}
                                href={href}
                                external
                                className="p-2.5 bg-background rounded-lg glow-subtle"
                                label={label}
                            >
                                <Icon className="w-4 h-4 icon-glow" aria-label={label}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm">
                    &copy; 2025 Manoj Malviya. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-foreground transition-all">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-all">
                        Terms of Use
                    </Link>
                </div>
            </div>
        </footer>
    );
}