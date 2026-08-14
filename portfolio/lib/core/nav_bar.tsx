"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Flex } from "@manoj-malviya-96/atom";
import { usePathname } from "next/navigation";
import type { ExternalURL } from "@/lib/types";
import Icon from "@/lib/ui/icon";
import Link from "@/lib/ui/link";
import useScrollVisibility from "@/lib/ui/scroll_visibility";
import { mergeCls } from "@/lib/utils";

type NavLink = {
	url: string | ExternalURL;
	label: string;
};

const links: NavLink[] = [
	{ url: "/", label: "Home" },
	{ url: "/resume", label: "Resume" },
	{ url: "/projects", label: "Projects" },
] as const;

export default function Navbar() {
	const pathname = usePathname();

	const { isVisible } = useScrollVisibility({
		velocityThreshold: 0.8,
		enabled: pathname !== "/",
	});
	if (pathname === "/") return null;

	return (
		<nav
			className={mergeCls(
				"nav-bar bg-back",
				isVisible ? "nav-bar--visible" : "nav-bar--hidden",
			)}
			data-theme="dark"
		>
			<Flex
				direction="row"
				gap="md"
				vAlign="center"
				className="nav-bar-inner text-front"
			>
				{links.map((link) => (
					<Link
						key={link.url}
						url={link.url}
						className={mergeCls(
							"nav-link",
							pathname === link.url && "nav-link--active",
						)}
					>
						{link.label}
					</Link>
				))}
				<button type="button" className="nav-search-button" aria-label="Search">
					<Icon icon={faSearch} />
				</button>
			</Flex>
		</nav>
	);
}
