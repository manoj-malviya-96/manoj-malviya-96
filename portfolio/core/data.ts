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
  faChartLine,
  faCube,
  faDatabase,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}

export const SOCIAL_LINKS = [
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
] as const as SocialLink[];

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
  ] as const as { label: string; href: string }[],
  profile: {
    name: "Manoj Malviya",
    tagline:
      "Product Builder & Tinkerer crafting innovative solutions in simulation, CAD, and web technologies.",
    email: "your.email@example.com",
  } as const,
} as const;

export type WorkExperience = {
  title: string;
  company: string;
  logo: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrent: boolean;
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    title: "Senior Software Engineer",
    company: "Formlabs",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "Boston, MA",
    period: "Oct 2023 - Present",
    current: true,
    description:
      "Leading development of advanced CAD and simulation tools for 3D printing, focusing on optimization algorithms and real-time visualization.",
    achievements: [
      "Built optimization algorithms reducing print time by 30%",
      "Led team of 4 engineers on simulation engine rewrite",
      "Implemented real-time preview system using WebGL",
      "Reduced memory usage by 40% through algorithm improvements",
    ],
    technologies: ["TypeScript", "React", "WebGL", "C++", "Python"],
    isCurrent: true,
  },
  {
    title: "R&D Software Engineer",
    company: "Formlabs",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "Boston, MA",
    period: "Jan 2020 - Oct 2023",
    current: false,
    description:
      "Developed physics simulation engines and optimization algorithms for additive manufacturing.",
    achievements: [
      "Created MESHA - mesh generation toolkit used by 1000+ engineers",
      "Published 3 research papers on topology optimization",
      "Improved simulation accuracy by 25%",
    ],
    technologies: ["Python", "C++", "React", "Node.js"],
    isCurrent: false,
  },
  {
    title: "Graduate Researcher",
    company: "Penn State University",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "State College, PA",
    period: "Aug 2018 - Dec 2019",
    current: false,
    description:
      "Research in computational physics and material science simulations.",
    achievements: [
      "Developed novel FEA algorithms for composite materials",
      "Published 2 papers in peer-reviewed journals",
    ],
    technologies: ["Python", "MATLAB", "C++"],
    isCurrent: false,
  },
  {
    title: "Software Engineering Intern",
    company: "Autodesk",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "San Francisco, CA",
    period: "Summer 2018",
    current: false,
    description: "Worked on CAD rendering pipeline optimization.",
    achievements: ["Improved render performance by 40% using GPU acceleration"],
    technologies: ["C++", "CUDA", "OpenGL"],
    isCurrent: false,
  },
] as const as WorkExperience[];

export const TECH_STACK: Record<string, IconDefinition> = {
  TypeScript: faJs, // Using JS icon as placeholder for TypeScript
  JavaScript: faJs,
  Python: faPython,
  "C++": faC,
  Rust: faRust,
  React: faReact,
  "Next.js": faReact, // Using React icon as placeholder
  Tailwind: faCube, // Using generic cube icon
  "Node.js": faNode,
  PostgreSQL: faDatabase,
  MongoDB: faDatabase,
  Redis: faDatabase,
  Docker: faDocker,
  Git: faGitAlt,
  AWS: faAws,
  Figma: faFigma,
};

// Metrics types & data
export interface MetricStat {
  value: string;
  label: string;
}

export interface Metric {
  icon: IconDefinition;
  title: string;
  stats: MetricStat[];
}

export const METRICS: Metric[] = [
  {
    icon: faGithub,
    title: "GitHub",
    stats: [
      { value: "2,847", label: "Commits" },
      { value: "42", label: "Repos" },
      { value: "1,284", label: "Stars" },
      { value: "342", label: "Followers" },
    ],
  },
  {
    icon: faChartLine,
    title: "Impact",
    stats: [
      { value: "15", label: "Projects" },
      { value: "10k+", label: "Users Reached" },
    ],
  },
];

// Showcase data
export interface ShowcaseItem {
  id: string;
  title: string;
  type: "project" | "blog";
  category: string;
  description: string;
  image?: string;
  date: string;
  tags: string[];
  detailedDescription?: string;
  features?: string[];
  link?: string;
  paper?: string;
  readTime?: string;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "MUVIZ",
    type: "project",
    category: "Web Application",
    description:
      "Interactive 3D music visualization tool with real-time audio analysis",
    date: "2024",
    tags: ["WebGL", "Three.js", "Audio"],
    image:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc2MjM0NjgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "MUVIZ transforms audio into stunning 3D visual experiences using real-time audio analysis and WebGL rendering.",
    features: [
      "Real-time audio frequency analysis",
      "Multiple visualization modes",
      "Customizable color schemes",
      "Export as video",
    ],
    link: "https://muviz.example.com",
  },
  {
    id: "2",
    title: "Building Scalable Physics Simulations",
    type: "blog",
    category: "Engineering",
    description:
      "Learn how to architect physics simulation engines that can handle complex scenarios efficiently",
    date: "Oct 15, 2024",
    tags: ["Physics", "Architecture", "Performance"],
    readTime: "8 min read",
    link: "https://medium.com/@yourusername/physics-simulations",
  },
  {
    id: "3",
    title: "TrussOpt",
    type: "project",
    category: "CAD Tool",
    description: "Structural optimization tool for truss design and analysis",
    date: "2023",
    tags: ["CAD", "Optimization", "React"],
    image:
      "https://images.unsplash.com/photo-1666302707255-13651d539be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdlb21ldHJpY3xlbnwxfHx8fDE3NjIzNTcxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "TrussOpt helps engineers design and optimize truss structures with advanced simulation algorithms.",
    features: [
      "Automated topology optimization",
      "Real-time stress analysis",
      "Material selection guidance",
      "Export to CAD formats",
    ],
    link: "https://trussopt.example.com",
    paper: "https://arxiv.org/example",
  },
  {
    id: "4",
    title: "The Future of Web-Based CAD Tools",
    type: "blog",
    category: "Technology",
    description:
      "Exploring WebGL and WebAssembly for desktop-class CAD in the browser",
    date: "Sep 22, 2024",
    tags: ["WebGL", "CAD", "WebAssembly"],
    readTime: "6 min read",
    link: "https://medium.com/@yourusername/web-cad",
  },
  {
    id: "5",
    title: "MESHA",
    type: "project",
    category: "Developer Tool",
    description: "Advanced mesh generation and analysis toolkit",
    date: "2022",
    tags: ["CAD", "Simulation", "Python"],
    image:
      "https://images.unsplash.com/photo-1652939617330-e5b59457c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzYyMzUzMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "MESHA provides automated meshing algorithms and quality assessment tools for FEA.",
    features: [
      "Automatic mesh generation",
      "Mesh quality analysis",
      "Complex geometry support",
      "FEA solver integration",
    ],
    link: "https://github.com/yourusername/mesha",
    paper: "https://papers.example.com/mesha",
  },
  {
    id: "6",
    title: "Optimizing React Performance",
    type: "blog",
    category: "Engineering",
    description:
      "Best practices for building high-performance React applications",
    date: "Aug 10, 2024",
    tags: ["React", "Performance", "JavaScript"],
    readTime: "10 min read",
    link: "https://medium.com/@yourusername/react-performance",
  },
];
