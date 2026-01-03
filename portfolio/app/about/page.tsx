import {
  GithubMetricsCard,
  ScholarMetricsCard,
  TechStackList,
} from "@/components/metrics";
import PageContainer from "@/components/ui/page_container";
import { LinkedinCover } from "@/lib/assets";

export default function About() {
  return (
    <PageContainer cover={LinkedinCover}>
      <div className="screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <GithubMetricsCard />
        <ScholarMetricsCard />
        <TechStackList />
      </div>
    </PageContainer>
  );
}
