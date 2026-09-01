"use client";

import { Flex, Header, Tab, TabBar } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { EmailAddress } from "@/lib/about_me/profile";
import { Link, ThemeToggle } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/projects", label: "Work" },
	{ url: "/resume", label: "Résumé" },
] as const;

export default function NavBar() {
	const pathname = usePathname();

	return (
		<Header
			className="nav-pill"
			left={
				<Link url="/" className="wordmark">
					Manoj Malviya
				</Link>
			}
			center={
				<TabBar as="nav" aria-label="Sections" placement="inline">
					{NAV_LINKS.map(({ url, label }) => {
						const isCurrent = pathname === url;
						return (
							<Tab
								key={url}
								as={NextLink}
								href={url}
								current={isCurrent}
								aria-current={isCurrent ? "page" : undefined}
							>
								{label}
							</Tab>
						);
					})}
				</TabBar>
			}
			right={
				<Flex direction="row" gap="sm" vAlign="center">
					<ThemeToggle />
					<Link
						url={EmailAddress}
						padding="sm"
						radius="full"
						backgroundColor="brand"
					>
						Say hello ↗
					</Link>
				</Flex>
			}
		/>
	);
}
