"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export interface ParallaxProps {
  children: ReactNode;
  /** Multiplier for scroll distance. Typical range 0.1 - 0.8 */
  speed?: number;
  /** Optional className applied to outer wrapper */
  className?: string;
  /** Direction of movement relative to scroll */
  direction?: "up" | "down";
  /** Disable on small screens (performance / UX) */
  disableBelow?: number; // px width
}

export default function Parallax({
  children,
  speed = 0.4,
  className = "",
  direction = "up",
  disableBelow = 640,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setEnabled(window.innerWidth >= disableBelow);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [disableBelow]);

  useEffect(() => {
    if (!enabled) {
      setOffset(0);
      return;
    }
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Only compute while in viewport to avoid jumpiness
      if (rect.top <= windowH && rect.bottom >= 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const dir = direction === "up" ? -1 : 1;
        setOffset(progress * speed * 100 * dir); // translate in px
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction, enabled]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1000px" }}>
      <div
        style={{
          transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
          transition: "transform 0.08s ease-out",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
