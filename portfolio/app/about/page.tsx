import {
  GithubMetricsCard,
  ScholarMetricsCard,
  TechStackList,
} from "@/components/about/metrics";
import { Typography } from "@/components/ui/text";

export default function About() {
  return (
    <main className="screen flex flex-col  gap-8 lg:gap-16">
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
        <TechStackList />
      </span>

      <span className="flex flex-col gap-4">
        <Typography variant="body">
          Live proof of consistency—real shipping cadence in code, and
          measurable impact through published work and citations
        </Typography>
        <div className="flex flex-row flex-wrap gap-4 lg:gap-8 ">
          <GithubMetricsCard className="flex-1" />
          <ScholarMetricsCard className="flex-1" />
        </div>
      </span>
    </main>
  );
}
