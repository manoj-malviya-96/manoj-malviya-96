import {useState} from 'react';
import {BookOpen, Code, ExternalLink, FileText, Search} from 'lucide-react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/atoms/dialog';
import {Input} from "@/components/atoms/Input";


interface ShowcaseItem {
    id: string;
    title: string;
    type: 'project' | 'blog';
    category: string;
    description: string;
    image?: string;
    date: string;
    tags: string[];
    detailedDescription?: string;
    features?: string[];
    link?: string;
    paper?: string;
    readTime?: string;
}

export function Showcase() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | 'project' | 'blog'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

    const items: ShowcaseItem[] = [
        {
            id: '1',
            title: 'MUVIZ',
            type: 'project',
            category: 'Web Application',
            description: 'Interactive 3D music visualization tool with real-time audio analysis',
            date: '2024',
            tags: ['WebGL', 'Three.js', 'Audio'],
            image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc2MjM0NjgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
            detailedDescription: 'MUVIZ transforms audio into stunning 3D visual experiences using real-time audio analysis and WebGL rendering.',
            features: [
                'Real-time audio frequency analysis',
                'Multiple visualization modes',
                'Customizable color schemes',
                'Export as video',
            ],
            link: 'https://muviz.example.com',
        },
        {
            id: '2',
            title: 'Building Scalable Physics Simulations',
            type: 'blog',
            category: 'Engineering',
            description: 'Learn how to architect physics simulation engines that can handle complex scenarios efficiently',
            date: 'Oct 15, 2024',
            tags: ['Physics', 'Architecture', 'Performance'],
            readTime: '8 min read',
            link: 'https://medium.com/@yourusername/physics-simulations',
        },
        {
            id: '3',
            title: 'TrussOpt',
            type: 'project',
            category: 'CAD Tool',
            description: 'Structural optimization tool for truss design and analysis',
            date: '2023',
            tags: ['CAD', 'Optimization', 'React'],
            image: 'https://images.unsplash.com/photo-1666302707255-13651d539be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdlb21ldHJpY3xlbnwxfHx8fDE3NjIzNTcxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
            detailedDescription: 'TrussOpt helps engineers design and optimize truss structures with advanced simulation algorithms.',
            features: [
                'Automated topology optimization',
                'Real-time stress analysis',
                'Material selection guidance',
                'Export to CAD formats',
            ],
            link: 'https://trussopt.example.com',
            paper: 'https://arxiv.org/example',
        },
        {
            id: '4',
            title: 'The Future of Web-Based CAD Tools',
            type: 'blog',
            category: 'Technology',
            description: 'Exploring WebGL and WebAssembly for desktop-class CAD in the browser',
            date: 'Sep 22, 2024',
            tags: ['WebGL', 'CAD', 'WebAssembly'],
            readTime: '6 min read',
            link: 'https://medium.com/@yourusername/web-cad',
        },
        {
            id: '5',
            title: 'MESHA',
            type: 'project',
            category: 'Developer Tool',
            description: 'Advanced mesh generation and analysis toolkit',
            date: '2022',
            tags: ['CAD', 'Simulation', 'Python'],
            image: 'https://images.unsplash.com/photo-1652939617330-e5b59457c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzYyMzUzMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
            detailedDescription: 'MESHA provides automated meshing algorithms and quality assessment tools for FEA.',
            features: [
                'Automatic mesh generation',
                'Mesh quality analysis',
                'Complex geometry support',
                'FEA solver integration',
            ],
            link: 'https://github.com/yourusername/mesha',
            paper: 'https://papers.example.com/mesha',
        },
        {
            id: '6',
            title: 'Optimizing React Performance',
            type: 'blog',
            category: 'Engineering',
            description: 'Best practices for building high-performance React applications',
            date: 'Aug 10, 2024',
            tags: ['React', 'Performance', 'JavaScript'],
            readTime: '10 min read',
            link: 'https://medium.com/@yourusername/react-performance',
        },
    ];

    const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = selectedType === 'all' || item.type === selectedType;
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesType && matchesCategory;
    });

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-6xl sm:text-7xl gradient-text mb-3 tracking-tight">Projects & Blogs</h2>
                    <p className="text-muted-foreground">
                        Exploring ideas through code and writing
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 space-y-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                        <Input
                            type="text"
                            placeholder="Search projects and blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted border-0 rounded-lg h-10 text-sm"
                        />
                    </div>

                    {/* Type and Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                selectedType === 'all'
                                    ? 'bg-foreground text-background'
                                    : 'bg-muted hover:bg-accent'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setSelectedType('project')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                                selectedType === 'project'
                                    ? 'bg-foreground text-background'
                                    : 'bg-muted hover:bg-accent'
                            }`}
                        >
                            <Code className="w-3.5 h-3.5"/>
                            Projects
                        </button>
                        <button
                            onClick={() => setSelectedType('blog')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                                selectedType === 'blog'
                                    ? 'bg-foreground text-background'
                                    : 'bg-muted hover:bg-accent'
                            }`}
                        >
                            <BookOpen className="w-3.5 h-3.5"/>
                            Blogs
                        </button>
                        <span className="w-px bg-border"/>
                        {categories.slice(1).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category === selectedCategory ? 'all' : category)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                    selectedCategory === category
                                        ? 'bg-accent text-foreground'
                                        : 'text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bento Grid with Background Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`
                relative rounded-xl overflow-hidden cursor-pointer group h-64 glow-accent
                ${index % 5 === 0 ? 'sm:col-span-2 sm:h-80' : ''}
              `}
                            onClick={() => item.type === 'project' ? setSelectedItem(item) : window.open(item.link, '_blank')}
                        >
                            {/* Background Image */}
                            {item.image && (
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40"/>
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-5 text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {item.type === 'project' ? (
                                            <Code className="w-4 h-4 icon-glow"/>
                                        ) : (
                                            <BookOpen className="w-4 h-4 icon-glow"/>
                                        )}
                                        <span className="text-xs uppercase tracking-wider opacity-90">
                      {item.category}
                    </span>
                                    </div>
                                    <span className="text-xs opacity-75">
                    {item.type === 'blog' ? item.readTime : item.date}
                  </span>
                                </div>

                                <div>
                                    <h3 className="text-2xl mb-2 leading-tight drop-shadow-lg">{item.title}</h3>
                                    <p className="text-white/90 text-sm mb-3 line-clamp-2 leading-relaxed drop-shadow">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No items found matching your search.</p>
                    </div>
                )}

                {/* Project Detail Modal */}
                <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                    <DialogContent
                        className="bg-background text-foreground max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                        {selectedItem && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-3xl text-foreground mb-4">
                                        {selectedItem.title}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-muted rounded-full text-sm"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    {selectedItem.detailedDescription && (
                                        <div>
                                            <h3 className="text-xl mb-2">About</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {selectedItem.detailedDescription}
                                            </p>
                                        </div>
                                    )}

                                    {selectedItem.features && (
                                        <div>
                                            <h3 className="text-xl mb-2">Key Features</h3>
                                            <ul className="space-y-2">
                                                {selectedItem.features.map((feature, index) => (
                                                    <li key={index}
                                                        className="flex items-start gap-2 text-muted-foreground">
                                                        <span className="text-foreground mt-1">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        {selectedItem.link && (
                                            <a
                                                href={selectedItem.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl transition-all glow-on-hover"
                                            >
                                                <ExternalLink className="w-4 h-4"/>
                                                <span>View Project</span>
                                            </a>
                                        )}
                                        {selectedItem.paper && (
                                            <a
                                                href={selectedItem.paper}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground rounded-xl transition-all glow-on-hover"
                                            >
                                                <FileText className="w-4 h-4"/>
                                                <span>Read Paper</span>
                                            </a>
                                        )}
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
