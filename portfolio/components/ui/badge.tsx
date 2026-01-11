import React, { ElementType, ReactNode } from "react";
import { mergeCls } from "@/lib/utils";

export default function Badge({
  children,
  className = "",
  element = "span",
  active = false,
}: {
  children: ReactNode;
  className?: string;
  element?: ElementType;
  active?: boolean;
}) {
  const Component = element;
  return (
    <Component
      className={mergeCls(
        "inline-block px-2 py-1 rounded-lg text-sm",
        active && "bg-muted/70",
        className,
      )}
    >
      {children}
    </Component>
  );
}

Badge.displayName = "Badge";
