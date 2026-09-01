"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faInstagram,
	faLinkedin,
	faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import {
	Divider,
	Flex,
	Grid,
	Image,
	List,
	Typography,
} from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	EmailAddress,
	getSocialLinks,
	ResumePDF,
	type SocialMedia,
} from "@/lib/about_me/profile";
import { UserAvatar } from "@/lib/assets";
import { Icon, Link } from "@/lib/ui";

export default function Footer() {
	return (
		<Flex
			as="footer"
			direction="col"
			gap="lg"
			padding="xl"
			radius="lg"
			backgroundColor="surface"
			className="footer-card"
		>
			<Grid columns={3} gap="lg" className="footer-grid">
				<About />
				<QuickLinks />
				<SocialLinks />
			</Grid>
			<Divider direction="horizontal" />
			<Flex direction="row" hAlign="between" gap="sm" wrap>
				<Typography variant="caption" className="font-mono">
					{`© ${new Date().getFullYear()} MANOJ MALVIYA`}
				</Typography>
				<Typography variant="caption" className="font-mono">
					BERLIN, DE
				</Typography>
			</Flex>
		</Flex>
	);
}

const AVATAR_SIZE = "3rem";

function About() {
	return (
		<Flex direction="col" gap="sm">
			<Image
				as={NextImage}
				src={UserAvatar}
				alt="Manoj Malviya"
				fit="cover"
				ratio="square"
				radius="md"
				style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
			/>
			<Typography variant="title">Manoj Malviya</Typography>
			<Typography variant="body">
				Product-minded engineer building things that work today and still work
				next year. Occasionally simulates a black hole for fun.
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
