"use client";

import { mergeCls } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useScrollVisibility from "@/lib/ui/scroll_visibility";
import Link from "@/lib/ui/link";
import { ExternalURL } from "@/lib/types";
import Icon from "@/lib/ui/icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type NavLink = {
  url: string | ExternalURL;
  label: string;
};

const links: NavLink[] = [
  { url: "/", label: "Home" },
  { url: "/resume", label: "Resume" },
  { url: "/projects", label: "Projects" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  const { isVisible } = useScrollVisibility({
    velocityThreshold: 0.8,
    enabled: pathname !== "/",
  });
  if (pathname === "/") return null;

  return (
    <nav
      className={mergeCls(
        "fixed top-0 left-0 w-full h-12 z-10 p-1 duration-300 transition-transform bg-back",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      data-theme="dark"
    >
      <span
        className={mergeCls(
          "flex flex-row gap-4 w-full lg:w-[70vw] mx-auto text-front items-center h-full",
        )}
      >
        {links.map((link) => (
          <Link
            key={link.url}
            url={link.url}
            className={mergeCls(
              "text-front px-2 py-1 transition-colors duration-300 hover:bg-muted rounded-lg",
              pathname === link.url && "bg-muted",
            )}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="cursor-pointer rounded-md hover:scale-105 transition-transform duration-300 p-2 ml-auto"
          aria-label="Search"
        >
          <Icon icon={faSearch} />
        </button>
      </span>
    </nav>
  );
}
