import { Flex, Image, Typography } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import { EDUCATION } from "@/lib/about_me/profile";
import { Link } from "@/lib/ui";
import { formatDate } from "@/lib/utils";

const LOGO_SIZE = "2.5rem";

export default function Education() {
	return (
		<Flex direction="col" gap="md">
			{EDUCATION.map((entry) => (
				<Flex
					key={entry.school}
					direction="row"
					gap="md"
					vAlign="center"
					padding="lg"
					radius="md"
					backgroundColor="surface"
				>
					<Image
						as={NextImage}
						src={entry.logo}
						alt={`${entry.school} logo`}
						fit="contain"
						ratio="square"
						radius="md"
						style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
					/>
					<Flex direction="col" grow>
						<Typography variant="title">
							{entry.degree}, {entry.field}
						</Typography>
						<Typography variant="caption">
							<Link url={entry.schoolURL} openNewTab>
								{entry.school}
							</Link>{" "}
							• {formatDate(entry.graduation)}
						</Typography>
						<Typography variant="body">{entry.focus}</Typography>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
}
