"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "@/components/ui/icon";
import { faMale, faSearch } from "@fortawesome/free-solid-svg-icons";
import { atom, useAtom } from "jotai";

function MainLogo() {
  return (
    <Link className="text-lg font-bold" href="/">
      <Icon icon={faMale} className="icon" />
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

export const navbarScrollEffectAtom = atom(true);
export const navbarDarkThemeAtom = atom(true);

function useScrollEffect(enabled: boolean = true) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const handleScroll = () => {
      const scrolled = window.scrollY > 0.5 * window.innerHeight;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled]);
  return enabled && isScrolled;
}

export default function Navbar() {
  const [scrollEffectEnabled] = useAtom(navbarScrollEffectAtom);
  const [darkThemeEnabled] = useAtom(navbarDarkThemeAtom);
  const isScrolled = useScrollEffect(scrollEffectEnabled);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full h-fit z-10 p-1",
        isScrolled ? "bg-back/60 backdrop-blur-md" : "bg-transparent",
      )}
      data-theme={darkThemeEnabled ? "dark" : "light"}
    >
      <span
        className={cn(
          "flex flex-row justify-between gap-4 w-2/3 mx-auto text-front text-sm transition-transform duration-300",
          !isScrolled && "scale-110",
        )}
      >
        <MainLogo />
        <NavigationLinks />
        <CTALink />
      </span>
    </nav>
  );
}
