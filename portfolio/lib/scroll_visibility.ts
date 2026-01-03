import { useEffect, useRef, useState } from "react";

interface UseScrollVisibilityOptions {
  enabled?: boolean;
  velocityThreshold?: number;
}

export default function useScrollVisibility({
  enabled = true,
  velocityThreshold = 0.3,
}: UseScrollVisibilityOptions = {}): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Initialize lastTime on mount
    lastTime.current = performance.now();

    const handleScroll = (): void => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY: number = window.scrollY;
        const currentTime: number = performance.now();
        const timeDiff: number = currentTime - lastTime.current;
        const scrollDiff: number = currentScrollY - lastScrollY.current;

        const velocity: number = Math.abs(scrollDiff / timeDiff);
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if (scrollDiff > 0 && velocity > velocityThreshold) {
          setIsVisible(false);
        } else if (scrollDiff < 0 && velocity > velocityThreshold) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        lastTime.current = currentTime;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, velocityThreshold]);

  return isVisible;
}
