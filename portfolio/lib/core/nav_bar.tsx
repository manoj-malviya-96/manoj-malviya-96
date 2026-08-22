"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { HeaderBar, List } from "@manoj-malviya-96/atom";
import { usePathname } from "next/navigation";
import { Icon, Link } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/", label: "Home" },
	{ url: "/resume", label: "Resume" },
	{ url: "/projects", label: "Projects" },
] as const;

export default function NavBar() {
	const pathname = usePathname();
	if (pathname === "/") return null;

	return (
		<HeaderBar
			className="theme-dark"
			left={
				<List direction="row" gap="xs">
					{NAV_LINKS.map(({ url, label }) => (
						<li key={url}>
							<Link
								url={url}
								padding="sm"
								radius="md"
								backgroundColor={pathname === url ? "surface" : undefined}
								aria-current={pathname === url ? "page" : undefined}
							>
								{label}
							</Link>
						</li>
					))}
				</List>
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
