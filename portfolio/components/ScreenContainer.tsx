import {ReactNode} from 'react';
import {cn} from '@/components/utils';

interface ScreenContainerProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    id?: string;
    className?: string; // extra classes for outer wrapper
    titleClassName?: string;
    subtitleClassName?: string;
    headerAlign?: 'left' | 'center';
    maxWidth?: 'default' | 'wide';
    gradientTitle?: boolean;
}

// A shared screen wrapper providing consistent padding, width and header layout.
export function ScreenContainer({
                                    title,
                                    subtitle,
                                    children,
                                    id,
                                    className,
                                    titleClassName,
                                    subtitleClassName,
                                    headerAlign = 'left',
                                    maxWidth = 'default',
                                    gradientTitle = false,
                                }: ScreenContainerProps) {
    return (
        <div id={id} className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
            <div className={cn(maxWidth === 'wide' ? 'max-w-7xl' : 'max-w-6xl', 'mx-auto')}>
                <div className={cn('mb-10', headerAlign === 'center' && 'text-center')}>
                    <h2
                        className={cn(
                            'text-6xl sm:text-7xl tracking-tight',
                            gradientTitle && 'gradient-text',
                            titleClassName,
                        )}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p className={cn('text-muted-foreground', subtitleClassName)}>{subtitle}</p>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}

export default ScreenContainer;

