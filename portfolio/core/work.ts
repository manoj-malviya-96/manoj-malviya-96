export type WorkExperience = {
  title: string;
  company: string;
  logo: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrent: boolean;
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    title: "Senior Software Engineer",
    company: "Formlabs",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "Boston, MA",
    period: "Oct 2023 - Present",
    current: true,
    description:
      "Leading development of advanced CAD and simulation tools for 3D printing, focusing on optimization algorithms and real-time visualization.",
    achievements: [
      "Built optimization algorithms reducing print time by 30%",
      "Led team of 4 engineers on simulation engine rewrite",
      "Implemented real-time preview system using WebGL",
      "Reduced memory usage by 40% through algorithm improvements",
    ],
    technologies: ["TypeScript", "React", "WebGL", "C++", "Python"],
    isCurrent: true,
  },
  {
    title: "R&D Software Engineer",
    company: "Formlabs",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "Boston, MA",
    period: "Jan 2020 - Oct 2023",
    current: false,
    description:
      "Developed physics simulation engines and optimization algorithms for additive manufacturing.",
    achievements: [
      "Created MESHA - mesh generation toolkit used by 1000+ engineers",
      "Published 3 research papers on topology optimization",
      "Improved simulation accuracy by 25%",
    ],
    technologies: ["Python", "C++", "React", "Node.js"],
    isCurrent: false,
  },
  {
    title: "Graduate Researcher",
    company: "Penn State University",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "State College, PA",
    period: "Aug 2018 - Dec 2019",
    current: false,
    description:
      "Research in computational physics and material science simulations.",
    achievements: [
      "Developed novel FEA algorithms for composite materials",
      "Published 2 papers in peer-reviewed journals",
    ],
    technologies: ["Python", "MATLAB", "C++"],
    isCurrent: false,
  },
  {
    title: "Software Engineering Intern",
    company: "Autodesk",
    logo: "https://i.pinimg.com/280x280_RS/2d/7d/49/2d7d493ed0a26446a4d243d0009a537f.jpg",
    location: "San Francisco, CA",
    period: "Summer 2018",
    current: false,
    description: "Worked on CAD rendering pipeline optimization.",
    achievements: ["Improved render performance by 40% using GPU acceleration"],
    technologies: ["C++", "CUDA", "OpenGL"],
    isCurrent: false,
  },
];
