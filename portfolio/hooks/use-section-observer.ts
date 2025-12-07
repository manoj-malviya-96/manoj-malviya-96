import { useEffect, useRef, useState } from "react";

interface UseSectionObserverOptions {
  rootMargin?: string;
  threshold?: number[];
}

export function useSectionObserver<T extends string>(
  sectionIds: T[],
  options: UseSectionObserverOptions = {},
) {
  const [activeSection, setActiveSection] = useState<T>(sectionIds[0]);
  const sectionRefs = useRef<Map<T, HTMLElement>>(new Map());

  const registerSection = (id: T) => {
    return (element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current.set(id, element);
      } else {
        sectionRefs.current.delete(id);
      }
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const bestEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (bestEntry) {
          setActiveSection(bestEntry.target.id as T);
        }
      },
      {
        rootMargin: options.rootMargin || "-25% 0px -45% 0px",
        threshold: options.threshold || [0.45],
      },
    );

    // Observe all registered sections
    sectionRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, options.rootMargin, options.threshold]);

  return {
    activeSection,
    registerSection,
    setActiveSection,
  };
}
