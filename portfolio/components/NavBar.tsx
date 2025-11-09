'use client';
import * as React from 'react';
import {cn} from '@/components/utils';
import {Search} from "lucide-react";

export type NavItem<T extends string> = {
    id: T;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

interface NavBarProps<T extends string> {
    items: NavItem<T>[];
    activeId: T;
    onNavigate: (id: T) => void;
    onOpenSearch: () => void;
}

export function NavBar<T extends string>({
                                             items,
                                             activeId,
                                             onNavigate,
                                             onOpenSearch,
                                         }: NavBarProps<T>) {
    return (
        <nav
            role="navigation"
            aria-label="Primary"
            className={cn(
                'fixed bottom-8 md:top-8 left-1/2 -translate-x-1/2 z-50 h-fit flex flex-row gap-8',
                'flex items-center gap-1 backdrop-blur-xl rounded-full bg-muted drop-shadow-lg'
            )}
        >
            {items.map(item => {
                const active = item.id === activeId;
                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        aria-label={item.label}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'rounded-full flex items-center justify-center transition-all py-2 px-4',
                            active ? 'bg-light text-dark' : 'hover:bg-accent glow-subtle'
                        )}
                    >
                        <item.icon className={cn('icon', !active && 'icon-glow')}/>
                        <span className="px-2 hidden lg:inline-block">{item.label}</span>
                    </button>
                );
            })}
            <button
                onClick={onOpenSearch}
                aria-label="Open search"
                className={cn("px-4 border-l-2 border-muted hover:bg-accent glow-subtle transition-colors")}
            >
                <Search className="icon icon-glow"/>
            </button>
        </nav>
    );
}
