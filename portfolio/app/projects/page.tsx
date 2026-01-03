import PageContainer from "@/components/ui/page_container";
import { ProjectList } from "@/components/ui";
import { LinkedinCover } from "@/lib/assets";
import { AllProjects } from "@/lib/showcase";

export default function Page() {
  return (
    <PageContainer cover={LinkedinCover}>
      <section className="screen flex flex-col gap-8 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-6xl font-bold">Projects</h2>
          <span className="text-lg text-subtle">
            Some of my favorite projects that I have worked on over the years.
          </span>
        </div>
        <ProjectList projects={AllProjects} />
      </section>
    </PageContainer>
  );
}
