"use client";

import { Flex, List, Text } from "@manoj-malviya-96/atom";

import { SocialLinks } from "@/lib/data";
import { Link } from "@/lib/shared";

export default function Footer() {
	return (
		<Flex
			as="footer"
			direction="row"
			hAlign="between"
			vAlign="center"
			gap="lg"
			wrap
			width="content"
		>
			<Text variant="caption" mono muted>
				{`© ${new Date().getFullYear()} MANOJ MALVIYA`}
			</Text>
			<List direction="row" gap="md">
				{Object.entries(SocialLinks).map(([key, url]) => (
					<li key={key}>
						<Link url={url} openNewTab variant="inline" aria-label={key}>
							{key}
						</Link>
					</li>
				))}
			</List>
		</Flex>
	);
}
