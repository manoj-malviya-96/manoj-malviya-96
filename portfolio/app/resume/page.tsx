import { Flex, Typography } from "@manoj-malviya-96/atom";
import Education from "@/lib/about_me/education";
import { ResumePDF } from "@/lib/about_me/profile";
import WorkHistory from "@/lib/about_me/work_history";
import { Link } from "@/lib/ui";

export default function About() {
	return (
		<>
			<Flex as="header" direction="col" gap="xl">
				<Typography variant="overline" className="font-mono">
					Track record
				</Typography>
				<Typography variant="heading">Résumé</Typography>
				<Typography variant="subtitle">
					I build fast, reliable products—from pixel-perfect UIs to
					performance-critical engines (yes, I care about the last millisecond).
					I lead across CAD/CAM, rendering, and optimization in hardware–softw
					are ecosystems, turning gnarly workflows into intuitive experiences
					and measurable product impact.
					<Link url={ResumePDF} openNewTab variant="inline">
						{"  "} Download PDF
					</Link>
				</Typography>
			</Flex>
			<Flex as="section" direction="col" gap="lg">
				<Flex direction="col" gap="sm">
					<Typography variant="overline" className="font-mono">
						Experience
					</Typography>
					<Typography variant="heading">
						Where the last seven years went.
					</Typography>
				</Flex>
				<WorkHistory />
			</Flex>
			<Flex as="section" direction="col" gap="xl">
				<Flex direction="col" gap="sm">
					<Typography variant="overline" className="font-mono">
						Education
					</Typography>
					<Typography variant="heading">
						Where the engineering started.
					</Typography>
				</Flex>
				<Education />
			</Flex>
		</>
	);
}
