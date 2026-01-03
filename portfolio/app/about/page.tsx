import {
  GithubMetricsCard,
  ScholarMetricsCard,
  TechStackList,
} from "@/components/metrics";

export default function About() {
  return (
    <div className="screen grid grid-cols-1 md:grid-cols-3 gap-6">
      <GithubMetricsCard />
      <ScholarMetricsCard />
      <TechStackList />
    </div>
  );
}
