"use client";
import React, {RefObject, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Highlights from '@/screens/highlights';
import Showcase from '@/screens/showcase';
import Footer from '@/screens/footer';
import Home from '@/screens/home';
import {Briefcase, FolderOpen, Home as HomeIcon, Search} from 'lucide-react';
import {Input} from '@/components/Input';
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle} from '@/components/drawer';
import {NavBar, type NavItem as NavBarItem} from '@/components/NavBar';
import ScreenContainer from '@/components/ScreenContainer';


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
            {/* Sections */}
            <div>
                <ScreenContainer
                    ref={homeRef}
                    id="home"
                    headerAlign="center"
                >
                    <Home/>
                </ScreenContainer>
                <ScreenContainer
                    ref={workexRef}
                    id="workex"
                    title="Experience"
                    subtitle="Roles, impact, and technologies"
                    titleClassName="uppercase"
                >
                    <Highlights/>
                </ScreenContainer>
                <ScreenContainer
                    ref={showcaseRef}
                    id="showcase"
                    title="Projects & Blogs"
                    subtitle="Exploring ideas through code and writing"
                >
                    <Showcase/>
                </ScreenContainer>
            </div>
            <Footer/>

            <NavBar
                items={navItems as NavBarItem<SectionId>[]}
                activeId={activeSection}
                onNavigate={scrollToSection}
                onOpenSearch={() => setSearchOpen(true)}
                onToggleTheme={toggleTheme}
                isDark={isDark}
            />

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
