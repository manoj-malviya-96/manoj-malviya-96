import {
  GithubMetricsCard,
  ScholarMetricsCard,
  TechStackList,
} from "@/components/about/metrics";

export default function About() {
  return (
    <div className="screen flex flex-col  gap-8 lg:gap-16">
      <h2 className="text-6xl uppercase">About me</h2>
      <span className="flex flex-row gap-8 lg:gap-16">
        <GithubMetricsCard />
        <ScholarMetricsCard />
      </span>
      <TechStackList />
    </div>
  );
}
