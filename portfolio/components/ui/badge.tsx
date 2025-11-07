import React, { memo, ReactNode } from "react";

function _Badge({
  children,
  active = false,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${active ? "bg-fg text-bg" : "bg-muted"} ${className}`}
    >
      {children}
    </span>
  );
}

_Badge.displayName = "Badge";
export default memo(_Badge);
