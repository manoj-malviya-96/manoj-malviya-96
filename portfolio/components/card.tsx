// filepath: /Users/manoj/Git/manoj-malviya-96/portfolio/components/card.tsx
import React, { memo, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CardProps {
  icon: IconDefinition;
  title: string;
  children: ReactNode;
  className?: string;
}

function _Card({ icon, title, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-muted rounded-xl p-5 glow-subtle card-glow ${className}`}
    >
      <span className="flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={icon} className="w-4 h-4 icon-glow" />
        <h3 className="text-sm uppercase tracking-wider">{title}</h3>
      </span>
      {children}
    </div>
  );
}

_Card.displayName = "Card";
export default memo(_Card);
