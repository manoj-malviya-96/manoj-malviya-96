import { Flex, Typography } from "@manoj-malviya-96/atom";
import { GithubMetricsCard, ScholarMetricsCard } from "@/lib/about_me/metrics";
import WorkHistory from "@/lib/about_me/work_history";

export default function About() {
	return (
		<Flex
			as="main"
			direction="col"
			gap="lg"
			className="screen gap-responsive-lg"
		>
			<Flex as="section" direction="col" gap="sm">
				<Typography variant="heading">Resume</Typography>
				<Typography variant="body">
					I build fast, reliable products—from pixel-perfect UIs to
					performance-critical engines (yes, I care about the last millisecond).
					I lead across CAD/CAM, rendering, and optimization in
					hardware–software ecosystems, turning gnarly workflows into intuitive
					experiences and measurable product impact.
				</Typography>
			</Flex>
			{/* Todo add slideshow here */}

			{/* Work Experience and Metrics cards */}
			<Flex
				as="section"
				direction="col"
				gap="lg"
				className="direction-responsive-row gap-responsive-lg"
			>
				<WorkHistory style={{ flex: 2 }} />
				<Flex direction="col" gap="md" style={{ flex: 1 }}>
					<GithubMetricsCard />
					<ScholarMetricsCard />
				</Flex>
			</Flex>
		</Flex>
	);
}
