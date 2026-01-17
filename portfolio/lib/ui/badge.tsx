import React, { ElementType, memo, ReactNode } from "react";
import { mergeCls } from "@/lib/utils";

function Badge({
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
        "inline-block px-2 py-1 rounded-lg text-sm bg-muted",
        active && "bg-front text-back",
        className,
      )}
    >
      {children}
    </Component>
  );
}

Badge.displayName = "Badge";

export default memo(Badge);
