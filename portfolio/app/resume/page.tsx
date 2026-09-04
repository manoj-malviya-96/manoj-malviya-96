import { Flex, Text } from "@manoj-malviya-96/atom";
import Education from "@/lib/about_me/education";
import { ResumePDF } from "@/lib/about_me/profile";
import WorkHistory from "@/lib/about_me/work_history";
import { Link } from "@/lib/ui";

export default function About() {
	return (
		<>
			<Flex as="header" direction="col" gap="xl">
				<Flex direction="row" hAlign="between" vAlign="start" gap="lg" wrap>
					<Flex direction="col" gap="xl">
						<Text variant="overline" className="font-mono">
							Track record
						</Text>
						<Text variant="heading">Résumé</Text>
					</Flex>
					<Link
						url={ResumePDF}
						openNewTab
						variant="button"
						color="primary"
						label="Download PDF"
					/>
				</Flex>
				<Text variant="subtitle">
					I build fast, reliable products—from pixel-perfect UIs to
					performance-critical engines (yes, I care about the last millisecond).
					I lead across CAD/CAM, rendering, and optimization in hardware–softw
					are ecosystems, turning gnarly workflows into intuitive experiences
					and measurable product impact.
				</Text>
			</Flex>
			<Flex as="section" direction="col" gap="lg">
				<Flex direction="col" gap="sm">
					<Text variant="overline" className="font-mono">
						Experience
					</Text>
					<Text variant="heading">Where the last seven years went.</Text>
				</Flex>
				<WorkHistory />
			</Flex>
			<Flex as="section" direction="col" gap="xl">
				<Flex direction="col" gap="sm">
					<Text variant="overline" className="font-mono">
						Education
					</Text>
					<Text variant="heading">Where the engineering started.</Text>
				</Flex>
				<Education />
			</Flex>
		</>
	);
}
