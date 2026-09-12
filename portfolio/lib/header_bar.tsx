"use client";

import {
	Button,
	Flex,
	setTheme,
	Text,
	useScrollEffect,
	useTheme,
} from "@manoj-malviya-96/atom";
import {
	IconCircleHalfStroke,
	IconEnvelope,
} from "@manoj-malviya-96/atom/icons";
import { Header, useHeaderBar } from "@manoj-malviya-96/atom/system";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EmailAddress } from "@/lib/data";
import { Link } from "@/lib/shared";

const NAV_LINKS = [
	{ url: "/projects", label: "Work" },
	{ url: "/resume", label: "Résumé" },
] as const;

export default function HeaderBar() {
	const pathname = usePathname();
	const { visible } = useHeaderBarScroll();

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
					color="primary"
				/>
			</Flex>
		),
		bottom: (
			<Text variant="caption" muted className="header-tagline">
				Product-minded engineer · Berlin, DE
			</Text>
		),
	});

	return (
		<Header
			padding={{ x: "lg", y: "md" }}
			data-hidden={visible ? undefined : true}
		/>
	);
}

const TOP_BAND = 0.05 as const;
const INTENT_PX_PER_MS = 0.3 as const;
type HeaderBarScroll = { y: number; visible: boolean };

function useHeaderBarScroll(): HeaderBarScroll {
	return useScrollEffect<HeaderBarScroll>(
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

function ThemeToggle() {
	const theme = useTheme();
	const [systemPrefersDark, setSystemPrefersDark] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemPrefersDark(query.matches);
		const onChange = (e: MediaQueryListEvent) =>
			setSystemPrefersDark(e.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);

	const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

	const toggle = () => {
		const next = isDark ? "light" : "dark";
		setTheme(next);
	};

	return (
		<Button
			icon={<IconCircleHalfStroke size="sm" />}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			onClick={toggle}
			variant="muted"
			size="sm"
		/>
	);
}
