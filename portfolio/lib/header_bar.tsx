"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { Header, useHeaderBar } from "@manoj-malviya-96/atom/system";
import { usePathname } from "next/navigation";
import { EmailAddress } from "@/lib/data";
import { Link } from "@/lib/shared";

const NAV_LINKS = [
	{ url: "/", label: "Home" },
	{ url: "/work", label: "Work" },
	{ url: "/about", label: "About" },
] as const;

export default function HeaderBar() {
	const pathname = usePathname();

	useHeaderBar({
		left: <Logo size={24} />,
		content: (
			<Flex as="nav" direction="row" gap="sm">
				{NAV_LINKS.map(({ url, label }) => {
					const isCurrent = pathname === url;
					return (
						<Link
							key={url}
							url={url}
							variant="tab"
							isActive={isCurrent}
							aria-current={isCurrent ? "page" : undefined}
						>
							{label}
						</Link>
					);
				})}
			</Flex>
		),
		right: (
			<Link
				url={EmailAddress}
				variant="button"
				size="sm"
				label="Get in touch"
				aria-label="Get in touch"
				collapse
				color="primary"
			/>
		),
	});

	return <Header width="content" padding="none" />;
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
