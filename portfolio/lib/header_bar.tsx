"use client";

import { assertNever, Flex, useScrollEffect } from "@manoj-malviya-96/atom";
import { IconEnvelope } from "@manoj-malviya-96/atom/icons";
import { Header, useHeaderBar } from "@manoj-malviya-96/atom/system";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EmailAddress, RankedProjects } from "@/lib/data";
import { Link } from "@/lib/shared";

const NAV_LINKS = [
	{ url: "/projects", label: "Work", toc: "projects" },
	{ url: "/resume", label: "Résumé", toc: "resume" },
] as const;

type TocKey = (typeof NAV_LINKS)[number]["toc"];

export default function HeaderBar() {
	const pathname = usePathname();
	const [hoveredToc, setHoveredToc] = useState<TocKey | null>(null);

	const activeToc: TocKey | null = pathname.startsWith("/resume")
		? "resume"
		: pathname.startsWith("/projects")
			? "projects"
			: null;
	const tocKey = hoveredToc ?? activeToc;

	useHeaderBar({
		left: (
			<Link url="/" className="wordmark">
				<Flex as="span" direction="row" gap="xs" vAlign="center">
					<NextImage src="/icon.svg" alt="Logo" width={24} height={24} />
					<span className="wordmark-text">Manoj Malviya</span>
				</Flex>
			</Link>
		),
		center: (
			<Flex as="nav" direction="row" gap="sm">
				{NAV_LINKS.map(({ url, label, toc }) => {
					const isCurrent = pathname === url;
					return (
						<Link
							key={url}
							url={url}
							variant="tab"
							isActive={isCurrent}
							aria-current={isCurrent ? "page" : undefined}
							onMouseEnter={() => setHoveredToc(toc)}
							onMouseLeave={() => setHoveredToc(null)}
						>
							{label}
						</Link>
					);
				})}
			</Flex>
		),
		right: (
			<Flex direction="row" gap="md" vAlign="center">
				<Link
					url={EmailAddress}
					variant="button"
					size="sm"
					icon={<IconEnvelope size="sm" />}
					label="Contact"
					aria-label="Contact"
					collapse
					color="primary"
				/>
			</Flex>
		),
		bottom: tocKey === "projects" ? <HeaderToc toc={tocKey} /> : undefined,
	});

	return <Header width="content" radius="md" />;
}

function HeaderToc({ toc }: { toc: TocKey }) {
	switch (toc) {
		case "projects":
			return (
				<Flex
					as="nav"
					aria-label="Project sections"
					direction="row"
					gap="sm"
					wrap
				>
					{RankedProjects.map(({ id, title }) => (
						<Link key={id} url={`#${id}`} variant="tab">
							{title}
						</Link>
					))}
				</Flex>
			);
		case "resume":
			return undefined;
		default:
			assertNever(toc);
	}
}
