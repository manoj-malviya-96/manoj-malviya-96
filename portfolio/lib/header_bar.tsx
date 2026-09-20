"use client";

import { Flex } from "@manoj-malviya-96/atom";
import { IconEnvelope } from "@manoj-malviya-96/atom/icons";
import { Header, useHeaderBar } from "@manoj-malviya-96/atom/system";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { EmailAddress } from "@/lib/data";
import { Link } from "@/lib/shared";

const NAV_LINKS = [
	{ url: "/work", label: "Work" },
	{ url: "/about", label: "About" },
] as const;

export default function HeaderBar() {
	const pathname = usePathname();

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
	});

	return <Header width="content" radius="md" />;
}
