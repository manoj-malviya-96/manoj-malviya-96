import PageContainer from "@/components/ui/page_container";
import { ProjectBentoGrid } from "@/components/ui";
import { AllProjects } from "@/core/showcase";
import { LinkedinCover } from "@/core/assets";

export default function Page() {
  return (
    <PageContainer cover={LinkedinCover}>
      <section className="screen flex flex-col gap-8 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-6xl font-bold">Projects</h2>
          <p className="text-lg text-subtle">
            A showcase of my projects, experiments, and collaborations.
          </p>
        </div>
        <ProjectBentoGrid projects={AllProjects} />
      </section>
    </PageContainer>
  );
}
