"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faInstagram,
	faLinkedin,
	faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import { Flex, Image, List, Typography } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
	EmailAddress,
	getSocialLinks,
	ResumePDF,
	type SocialMedia,
} from "@/lib/about_me/profile";
import { UserAvatar } from "@/lib/assets";
import { Icon, Link } from "@/lib/ui";

export default function Footer() {
	const pathname = usePathname();
	if (pathname === "/") return null;

	return (
		<Flex
			as="footer"
			direction="row"
			hAlign="between"
			gap="md"
			backgroundColor="page"
			className="footer theme-dark"
		>
			<CopyRight />
			<QuickLinks />
			<SocialLinks />
		</Flex>
	);
}

const AVATAR_SIZE = "5rem";

function CopyRight() {
	return (
		<Flex direction="col" gap="md">
			<Image
				as={NextImage}
				src={UserAvatar}
				alt="Manoj Malviya"
				fit="cover"
				radius="md"
				style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
			/>
			<Typography variant="body">
				{`Copyright @ ${new Date().getFullYear()} Manoj Malviya`}
			</Typography>
		</Flex>
	);
}

const QUICK_LINKS = [
	{ label: "Work Experience", url: "/resume" },
	{ label: "Projects & Blogs", url: "/projects" },
	{ label: "Resume PDF", url: ResumePDF },
	{ label: "Contact", url: EmailAddress },
] as const;

function QuickLinks() {
	return (
		<Flex direction="col" gap="md">
			<Typography variant="title">Quick Links</Typography>
			<List direction="col" gap="xs">
				{QUICK_LINKS.map(({ label, url }) => (
					<li key={label}>
						<Link url={url} openNewTab={url.startsWith("http")} muted>
							{label}
						</Link>
					</li>
				))}
			</List>
		</Flex>
	);
}

const SOCIALS: ReadonlyArray<{ name: SocialMedia; icon: IconDefinition }> = [
	{ name: "Github", icon: faGithub },
	{ name: "Linkedin", icon: faLinkedin },
	{ name: "Scholar", icon: faGoogleScholar },
	{ name: "Medium", icon: faMedium },
	{ name: "Instagram", icon: faInstagram },
];

function SocialLinks() {
	const socials = getSocialLinks();
	return (
		<Flex direction="col" gap="md">
			<Flex direction="col" gap="xs">
				<Typography variant="title">Connect</Typography>
				<Typography variant="body">
					Feel free to reach out to me on any of the platforms below.
				</Typography>
			</Flex>
			<List direction="row" gap="md">
				{SOCIALS.map(({ name, icon }) => (
					<li key={name}>
						<Link url={socials[name]} openNewTab aria-label={name}>
							<Icon icon={icon} size="lg" />
						</Link>
					</li>
				))}
			</List>
		</Flex>
	);
}
