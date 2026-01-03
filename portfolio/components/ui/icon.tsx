import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: IconDefinition;
  className?: string;
  "aria-label"?: string;
}

function Icon({ icon, className, "aria-label": ariaLabel }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={cn("icon", className)}
      aria-label={ariaLabel}
    />
  );
}
Icon.displayName = "Icon";
export default memo(Icon);
