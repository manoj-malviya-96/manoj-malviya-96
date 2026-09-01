"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Header, Tab, TabBar } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon, Link } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/projects", label: "Projects" },
	{ url: "/resume", label: "Resume" },
] as const;

export default function NavBar() {
	const pathname = usePathname();
	const showTabs = NAV_LINKS.some(({ url }) => url === pathname);
	if (!showTabs) return null;

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
			right={
				<Link
					url="/projects"
					padding="sm"
					radius="md"
					aria-label="Search projects"
				>
					<Icon icon={faSearch} />
				</Link>
			}
		/>
	);
}
