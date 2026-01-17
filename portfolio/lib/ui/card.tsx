import React, { memo, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { mergeCls } from "@/lib/utils";
import Icon from "@/lib/ui/icon";
import { Typography } from "@/lib/ui/text";

export interface CardProps {
  icon?: IconDefinition;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}
function Card({
  icon,
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <div className={mergeCls("p-4 rounded-lg flex flex-col gap-4", className)}>
      {(icon || title) && (
        <span className="flex items-center gap-2 self-start pb-4 pr-4">
          {icon && <Icon icon={icon} size="lg" />}
          <Typography variant="title">{title}</Typography>
        </span>
      )}
      {children}
      {description && (
        <div className="p-4">
          <Typography variant="caption" className="inline-block">
            {description}
          </Typography>
        </div>
      )}
    </div>
  );
}
Card.displayName = "Card";
export default memo(Card);
