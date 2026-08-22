"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import { useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import { getSocialLinks } from "@/lib/about_me/profile";
import { Icon, Link, StatCard } from "@/lib/ui";

export function GithubMetricsCard({ className }: { className?: string }) {
	const { data, error } = useGithubQuery();

	return (
		<StatCard
			title="Github"
			description="A live snapshot of engineering momentum."
			error={
				error ? `Could not load GitHub metrics: ${error.message}` : undefined
			}
			className={className}
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
					<Icon icon={faGithub} size="lg" />
				</Link>
			}
		/>
	);
}

export function ScholarMetricsCard({ className }: { className?: string }) {
	const { data, error } = useGoogleScholarQuery();

	return (
		<StatCard
			title="Google Scholar"
			description="Research impact metrics."
			error={
				error ? `Could not load Scholar metrics: ${error.message}` : undefined
			}
			className={className}
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
					<Icon icon={faGoogleScholar} size="lg" />
				</Link>
			}
		/>
	);
}
