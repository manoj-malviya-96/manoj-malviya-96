import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { IconGraduationCap } from "@manoj-malviya-96/atom/icons";
import { DEGREE_IDS, Degrees, Organizations } from "@/lib/data";
import { formatDate } from "@/lib/helper";

export default function Education() {
	return (
		<Grid columns={2} gap="md" className="edu-grid">
			{DEGREE_IDS.map((id) => {
				const { organization, degree, field, focus, graduation } = Degrees[id];
				return (
					<Flex
						key={id}
						enter="rise"
						direction="col"
						gap="sm"
						padding="lg"
						radius="lg"
						bg="surface"
					>
						<Flex direction="row" gap="xs" vAlign="center">
							<IconGraduationCap size="sm" />
							<Text.Title>{Organizations[organization].name}</Text.Title>
						</Flex>
						<Text.Body ink="muted">
							{degree}, {field} · {formatDate(graduation)}
						</Text.Body>
						<Text.Caption mono ink="muted">
							{focus}
						</Text.Caption>
					</Flex>
				);
			})}
		</Grid>
	);
}
