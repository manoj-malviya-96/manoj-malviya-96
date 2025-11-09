"use client";
import React, {RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Highlights from '@/screens/highlights';
import Showcase from '@/screens/showcase';
import Footer from '@/screens/footer';
import Home from '@/screens/home';
import {Briefcase, FolderOpen, Home as HomeIcon, Moon, Search, Sun} from 'lucide-react';
import {Input} from '@/components/Input';
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from '@/components/drawer';


type SectionId = 'home' | 'workex' | 'showcase';

// Note: NavItem deliberately does NOT include refs to avoid reading refs during render
type NavItem = {
    id: SectionId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

// Hook: theme management (keeps DOM access inside the hook)
function useTheme(defaultPref = true) {
    // compute initial theme synchronously (safe in client components)
    const getInitial = () => {
        try {
            const saved = localStorage.getItem('theme');
            const prefersDark = typeof window !== 'undefined' && window.matchMedia
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                : false;
            return saved === 'dark' || (saved === null && prefersDark) || defaultPref;
        } catch {
            return defaultPref;
        }
    };

    const [isDark, setIsDark] = useState<boolean>(getInitial);

    // apply class and persist whenever isDark changes
    useEffect(() => {
        try {
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch {
            // ignore storage/dom errors
        }
    }, [isDark]);

    const toggleTheme = useCallback(() => {
        setIsDark((prev) => !prev);
    }, []);

    return {isDark, toggleTheme, setIsDark};
}

// Hook: global keyboard shortcuts (keeps window listeners inside the hook)
function useGlobalShortcuts(onOpenSearch: () => void, onCloseSearch: () => void) {
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                onOpenSearch();
            }
            if (e.key === 'Escape') onCloseSearch();
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);
    }, [onOpenSearch, onCloseSearch]);
}

// Hook: observe sections and update active id using IntersectionObserver
function useSectionObserver(
    sectionRefs: Record<SectionId, RefObject<HTMLElement | null>>,
    onChange: (id: SectionId) => void,
) {
    useEffect(() => {
        const entriesMap = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                // pick the entry with highest intersectionRatio
                entries.forEach((entry) => {
                    if (!entry.target) return;
                    entriesMap.set((entry.target as HTMLElement).id, entry.intersectionRatio);
                });

                let best: { id: SectionId; ratio: number } | null = null;
                for (const [id, ratio] of entriesMap) {
                    if (!best || ratio > best.ratio) {
                        best = {id: id as SectionId, ratio};
                    }
                }

                if (best && best.ratio > 0.2) {
                    onChange(best.id);
                }
            },
            {
                // fire early for sections that are somewhat visible
                threshold: [0, 0.2, 0.5, 0.75, 1],
                root: null,
                rootMargin: '-40% 0px -40% 0px',
            },
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref && ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, [sectionRefs, onChange]);
}

