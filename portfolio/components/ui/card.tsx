import React, { memo, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { mergeCls } from "@/lib/utils";
import Icon from "@/components/ui/icon";
import { Typography } from "@/components/ui/text";

export interface CardProps {
  icon?: IconDefinition;
  title: string;
  children: ReactNode;
  className?: string;
}
function Card({ icon, title, children, className = "" }: CardProps) {
  return (
    <div className={mergeCls("p-4 rounded-lg", className)}>
      {(icon || title) && (
        <span className="flex items-center gap-2 self-start pb-4 pr-4">
          {icon && <Icon icon={icon} className="icon text-lg" />}
          <Typography variant="title" className="uppercase tracking-wider">
            {title}
          </Typography>
        </span>
      )}
      {children}
    </div>
  );
}
Card.displayName = "Card";
export default memo(Card);
