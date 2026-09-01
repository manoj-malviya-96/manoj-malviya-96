import { useQuery } from "@tanstack/react-query";
import { MONTH_ABBREVIATIONS } from "@/lib/utils";

export interface GitHubMetrics {
	totalContribution: number;
	currentYearContribution: number;
	dailyAverage: number;
	longestStreak: number;
	contributions: readonly Contribution[];
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
		contributions: data.contributions,
	};
}

export function useGithubQuery() {
	return useQuery({
		queryKey: ["github-metrics"],
		queryFn: fetchGitHubMetrics,
	});
}

export interface ContributionHeatmap {
	xLabels: readonly string[];
	yLabels: readonly string[];
	values: readonly (readonly number[])[];
}

/** Sun-first weekday rows, like GitHub's own graph; most go unlabeled so the
 *  seven-row axis doesn't compete with the value it sits next to. */
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const DAY_MS = 86_400_000;
const WEEKS_SHOWN = 53;

/** The feed concatenates full calendar years newest-first (each year
 *  ascending, including its still-future days) rather than one ascending
 *  series, so this re-sorts and windows to the trailing year before laying
 *  out a grid — the same span GitHub's own graph shows. */
export function toContributionHeatmap(
	contributions: readonly Contribution[],
): ContributionHeatmap {
	const today = new Date().toISOString().slice(0, 10);
	const recent = contributions
		.filter((c) => c.date <= today)
		.slice()
		.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
		.slice(-WEEKS_SHOWN * 7);

	if (recent.length === 0) {
		return { xLabels: [], yLabels: WEEKDAY_LABELS, values: [] };
	}

	const firstDay = new Date(recent[0].date);
	const firstSunday = new Date(firstDay);
	firstSunday.setDate(firstDay.getDate() - firstDay.getDay());
	const weekCount =
		Math.floor(
			(new Date(recent[recent.length - 1].date).getTime() -
				firstSunday.getTime()) /
				(7 * DAY_MS),
		) + 1;

	const values: number[][] = Array.from({ length: 7 }, () =>
		new Array(weekCount).fill(0),
	);
	const xLabels = new Array<string>(weekCount).fill("");
	let lastLabeledMonth = -1;

	for (const { date, count } of recent) {
		const day = new Date(date);
		const week = Math.floor(
			(day.getTime() - firstSunday.getTime()) / (7 * DAY_MS),
		);
		values[day.getDay()][week] = count;
		if (day.getMonth() !== lastLabeledMonth) {
			xLabels[week] = MONTH_ABBREVIATIONS[day.getMonth()];
			lastLabeledMonth = day.getMonth();
		}
	}

	return { xLabels, yLabels: WEEKDAY_LABELS, values };
}
