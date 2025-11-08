import {useState} from 'react';
import {Award, Calendar, Github, MapPin, TrendingUp} from 'lucide-react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/dialog';
import type {IconType} from 'react-icons';
import {Badge} from '@/components/Badge';
import IconText from '@/components/IconText';
import Card from '@/components/Card';
import {DEFAULT_TIMELINE_CONFIG, Timeline} from '@/components/Timeline';
import {TECH_STACK, WORK_EXPERIENCES, type WorkExperience} from '@/core/data';
import ScreenContainer from '@/components/ScreenContainer';

// Types

const CONFIG = DEFAULT_TIMELINE_CONFIG;

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
        icon: TrendingUp,
        title: 'Impact',
        stats: [
            {value: '15', label: 'Projects'},
            {value: '10k+', label: 'Users Reached'},
        ],
    },
];

// Metric Grid Component
function MetricGrid({stats}: { stats: Array<{ value: string; label: string }> }) {
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
}

// Metrics Section Component
function MetricsSection() {
    return (
        <div className="space-y-4">
            {METRICS.map(m => (
                <Card key={m.title} icon={m.icon} title={m.title}>
                    <MetricGrid stats={m.stats}/>
                </Card>
            ))}
        </div>
    );
}

// TechBadge component
function TechBadge({name}: { name: string }) {
    const Icon = TECH_STACK[name] as IconType | undefined;
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg glow-subtle card-glow">
            {Icon && <Icon className="w-4 h-4 icon-glow"/>}
            <span className="text-sm">{name}</span>
        </div>
    );
}

// Tech Stack Component
function TechStackList() {
    return (
        <div className="mt-8">
            <h3 className="text-2xl mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
                {Object.keys(TECH_STACK).map(name => (
                    <TechBadge key={name} name={name}/>
                ))}
            </div>
        </div>
    );
}

// Detail Modal Component
function DetailModal({exp, onClose}: { exp: WorkExperience | null; onClose: () => void }) {
    if (!exp) return null;
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="bg-background border-border max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl mb-2">{exp.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exp.company}</span><span>•</span><span>{exp.location}</span><span>•</span><span>{exp.period}</span>
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
                            {exp.technologies.map(t => <Badge key={t}>{t}</Badge>)}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Experience Card Component
function ExperienceCard({experience: exp, logoSize, margin}: {
    experience: WorkExperience;
    logoSize: number;
    margin: number
}) {
    return (
        <div className="relative">
            <div
                className="absolute left-0 top-0 rounded-lg bg-background border border-border flex items-center justify-center text-lg font-bold"
                style={{width: logoSize, height: logoSize}}
            >
                {exp.logo}
            </div>
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
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
        </div>
    );
}

// Entry Component
export default function Highlights() {
    const [selected, setSelected] = useState<WorkExperience | null>(null);
    const margin = CONFIG.logoSize + CONFIG.gap;
    return (
        <ScreenContainer
            title="Experience"
            subtitle="Building innovative solutions across simulation, CAD, and web technologies"
            titleClassName="uppercase"
        >
            <h3 className="text-2xl mb-4">Work History</h3>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Timeline items={WORK_EXPERIENCES} isActive={e => e.current} onSelect={setSelected}>
                        {exp => <ExperienceCard experience={exp} logoSize={CONFIG.logoSize} margin={margin}/>}
                    </Timeline>
                </div>
                <div className="flex flex-col">
                    <MetricsSection/>
                    <TechStackList/>
                </div>
            </div>
            <DetailModal exp={selected} onClose={() => setSelected(null)}/>
        </ScreenContainer>
    );
}
