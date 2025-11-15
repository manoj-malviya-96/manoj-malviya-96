import React, { memo, ReactNode } from "react";
import { cn } from "@/components/utils";

interface TimelineProps<T> {
  items: T[];
  renderLogo: (item: T, isCurrent: boolean) => ReactNode;
  renderCard: (item: T) => ReactNode;
  isToday?: (item: T) => boolean;
  className?: string;
}

function _Timeline<T>({
  items,
  renderLogo,
  renderCard,
  isToday = () => false,
  className = "",
}: TimelineProps<T>) {
  return (
    <div
      className={cn(
        "overflow-x-auto overflow-y-visible pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent w-full bg-muted",
        className,
      )}
    >
      <div className="relative flex flex-row items-start justify-between gap-8 md:gap-10 min-w-max">
        {items.map((item, index) => {
          const isCurrent = isToday(item);
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <div
              key={index}
              className="relative border-red-500 h-full border flex-1 flex flex-col justify-between gap-4"
            >
              {/* Timeline card - fixed height & centered vertically */}
              <div className="w-fit flex items-stretch border justify-center flex-grow">
                {renderCard(item)}
              </div>

              {/* Timeline connector row: centered logo with left/right lines */}
              <div className="relative flex w-full mt-auto">
                {/* Left connecting line (hidden for first) */}
                <div
                  className={cn(
                    "h-[2px] flex-1",
                    "bg-gradient-to-l from-muted to-muted/50",
                    isFirst && "invisible",
                  )}
                />

                {/* Logo/dot centered */}
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
  );
}

_Timeline.displayName = "Timeline";
export default memo(_Timeline) as typeof _Timeline;
