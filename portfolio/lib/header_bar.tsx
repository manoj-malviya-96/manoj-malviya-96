"use client";

import { assertNever, Flex, useScrollEffect } from "@manoj-malviya-96/atom";
import { IconEnvelope } from "@manoj-malviya-96/atom/icons";
import { Header, useHeaderBar } from "@manoj-malviya-96/atom/system";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EmailAddress, WorkItems } from "@/lib/data";
import { Link } from "@/lib/shared";

const NAV_LINKS = [
	{ url: "/work", label: "Work", toc: "work" },
	{ url: "/resume", label: "Résumé", toc: "resume" },
] as const;

type TocKey = (typeof NAV_LINKS)[number]["toc"];

const TOC_CLOSE_DELAY_MS = 250;

function useTocHover(closeDelayMs: number) {
	const [hoveredToc, setHoveredToc] = useState<TocKey | null>(null);
	const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const clearCloseTimeout = () => {
		clearTimeout(closeTimeout.current);
	};
	const setToc = (toc: TocKey | null) => {
		clearCloseTimeout();
		if (toc === null) {
			closeTimeout.current = setTimeout(
				() => setHoveredToc(null),
				closeDelayMs,
			);
		} else {
			setHoveredToc(toc);
		}
	};
	useEffect(() => clearCloseTimeout, []);

	return { hoveredToc, setToc, clearCloseTimeout };
}

export default function HeaderBar() {
	const pathname = usePathname();
	const { hoveredToc, setToc, clearCloseTimeout } =
		useTocHover(TOC_CLOSE_DELAY_MS);

	const activeToc: TocKey | null = pathname.startsWith("/resume")
		? "resume"
		: pathname.startsWith("/work")
			? "work"
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
							onMouseEnter={() => setToc(toc)}
							onMouseLeave={() => setToc(null)}
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
		bottom:
			tocKey === "work" ? (
				<HeaderToc
					toc={tocKey}
					onMouseEnter={clearCloseTimeout}
					onMouseLeave={() => setToc(null)}
				/>
			) : undefined,
	});

	return <Header width="content" radius="md" />;
}

function HeaderToc({
	toc,
	onMouseEnter,
	onMouseLeave,
}: {
	toc: TocKey;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}) {
	switch (toc) {
		case "work":
			return (
				<WorkToc onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
			);
		case "resume":
			return undefined;
		default:
			assertNever(toc);
	}
}

function WorkToc({
	onMouseEnter,
	onMouseLeave,
}: {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}) {
	const activeItem = useScrollEffect(() => {
		if (typeof document === "undefined") return null;

		let active: string | null = null;
		for (const { id } of WorkItems) {
			const row = document.getElementById(id);
			if (row && row.getBoundingClientRect().top <= 120) {
				active = id;
			}
		}
		return active;
	}, null);

	return (
		<Flex
			as="nav"
			aria-label="Work sections"
			direction="row"
			gap="sm"
			wrap
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{WorkItems.map(({ id, title }) => (
				<Link
					key={id}
					url={`/work/#${id}`}
					variant="tab"
					isActive={activeItem === id}
					aria-current={activeItem === id ? "location" : undefined}
				>
					{title}
				</Link>
			))}
		</Flex>
	);
}
