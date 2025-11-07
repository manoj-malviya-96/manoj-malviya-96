"use client";
import { useState, useEffect } from 'react';
import { WorkEx } from '@/components/WorkEx';
import { Showcase } from '@/components/Showcase';
import { Footer } from '@/components/Footer';
import { Home as HomeIcon, Briefcase, FolderOpen, Sun, Moon, Search } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/dialog';
import {Input} from "@/components/Input";
import {Home} from "@/components/Home";

export default function Main() {
    const [activeSection, setActiveSection] = useState('home');
    const [isDark, setIsDark] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const isDarkMode = savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setIsDark(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);

        // Global search shortcut (Cmd/Ctrl + K)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const navItems = [
        { id: 'home', label: 'Main', icon: HomeIcon },
        { id: 'workex', label: 'Experience', icon: Briefcase },
        { id: 'showcase', label: 'Showcase', icon: FolderOpen },
    ];

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Floating Navigation - Top for desktop, Bottom for mobile */}
            <nav className="fixed left-1/2 -translate-x-1/2 z-50 top-4 md:top-6">
                <div className="bg-muted/80 backdrop-blur-xl rounded-full px-4 py-2 border border-border/30 glow-subtle">
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                                    activeSection === item.id
                                        ? 'bg-foreground text-background pulse-glow'
                                        : 'hover:bg-accent glow-subtle'
                                }`}
                            >
                                <item.icon className={`w-4 h-4 ${activeSection !== item.id ? 'icon-glow' : ''}`} />
                                <span className="hidden sm:inline text-sm">{item.label}</span>
                            </button>
                        ))}

                        <div className="w-px h-6 bg-border mx-1" />

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-full hover:bg-accent glow-subtle"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4 icon-glow" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-accent glow-subtle"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4 icon-glow" /> : <Moon className="w-4 h-4 icon-glow" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
                <div className="bg-muted/80 backdrop-blur-xl rounded-full px-4 py-2 border border-border/30 glow-subtle">
                    <div className="flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`p-3 rounded-full transition-all ${
                                    activeSection === item.id
                                        ? 'bg-foreground text-background pulse-glow'
                                        : 'hover:bg-accent glow-subtle'
                                }`}
                                aria-label={item.label}
                            >
                                <item.icon className={`w-4 h-4 ${activeSection !== item.id ? 'icon-glow' : ''}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Sections */}
            <div>
                <section id="home" className="min-h-screen flex items-center justify-center">
                    <Home/>
                </section>
                <section id="workex" className="min-h-screen">
                    <WorkEx />
                </section>
                <section id="showcase" className="min-h-screen">
                    <Showcase />
                </section>
            </div>

            {/* Footer */}
            <Footer />

            {/* Global Search */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="bg-background border-border max-w-2xl p-0 rounded-2xl">
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search everything... (Cmd/Ctrl + K)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 bg-muted border-0 rounded-xl h-12 text-lg"
                                autoFocus
                            />
                        </div>
                    </div>

                    {searchQuery && (
                        <div className="px-4 pb-4 max-h-96 overflow-y-auto">
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
                </DialogContent>
            </Dialog>
        </div>
    );
}
