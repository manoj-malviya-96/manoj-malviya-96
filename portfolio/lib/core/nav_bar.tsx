"use client";

import {Flex, Header, useScrollEffect} from "@manoj-malviya-96/atom";
import {IconEnvelope} from "@manoj-malviya-96/atom/icons";
import {usePathname} from "next/navigation";
import {EmailAddress} from "@/lib/data";
import {conditionalProps} from "@/lib/helper";
import {Link, ThemeToggle} from "@/lib/ui";

const NAV_LINKS = [
    {url: "/projects", label: "Work"},
    {url: "/resume", label: "Résumé"},
] as const;

export default function NavBar() {
    const pathname = usePathname();
    const {y, visible} = useNavBarScroll();
    const hasBackground = pathname !== "/" || y > 0;

    return (
        <Header
            padding={{
                x: "md",
                y: "sm",
            }}
            data-hidden={visible ? undefined : true}
            {...conditionalProps(hasBackground, {
                bg: "surface",
                blur: true,
                radius: "lg",
            })}
            left={
                <Link url="/" className="wordmark">
                    Manoj Malviya
                </Link>
            }
            center={
                <Flex as="nav" direction="row" gap="md">
                    {NAV_LINKS.map(({url, label}) => {
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
                    <ThemeToggle/>
                    <Link
                        url={EmailAddress}
                        variant="button"
                        size="sm"
                        icon={<IconEnvelope size="sm"/>}
                        label="Contact"
                        aria-label="Contact"
                        collapse
                    />
                </Flex>
            }
        />
    );
}

const TOP_BAND = 0.3;
const INTENT_PX_PER_MS = 0.3;
type NavBarScroll = { y: number; visible: boolean };

function useNavBarScroll(): NavBarScroll {
    return useScrollEffect<NavBarScroll>(
        ({y, delta, speedPxPerMs}, prev) => {
            const visible =
                y < window.innerHeight * TOP_BAND
                    ? true
                    : speedPxPerMs < INTENT_PX_PER_MS
                        ? prev.visible
                        : delta < 0;
            return {y, visible};
        },
        {y: 0, visible: true},
    );
}
