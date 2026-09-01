"use client";

import { useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import { getSocialLinks } from "@/lib/about_me/profile";
import { Link, StatCard } from "@/lib/ui";
import { Github, GoogleScholar } from "@/lib/ui/brand_icons";

export function GithubMetricsCard() {
	const { data, error } = useGithubQuery();

	return (
		<StatCard
			title="Github"
			description="A live snapshot of engineering momentum."
			error={
				error ? `Could not load GitHub metrics: ${error.message}` : undefined
			}
			stats={[
				{ label: "Total Contributions", value: data?.totalContribution },
				{ label: "This Year", value: data?.currentYearContribution },
				{ label: "Daily Average", value: data?.dailyAverage },
				{ label: "Longest Streak", value: data?.longestStreak },
			]}
			cta={
				<Link
					url={getSocialLinks().Github}
					openNewTab
					aria-label="GitHub profile"
				>
					<Github />
				</Link>
			}
		/>
	);
}

export function ScholarMetricsCard() {
	const { data, error } = useGoogleScholarQuery();

	return (
		<StatCard
			title="Google Scholar"
			description="Research impact metrics."
			error={
				error ? `Could not load Scholar metrics: ${error.message}` : undefined
			}
			stats={[
				{ label: "Total Citations", value: data?.citations?.toLocaleString() },
				{ label: "Publications", value: data?.publications },
				{ label: "h-index", value: data?.hIndex },
				{ label: "This Year", value: data?.recentYearCitations },
			]}
			cta={
				<Link
					url={getSocialLinks().Scholar}
					openNewTab
					aria-label="Google Scholar profile"
				>
					<GoogleScholar />
				</Link>
			}
		/>
	);
}
