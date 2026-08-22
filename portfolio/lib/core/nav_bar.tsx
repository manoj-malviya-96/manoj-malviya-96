"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Atom, HeaderBar, Tab, TabBar } from "@manoj-malviya-96/atom";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Icon, Link } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/", label: "Home" },
	{ url: "/projects", label: "Projects" },
	{ url: "/resume", label: "Resume" },
] as const;

export default function NavBar() {
	const pathname = usePathname();

	return (
		<HeaderBar
			left={
				<Atom as="nav" aria-label="Site">
					<TabBar aria-label="Sections">
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
				</Atom>
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
