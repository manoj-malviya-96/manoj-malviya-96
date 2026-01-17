"use client";

import { mergeCls } from "@/lib/utils";
import Icon from "@/lib/ui/icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStumbleuponCircle } from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import useScrollVisibility from "@/lib/ui/scroll_visibility";
import Link from "@/lib/ui/link";
import { ExternalURL } from "@/lib/types";

function MainLogo() {
  return (
    <Link url="/" className="text-front">
      <Icon icon={faStumbleuponCircle} className="icon-large text-2xl" />
    </Link>
  );
}

type NavLink = {
  url: string | ExternalURL;
  label: string;
};

const links: NavLink[] = [
  { url: "/about", label: "About" },
  { url: "/projects", label: "Projects" },
  { url: "https://medium.com/@manoj-malviya", label: "Blog" },
] as const;

function NavigationLinks() {
  return (
    <span className="flex flex-row gap-8 items-center">
      {links.map((link) => (
        <Link key={link.url} url={link.url} className="text-front">
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
        <Icon icon={faSearch} />
      </button>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const isScrollEffectEnabled = pathname === "/" || pathname === "/projects";
  const { isVisible, isAtTop } = useScrollVisibility({
    enabled: isScrollEffectEnabled,
    velocityThreshold: 0.8,
  });

  return (
    <nav
      className={mergeCls(
        "fixed top-0 left-0 w-full h-fit z-10 p-1 duration-300 transition-transform",
        isAtTop && pathname === "/" ? "bg-transparent" : "bg-back", // Only transparent on home
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      data-theme="dark"
    >
      <span
        className={mergeCls(
          "flex flex-row gap-4 justify-around w-full lg:w-2/3 mx-auto text-front items-center",
        )}
      >
        <MainLogo />
        <NavigationLinks />
        <CTALink />
      </span>
    </nav>
  );
}
