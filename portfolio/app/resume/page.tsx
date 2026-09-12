import { Flex, Text } from "@manoj-malviya-96/atom";
import { ResumePDF } from "@/lib/data";
import Education from "@/lib/resume/education";
import { RESUME_SECTIONS } from "@/lib/resume/sections";
import WorkHistory from "@/lib/resume/work_history";
import { Eyebrow, Link } from "@/lib/shared";

export default function About() {
	return (
		<>
			{/* Todo integrate in atom: Header's page-padding compensation is a fixed
			    calc, blind to the extra bottom-slot row HeaderBar shows on this route —
			    padding here makes up the difference so the TOC doesn't overlap this text. */}
			<Flex as="header" direction="col" gap="xl" padding={{ y: "xl" }}>
				<Flex direction="row" hAlign="between" vAlign="start" gap="lg" wrap>
					<Flex direction="col" gap="xl">
						<Eyebrow>Track record</Eyebrow>
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
					Seven years solving problems that sit between hardware and software —
					CAD tools engineers depend on, patient-monitoring platforms that
					can&apos;t afford downtime, real-time rendering that has to hit budget
					every frame. I own the full path: system design, the algorithm
					underneath, and the interface someone actually has to use.
				</Text>
			</Flex>
			<Flex as="section" id={RESUME_SECTIONS[0].id} direction="col" gap="lg">
				<Flex direction="col" gap="sm">
					<Eyebrow>Experience</Eyebrow>
					<Text variant="heading">Where the last seven years went.</Text>
				</Flex>
				<WorkHistory />
			</Flex>
			<Flex as="section" id={RESUME_SECTIONS[1].id} direction="col" gap="xl">
				<Flex direction="col" gap="sm">
					<Eyebrow>Education</Eyebrow>
					<Text variant="heading">Where the engineering started.</Text>
				</Flex>
				<Education />
			</Flex>
		</>
	);
}
