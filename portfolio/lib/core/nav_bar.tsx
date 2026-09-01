"use client";

import {Flex, Header} from "@manoj-malviya-96/atom";
import {usePathname} from "next/navigation";
import {EmailAddress} from "@/lib/about_me/profile";
import {Link, ThemeToggle} from "@/lib/ui";

const NAV_LINKS = [
    {url: "/projects", label: "Work"},
    {url: "/resume", label: "Résumé"},
] as const;

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Header
            className="nav-shell"
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
                <Flex direction="row" gap="sm" vAlign="center">
                    <ThemeToggle/>
                    <Link
                        url={EmailAddress}
                        variant="button"
                        color="primary"
                        padding={{x: "lg", y: "none"}}
                    >
                        Contact
                    </Link>
                </Flex>
            }
        />
    );
}
