import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { IITJLogo, PennStateLogo } from "@/lib/assets";

import type { StaticImageData as LocalImage } from "next/image";
import { MonthAndYear } from "@/lib/types";

export interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}

export const SOCIAL: SocialLink[] = [
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

type Education = {
  school: string;
  schoolURL: string;
  degree: string;
  field: string;
  focus: string;
  graduation: MonthAndYear;
  logo: LocalImage;
};
export const EDUCATION = [
  {
    school: "Penn State University",
    schoolURL: "https://www.psu.edu/",
    logo: PennStateLogo,
    degree: "Master of Science",
    field: "Mechanical Engineering",
    focus: "Computational Design, Machine Learning, Data Science",
    graduation: "2020-08",
  },
  {
    school: "Indian Institute of Technology",
    schoolURL: "https://www.iitj.ac.in/",
    logo: IITJLogo,
    degree: "Bachelor of Technology",
    field: "Mechanical Engineering",
    focus: "Design and Manufacturing",
    graduation: "2018-07",
  },
] as Education[];
