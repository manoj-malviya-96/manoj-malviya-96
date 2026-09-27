"use client";

import { Flex, List, Text } from "@manoj-malviya-96/atom";

import { SocialLinks } from "@/lib/data";
import { Link } from "@/lib/shared";

export default function Footer() {
	return (
		<Flex
			as="footer" // TODO [ATOM] - system needs to have a footer.
			direction="row"
			hAlign="between"
			vAlign="end"
			gap="lg"
			wrap
			width="content"
			padding={{ y: "lg" }}
			// TODO [ATOM] - needs to handle ink on atom
			style={{
				color: "var(--color-muted)",
			}}
		>
			<Text.Body>{`© ${new Date().getFullYear()} Manoj Malviya`}</Text.Body>
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
