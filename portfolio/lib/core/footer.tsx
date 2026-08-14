"use client";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faInstagram,
	faLinkedin,
	faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import { Flex, Image, Typography } from "@manoj-malviya-96/atom";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import {
	EmailAddress,
	getSocialLinks,
	ResumePDF,
	type SocialMedia,
} from "@/lib/about_me/profile";
import { UserAvatar } from "@/lib/assets";
import Icon from "@/lib/ui/icon";
import Link from "@/lib/ui/link";

const quickLinks = [
	{ label: "Work Experience", href: "/experience" },
	{ label: "Projects & Blogs", href: "/projects" },
	{
		label: "Resume PDF",
		href: ResumePDF,
	},
	{ label: "Contact", href: EmailAddress },
] as const;

function QuickLinks() {
	return (
		<Flex direction="col" gap="md">
			<Typography variant="title">Quick Links</Typography>
			<Flex as="ul" direction="col" gap="xs">
				{quickLinks.map((link) => (
					<li key={link.label}>
						<Link url={link.href} newTab>
							{link.label}
						</Link>
					</li>
				))}
			</Flex>
		</Flex>
	);
}

const SocialIcon: Record<SocialMedia, IconDefinition> = {
	Github: faGithub,
	Linkedin: faLinkedin,
	Scholar: faGoogleScholar,
	Medium: faMedium,
	Instagram: faInstagram,
} as const;

function SocialLinks() {
	const socials = getSocialLinks();
	const socialKeys = Object.keys(socials) as SocialMedia[];
	if (!socials) return null;
	return (
		<Flex direction="col" gap="xs">
			<Typography variant="title">Connect</Typography>
			<Typography variant="body">
				Feel free to reach out to me on any of the platforms below.
			</Typography>
			<Flex
				as="ul"
				direction="row"
				gap="md"
				style={{ marginTop: "var(--space-md)" }}
			>
				{socialKeys.map((key) => (
					<li key={key}>
						<Link url={socials[key]} newTab>
							<Icon icon={SocialIcon[key]} size="lg" />
						</Link>
					</li>
				))}
			</Flex>
		</Flex>
	);
}

const thisYear = new Date().getFullYear();
function CopyRight() {
	return (
		<Flex direction="col" gap="md">
			<Image
				as={NextImage}
				src={UserAvatar}
				alt="Profile"
				fit="cover"
				radius="md"
				style={{ width: "5rem", height: "5rem" }}
			/>
			<Typography variant="body">{`Copyright @ ${thisYear} Manoj Malviya`}</Typography>
		</Flex>
	);
}

export default function Footer() {
	const pathname = usePathname();
	if (pathname === "/") return null; // No footer on home page
	return (
		<Flex
			as="footer"
			direction="row"
			hAlign="between"
			gap="md"
			className="footer bg-back text-front border-top-muted"
			data-theme="dark"
		>
			<CopyRight />
			<QuickLinks />
			<SocialLinks />
		</Flex>
	);
}
