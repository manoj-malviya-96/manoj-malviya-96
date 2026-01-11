"use client";

import { mergeCls } from "@/lib/utils";
import Link from "next/link";
import Icon from "@/components/ui/icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStumbleuponCircle } from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import useScrollVisibility from "@/lib/ui/scroll_visibility";
import { NextRouter } from "next/router";

function MainLogo() {
  return (
    <Link className="flex flex-row items-center gap-4 cursor-pointer " href="/">
      <Icon icon={faStumbleuponCircle} className="icon-large text-2xl" />
    </Link>
  );
}

type NavLink = {
  href: NextRouter["route"];
  label: string;
};

const links: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
] as const;

function NavigationLinks() {
  return (
    <span className="flex flex-row gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-2 rounded-md transition-colors hover:opacity-80 cursor-pointer"
        >
          <Typography variant="caption">{link.label}</Typography>
        </Link>
      ))}
    </span>
  );
}

function CTALink() {
  return (
    <span>
      <button
        className="cursor-pointer rounded-md hover:scale-105 transition-transform duration-300 p-2"
        aria-label="Search"
      >
        <Icon icon={faSearch} />
      </button>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const isDarkMode = pathname === "/";
  const isScrollEffectEnabled = pathname === "/" || pathname === "/projects";
  const { isVisible, isAtTop } = useScrollVisibility({
    enabled: isScrollEffectEnabled,
    velocityThreshold: 0.8,
  });

  return (
    <nav
      className={mergeCls(
        "fixed top-0 left-0 w-full h-fit z-10 p-1 duration-300 transition-transform",
        isAtTop ? "bg-transparent" : "bg-back/60 backdrop-blur-md",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <span
        className={mergeCls(
          "flex flex-row justify-around w-full lg:w-2/3 mx-auto text-front",
        )}
      >
        <MainLogo />
        <NavigationLinks />
        <CTALink />
      </span>
    </nav>
  );
}
