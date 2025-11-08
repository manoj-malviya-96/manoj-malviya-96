// filepath: /Users/manoj/Git/manoj-malviya-96/portfolio/components/Card.tsx
import {ReactNode} from 'react';
import type {LucideIcon} from 'lucide-react';

export interface CardProps {
    icon: LucideIcon;
    title: string;
    children: ReactNode;
    className?: string;
}

export default function Card({icon: Icon, title, children, className = ''}: CardProps) {
    return (
        <div className={`bg-muted rounded-xl p-5 glow-subtle card-glow ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 icon-glow"/>
                <h3 className="text-sm uppercase tracking-wider">{title}</h3>
            </div>
            {children}
        </div>
    );
}
