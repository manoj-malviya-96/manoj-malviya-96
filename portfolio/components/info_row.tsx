import { memo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Icon from "@/components/icon";

interface InfoRowProps {
  icon: IconDefinition;
  children: React.ReactNode;
  className?: string;
}

function _InfoRow({ icon, children, className = "" }: InfoRowProps) {
  return (
    <span className={className}>
      <Icon icon={icon} className="w-4 h-4" /> {children}
    </span>
  );
}

_InfoRow.displayName = "InfoRow";
export default memo(_InfoRow);
