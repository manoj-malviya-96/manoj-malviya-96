"use client";
import { useMemo } from "react";
import { useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import StatCard from "@/lib/ui/stat";
import Link from "@/lib/ui/link";
import { SOCIAL } from "@/lib/about_me/profile";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/lib/ui";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";

export function GithubMetricsCard({ className }: { className?: string }) {
  const { data, error } = useGithubQuery();

  const stats = useMemo(
    () => [
      { label: "Total Contributions", value: data?.totalContribution },
      { label: "This Year", value: data?.currentYearContribution },
      { label: "Daily Average", value: data?.dailyAverage },
      { label: "Longest Streak", value: data?.longestStreak },
    ],
    [data],
  );

  if (error) {
    console.error("Error fetching GitHub metrics:", error);
  }

  return (
    <StatCard
      title="Github"
      description="A live snapshot of engineering momentum."
      stats={stats}
      className={className}
      cta={
        <Link newTab url={SOCIAL[0].href}>
          <Icon icon={faGithub} size="lg" />
        </Link>
      }
    />
  );
}
export function ScholarMetricsCard({ className }: { className?: string }) {
  const { data, error } = useGoogleScholarQuery();

  const stats = useMemo(
    () => [
      { label: "Total Citations", value: data?.citations?.toLocaleString() },
      { label: "Publications", value: data?.publications },
      { label: "h-index", value: data?.hIndex },
      { label: "This Year", value: data?.recentYearCitations },
    ],
    [data],
  );

  if (error) {
    console.error("Error fetching Google Scholar metrics:", error);
  }
  return (
    <StatCard
      title="Google Scholar"
      description="Research impact metrics."
      stats={stats}
      className={className}
      cta={
        <Link
          newTab
          url={"https://scholar.google.com/citations?user=0oMXOy0AAAAJ&hl=en"}
        >
          <Icon icon={faGoogleScholar} size="lg" />
        </Link>
      }
    />
  );
}
