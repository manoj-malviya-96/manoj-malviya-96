"use client";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils"; // Root component

// Root component
export function Drawer(
  props: React.ComponentProps<typeof DrawerPrimitive.Root>,
) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export function DrawerContent({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & { title: string }) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in data-[state=closed]:fade-out",
        )}
      />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-[101]",
          "w-full max-w-2xl rounded-t-2xl border border-border bg-background shadow-xl",
          "p-4 sm:p-6 md:p-8 max-h-[85vh] overflow-y-auto",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          className,
        )}
        {...props}
      >
        <DrawerPrimitive.Title className="text-2xl font-semibold mb-4">
          {title}
        </DrawerPrimitive.Title>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}
