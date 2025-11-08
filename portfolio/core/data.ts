import {Github, Globe, Linkedin, Mail, Twitter} from "lucide-react";
import {SocialLink} from "@/core/types";


export const SOCIAL_LINKS = [
    {icon: Github, href: 'https://github.com/yourusername', label: 'GitHub'},
    {icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn'},
    {icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter'},
    {icon: Globe, href: 'https://yourwebsite.com', label: 'Website'},
    {icon: Mail, href: 'mailto:your.email@example.com', label: 'Email'},
] as const as SocialLink[];

export const PROFILE = {
    name: 'Manoj Malviya',
    tagline: 'Product Builder & Tinkerer',
    quote: '"Perfectly balanced"',
    bio: 'Crafting innovative solutions at the intersection of physics simulation, CAD, and web technologies. 6+ years turning complex problems into elegant products.',
    role: 'Senior Software Engineer',
    company: 'Noah Labs',
} as const;