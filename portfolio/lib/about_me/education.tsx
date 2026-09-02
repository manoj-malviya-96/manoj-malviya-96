import { Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { DEGREE_IDS, getDegree } from "@/lib/about_me/degrees";
import { getOrganization } from "@/lib/about_me/organizations";
import { formatDate } from "@/lib/utils";

export default function Education() {
	return (
		<Grid columns={2} gap="md" className="edu-grid">
			{DEGREE_IDS.map((id) => {
				const { organization, degree, field, focus, graduation } =
					getDegree(id);
				return (
					<Flex
						key={id}
						direction="col"
						gap="sm"
						padding="lg"
						radius="lg"
						backgroundColor="surface"
					>
						<Text variant="title">{getOrganization(organization).name}</Text>
						<Text variant="body" muted>
							{degree}, {field} · {formatDate(graduation)}
						</Text>
						<Text variant="caption" className="font-mono" muted>
							{focus}
						</Text>
					</Flex>
				);
			})}
		</Grid>
	);
}
