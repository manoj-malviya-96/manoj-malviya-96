import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAws,
  faDocker,
  faFigma,
  faGitAlt,
  faJs,
  faNode,
  faPython,
  faReact,
  faRust,
} from "@fortawesome/free-brands-svg-icons";
import { faC, faCube, faDatabase } from "@fortawesome/free-solid-svg-icons";

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
