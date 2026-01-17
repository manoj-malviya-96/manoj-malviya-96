import type { Project } from "./types";
import { project as PortfolioProject } from "./portfolio";
import { project as MuvizProject } from "./muviz";
import { project as BlackholeProject } from "./blackhole";
import { project as HoneycombProject } from "./honeycomb";

export const ALL_PROJECTS: Project[] = [
  PortfolioProject,
  MuvizProject,
  HoneycombProject,
  BlackholeProject,
] as const;
