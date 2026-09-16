import { useQuery } from "@tanstack/react-query";

export function useGithubQuery() {
	return useQuery({
		queryKey: ["github-metrics"],
		queryFn: fetchGitHubMetrics,
	});
}

interface GitHubMetrics {
	totalContribution: number;
	currentYearContribution: number;
	dailyAverage: number;
	longestStreak: number;
}

interface Contribution {
	date: string;
	count: number;
}

interface GitHubContributionsResponse {
	total: {
		[year: string]: number;
	};
	contributions: Array<Contribution & { level: number }>;
}

function isGitHubContributionsResponse(
	data: unknown,
): data is GitHubContributionsResponse {
	if (typeof data !== "object" || data === null) return false;
	const { total, contributions } = data as Record<string, unknown>;
	return (
		typeof total === "object" &&
		total !== null &&
		Array.isArray(contributions)
	);
}

async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
	const response = await fetch("/api/github", {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});
	if (!response.ok) throw new Error("Failed to fetch GitHub metrics");
	const data: unknown = await response.json();
	if (!isGitHubContributionsResponse(data)) {
		throw new Error("Unexpected GitHub metrics response shape");
	}

	const totalCommits = Object.values(data.total).reduce(
		(sum, count) => sum + count,
		0,
	);
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
		totalContribution: totalCommits,
		currentYearContribution: currentYearCommits,
		dailyAverage: Math.round(totalCommits / activeDays),
		longestStreak,
	};
}
