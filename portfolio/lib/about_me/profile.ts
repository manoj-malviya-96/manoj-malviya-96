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
  PennStateLogo,
} from "@/lib/assets";

import type { StaticImageData as LocalImage } from "next/image";
import { ExternalURL, MonthAndYear } from "@/lib/types";

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

export type WorkExperience = {
  company: string;
  logo: LocalImage;
  companyURL: ExternalURL;
  position: string;
  startDate: MonthAndYear;
  endDate?: MonthAndYear;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  role?: string;
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
    role: `Focused on computational design and optimization for 3D printing, 
          taking algorithms from research and experimentation 
          through production-ready engineering`,
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
    role: `Owned end-to-end delivery of CAD/CAM desktop features in PreForm
          leading UI architecture and performance while 
          coordinating across product, design, and hardware team`,
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
    role: `Worked on core product performance for music learning, 
          focusing on real-time rendering and ML-backed audio workflows 
          across the Apple ecosystem`,
  },
  {
    company: "Penn State University",
    companyURL: "https://www.psu.edu/",
    position: "Graduate Research Assistant",
    startDate: "2018-08",
    endDate: "2020-07",
    location: "Berlin, Germany",
    logo: PennStateLogo,
    type: "Full-time",
    role: `Conducted research in computational design and digital manufacturing, 
          building prototypes and publishing work spanning optimization, 
          graphics, and machine learning`,
  },
] as WorkExperience[];

export const TECH_STACK: Record<string, IconDefinition> = {
  TypeScript: faJs,
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
