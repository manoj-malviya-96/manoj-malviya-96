import { Flex, Text } from "@manoj-malviya-96/atom";
import Education from "@/lib/about_me/education";
import WorkHistory from "@/lib/about_me/work_history";
import { ResumePDF } from "@/lib/data";
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
					Seven years solving problems that sit between hardware and
					software — CAD tools engineers depend on, patient-monitoring
					platforms that can&apos;t afford downtime, real-time rendering that
					has to hit budget every frame. I own the full path: system design,
					the algorithm underneath, and the interface someone actually has to
					use.
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
