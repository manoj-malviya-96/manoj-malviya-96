import { memo } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function _Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-muted rounded-md", className)}
      aria-hidden="true"
    />
  );
}

_Skeleton.displayName = "Skeleton";
export default memo(_Skeleton);
