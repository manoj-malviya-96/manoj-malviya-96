"use client";

import { Divider, Flex, Grid, Image, List, Text } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import {
	EmailAddress,
	getSocialLinks,
	ResumePDF,
	type SocialMedia,
} from "@/lib/about_me/profile";
import { UserAvatar } from "@/lib/assets";
import { Link } from "@/lib/ui";
import type { BrandIcon } from "@/lib/ui/brand_icons";
import {
	Github,
	GoogleScholar,
	Instagram,
	Linkedin,
	Medium,
} from "@/lib/ui/brand_icons";

export default function Footer() {
	return (
		<Flex
			as="footer"
			direction="col"
			gap="lg"
			padding="xl"
			radius="lg"
			backgroundColor="surface"
			style={{
				backdropFilter: "var(--material-blur)",
			}}
		>
			<Grid columns={3} gap="lg" className="footer-grid">
				<About />
				<QuickLinks />
				<SocialLinks />
			</Grid>
			<Divider direction="horizontal" />
			<Flex direction="row" hAlign="between" gap="sm" wrap>
				<Text variant="caption" className="font-mono">
					{`© ${new Date().getFullYear()} MANOJ MALVIYA`}
				</Text>
				<Text variant="caption" className="font-mono">
					BERLIN, DE
				</Text>
			</Flex>
		</Flex>
	);
}

const AVATAR_SIZE = "3rem";

function About() {
	return (
		<Flex direction="col" gap="sm">
			{/* Todo integrate in atom: width/height only take the sm–xl size scale (16rem+) — an avatar needs a smaller fixed size, so style= is the only path. */}
			<Image
				as={NextImage}
				src={UserAvatar}
				alt="Manoj Malviya"
				fit="cover"
				ratio="square"
				radius="md"
				style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
			/>
			<Text variant="title">Manoj Malviya</Text>
			<Text variant="body">
				Product-minded engineer building things that work today and still work
				next year. Occasionally simulates a black hole for fun.
			</Text>
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
			<Text variant="title">Quick Links</Text>
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

const SOCIALS: ReadonlyArray<{ name: SocialMedia; icon: BrandIcon }> = [
	{ name: "Github", icon: Github },
	{ name: "Linkedin", icon: Linkedin },
	{ name: "Scholar", icon: GoogleScholar },
	{ name: "Medium", icon: Medium },
	{ name: "Instagram", icon: Instagram },
];

function SocialLinks() {
	const socials = getSocialLinks();
	return (
		<Flex direction="col" gap="md">
			<Flex direction="col" gap="xs">
				<Text variant="title">Connect</Text>
				<Text variant="body">
					Feel free to reach out to me on any of the platforms below.
				</Text>
			</Flex>
			<List direction="row" gap="md">
				{SOCIALS.map(({ name, icon: SocialIcon }) => (
					<li key={name}>
						<Link url={socials[name]} openNewTab aria-label={name}>
							<SocialIcon />
						</Link>
					</li>
				))}
			</List>
		</Flex>
	);
}
