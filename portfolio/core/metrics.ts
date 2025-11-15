import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export interface MetricStat {
  value: string;
  label: string;
}

export interface Metric {
  icon: IconDefinition;
  title: string;
  stats: MetricStat[];
  highlightStat?: MetricStat;
}

export const METRICS: Metric[] = [
  {
    icon: faGithub,
    title: "GitHub",
    stats: [
      { value: "42", label: "Repos" },
      { value: "1,284", label: "Stars" },
      { value: "342", label: "Followers" },
    ],
    highlightStat: { value: "2,847", label: "Commits" },
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
