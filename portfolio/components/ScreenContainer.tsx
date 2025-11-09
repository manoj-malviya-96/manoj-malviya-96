import React, {forwardRef, ReactNode} from 'react';
import {cn} from '@/components/utils';

interface ScreenContainerProps {
    id: string; // required unique section id
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
                                                                                                          id,
                                                                                                          title,
                                                                                                          subtitle,
                                                                                                          children,
                                                                                                          className,
                                                                                                          titleClassName,
                                                                                                          subtitleClassName,
                                                                                                          headerAlign = 'left',
                                                                                                      }, ref) {
    const headerAlignClass = headerAlign === 'center' ? 'text-center' : undefined;
    const titleBottomSpacing = subtitle ? 'mb-2' : 'mb-10';

    return (
        <section ref={ref} id={id}
                 className={cn('py-20 px-4 sm:px-6 lg:px-8 max-w-6xl',
                     'mx-auto min-h-screen flex flex-col items-center justify-center',
                     className)}>
            {title && <h2
                className={cn(
                    'text-6xl sm:text-7xl tracking-tight',
                    headerAlignClass,
                    titleBottomSpacing,
                    titleClassName,
                )}
            >
                {title}
            </h2>}
            {subtitle && (
                <p className={cn('text-muted-foreground mb-10', headerAlignClass, subtitleClassName)}>{subtitle}</p>
            )}
            {children}
        </section>
    );
});

export default ScreenContainer;
