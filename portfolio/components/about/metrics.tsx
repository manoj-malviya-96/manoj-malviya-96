"use client";
import { memo } from "react";
import { useGithub } from "@/lib/query/github";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { google_scholar } from "@/lib/query/google_scholar";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { TECH_STACK } from "@/lib/about_me/profile";
import Icon from "@/components/ui/icon";
import Card from "@/components/ui/card";
import { Typography } from "@/components/ui/text";
import { mergeCls } from "@/lib/utils";

const LoadingString = "-";

const Stat = memo(function fn({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="caption">{label}</Typography>
      <Typography variant="heading" component="span">
        {value}
      </Typography>
    </div>
  );
});

const HighlightStat = memo(function fn({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Todo: I want to be like a counter. */}
      <Typography variant="caption">{label}</Typography>
      <Typography variant="largeHeading" component="span">
        {value}
      </Typography>
    </div>
  );
});

export function GithubMetricsCard({ className }: { className?: string }) {
  const { data, error } = useGithub();

  if (error) {
    console.error("Error fetching GitHub metrics:", error);
    return null;
  }
  return (
    <Card
      icon={faGithub}
      title="Github"
      className={mergeCls("bg-muted", className)}
      description={
        "A live snapshot of engineering momentum—shipping consistently.\n"
      }
    >
      <HighlightStat
        value={data ? data.commits.toLocaleString() : LoadingString}
        label="Total Contributions"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <Stat
          value={data ? data.contributionYears : LoadingString}
          label="Years Active"
        />
        <Stat
          value={
            data ? data.currentYearCommits.toLocaleString() : LoadingString
          }
          label="This Year"
        />
        <Stat
          value={data ? data.activeDays.toLocaleString() : LoadingString}
          label="Active Days"
        />
        <Stat
          value={data ? data.longestStreak : LoadingString}
          label="Longest Streak"
        />
      </div>
    </Card>
  );
}
GithubMetricsCard.displayName = "GithubMetricsCard";

export function ScholarMetricsCard({ className }: { className?: string }) {
  const { data, error } = google_scholar();

  if (error) {
    console.error("Error fetching Google Scholar metrics:", error);
    return null;
  }

  return (
    <Card
      icon={faGraduationCap}
      title="Research"
      description={"A quick view of research impact and consistency"}
      className={mergeCls("bg-muted", className)}
    >
      <HighlightStat
        value={data ? data.citations.toLocaleString() : LoadingString}
        label="Total Citations"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Stat
          value={data ? data.publications : LoadingString}
          label="Publications"
        />
        <Stat value={data ? data.hIndex : LoadingString} label="h-index" />
        <Stat value={data ? data.i10Index : LoadingString} label="i10-index" />
        <Stat
          value={data ? data.recentYearCitations : LoadingString}
          label="This Year"
        />
      </div>
    </Card>
  );
}

ScholarMetricsCard.displayName = "ScholarMetricsCard";

function TechBadge({ name }: { name: string }) {
  const icon = TECH_STACK[name];
  return (
    <Typography
      variant="caption"
      className="flex flex-wrap items-center gap-2 rounded-lg sm:px-2 sm:py-1"
    >
      {icon && <Icon icon={icon} />} {name}
    </Typography>
  );
}
