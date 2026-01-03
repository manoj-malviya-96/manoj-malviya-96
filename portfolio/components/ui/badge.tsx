import React, { ReactNode } from "react";

export default function Badge({
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

Badge.displayName = "Badge";
