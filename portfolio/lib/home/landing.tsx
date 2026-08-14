"use client";

import { Flex, Typography } from "@manoj-malviya-96/atom";
import Link from "@/lib/ui/link";

export default function Landing() {
	return (
		<Flex
			as="section"
			direction="col"
			gap="xl"
			hAlign="center"
			vAlign="center"
			className="landing-hero"
			data-theme="dark"
		>
			<Flex direction="col" gap="md" hAlign="center">
				<Typography variant="hero" align="center">
					Building efficient products for a better future
				</Typography>
				<Typography variant="body" align="center">
					Hey! I am Manoj Malviya, a software engineer specializing in building
					tools
				</Typography>
			</Flex>
			<Flex
				direction="row"
				gap="md"
				hAlign="center"
				vAlign="center"
				style={{ flexWrap: "wrap" }}
			>
				<Link url="/projects" asControl="primary">
					View my projects
				</Link>
				<Link url="/resume" asControl="secondary">
					Resume
				</Link>
			</Flex>
		</Flex>
	);
}
