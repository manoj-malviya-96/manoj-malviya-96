import React, {useCallback, useMemo, useState} from 'react';
import {Award, Briefcase, MapPin} from 'lucide-react';
import {Drawer, DrawerContent} from '@/components/drawer';
import type {IconType} from 'react-icons';
import Badge from '@/components/badge';
import Card from '@/components/card';
import Timeline from '@/components/timeline';
import {METRICS, TECH_STACK, WORK_EXPERIENCES, type WorkExperience} from '@/core/data';
import Image from "next/image";


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
    const names = useMemo(() => Object.keys(TECH_STACK), []);
    return (
        <div className="mt-8">
            <h3 className="text-2xl mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
                {names.map(name => (
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
        <Drawer open onOpenChange={(o) => !o && onClose()}>
            <DrawerContent title={exp.title}>
                <div className="space-y-6 mt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exp.company}</span><span>•</span><span>{exp.location}</span><span>•</span><span>{exp.period}</span>
                    </div>
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
            </DrawerContent>
        </Drawer>
    );
}

const CompanyLogo = ({src, alt, size}: { src: string; alt: string; size: number }) => (
    <Image
        src={src}
        alt={alt}
        className="object-cover"
        width={size}
        height={size}
    />
);


const CurrentBadge = () => (
    <span
        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
    Current
  </span>
);

const WorkExperienceCard = ({experience}: { experience: WorkExperience }) => {
    const {title, company, location, period, current, description, achievements, technologies} = experience;

    return (
        <div className="p-6">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                        {current && <CurrentBadge/>}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Briefcase size={14}/>
                            <span className="font-medium">{company}</span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14}/>
                            <span>{location}</span>
                        </div>
                    </div>
                </div>
                <span className="text-sm text-slate-500 font-medium whitespace-nowrap ml-4">{period}</span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-4">{description}</p>

            {achievements.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-1.5">
                        {achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="flex-1">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {technologies.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, i) => (
                            <Badge key={i}>{tech}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Entry Component
export default function Highlights() {
    const [selected, setSelected] = useState<WorkExperience | null>(null);
    const onSelect = useCallback((exp: WorkExperience) => setSelected(exp), []);

    return (
        <>
            <h3 className="text-2xl mb-4">Work History</h3>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Timeline
                        items={WORK_EXPERIENCES}
                        isToday={(exp) => exp.isCurrent}
                        renderLogo={(exp, isCurrent) => (
                            <CompanyLogo
                                src={exp.logo}
                                alt={exp.company}
                                size={isCurrent ? 80 : 56}
                            />
                        )}
                        renderCard={(exp) => <WorkExperienceCard experience={exp}/>}
                    />
                </div>
                <div className="flex flex-col">
                    <MetricsSection/>
                    <TechStackList/>
                </div>
            </div>
            <DetailModal exp={selected} onClose={() => setSelected(null)}/>
        </>
    );
}
