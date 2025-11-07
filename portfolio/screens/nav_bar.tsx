"use client";

import React, { useEffect, useState } from "react";
import { AllRoutes, useNavigator } from "@/hooks/use-navigator";
import { cn } from "@/core/utils";
import { Icon } from "@/components/ui";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const NAV_BUTTON_BASE =
  "cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 hover:bg-muted";
const ACTION_BUTTON_BASE =
  "cursor-pointer px-4 py-3 rounded-full text-sm transition-transform duration-300 hover:scale-105 active:scale-95";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigator();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionClassName = cn(
    "flex items-center gap-4 rounded-full px-3 py-2 transition-colors duration-300",
    scrolled ? "bg-back/50 backdrop-blur-lg" : "bg-transparent",
  );

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between py-2 px-4 text-front"
      data-theme="dark"
    >
      <div className={sectionClassName}>
        {AllRoutes.map((label) => (
          <button
            key={label}
            onClick={() => navigate(label)}
            className={cn(NAV_BUTTON_BASE, label === "home" && "font-bold")}
            aria-label={`Navigate to ${label}`}
          >
            {label === "home"
              ? "Portfolio"
              : label.charAt(0).toUpperCase() + label.slice(1)}
          </button>
        ))}
      </div>

      <div className={sectionClassName}>
        <button
          className={cn(ACTION_BUTTON_BASE, "bg-transparent")}
          aria-label="Search"
        >
          <Icon icon={faSearch} />
        </button>
        <button
          className={cn(ACTION_BUTTON_BASE, "bg-muted")}
          aria-label="Contact"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
