import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/components/utils";

interface IconProps {
  icon: IconDefinition;
  className?: string;
  "aria-label"?: string;
}

function _Icon({ icon, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={cn("w-4 h-4", className)}
      aria-label={ariaLabel}
    />
  );
}

_Icon.displayName = "Icon";
export default memo(_Icon);
