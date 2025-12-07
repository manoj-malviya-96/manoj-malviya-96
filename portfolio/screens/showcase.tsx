"use client";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Icon, ProjectCard } from "@/components/ui";
import { useNavigator } from "@/hooks/use-navigator";
import { AllProjects } from "@/core/showcase";

export default function ProjectShowcase() {
  const navigate = useNavigator();
  const Projects = AllProjects.slice(0, 2);
  return (
    <section className="screen flex flex-col gap-8 lg:gap-16" data-theme="dark">
      <span className="flex flex-row gap-4 items-center justify-between">
        <h2 className="text-6xl font-bold">Projects</h2>
        <button
          className="bg-muted px-3 py-2 flex flex-row gap-2 items-center
          rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            navigate("projects");
          }}
          aria-label="Read More About Me"
        >
          View All
          <Icon icon={faUpRightFromSquare} />
        </button>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Projects.map((project) => (
          <ProjectCard
            key={project.title}
            className="h-72 md:h-100"
            project={project}
            minimal
            onClick={() => {
              if (!project.githubRepo) return;
              navigate(project.githubRepo);
            }}
          />
        ))}
      </div>
    </section>
  );
}
