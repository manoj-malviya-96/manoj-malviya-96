import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { mergeCls } from "@/lib/utils";

interface IconProps {
  icon: IconDefinition;
  size?: "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

function Icon({
  icon,
  className,
  size = "md",
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={mergeCls(
        size == "md" ? "text-sm lg:text-md" : "text-md lg:text-lg",
        className,
      )}
      aria-label={ariaLabel}
    />
  );
}
Icon.displayName = "Icon";
export default memo(Icon);
