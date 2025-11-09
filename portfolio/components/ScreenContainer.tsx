import React, {forwardRef, ReactNode} from 'react';
import {cn} from '@/components/utils';

interface ScreenContainerProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    className?: string; // extra classes for outer wrapper
    titleClassName?: string;
    subtitleClassName?: string;
    headerAlign?: 'left' | 'center';
}

// Minimal screen wrapper: fixed width, spacing, semantic section & heading.
export const ScreenContainer = forwardRef<HTMLElement, ScreenContainerProps>(function ScreenContainer({

                                                                                                          title,
                                                                                                          subtitle,
                                                                                                          children,
                                                                                                          className,
                                                                                                          titleClassName,
                                                                                                          subtitleClassName,
                                                                                                          headerAlign = 'left',
                                                                                                      }, ref) {
    const headerAlignClass = headerAlign === 'center' ? 'text-center' : undefined;

    return (
        <section ref={ref}
                 className={cn('py-20 px-4 sm:px-6 lg:px-8',
                     'min-h-[85vh] flex flex-col justify-center',
                     className)}>
            {title && (
                <h2 className={cn('text-6xl sm:text-7xl tracking-tight mb-2 w-full', headerAlignClass, titleClassName)}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className={cn('text-muted-foreground', headerAlignClass, subtitleClassName)}>{subtitle}</p>
            )}
            {children}
        </section>
    );
});

export default ScreenContainer;
