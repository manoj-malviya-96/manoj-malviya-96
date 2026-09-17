import {
	Flex,
	GlowCapture,
	GlowContainer,
	Grid,
	Text,
} from "@manoj-malviya-96/atom";
import { IconGraduationCap } from "@manoj-malviya-96/atom/icons";
import { DEGREE_IDS, Degrees, Organizations } from "@/lib/data";
import { formatDate } from "@/lib/helper";
import Reveal from "@/lib/reveal";

export default function Education() {
	return (
		<GlowCapture as={Grid} columns={2} gap="md" className="edu-grid">
			{DEGREE_IDS.map((id) => {
				const { organization, degree, field, focus, graduation } = Degrees[id];
				return (
					<Reveal key={id}>
						<GlowContainer
							as={Flex}
							direction="col"
							gap="sm"
							padding="lg"
							radius="lg"
							bg="surface"
							className="hover-card"
						>
							<Flex direction="row" gap="xs" vAlign="center">
								<IconGraduationCap size="sm" />
								<Text variant="title">{Organizations[organization].name}</Text>
							</Flex>
							<Text variant="body" muted>
								{degree}, {field} · {formatDate(graduation)}
							</Text>
							<Text variant="caption" mono muted>
								{focus}
							</Text>
						</GlowContainer>
					</Reveal>
				);
			})}
		</GlowCapture>
	);
}
