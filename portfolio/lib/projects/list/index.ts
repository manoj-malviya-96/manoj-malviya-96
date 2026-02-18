import {project as HoneycombProject} from "./honeycomb";
import {project as MuvizProject} from "./muviz";
import {project as PortfolioProject} from "./portfolio";
import {project as TopOptProject} from "./topopt";
import type {Project} from "./types";

export const ALL_PROJECTS: Project[] = [
    PortfolioProject,
    MuvizProject,
    HoneycombProject,
    TopOptProject,
    // BlackholeProject,
] as const;
