import { Flex, Grid, Typography } from "@manoj-malviya-96/atom";
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
						<Typography variant="title">
							{getOrganization(organization).name}
						</Typography>
						<Typography variant="body" muted>
							{degree}, {field} · {formatDate(graduation)}
						</Typography>
						<Typography variant="caption" className="font-mono" muted>
							{focus}
						</Typography>
					</Flex>
				);
			})}
		</Grid>
	);
}
