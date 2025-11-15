export interface ShowcaseItem {
  id: string;
  title: string;
  type: "project" | "blog";
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

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "MUVIZ",
    type: "project",
    category: "Web Application",
    description:
      "Interactive 3D music visualization tool with real-time audio analysis",
    date: "2024",
    tags: ["WebGL", "Three.js", "Audio"],
    image:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc2MjM0NjgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "MUVIZ transforms audio into stunning 3D visual experiences using real-time audio analysis and WebGL rendering.",
    features: [
      "Real-time audio frequency analysis",
      "Multiple visualization modes",
      "Customizable color schemes",
      "Export as video",
    ],
    link: "https://muviz.example.com",
  },
  {
    id: "2",
    title: "Building Scalable Physics Simulations",
    type: "blog",
    category: "Engineering",
    description:
      "Learn how to architect physics simulation engines that can handle complex scenarios efficiently",
    date: "Oct 15, 2024",
    tags: ["Physics", "Architecture", "Performance"],
    readTime: "8 min read",
    link: "https://medium.com/@yourusername/physics-simulations",
  },
  {
    id: "3",
    title: "TrussOpt",
    type: "project",
    category: "CAD Tool",
    description: "Structural optimization tool for truss design and analysis",
    date: "2023",
    tags: ["CAD", "Optimization", "React"],
    image:
      "https://images.unsplash.com/photo-1666302707255-13651d539be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGdlb21ldHJpY3xlbnwxfHx8fDE3NjIzNTcxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "TrussOpt helps engineers design and optimize truss structures with advanced simulation algorithms.",
    features: [
      "Automated topology optimization",
      "Real-time stress analysis",
      "Material selection guidance",
      "Export to CAD formats",
    ],
    link: "https://trussopt.example.com",
    paper: "https://arxiv.org/example",
  },
  {
    id: "4",
    title: "The Future of Web-Based CAD Tools",
    type: "blog",
    category: "Technology",
    description:
      "Exploring WebGL and WebAssembly for desktop-class CAD in the browser",
    date: "Sep 22, 2024",
    tags: ["WebGL", "CAD", "WebAssembly"],
    readTime: "6 min read",
    link: "https://medium.com/@yourusername/web-cad",
  },
  {
    id: "5",
    title: "MESHA",
    type: "project",
    category: "Developer Tool",
    description: "Advanced mesh generation and analysis toolkit",
    date: "2022",
    tags: ["CAD", "Simulation", "Python"],
    image:
      "https://images.unsplash.com/photo-1652939617330-e5b59457c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzYyMzUzMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    detailedDescription:
      "MESHA provides automated meshing algorithms and quality assessment tools for FEA.",
    features: [
      "Automatic mesh generation",
      "Mesh quality analysis",
      "Complex geometry support",
      "FEA solver integration",
    ],
    link: "https://github.com/yourusername/mesha",
    paper: "https://papers.example.com/mesha",
  },
  {
    id: "6",
    title: "Optimizing React Performance",
    type: "blog",
    category: "Engineering",
    description:
      "Best practices for building high-performance React applications",
    date: "Aug 10, 2024",
    tags: ["React", "Performance", "JavaScript"],
    readTime: "10 min read",
    link: "https://medium.com/@yourusername/react-performance",
  },
];
