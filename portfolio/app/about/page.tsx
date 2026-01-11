import {
  GithubMetricsCard,
  ScholarMetricsCard,
  TechStackList,
} from "@/components/about/metrics";
import { Typography } from "@/components/ui/text";

export default function About() {
  return (
    <main className="screen flex flex-col  gap-8 lg:gap-16">
      <Typography variant="heading">About me</Typography>
      <span className="flex flex-row gap-8 lg:gap-16">
        <GithubMetricsCard />
        <ScholarMetricsCard />
      </span>
      <TechStackList />
    </main>
  );
}
