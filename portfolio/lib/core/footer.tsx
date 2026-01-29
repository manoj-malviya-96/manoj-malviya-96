"use client";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
	faGithub,
	faInstagram,
	faLinkedin,
	faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faGoogleScholar } from "@fortawesome/free-brands-svg-icons/faGoogleScholar";
import Image from "next/image";
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
import { Typography } from "@/lib/ui/text";

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
		<span className="flex flex-col gap-4">
			<Typography variant="title">Quick Links</Typography>
			<ul className="flex flex-col gap-1">
				{quickLinks.map((link) => (
					<li key={link.label}>
						<Link url={link.href} newTab>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</span>
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
		<span className="flex flex-col gap-1">
			<Typography variant="title">Connect</Typography>
			<Typography variant="body">
				Feel free to reach out to me on any of the platforms below.
			</Typography>
			<ul className="flex flex-row gap-4 mt-4">
				{socialKeys.map((key) => (
					<li key={key}>
						<Link url={socials[key]} newTab>
							<Icon icon={SocialIcon[key]} size="lg" />
						</Link>
					</li>
				))}
			</ul>
		</span>
	);
}

const thisYear = new Date().getFullYear();
function CopyRight() {
	return (
		<span className="flex flex-col gap-4">
			<Image
				src={UserAvatar}
				alt="Profile"
				className="object-cover rounded-xl w-20 h-20"
			/>
			<Typography variant="body">{`Copyright @ ${thisYear} Manoj Malviya`}</Typography>
		</span>
	);
}

export default function Footer() {
	const pathname = usePathname();
	if (pathname === "/") return null; // No footer on home page
	return (
		<footer
			className="p-6 sm:p-8 lg:p-16 min-h-[10vh] flex flex-row justify-between gap-4 bg-back text-front border-muted/50 border-t-1"
			data-theme="dark"
		>
			<CopyRight />
			<QuickLinks />
			<SocialLinks />
		</footer>
	);
}
