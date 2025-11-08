import type {LucideIcon} from 'lucide-react';
import {ReactNode} from 'react';

export default function IconText({icon: Icon, children, className = ''}: {
    icon: LucideIcon;
    children: ReactNode;
    className?: string
}) {
    return (
        <span className={`flex items-center gap-1 ${className}`}>
      <Icon className="w-3 h-3"/>
            {children}
    </span>
    );
}


