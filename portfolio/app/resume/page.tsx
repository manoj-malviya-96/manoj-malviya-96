import { Flex, Screen, Typography } from "@manoj-malviya-96/atom";
import { GithubMetricsCard, ScholarMetricsCard } from "@/lib/about_me/metrics";
import WorkHistory from "@/lib/about_me/work_history";

export default function About() {
	return (
		<Screen gap="xl" className="theme-dark">
			<Flex as="header" direction="col" gap="sm">
				<Typography variant="overline">Experience</Typography>
				<Typography variant="heading">Resume</Typography>
				<Typography variant="subtitle">
					I build fast, reliable products—from pixel-perfect UIs to
					performance-critical engines (yes, I care about the last millisecond).
					I lead across CAD/CAM, rendering, and optimization in
					hardware–software ecosystems, turning gnarly workflows into intuitive
					experiences and measurable product impact.
				</Typography>
			</Flex>
			<Flex
				as="section"
				direction="col"
				gap="lg"
				className="direction-responsive-row gap-responsive-lg"
			>
				<WorkHistory style={{ flex: 2 }} />
				<Flex direction="col" gap="md" grow>
					<GithubMetricsCard />
					<ScholarMetricsCard />
				</Flex>
			</Flex>
		</Screen>
	);
}
