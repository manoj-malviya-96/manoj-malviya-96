import {memo, ReactNode, useState} from 'react';
import {Award, Calendar, FileText, Github, LucideIcon, MapPin, TrendingUp} from 'lucide-react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '../components/atoms/dialog';
import {
    SiAmazon,
    SiCplusplus,
    SiDocker,
    SiFigma,
    SiGit,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPython,
    SiReact,
    SiRedis,
    SiRust,
    SiTailwindcss,
    SiTypescript
} from 'react-icons/si';
import type {IconType} from "react-icons";

// Types
type Experience = {
    title: string;
    company: string;
    logo: string;
    location: string;
    period: string;
    current: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
};

type TimelineConfig = {
    dotSize: number;
    logoSize: number;
    gap: number;
};

// Constants
const CONFIG: TimelineConfig = {
    dotSize: 8,
    logoSize: 48,
    gap: 16,
};

const EXPERIENCES: Experience[] = [
    {
        title: 'Senior Software Engineer',
        company: 'Formlabs',
        logo: 'F',
        location: 'Boston, MA',
        period: 'Oct 2023 - Present',
        current: true,
        description: 'Leading development of advanced CAD and simulation tools for 3D printing, focusing on optimization algorithms and real-time visualization.',
        achievements: [
            'Built optimization algorithms reducing print time by 30%',
            'Led team of 4 engineers on simulation engine rewrite',
            'Implemented real-time preview system using WebGL',
            'Reduced memory usage by 40% through algorithm improvements',
        ],
        technologies: ['TypeScript', 'React', 'WebGL', 'C++', 'Python'],
    },
    {
        title: 'R&D Software Engineer',
        company: 'Formlabs',
        logo: 'F',
        location: 'Boston, MA',
        period: 'Jan 2020 - Oct 2023',
        current: false,
        description: 'Developed physics simulation engines and optimization algorithms for additive manufacturing.',
        achievements: [
            'Created MESHA - mesh generation toolkit used by 1000+ engineers',
            'Published 3 research papers on topology optimization',
            'Improved simulation accuracy by 25%',
        ],
        technologies: ['Python', 'C++', 'React', 'Node.js'],
    },
    {
        title: 'Graduate Researcher',
        company: 'Penn State University',
        logo: 'PSU',
        location: 'State College, PA',
        period: 'Aug 2018 - Dec 2019',
        current: false,
        description: 'Research in computational physics and material science simulations.',
        achievements: [
            'Developed novel FEA algorithms for composite materials',
            'Published 2 papers in peer-reviewed journals',
        ],
        technologies: ['Python', 'MATLAB', 'C++'],
    },
    {
        title: 'Software Engineering Intern',
        company: 'Autodesk',
        logo: 'A',
        location: 'San Francisco, CA',
        period: 'Summer 2018',
        current: false,
        description: 'Worked on CAD rendering pipeline optimization.',
        achievements: [
            'Improved render performance by 40% using GPU acceleration',
        ],
        technologies: ['C++', 'CUDA', 'OpenGL'],
    },
];

const TECH_ICONS: Record<string, IconType> = {
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    Python: SiPython,
    'C++': SiCplusplus,
    Rust: SiRust,
    React: SiReact,
    'Next.js': SiNextdotjs,
    Tailwind: SiTailwindcss,
    'Node.js': SiNodedotjs,
    PostgreSQL: SiPostgresql,
    MongoDB: SiMongodb,
    Redis: SiRedis,
    Docker: SiDocker,
    Git: SiGit,
    AWS: SiAmazon,
    Figma: SiFigma,
};

const TECH_STACK = [
    'TypeScript', 'Python', 'C++', 'Rust', 'React', 'Next.js',
    'Tailwind', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis',
    'Docker', 'Git', 'AWS', 'Figma'
];

const METRICS = [
    {
        icon: Github,
        title: 'GitHub',
        stats: [
            {value: '2,847', label: 'Commits'},
            {value: '42', label: 'Repos'},
            {value: '1,284', label: 'Stars'},
            {value: '342', label: 'Followers'},
        ],
    },
    {
        icon: FileText,
        title: 'Research',
        stats: [
            {value: '7', label: 'Publications'},
            {value: '124', label: 'Citations'},
        ],
    },
    {
        icon: TrendingUp,
        title: 'Impact',
        stats: [
            {value: '15', label: 'Projects'},
            {value: '10k+', label: 'Users Reached'},
        ],
    },
];

// Utility functions
const getTimelineOffset = (cfg: TimelineConfig) =>
    (cfg.logoSize - cfg.dotSize) / 2;

const getContentMargin = (cfg: TimelineConfig) =>
    cfg.logoSize + cfg.gap;

// Base components
const Logo = memo<{ text: string; size: number }>(function Logo({text, size}) {
    return (
        <div
            className="absolute left-0 top-0 rounded-lg bg-background border border-border flex items-center justify-center text-lg font-bold"
            style={{width: size, height: size}}
        >
            {text}
        </div>
    );
});

