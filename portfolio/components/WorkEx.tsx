import { useState } from 'react';
import { Calendar, MapPin, Github, FileText, Award, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import {
    SiTypescript, SiPython, SiCplusplus, SiRust, SiJavascript,
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
    SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiAmazon, SiFigma
} from 'react-icons/si';
import type {IconType} from "react-icons";

interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    current: boolean;
    type: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export function WorkEx() {
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

    const experiences: Experience[] = [
        {
            title: 'Senior Software Engineer',
            company: 'Formlabs',
            location: 'Boston, MA',
            period: 'Oct 2023 - Present',
            current: true,
            type: 'Full-time',
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
            location: 'Boston, MA',
            period: 'Jan 2020 - Oct 2023',
            current: false,
            type: 'Full-time',
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
            location: 'State College, PA',
            period: 'Aug 2018 - Dec 2019',
            current: false,
            type: 'Research',
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
            location: 'San Francisco, CA',
            period: 'Summer 2018',
            current: false,
            type: 'Internship',
            description: 'Worked on CAD rendering pipeline optimization.',
            achievements: [
                'Improved render performance by 40% using GPU acceleration',
            ],
            technologies: ['C++', 'CUDA', 'OpenGL'],
        },
    ];

    const skillIcons: Record<string, IconType> = {
        'TypeScript': SiTypescript,
        'JavaScript': SiJavascript,
        'Python': SiPython,
        'C++': SiCplusplus,
        'Rust': SiRust,
        'React': SiReact,
        'Next.js': SiNextdotjs,
        'Tailwind': SiTailwindcss,
        'Node.js': SiNodedotjs,
        'PostgreSQL': SiPostgresql,
        'MongoDB': SiMongodb,
        'Redis': SiRedis,
        'Docker': SiDocker,
        'Git': SiGit,
        'AWS': SiAmazon,
        'Figma': SiFigma,
    };

    const skills = [
        { name: 'TypeScript', category: 'Languages' },
        { name: 'Python', category: 'Languages' },
        { name: 'C++', category: 'Languages' },
        { name: 'Rust', category: 'Languages' },
        { name: 'React', category: 'Frontend' },
        { name: 'Next.js', category: 'Frontend' },
        { name: 'Tailwind', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'PostgreSQL', category: 'Backend' },
        { name: 'MongoDB', category: 'Backend' },
        { name: 'Redis', category: 'Backend' },
        { name: 'Docker', category: 'Tools' },
        { name: 'Git', category: 'Tools' },
        { name: 'AWS', category: 'Tools' },
        { name: 'Figma', category: 'Tools' },
    ];

    // Mock metrics - in real app, these would come from APIs
    const metrics = {
        github: {
            commits: 2847,
            repos: 42,
            stars: 1284,
            followers: 342,
        },
        research: {
            papers: 7,
            citations: 124,
            hIndex: 5,
        },
        projects: {
            total: 15,
            active: 4,
            users: '10k+',
        },
    };

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-6xl sm:text-7xl gradient-text mb-3 tracking-tight">Experience</h2>
                    <p className="text-muted-foreground">
                        Building innovative solutions across simulation, CAD, and web technologies
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Timeline - Left 2/3 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />

                            {experiences.map((exp, index) => (
                                <div key={index} className="relative pl-8 pb-8 last:pb-0 group">
                                    {/* Dot */}
                                    <div className={`absolute left-[-4px] top-1 w-2 h-2 rounded-full timeline-dot ${exp.current ? 'bg-foreground animate-pulse pulse-glow' : 'bg-muted-foreground'}`} />

                                    <button
                                        onClick={() => setSelectedExp(exp)}
                                        className="w-full text-left bg-muted rounded-xl p-5 glow-accent card-glow"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl">{exp.title}</h3>
                                                <p className="text-foreground text-sm">{exp.company}</p>
                                            </div>
                                            {exp.current && (
                                                <span className="px-2 py-1 bg-foreground text-background rounded-md text-xs">
                          Current
                        </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                          {exp.period}
                      </span>
                                            <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                                                {exp.location}
                      </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Summary - Right 1/3 */}
                    <div className="space-y-4">
                        {/* GitHub Metrics */}
                        <div className="bg-muted rounded-xl p-5 glow-subtle card-glow">
                            <div className="flex items-center gap-2 mb-4">
                                <Github className="w-4 h-4 icon-glow" />
                                <h3 className="text-sm uppercase tracking-wider">GitHub</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-2xl">{metrics.github.commits.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Commits</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.github.repos}</div>
                                    <div className="text-xs text-muted-foreground">Repos</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.github.stars.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Stars</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.github.followers}</div>
                                    <div className="text-xs text-muted-foreground">Followers</div>
                                </div>
                            </div>
                        </div>

                        {/* Research Impact */}
                        <div className="bg-muted rounded-xl p-5 glow-subtle card-glow">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-4 h-4 icon-glow" />
                                <h3 className="text-sm uppercase tracking-wider">Research</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-2xl">{metrics.research.papers}</div>
                                    <div className="text-xs text-muted-foreground">Publications</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.research.citations}</div>
                                    <div className="text-xs text-muted-foreground">Citations</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.research.hIndex}</div>
                                    <div className="text-xs text-muted-foreground">h-index</div>
                                </div>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="bg-muted rounded-xl p-5 glow-subtle card-glow">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 icon-glow" />
                                <h3 className="text-sm uppercase tracking-wider">Impact</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-2xl">{metrics.projects.total}</div>
                                    <div className="text-xs text-muted-foreground">Projects</div>
                                </div>
                                <div>
                                    <div className="text-2xl">{metrics.projects.users}</div>
                                    <div className="text-xs text-muted-foreground">Users Reached</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills with Icons */}
                <div className="mt-8">
                    <h3 className="text-2xl gradient-text mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill) => {
                            const Icon = skillIcons[skill.name] as IconType | undefined;
                            return (
                                <div
                                    key={skill.name}
                                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg glow-subtle card-glow group"
                                >
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/*@ts-expect-error */}
                                    {Icon && <Icon className="w-4 h-4 icon-glow" />}
                                    <span className="text-sm">{skill.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Experience Detail Modal */}
                <Dialog open={!!selectedExp} onOpenChange={() => setSelectedExp(null)}>
                    <DialogContent className="bg-background border-border max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                        {selectedExp && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-3xl text-foreground mb-2">
                                        {selectedExp.title}
                                    </DialogTitle>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{selectedExp.company}</span>
                                        <span>•</span>
                                        <span>{selectedExp.location}</span>
                                        <span>•</span>
                                        <span>{selectedExp.period}</span>
                                    </div>
                                </DialogHeader>

                                <div className="space-y-6 mt-6">
                                    <div>
                                        <h3 className="text-lg mb-2">About the Role</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedExp.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg mb-3">Key Achievements</h3>
                                        <ul className="space-y-2">
                                            {selectedExp.achievements.map((achievement, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <Award className="w-4 h-4 mt-0.5 text-foreground shrink-0" />
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg mb-3">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedExp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-muted rounded-lg text-sm"
                                                >
                          {tech}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
