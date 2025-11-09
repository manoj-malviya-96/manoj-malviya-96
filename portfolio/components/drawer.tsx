'use client';
import * as React from 'react';
import * as DrawerPrimitive from 'vaul';
import {cn} from '@/components/utils';

// Root component
export function Drawer(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
    return <DrawerPrimitive.Root data-slot="drawer" {...props}/>;
}

// Content (renders portal + overlay + content panel)
export function DrawerContent({className, children, ...props}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
        <DrawerPrimitive.Portal>
            <DrawerPrimitive.Overlay
                className={cn(
                    'fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out'
                )}
            />
            <DrawerPrimitive.Content
                data-slot="drawer-content"
                className={cn(
                    'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl rounded-t-2xl border border-border bg-background shadow-xl',
                    'p-6 md:p-8',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
                    className,
                )}
                {...props}
            >
                <div className="mx-auto w-full max-w-xl">
                    {children}
                </div>
            </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
    );
}

// Header wrapper
export function DrawerHeader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return <div data-slot="drawer-header" className={cn('mb-4', className)} {...props}/>;
}

// Title component (simple heading element for styling)
export function DrawerTitle({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            data-slot="drawer-title"
            className={cn('text-foreground font-semibold tracking-tight', className)}
            {...props}
        />
    );
}

// Re-export primitives if needed
export const DrawerPortal = DrawerPrimitive.Portal;
export const DrawerOverlay = DrawerPrimitive.Overlay;

