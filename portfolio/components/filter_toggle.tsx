import React, {ButtonHTMLAttributes, memo, ReactNode} from 'react';
import type {LucideIcon} from 'lucide-react';

export type FilterToggleProps = {
    active?: boolean;
    variant?: 'primary' | 'accent';
    icon?: LucideIcon;
    children?: ReactNode;
    className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

function _FilterToggle({
                           active = false,
                           variant = 'primary',
                           icon: Icon,
                           children,
                           className = '',
                           ...rest
                       }: FilterToggleProps) {
    const base = 'px-3 py-1.5 rounded-lg text-sm transition-all inline-flex items-center gap-1.5';
    const classes = variant === 'primary'
        ? active
            ? 'bg-foreground text-background'
            : 'bg-muted hover:bg-accent'
        : active
            ? 'bg-accent text-foreground'
            : 'text-muted-foreground hover:bg-muted';

    return (
        <button {...rest} className={`${base} ${classes} ${className}`}>
            {Icon && <Icon className="icon"/>}
            {children}
        </button>
    );
}


_FilterToggle.displayName = 'FilterToggle';
export default memo(_FilterToggle);
