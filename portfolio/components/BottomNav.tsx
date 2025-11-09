'use client';
import * as React from 'react';
import {cn} from '@/components/utils';

export type NavItem<T extends string> = {
    id: T;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

interface BottomNavProps<T extends string> {
    items: NavItem<T>[];
    activeId: T;
    onNavigate: (id: T) => void;
    onOpenSearch: () => void;
    onToggleTheme: () => void;
    isDark: boolean;
    SearchIcon: React.ComponentType<{ className?: string }>;
    DarkIcon: React.ComponentType<{ className?: string }>;
    LightIcon: React.ComponentType<{ className?: string }>;
}

export function BottomNav<T extends string>({
                                                items,
                                                activeId,
                                                onNavigate,
                                                onOpenSearch,
                                                onToggleTheme,
                                                isDark,
                                                SearchIcon,
                                                DarkIcon,
                                                LightIcon,
                                            }: BottomNavProps<T>) {
    return (
        <nav className="fixed bottom-4 md:top-4 left-1/2 -translate-x-1/2 z-50 max-w-xl px-2">
            <div
                className="bg-muted/80 backdrop-blur-xl rounded-full px-4 py-2 border border-border/30 glow-subtle shadow-lg">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 px-2 border-r-2">
                        {items.map(item => {
                            const active = item.id === activeId;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    aria-label={item.label}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'group relative p-3 rounded-full transition-all flex items-center justify-center',
                                        active ? 'bg-foreground text-background pulse-glow' : 'hover:bg-accent glow-subtle'
                                    )}
                                >
                                    <item.icon className={cn('w-5 h-5', !active && 'icon-glow')}/>
                                    <span className="px-2 sm:hidden">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={onOpenSearch}
                            aria-label="Open search"
                            className="p-3 rounded-full hover:bg-accent glow-subtle transition-colors"
                        >
                            <SearchIcon className="w-5 h-5 icon-glow"/>
                        </button>
                        <button
                            onClick={onToggleTheme}
                            aria-label="Toggle theme"
                            className="p-3 rounded-full hover:bg-accent glow-subtle transition-colors"
                        >
                            {isDark ? <DarkIcon className="w-5 h-5 icon-glow"/> :
                                <LightIcon className="w-5 h-5 icon-glow"/>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