const Badge = memo<{ children: ReactNode; active?: boolean }>(function Badge({children, active}) {
    return (
        <span
            className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${active ? 'bg-foreground text-background' : 'bg-muted'}`}>
            {children}
        </span>
    );
});

const IconText = memo<{ icon: LucideIcon; children: ReactNode }>(function IconText({icon: Icon, children}) {
    return (
        <span className="flex items-center gap-1">
            <Icon className="w-3 h-3"/>
            {children}
        </span>
    );
});

const Card = memo<{ icon: LucideIcon; title: string; children: ReactNode }>(function Card({
                                                                                              icon: Icon,
                                                                                              title,
                                                                                              children
                                                                                          }) {
    return (
        <div className="bg-muted rounded-xl p-5 glow-subtle card-glow">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-4 h-4 icon-glow"/>
                <h3 className="text-sm uppercase tracking-wider">{title}</h3>
            </div>
            {children}
        </div>
    );
});

const TechBadge = memo<{ name: string }>(function TechBadge({name}) {
    const Icon = TECH_ICONS[name];
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg glow-subtle card-glow">
            {Icon && <Icon className="w-4 h-4 icon-glow"/>}
            <span className="text-sm">{name}</span>
        </div>
    );
});

// Experience Card Component
const ExperienceCard = memo<{
    experience: Experience;
    logoSize: number;
    margin: number;
}>(function ExperienceCard({experience: exp, logoSize, margin}) {
    return (
        <div className="relative">
            <Logo text={exp.logo} size={logoSize}/>

            <div style={{marginLeft: margin}}>
                <div className="flex items-start justify-between mb-2 gap-4">
                    <div>
                        <h3 className="text-xl">{exp.title}</h3>
                        <p className="text-foreground text-sm">{exp.company}</p>
                    </div>
                    {exp.current && <Badge active>Current</Badge>}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
                    <IconText icon={Calendar}>{exp.period}</IconText>
                    <IconText icon={MapPin}>{exp.location}</IconText>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                </p>
            </div>
        </div>
    );
});

// Timeline Component
function Timeline<T>({
                         items,
                         children,
                         isActive = () => false,
                         onSelect,
                         config = CONFIG,
                     }: {
    items: T[];
    children: (item: T) => ReactNode;
    isActive?: (item: T) => boolean;
    onSelect?: (item: T) => void;
    config?: TimelineConfig;
}) {
    const offset = getTimelineOffset(config);

    return (
        <div className="relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-border" style={{left: offset}}/>

            {items.map((item, i) => {
                const active = isActive(item);
                const Container = onSelect ? 'button' : 'div';
                const props = onSelect ? {onClick: () => onSelect(item)} : {};

                return (
                    <div key={i} className={i < items.length - 1 ? 'pb-8' : ''}>
                        <div
                            className={`absolute w-2 h-2 rounded-full ${active ? 'bg-foreground animate-pulse pulse-glow' : 'bg-muted-foreground'}`}
                            style={{left: offset, top: 24}}
                        />

                        <Container
                            {...props}
                            className={`${onSelect ? 'text-left' : ''} bg-muted rounded-xl p-5 glow-accent card-glow`}
                            style={{marginLeft: getContentMargin(config)}}
                        >
                            {children(item)}
                        </Container>
                    </div>
                );
            })}
        </div>
    );
}

// Metric Grid Component
const MetricGrid = memo<{ stats: Array<{ value: string; label: string }> }>(function MetricGrid({stats}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {stats.map(s => (
                <div key={s.label}>
                    <div className="text-2xl">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
            ))}
        </div>
    );
});

// Metrics Section Component
const MetricsSection = memo(function MetricsSection() {
    return (
        <div className="space-y-4">
            {METRICS.map(m => (
                <Card key={m.title} icon={m.icon} title={m.title}>
                    <MetricGrid stats={m.stats}/>
                </Card>
            ))}
        </div>
    );
});

// Tech Stack Component
const TechStack = memo(function TechStack() {
    return (
        <div className="mt-8">
            <h3 className="text-2xl mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
                {TECH_STACK.map(name => (
                    <TechBadge key={name} name={name}/>
                ))}
            </div>
        </div>
    );
});

// Detail Modal Component
const DetailModal = memo<{ exp: Experience | null; onClose: () => void }>(function DetailModal({exp, onClose}) {
    if (!exp) return null;

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="bg-background border-border max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl mb-2">{exp.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span>{exp.period}</span>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    <div>
                        <h3 className="text-lg mb-2">About the Role</h3>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg mb-3">Key Achievements</h3>
                        <ul className="space-y-2">
                            {exp.achievements.map((a, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                    <Award className="w-4 h-4 mt-0.5 text-foreground shrink-0"/>
                                    <span>{a}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map(t => (
                                <Badge key={t}>{t}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
});

// Entry Component
export default function Highlights() {
    const [selected, setSelected] = useState<Experience | null>(null);
    const margin = getContentMargin(CONFIG);

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-6xl sm:text-7xl uppercase tracking-tight">Experience</h2>
                    <p className="text-muted-foreground">
                        Building innovative solutions across simulation, CAD, and web technologies
                    </p>
                </div>

                <h3 className="text-2xl mb-4">Work History</h3>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Timeline
                            items={EXPERIENCES}
                            isActive={e => e.current}
                            onSelect={setSelected}
                        >
                            {exp => (
                                <ExperienceCard
                                    experience={exp}
                                    logoSize={CONFIG.logoSize}
                                    margin={margin}
                                />
                            )}
                        </Timeline>
                    </div>
                    <div className="flex flex-col">
                        <MetricsSection/>
                        <TechStack/>
                    </div>
                </div>
                <DetailModal exp={selected} onClose={() => setSelected(null)}/>
            </div>
        </div>
    );
}