function FloatingNav({items, activeId, onNavigate, onOpenSearch, onToggleTheme, isDark}: {
    items: NavItem[];
    activeId: SectionId;
    onNavigate: (id: SectionId) => void;
    onOpenSearch: () => void;
    onToggleTheme: () => void;
    isDark: boolean;
}) {
    return (
        <nav className="fixed left-1/2 -translate-x-1/2 z-50 top-4 md:top-6">
            <div className="bg-muted/80 backdrop-blur-xl rounded-full px-4 py-2 border border-border/30 glow-subtle">
                <div className="flex items-center gap-2">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                                activeId === item.id ? 'bg-foreground text-background pulse-glow' : 'hover:bg-accent glow-subtle'
                            }`}
                        >
                            <item.icon className={`w-4 h-4 ${activeId !== item.id ? 'icon-glow' : ''}`}/>
                            <span className="hidden sm:inline text-sm">{item.label}</span>
                        </button>
                    ))}

                    <div className="w-px h-6 bg-border mx-1"/>

                    <button
                        onClick={onOpenSearch}
                        className="p-2 rounded-full hover:bg-accent glow-subtle"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4 icon-glow"/>
                    </button>

                    <button
                        onClick={onToggleTheme}
                        className="p-2 rounded-full hover:bg-accent glow-subtle"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Moon className="w-4 h-4 icon-glow"/> : <Sun className="w-4 h-4 icon-glow"/>}
                    </button>
                </div>
            </div>
        </nav>
    );
}

function MobileNav({items, activeId, onNavigate}: {
    items: NavItem[];
    activeId: SectionId;
    onNavigate: (id: SectionId) => void
}) {
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
            <div className="bg-muted/80 backdrop-blur-xl rounded-full px-4 py-2 border border-border/30 glow-subtle">
                <div className="flex items-center gap-1">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`p-3 rounded-full transition-all ${
                                activeId === item.id ? 'bg-foreground text-background pulse-glow' : 'hover:bg-accent glow-subtle'
                            }`}
                            aria-label={item.label}
                        >
                            <item.icon className={`w-4 h-4 ${activeId !== item.id ? 'icon-glow' : ''}`}/>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default function Entry() {
    // stable refs for sections
    const homeRef = useRef<HTMLElement | null>(null);
    const workexRef = useRef<HTMLElement | null>(null);
    const showcaseRef = useRef<HTMLElement | null>(null);

    const sectionRefs = useMemo(() => ({
        home: homeRef,
        workex: workexRef,
        showcase: showcaseRef,
    }), [homeRef, workexRef, showcaseRef]);

    const [activeSection, setActiveSection] = useState<SectionId>('home');
    const {isDark, toggleTheme} = useTheme(true);

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // keyboard shortcuts
    useGlobalShortcuts(() => setSearchOpen(true), () => setSearchOpen(false));

    // observe which section is currently visible (updates activeSection)
    useSectionObserver(sectionRefs, (id) => setActiveSection(id));

    const navItems: NavItem[] = useMemo(() => [
        {id: 'home', label: 'Entry', icon: HomeIcon},
        {id: 'workex', label: 'Experience', icon: Briefcase},
        {id: 'showcase', label: 'Showcase', icon: FolderOpen},
    ], []);

    const scrollToSection = useCallback((sectionId: SectionId) => {
        setActiveSection(sectionId);
        const ref = sectionRefs[sectionId];
        if (ref && ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [sectionRefs]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <FloatingNav
                items={navItems}
                activeId={activeSection}
                onNavigate={scrollToSection}
                onOpenSearch={() => setSearchOpen(true)}
                onToggleTheme={toggleTheme}
                isDark={isDark}
            />

            <MobileNav items={navItems} activeId={activeSection} onNavigate={scrollToSection}/>

            <div>
                <section id="home" ref={homeRef} className="min-h-screen flex items-center justify-center">
                    <Home/>
                </section>
                <section id="workex" ref={workexRef} className="min-h-screen">
                    <Highlights/>
                </section>
                <section id="showcase" ref={showcaseRef} className="min-h-screen">
                    <Showcase/>
                </section>
            </div>

            <Footer/>

            {/* Global Search Drawer */}
            <Drawer open={searchOpen} onOpenChange={setSearchOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-xl">Quick Search</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-0">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                            <Input
                                type="text"
                                placeholder="Search everything... (Cmd/Ctrl + K)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 bg-muted border-0 rounded-xl h-12 text-lg w-full"
                                autoFocus
                            />
                        </div>
                    </div>

                    {searchQuery && (
                        <div className="pt-4 max-h-96 overflow-y-auto">
                            <p className="text-sm text-muted-foreground mb-2">Quick actions</p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        scrollToSection('workex');
                                        setSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl bg-muted hover:bg-accent transition-all"
                                >
                                    <p className="text-sm">Go to Work Experience</p>
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToSection('showcase');
                                        setSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl bg-muted hover:bg-accent transition-all"
                                >
                                    <p className="text-sm">Go to Showcase</p>
                                </button>
                            </div>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}
