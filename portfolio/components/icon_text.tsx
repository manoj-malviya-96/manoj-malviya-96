import React, { memo, ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Icon from "@/components/icon";
import { cn } from "@/components/utils";

function _IconTextBase({
  icon,
  children,
  className = "",
}: {
  icon: IconDefinition;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("`flex items-center gap-1", className)}>
      <Icon icon={icon} className="icon" />
      {children}
    </span>
  );
}

_IconTextBase.displayName = "IconTextBase";
export default memo(_IconTextBase);
