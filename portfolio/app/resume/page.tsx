import { GithubMetricsCard, ScholarMetricsCard } from "@/lib/about_me/metrics";
import { Typography } from "@/lib/ui/text";
import WorkHistory from "@/lib/about_me/work_history";

export default function About() {
  return (
    <main className="screen flex flex-col gap-8 lg:gap-16">
      <section className="flex flex-col  gap-4">
        <Typography variant="heading">Resume</Typography>
        <Typography variant="body">
          I build fast, reliable products—from pixel-perfect UIs to
          performance-critical engines (yes, I care about the last millisecond).
          I lead across CAD/CAM, rendering, and optimization in
          hardware–software ecosystems, turning gnarly workflows into intuitive
          experiences and measurable product impact.
        </Typography>
      </section>
      {/* Todo add slideshow here */}

      {/* Work Experience and Metrics cards */}
      <section className="flex flex-col lg:flex-row  gap-8 lg:gap-16">
        <WorkHistory className="flex-2" />
        <div className="flex flex-col gap-4 lg:gap-8 flex-1">
          <GithubMetricsCard />
          <ScholarMetricsCard />
        </div>
      </section>
    </main>
  );
}
