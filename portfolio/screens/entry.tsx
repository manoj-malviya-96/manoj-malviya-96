"use client";
import React, {useMemo, useState} from 'react';
import Highlights from '@/screens/highlights';
import Showcase from '@/screens/showcase';
import Footer from '@/screens/footer';
import Home from '@/screens/home';
import {Briefcase, FolderOpen, Home as HomeIcon} from 'lucide-react';
import {NavBar, type NavItem as BottomNavItem} from '@/components/NavBar';
import ScreenContainer from '@/components/ScreenContainer';
import {Element, scroller} from 'react-scroll';
import {Input} from '@/components/Input';
import {Drawer, DrawerContent} from '@/components/drawer';


type SearchModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onGoTo: (id: string) => void;
};

function SearchModal({open, onOpenChange, onGoTo}: SearchModalProps) {
    const [query, setQuery] = useState('');
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="p-8 dark border-none" title="Quick Search">
                <Input
                    type="text"
                    placeholder="Search everything... (Cmd/Ctrl + K)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 bg-muted border-0 rounded-xl h-12 text-lg w-full"
                    autoFocus
                />
                {query && (
                    <div className="pt-4 max-h-96 overflow-y-auto">
                        <p className="text-sm text-muted-foreground mb-2">Quick actions</p>
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    onGoTo('workex');
                                    onOpenChange(false);
                                    setQuery('');
                                }}
                                className="w-full text-left px-4 py-3 rounded-xl bg-muted hover:bg-accent transition-all"
                            >
                                <p className="text-sm">Go to Work Experience</p>
                            </button>
                            <button
                                onClick={() => {
                                    onGoTo('showcase');
                                    onOpenChange(false);
                                    setQuery('');
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
    );
}

export default function Entry() {
    // Static section meta (no hooks inside)
    const allSections = useMemo(() => [
        {
            id: 'home' as const,
            label: 'Entry',
            icon: HomeIcon,
            headerAlign: 'center' as const,
            theme: 'dark' as const,
            component: <Home/>
        },
        {
            id: 'workex' as const,
            label: 'Experience' as const,
            icon: Briefcase,
            title: 'Experience',
            subtitle: 'Roles, impact, and technologies',
            headerAlign: 'left' as const,
            theme: 'light' as const,
            component: <Highlights/>
        },
        {
            id: 'showcase' as const,
            label: 'Showcase',
            icon: FolderOpen,
            title: 'Projects & Blogs',
            subtitle: 'Exploring ideas through code and writing',
            headerAlign: 'left' as const,
            theme: 'dark' as const,
            component: <Showcase/>
        },
    ], []);

    type SectionId = typeof allSections[number]['id'];

    const [activeSection, setActiveSection] = useState<SectionId>('home');
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {allSections.map(section => (
                <Element key={section.id} name={section.id}>
                    <ScreenContainer
                        title={section.title}
                        subtitle={section.subtitle}
                        headerAlign={section.headerAlign}
                        className={section.theme}
                    >
                        {section.component}
                    </ScreenContainer>
                </Element>
            ))}
            <Footer/>
            <NavBar
                items={allSections.map(s => ({id: s.id, label: s.label, icon: s.icon})) as BottomNavItem<SectionId>[]}
                activeId={activeSection}
                theme={allSections.find(s => s.id === activeSection)?.theme || 'light'}
                onNavigate={(id) => setActiveSection(id)}
                onOpenSearch={() => setSearchOpen(true)}
            />

            <SearchModal
                open={searchOpen}
                onOpenChange={setSearchOpen}
                onGoTo={(id) => {
                    scroller.scrollTo(id, {duration: 300, smooth: 'easeInOutQuart', offset: -40});
                    setActiveSection(id as SectionId);
                }}
            />

        </div>
    );
}
