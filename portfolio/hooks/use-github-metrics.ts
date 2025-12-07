import { useQuery } from "@tanstack/react-query";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USER!;
const GITHUB_CONTRIBUTIONS_API = process.env.NEXT_PUBLIC_GITHUB_API!;

if (!GITHUB_USERNAME || !GITHUB_CONTRIBUTIONS_API) {
  throw new Error(
    "Missing environment variables: ensure NEXT_PUBLIC_GITHUB_USERNAME and NEXT_PUBLIC_GITHUB_API are set",
  );
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

async function fetchGitHubContributions(): Promise<GitHubContributionsResponse> {
  const response = await fetch(
    `${GITHUB_CONTRIBUTIONS_API}/${GITHUB_USERNAME}`,
  );
  if (!response.ok) throw new Error("Failed to fetch GitHub contributions");
  return response.json();
}

export interface GitHubMetrics {
  commits: number;
  contributionYears: number;
  currentYearCommits: number;
  activeDays: number;
  longestStreak: number;
}
async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
  const data = await fetchGitHubContributions();

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

export function useGitHubMetrics() {
  return useQuery({
    queryKey: ["github-metrics", GITHUB_USERNAME],
    queryFn: fetchGitHubMetrics,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
  });
}
