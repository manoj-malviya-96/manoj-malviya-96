import { useEffect, useRef, useState } from "react";

type ScrollVisibilityInput = {
  enabled?: boolean;
  velocityThreshold?: number;
};

type ScrollVisibilityResult = {
  isVisible: boolean;
  isAtTop: boolean;
};

export default function useScrollVisibility({
  enabled = true,
  velocityThreshold = 0.3,
}: ScrollVisibilityInput = {}): ScrollVisibilityResult {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    lastTime.current = performance.now();

    const handleScroll = (): void => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY: number = window.scrollY;
        const currentTime: number = performance.now();
        const timeDiff: number = currentTime - lastTime.current;
        const scrollDiff: number = currentScrollY - lastScrollY.current;
        const isTop = currentScrollY < 0.3 * window.innerHeight;

        setIsAtTop(isTop);

        const velocity: number = Math.abs(scrollDiff / timeDiff);
        if (isTop) {
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
  if (!enabled) {
    return { isVisible: true, isAtTop: false };
  }
  return { isVisible, isAtTop };
}
