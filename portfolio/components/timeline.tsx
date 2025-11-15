"use client";
import React, { memo, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/components/utils";

interface TimelineProps<T> {
  items: T[];
  renderLogo: (item: T, isCurrent: boolean) => ReactNode;
  renderCard: (item: T) => ReactNode;
  isToday?: (item: T) => boolean;
  className?: string;
}

function Timeline<T>({
  items,
  renderLogo,
  renderCard,
  isToday = () => false,
  className = "",
}: TimelineProps<T>) {
  const [emblaRef] = useEmblaCarousel({
    axis: "x",
    dragFree: true,
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  return (
    <div className={cn("relative w-full", className)}>
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden touch-pan-x">
        {/* Embla container */}
        <div className="flex -ml-4">
          {items.map((item, index) => {
            const isCurrent = isToday(item);
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "pl-4 shrink-0",
                  // Slide width
                  "basis-[320px] sm:basis-[380px]",
                )}
              >
                {/* Card area: fixed height, centered vertically */}
                <div className="h-[300px] md:h-[340px] mb-6 flex items-center justify-center">
                  <div className="w-full bg-background rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    {renderCard(item)}
                  </div>
                </div>

                {/* Connector row: centered logo with left/right lines */}
                <div className="relative flex items-center w-full">
                  {/* Left connecting line (hidden for first) */}
                  <div
                    className={cn(
                      "h-[2px] flex-1",
                      isCurrent
                        ? "bg-gradient-to-l from-accent/60 to-muted/30"
                        : "bg-gradient-to-l from-muted/60 to-muted/20",
                      isFirst && "invisible",
                    )}
                  />

                  {/* Center logo/dot */}
                  <div
                    className={cn(
                      "relative z-10 mx-3 icon-large hover:scale-110 rounded-full shadow-lg transition-transform duration-200",
                      "flex items-center justify-center timeline-dot",
                      isCurrent
                        ? "glow-accent bg-accent/10"
                        : "glow-subtle bg-muted/50",
                    )}
                    aria-hidden
                  >
                    {renderLogo(item, isCurrent)}
                  </div>

                  {/* Right connecting line (hidden for last) */}
                  <div
                    className={cn(
                      "h-[2px] flex-1",
                      isCurrent
                        ? "bg-gradient-to-r from-accent/60 to-muted/30"
                        : "bg-gradient-to-r from-muted/60 to-muted/20",
                      isLast && "invisible",
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right-edge gradient hint for overflow on small screens */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background/80 to-transparent md:hidden" />
    </div>
  );
}

Timeline.displayName = "Timeline";
export default memo(Timeline) as typeof Timeline;
