import {
  GithubMetricsCard,
  ScholarMetricsCard,
} from "@/components/about/metrics";
import { Typography } from "@/components/ui/text";
import WorkHistory from "@/components/about/work_history";
import { WORK_EXPERIENCE } from "@/lib/about_me/profile";

export default function About() {
  return (
    <main className="screen flex flex-col gap-8 lg:gap-16">
      <span className="flex flex-col  gap-4">
        <Typography variant="heading">About me</Typography>
        <Typography variant="body">
          Senior Software Engineer & Tech Lead building fast, reliable
          products—from pixel-perfect UIs to performance-critical engines.
          Experienced across CAD/CAM, rendering, optimization, and
          hardware-software ecosystems, with a track record of turning complex
          workflows into intuitive user experiences and measurable product
          outcomes.
        </Typography>
      </span>
      {/* Todo add slideshow here */}

      {/* Work Experience and Metrics cards */}
      <div className="flex flex-row flex-wrap gap-8">
        <WorkHistory experiences={WORK_EXPERIENCE} />
        <div className="flex flex-col gap-4 lg:gap-8 flex-1">
          <GithubMetricsCard />
          <ScholarMetricsCard />
        </div>
      </div>
    </main>
  );
}
