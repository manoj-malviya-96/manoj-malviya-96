"use client";
import { memo } from "react";
import { useGithub } from "@/lib/query/github";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { google_scholar } from "@/lib/query/google_scholar";
import { faAtom, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { TECH_STACK } from "@/lib/about_me/profile";
import Icon from "@/components/ui/icon";
import Card from "@/components/ui/card";

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
      <span className="text-xl sm:text-2xl">{value}</span>
      <span className="text-xs text-subtle">{label}</span>
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
    <div className="flex flex-col items-center justify-center w-full mb-2">
      {/* Todo: I want to be like a counter. */}
      <span className="text-xl sm:text-5xl font-bold">{value}</span>
      <span className="text-xs text-subtle">{label}</span>
    </div>
  );
});

export function GithubMetricsCard() {
  const { data, error } = useGithub();

  if (error) {
    console.error("Error fetching GitHub metrics:", error);
    return null;
  }
  return (
    <Card icon={faGithub} title="GitHub" className="flex-grow w-full bg-muted">
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

export function ScholarMetricsCard() {
  const { data, error } = google_scholar();

  if (error) {
    console.error("Error fetching Google Scholar metrics:", error);
    return null;
  }

  return (
    <Card
      icon={faGraduationCap}
      title="Research"
      className="flex-grow w-full bg-muted"
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
    <span className="flex flex-wrap items-center gap-2 theme rounded-lg text-sm sm:px-2 sm:py-1">
      {icon && <Icon icon={icon} />} {name}
    </span>
  );
}

export function TechStackList() {
  const names = Object.keys(TECH_STACK);
  return (
    <Card icon={faAtom} title="Tech Stack">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {names.map((name) => (
          <TechBadge key={name} name={name} />
        ))}
      </div>
    </Card>
  );
}

TechStackList.displayName = "TechStackList";
