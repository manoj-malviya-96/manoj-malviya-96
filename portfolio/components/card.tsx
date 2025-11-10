// filepath: /Users/manoj/Git/manoj-malviya-96/portfolio/components/card.tsx
import React, {memo, ReactNode} from 'react';
import type {LucideIcon} from 'lucide-react';

export interface CardProps {
    icon: LucideIcon;
    title: string;
    children: ReactNode;
    className?: string;
}

function _Card({icon: Icon, title, children, className = ''}: CardProps) {
    return (
        <div className={`bg-muted rounded-xl p-5 glow-subtle card-glow ${className}`}>
            <span className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 icon-glow"/>
                <h3 className="text-sm uppercase tracking-wider">{title}</h3>
            </span>
            {children}
        </div>
    );
}

_Card.displayName = "Card"
export default memo(_Card);
