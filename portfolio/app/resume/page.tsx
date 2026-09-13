import { Flex, Text } from "@manoj-malviya-96/atom";
import { ResumePDF } from "@/lib/data";
import Education from "@/lib/resume/education";
import { RESUME_SECTIONS } from "@/lib/resume/sections";
import WorkHistory from "@/lib/resume/work_history";
import { Eyebrow, Link, Page } from "@/lib/shared";

export default function About() {
	return (
		<Page>
			<Text variant="heading">Past Experience</Text>
			<Text variant="subtitle">
				Seven years solving problems that sit between hardware and software: CAD
				tools engineers depend on, patient-monitoring platforms that can&apos;t
				afford downtime, real-time rendering that has to hit budget every frame.
				I own the full path: system design, the algorithm underneath, and the
				interface someone actually has to use.
			</Text>
			<Link url={ResumePDF} openNewTab variant="inline">
				Download PDF
			</Link>
			<Flex
				as="section"
				id={RESUME_SECTIONS[0].id}
				direction="col"
				gap="lg"
				padding={{ y: "lg" }}
			>
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
		</Page>
	);
}
