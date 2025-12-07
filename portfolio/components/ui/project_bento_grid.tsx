"use client";

import React, { memo } from "react";
import { Project } from "@/core/showcase";
import ProjectCard from "./project_card";

interface ProjectBentoGridProps {
  projects: Project[];
}

function _ProjectBentoGrid({ projects }: ProjectBentoGridProps) {
  // Sort projects by rank (lower rank = higher priority)
  const sortedProjects = [...projects].sort((a, b) => {
    const rankA = a.rank ?? 999;
    const rankB = b.rank ?? 999;
    return rankA - rankB;
  });

  // First project (lowest rank) is the highlighted one
  const [highlightedProject, ...otherProjects] = sortedProjects;

  if (!highlightedProject) {
    return (
      <div className="text-center py-12 text-muted">No projects available</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {/* Highlighted Project - Takes up 2x2 space on larger screens */}
      <ProjectCard project={highlightedProject} highlight />

      {/* Other Projects */}
      {otherProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}

_ProjectBentoGrid.displayName = "ProjectBentoGrid";
export default memo(_ProjectBentoGrid);
