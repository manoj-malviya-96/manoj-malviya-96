"use client";

import { Flex, List, Text } from "@manoj-malviya-96/atom";

import { Email, SocialLinks } from "@/lib/data";
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
			<Text.Caption mono ink="muted">
				{`© ${new Date().getFullYear()} MANOJ MALVIYA`}
			</Text.Caption>
			<Text.Caption mono ink="muted" selectable>
				{Email}
			</Text.Caption>
			<List direction="row" gap="md">
				{Object.entries(SocialLinks).map(([key, url]) => (
					<li key={key}>
						<Link url={url} openNewTab aria-label={key}>
							{key}
						</Link>
					</li>
				))}
			</List>
		</Flex>
	);
}
