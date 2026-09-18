"use client";

import { Flex, List, Text } from "@manoj-malviya-96/atom";
import {
	IconGithub,
	IconGraduationCap,
	IconInstagram,
	IconLinkedin,
	IconMedium,
} from "@manoj-malviya-96/atom/icons";
import { SocialLinks, type SocialMedia } from "@/lib/data";
import { Link } from "@/lib/shared";

const SOCIALS: ReadonlyArray<{ name: SocialMedia; icon: typeof IconGithub }> = [
	{ name: "Github", icon: IconGithub },
	{ name: "Linkedin", icon: IconLinkedin },
	{ name: "Scholar", icon: IconGraduationCap },
	{ name: "Medium", icon: IconMedium },
	{ name: "Instagram", icon: IconInstagram },
];

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
			<Text variant="caption" mono>
				{`© ${new Date().getFullYear()} MANOJ MALVIYA`}
			</Text>
			<List direction="row" gap="md">
				{SOCIALS.map(({ name, icon: SocialIcon }) => (
					<li key={name}>
						<Link
							url={SocialLinks[name]}
							openNewTab
							variant="button"
							buttonVariant="plain"
							icon={<SocialIcon size="sm" />}
							aria-label={name}
						/>
					</li>
				))}
			</List>
		</Flex>
	);
}
