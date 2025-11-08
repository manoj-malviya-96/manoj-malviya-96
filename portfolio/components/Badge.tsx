import {ReactNode} from 'react';

export function Badge({children, active = false, className = ''}: {
    children: ReactNode;
    active?: boolean;
    className?: string
}) {
    return (
        <span
            className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${active ? 'bg-foreground text-background' : 'bg-muted'} ${className}`}>
      {children}
    </span>
    );
}

export default Badge;

