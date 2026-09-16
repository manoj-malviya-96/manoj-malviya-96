import { PRIV_TOKEN, USER } from "./config";
import { gh } from "./github-client";

interface ContribDay {
	date: string;
	contributionCount: number;
}

export interface YearContrib {
	totalCommitContributions: number;
	restrictedContributionsCount: number;
	contributionCalendar: { weeks: { contributionDays: ContribDay[] }[] };
}

// One query for every year since the account was created: commit totals (for the
// total commit count) and the daily calendar (for streaks) come from the same field.
export async function fetchYearlyContributions(
	joinYear: number,
): Promise<YearContrib[]> {
	const currentYear = new Date().getUTCFullYear();
	const years: number[] = [];
	for (let y = joinYear; y <= currentYear; y++) years.push(y);
	const aliases = years
		.map(
			(y) =>
				`y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y + 1}-01-01T00:00:00Z") ` +
				"{ totalCommitContributions restrictedContributionsCount " +
				"contributionCalendar { weeks { contributionDays { date contributionCount } } } }",
		)
		.join("\n");
	const data = await gh<{ user: Record<string, YearContrib> }>(
		`query { user(login: "${USER}") { ${aliases} } }`,
		{},
		PRIV_TOKEN,
	);
	return years.map((y) => data.user[`y${y}`]);
}

export function computeStreaks(years: YearContrib[]): {
	current: number;
	longest: number;
} {
	const today = new Date().toISOString().slice(0, 10);
	const days = years
		.flatMap((y) =>
			y.contributionCalendar.weeks.flatMap((w) => w.contributionDays),
		)
		.filter((d) => d.date <= today) // GitHub pads the current year's calendar to Jan 1 next year
		.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

	let longest = 0;
	let run = 0;
	for (const day of days) {
		run = day.contributionCount > 0 ? run + 1 : 0;
		longest = Math.max(longest, run);
	}

	let current = 0;
	for (let i = days.length - 1; i >= 0; i--) {
		if (days[i].contributionCount > 0) current++;
		else if (i === days.length - 1)
			continue; // today isn't over yet, don't break the streak on it
		else break;
	}
	return { current, longest };
}
