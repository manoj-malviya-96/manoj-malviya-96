"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import { BarChart, Heatmap } from "@manoj-malviya-96/atom";
import { toContributionHeatmap, useGithubQuery } from "@/lib/about_me/github";
import { useGoogleScholarQuery } from "@/lib/about_me/google_scholar";
import { getSocialLinks } from "@/lib/about_me/profile";
import { Icon, Link, StatCard } from "@/lib/ui";

export function GithubMetricsCard() {
	const { data, error } = useGithubQuery();
	const heatmap = data && toContributionHeatmap(data.contributions);

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
			chart={
				heatmap && (
					<Heatmap
						xLabels={heatmap.xLabels}
						yLabels={heatmap.yLabels}
						values={heatmap.values}
						height={140}
						aria-label="Daily contributions"
					/>
				)
			}
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

export function ScholarMetricsCard() {
	const { data, error } = useGoogleScholarQuery();
	const years = data && Object.keys(data.citationsPerYear).sort();

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
			chart={
				years &&
				data && (
					<BarChart
						categories={years}
						series={[
							{
								label: "Citations",
								data: years.map((year) => data.citationsPerYear[year] ?? 0),
							},
						]}
						height={140}
						aria-label="Citations per year"
					/>
				)
			}
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
