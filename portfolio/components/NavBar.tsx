'use client';
import * as React from 'react';
import {cn} from '@/components/utils';
import {Search} from "lucide-react";
import {Link as ScrollLink} from 'react-scroll';

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
    theme?: 'light' | 'dark';
}

export function NavBar<T extends string>({
                                             items,
                                             activeId,
                                             onNavigate,
                                             onOpenSearch,
                                             theme = 'light',
                                         }: NavBarProps<T>) {

    const activeClasses = theme === 'dark' ? 'bg-light text-dark' : 'bg-dark text-light';

    const containerClasses = cn('h-fit fixed top-4 left-1/2 -translate-x-1/2 z-50 ',
        'flex items-center gap-1 backdrop-blur-xl rounded-full bg-muted shadow-lg transition-colors duration-300')
    const containerThemeClasses = theme === 'dark' ? 'bg-light/20 text-light' : 'bg-dark/20 text-dark';
    return (
        <nav role="navigation" aria-label="Primary" className={cn(containerClasses, containerThemeClasses)}>
            {items.map(item => {
                const active = item.id === activeId;
                return (
                    <ScrollLink
                        key={item.id}
                        to={item.id}
                        spy={true}
                        smooth={'easeInOutQuart'}
                        duration={210}
                        offset={-40}
                        onSetActive={() => onNavigate(item.id)}
                        aria-label={item.label}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'cursor-pointer p-3 rounded-full flex items-center justify-center transition-all',
                            active ? activeClasses : 'hover:bg-muted glow-subtle'
                        )}
                    >
                        <item.icon className={cn('icon', !active && 'icon-glow')}/>
                        <span className="px-2 hidden lg:inline-block">{item.label}</span>
                    </ScrollLink>
                );
            })}
            <span className="h-8 w-0.5 bg-muted ml-4 "/>
            <button
                onClick={onOpenSearch}
                aria-label="Open search"
                className="p-3 rounded-full hover:bg-muted glow-subtle transition-colors"
            >
                <Search className="icon icon-glow"/>
            </button>
        </nav>
    );
}
