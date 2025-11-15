import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

export interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: faGithub,
    href: "https://github.com/manoj-malviya-96",
    label: "GitHub",
  },
  {
    icon: faLinkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
  },
  {
    icon: faTwitter,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
  },
  { icon: faGlobe, href: "https://yourwebsite.com", label: "Website" },
  { icon: faEnvelope, href: "mailto:your.email@example.com", label: "Email" },
];

export const PROFILE = {
  name: "Manoj Malviya",
  tagline: "Product Builder & Tinkerer",
  quote: '"Perfectly balanced"',
  bio: "Crafting innovative solutions at the intersection of physics simulation, CAD, and web technologies. 6+ years turning complex problems into elegant products.",
  role: "Senior Software Engineer",
  company: "Noah Labs",
} as const;

export const FOOTER_DATA = {
  social: SOCIAL_LINKS,
  quickLinks: [
    { label: "Work Experience", href: "#workex" },
    { label: "Projects & Blogs", href: "#showcase" },
    { label: "Resume PDF", href: "#" },
    { label: "Contact", href: "#contact" },
  ] as const,
  profile: {
    name: "Manoj Malviya",
    tagline:
      "Product Builder & Tinkerer crafting innovative solutions in simulation, CAD, and web technologies.",
    email: "your.email@example.com",
  } as const,
} as const;
