"use client";
import * as React from "react";
import { memo } from "react";
import { cn } from "@/components/utils";
import { Search, Settings } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export type NavItem<T extends string> = {
  id: T;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface NavBarProps<T extends string> {
  items: NavItem<T>[];
  activeId: T;
  onNavigate: (id: T) => void;
  onOpenSearch: () => void;
  theme?: "light" | "dark";
}

function _NavBar<T extends string>({
  items,
  activeId,
  onNavigate,
  onOpenSearch,
  theme = "light",
}: NavBarProps<T>) {
  const activeClasses =
    theme === "dark" ? "bg-light/20 text-light" : "bg-dark/20 text-dark";

  const containerClasses = cn(
    "h-fit w-1/3 -translate-x-1/2 left-1/2 rounded-full fixed top-4",
    "flex justify-center px-4 py-2 items-center gap-0 backdrop-blur-xl transition-colors duration-300",
  );
  const containerThemeClasses =
    theme === "dark" ? "bg-light/10 text-light" : "bg-dark/10 text-dark";
  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className={cn(containerClasses, containerThemeClasses)}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <ScrollLink
            key={item.id}
            to={item.id}
            spy={true}
            smooth={"easeInOutQuart"}
            duration={210}
            offset={-40}
            onSetActive={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 flex gap-2 text-sm items-center justify-center transition-all",
              active && activeClasses,
            )}
          >
            <item.icon className={cn("icon", !active && "icon-glow")} />
            <span className="hidden lg:inline-block">{item.label}</span>
          </ScrollLink>
        );
      })}
      <div className="w-0.5 h-6 ml-2 bg-muted" />
      <span className="ml-auto flex flex-row gap-4">
        <button
          onClick={onOpenSearch}
          aria-label="Open search"
          className="glow-subtle transition-colors group"
        >
          <Search className="icon icon-glow" />
        </button>
        <button
          aria-label="Open search"
          className="glow-subtle transition-colors group"
        >
          <Settings className="icon icon-glow" />
        </button>
      </span>
    </nav>
  );
}

_NavBar.displayName = "NavBarBase";

export default memo(_NavBar);
