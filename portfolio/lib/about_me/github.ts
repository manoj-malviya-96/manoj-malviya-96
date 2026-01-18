import { useQuery } from "@tanstack/react-query";

export interface GitHubMetrics {
  commits: number;
  contributionYears: number;
  currentYearCommits: number;
  activeDays: number;
  longestStreak: number;
}

interface GitHubContributionsResponse {
  total: {
    [year: string]: number;
  };
  contributions: Array<{
    date: string;
    count: number;
    level: number;
  }>;
}

async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
  const response = await fetch("/api/github", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch GitHub metrics");
  const data = (await response.json()) as GitHubContributionsResponse;

  const totalCommits = Object.values(data.total).reduce(
    (sum, count) => sum + count,
    0,
  );
  const years = Object.keys(data.total).map(Number);
  const contributionYears =
    years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0;

  const currentYear = new Date().getFullYear().toString();
  const currentYearCommits = data.total[currentYear] || 0;
  const activeDays = data.contributions.filter((c) => c.count > 0).length;
  let currentStreak = 0;
  let longestStreak = 0;
  data.contributions.forEach((c) => {
    if (c.count > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });
  return {
    commits: totalCommits,
    contributionYears,
    currentYearCommits,
    activeDays,
    longestStreak,
  };
}

export function useGithubQuery() {
  return useQuery({
    queryKey: ["github-metrics"],
    queryFn: fetchGitHubMetrics,
  });
}
