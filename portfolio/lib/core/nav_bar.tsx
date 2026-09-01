"use client";

import { Header, Tab, TabBar } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/projects", label: "Work" },
	{ url: "/resume", label: "Resume" },
] as const;

export default function NavBar() {
	const pathname = usePathname();

	return (
		<Header
			left={
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
			right={<ThemeToggle />}
		/>
	);
}
