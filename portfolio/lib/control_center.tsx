"use client";

import {
	IconBriefcase,
	IconEnvelope,
	IconHouse,
	IconUser,
} from "@manoj-malviya-96/atom/icons";
import { ControlCenter } from "@manoj-malviya-96/atom/system";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { EmailAddress } from "@/lib/data";

const NAV_LINKS = [
	{ url: "/", label: "Home", Icon: IconHouse },
	{ url: "/work", label: "Work", Icon: IconBriefcase },
	{ url: "/about", label: "About", Icon: IconUser },
] as const;

export default function AppControlCenter() {
	const pathname = usePathname();

	return (
		<ControlCenter
			header={<Logo size={24} />}
			actions={
				<ControlCenter.Item
					as="a"
					href={`mailto:${EmailAddress}`}
					icon={<IconEnvelope />}
					label="Get in touch"
				/>
			}
		>
			<ControlCenter.Tabs aria-label="Pages">
				{NAV_LINKS.map(({ url, label, Icon }) => {
					const isCurrent = pathname === url;
					return (
						<ControlCenter.Item
							key={url}
							as={NextLink}
							href={url}
							aria-current={isCurrent ? "page" : undefined}
							icon={<Icon />}
							label={label}
						/>
					);
				})}
			</ControlCenter.Tabs>
		</ControlCenter>
	);
}

function Logo({
	size = 64,
	title = "Manoj Malviya",
	...props
}: React.SVGProps<SVGSVGElement> & { size?: number; title?: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 64 64"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={title}
			{...props}
		>
			<title>{title}</title>
			<rect width="64" height="64" rx="12" fill="#111111" />
			<path
				d="M11 28 L7 32 L11 36"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity="0.35"
			/>
			<path
				d="M53 28 L57 32 L53 36"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity="0.35"
			/>
			<path
				d="M20 44 L20 20 L32 34 L44 20 L44 44"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="6.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
