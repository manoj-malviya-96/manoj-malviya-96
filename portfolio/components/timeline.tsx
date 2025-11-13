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
    <div className={cn("relative space-y-0", className)}>
      {items.map((item, index) => {
        const isCurrent = isToday(item);
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="relative flex gap-6 group">
            {/* Timeline dot with glow effect */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 hover:scale-105 rounded-full bg-light shadow-lg flex items-center justify-center",
                  "transition-all duration-300 ease-[var(--ease-default)] z-10 timeline-dot",
                  isCurrent ? "glow-accent" : " glow-subtle",
                )}
              >
                {renderLogo(item, isCurrent)}
              </div>

              {/* Timeline line */}
              {!isLast && (
                <div className="absolute top-16 bottom-0 w-0.5 bg-gradient-to-b from-muted to-transparent" />
              )}
            </div>

            {/* Timeline card */}
            <div className={cn("flex-1", !isLast && "pb-12")}>
              <div
                className={cn(
                  "bg-light rounded-xl border border-muted card-glow",
                  "transition-all duration-300 ease-in-out",
                  isCurrent
                    ? "scale-105 glow-accent"
                    : "hover:shadow-md glow-subtle",
                )}
              >
                {renderCard(item)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

_Timeline.displayName = "Timeline";
export default memo(_Timeline) as typeof _Timeline;
