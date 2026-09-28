"use client";

import { Flex, Text } from "@manoj-malviya-96/atom";

import { SocialLinks } from "@/lib/data";
import { Link } from "@/lib/shared";

export default function Footer() {
	return (
		<Flex
			as="footer" /** TODO [ATOM] - system needs to have a footer. */
			direction="row"
			hAlign="between"
			vAlign="end"
			gap="lg"
			wrap
			width="content"
			padding={{ y: "lg" }}
			/** TODO [ATOM] - needs to handle ink on atom */
			style={{
				color: "var(--color-muted)",
			}}
		>
			<Text.Body>{`© ${new Date().getFullYear()} Manoj Malviya`}</Text.Body>
			<Flex as="span" direction="row" gap="sm" stack>
				{Object.entries(SocialLinks).map(([key, url]) => (
					<Link key={key} url={url} openNewTab aria-label={key}>
						{key}
					</Link>
				))}
			</Flex>
		</Flex>
	);
}
