"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "@/components/ui/icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { PortfolioLogo } from "@/lib/assets";
import Image from "next/image";
import { navbarDarkThemeAtom, navbarScrollEffectAtom } from "@/lib/ui_store";
import useScrollVisibility from "@/lib/scroll_visibility";

function MainLogo() {
  return (
    <Link className="flex flex-row items-center gap-4" href="/">
      <Image src={PortfolioLogo} alt="Logo" width={20} height={20} />
    </Link>
  );
}

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
];

function NavigationLinks() {
  return (
    <span className="flex flex-row gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm p-2 rounded-md transition-colors hover:opacity-80 "
        >
          {link.label}
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
        <Icon icon={faSearch} className="icon" />
      </button>
    </span>
  );
}

export default function Navbar() {
  const [scrollEffectEnabled] = useAtom(navbarScrollEffectAtom);
  const [darkThemeEnabled] = useAtom(navbarDarkThemeAtom);

  const { isVisible, isAtTop } = useScrollVisibility({
    enabled: scrollEffectEnabled,
    velocityThreshold: 0.8,
  });

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full h-fit z-10 p-2 duration-300 transition-transform",
        isAtTop ? "bg-transparent" : "bg-back/60 backdrop-blur-md",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      data-theme={darkThemeEnabled ? "dark" : "light"}
    >
      <span
        className={cn(
          "flex flex-row justify-around gap-4 w-2/3 mx-auto text-front text-sm",
        )}
      >
        <MainLogo />
        <NavigationLinks />
        <CTALink />
      </span>
    </nav>
  );
}
