"use client";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import { useMemo } from "react";
import { useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import { getSocialLinks } from "@/lib/about_me/profile";
import { Icon } from "@/lib/ui";
import Link from "@/lib/ui/link";
import StatCard from "@/lib/ui/stat";

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
				<Link newTab url={getSocialLinks().Github}>
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
				<Link newTab url={getSocialLinks().Scholar}>
					<Icon icon={faGoogleScholar} size="lg" />
				</Link>
			}
		/>
	);
}
