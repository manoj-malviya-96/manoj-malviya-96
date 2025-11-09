import React, {forwardRef, ReactNode} from 'react';
import {cn} from '@/components/utils';

interface ScreenContainerProps {
    id: string;
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

    return (
        <section ref={ref} id={id} className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
            <div className={cn('max-w-6xl mx-auto')}>
                {(title || subtitle) && (
                    <div className={cn('mb-10', headerAlign === 'center' && 'text-center')}>
                        {title && (
                            <h2 className={cn('text-6xl sm:text-7xl tracking-tight mb-2', headerAlignClass, titleClassName)}>
                                {title}
                            </h2>
                        )}

                        {subtitle && (
                            <p className={cn('text-muted-foreground', headerAlignClass, subtitleClassName)}>{subtitle}</p>
                        )}
                    </div>
                )}

                {children}
            </div>
        </section>
    );
});

export default ScreenContainer;
