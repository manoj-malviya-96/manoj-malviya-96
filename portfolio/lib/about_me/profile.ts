import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAws,
  faDocker,
  faFigma,
  faGitAlt,
  faGithub,
  faJs,
  faLinkedin,
  faNode,
  faPython,
  faReact,
  faRust,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faC,
  faCube,
  faDatabase,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  FlowkeyLogo,
  FormlabsLogo,
  IITJLogo,
  NoahLabs,
  PennStateLogo,
} from "@/lib/assets";

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

type WorkExperience = {
  company: string;
  logo: LocalImage;
  companyURL: string;
  position: string;
  startDate: MonthAndYear;
  endDate?: MonthAndYear;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  role?: string[];
};
export const WORK_EXPERIENCE = [
  {
    company: "Formlabs",
    companyURL: "https://formlabs.com/",
    position: "R&D Software Engineer",
    startDate: "2021-01",
    endDate: "2023-08",
    location: "Somerville, MA",
    type: "Full-time",
    logo: FormlabsLogo,
    role: [
      "Developed software solutions for 3D printing technologies, focusing on improving print quality and reliability.",
      "Collaborated with cross-functional teams to integrate new features into existing products.",
    ],
  },
  {
    company: "Formlabs",
    companyURL: "https://formlabs.com/",
    position: "Senior Software Engineer",
    startDate: "2023-08",
    endDate: "2025-03",
    location: "Budapest, Hungary",
    logo: FormlabsLogo,
    type: "Full-time",
    role: [
      "Led a team of engineers in developing advanced software features for 3D printing systems.",
      "Implemented scalable solutions to enhance system performance and user experience.",
    ],
  },
  {
    company: "Flowkey",
    companyURL: "https://www.flowkey.com/en",
    position: "Senior Software Engineer",
    startDate: "2025-04",
    endDate: "2025-09",
    location: "Berlin, Germany",
    logo: FlowkeyLogo,
    type: "Contract",
    role: [
      "Designed and implemented new features for the Flowkey music learning platform.",
      "Optimized backend services to improve application responsiveness and scalability.",
    ],
  },
  {
    company: "Noah Labs",
    companyURL: "https://www.noah-labs.com/",
    position: "Senior Software Engineer",
    startDate: "2025-10",
    location: "Berlin, Germany",
    logo: NoahLabs,
    type: "Full-time",
    role: [
      "Leading the development of innovative software solutions in the field of AI and machine learning.",
      "Collaborating with a multidisciplinary team to drive product innovation and excellence.",
    ],
  },
] as WorkExperience[];

export const TECH_STACK: Record<string, IconDefinition> = {
  TypeScript: faJs, // Using JS icon as placeholder for TypeScript
  Python: faPython,
  "C / C++": faC,
  Rust: faRust,
  React: faReact,
  "Next.js": faReact,
  Tailwind: faCube,
  "Node.js": faNode,
  PostgreSQL: faDatabase,
  MongoDB: faDatabase,
  Redis: faDatabase,
  Docker: faDocker,
  Git: faGitAlt,
  AWS: faAws,
  Figma: faFigma,
};
