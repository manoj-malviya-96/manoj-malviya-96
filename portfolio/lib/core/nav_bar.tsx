"use client";

import { Flex, Header, useScrollEffect } from "@manoj-malviya-96/atom";
import { IconEnvelope } from "@manoj-malviya-96/atom/icons";
import { usePathname } from "next/navigation";
import { EmailAddress } from "@/lib/data";
import { Link, ThemeToggle } from "@/lib/ui";

const NAV_LINKS = [
	{ url: "/projects", label: "Work" },
	{ url: "/resume", label: "Résumé" },
] as const;

export default function NavBar() {
	const pathname = usePathname();
	const { visible } = useNavBarScroll();

	return (
		<Header
			data-hidden={visible ? undefined : true}
			left={
				<Link url="/" className="wordmark">
					Manoj Malviya
				</Link>
			}
			center={
				<Flex as="nav" direction="row" gap="md">
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
			}
			right={
				<Flex direction="row" gap="md" vAlign="center">
					<ThemeToggle />
					<Link
						url={EmailAddress}
						variant="button"
						size="sm"
						icon={<IconEnvelope size="sm" />}
						label="Contact"
						aria-label="Contact"
						collapse
					/>
				</Flex>
			}
		/>
	);
}

const TOP_BAND = 0.1 as const;
const INTENT_PX_PER_MS = 0.4 as const;
type NavBarScroll = { y: number; visible: boolean };

function useNavBarScroll(): NavBarScroll {
	return useScrollEffect<NavBarScroll>(
		({ y, delta, speedPxPerMs }, prev) => {
			const visible =
				y < window.innerHeight * TOP_BAND
					? true
					: speedPxPerMs < INTENT_PX_PER_MS
						? prev.visible
						: delta < 0;
			return { y, visible };
		},
		{ y: 0, visible: true },
	);
}
