export interface ProjectStat {
    label: string;
    value: string;
}

export interface Project {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    longDescription?: string;
    stats: ProjectStat[];
    gallery?: string[];
    githubLink?: string;
    liveLink?: string;
    technologies?: string[];
    features?: string[];
    role?: string;
    duration?: string;
    backgroundColor?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        slug: "skillbridge",
        title: "SkillBridge",
        subtitle: "AI EdTech",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop",
        description: "An AI-powered smart career development platform built using n8n Agentic AI workflows with specialized AI agents.",
        longDescription: "SkillBridge is a revolutionary AI-powered career development platform that leverages agentic AI workflows to provide personalized career guidance. By utilizing n8n and specialized AI agents, it analyzes user skills, market trends, and learning patterns to offer tailored roadmaps and recommendations.",
        stats: [
            { label: "Tech", value: "n8n+AI" },
            { label: "Features", value: "5 Agents" },
            { label: "Backend", value: "Node.js" },
            { label: "DB", value: "Mongo" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop",
        ],
        githubLink: "https://github.com/yourusername/skillbridge",
        liveLink: "https://skillbridge.demo",
        technologies: ["Next.js", "n8n", "OpenAI API", "MongoDB", "Node.js", "Tailwind CSS"],
        features: ["Specialized AI Agents", "Automated Career Roadmaps", "Real-time Job Market Analysis", "Personalized Learning Paths"],
        role: "Lead Developer",
        duration: "3 Months",
        backgroundColor: "#4338ca"
    },
    {
        id: 2,
        slug: "employee-management-system",
        title: "Emp. Portal",
        subtitle: "Management Sys",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1740&auto=format&fit=crop",
        description: "Built a comprehensive Employee Management System with clean responsive dashboard supporting all CRUD operations.",
        longDescription: "A full-featured Employee Management System designed to streamline HR processes. It provides a robust dashboard for managing employee records, tracking attendance, and handling payroll, all within a secure and responsive interface.",
        stats: [
            { label: "Front", value: "Angular" },
            { label: "Back", value: ".NET" },
            { label: "DB", value: "Mongo" },
            { label: "Type", value: "CRUD" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1740&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop"
        ],
        githubLink: "https://github.com/yourusername/emp-portal",
        liveLink: "https://emp-portal.demo",
        technologies: ["Angular", ".NET Core", "MongoDB", "TypeScript", "Bootstrap"],
        features: ["User Role Management", "CRUD Operations", "Attendance Tracking", "Payroll Calculation"],
        role: "Full Stack Developer",
        duration: "2 Months",
        backgroundColor: "#334155"
    },
    {
        id: 3,
        slug: "fertilizer-ai",
        title: "Fertilizer AI",
        subtitle: "AgriTech",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1744&auto=format&fit=crop",
        description: "An intelligent web application that predicts the most suitable fertilizer for crops.",
        longDescription: "Fertilizer AI is an AgriTech solution aiming to optimize crop yield. By analyzing soil composition, crop type, and weather conditions, it uses machine learning algorithms to recommend the most effective fertilizers, promoting sustainable agriculture.",
        stats: [
            { label: "Front", value: "Angular" },
            { label: "Back", value: ".NET" },
            { label: "ML", value: "Scikit" },
            { label: "Event", value: "SIH" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1744&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1740&auto=format&fit=crop"
        ],
        githubLink: "https://github.com/yourusername/fertilizer-ai",
        technologies: ["Angular", "Python", "Scikit-Learn", "Flask", "SQLite"],
        features: ["Soil Analysis", "Crop Specific Recommendations", "Yield Prediction", "Multi-language Support"],
        role: "ML Engineer & Developer",
        duration: "1 Month (Hackathon)",
        backgroundColor: "#065f46"
    },
    {
        id: 4,
        slug: "the-system",
        title: "The System",
        subtitle: "Hanumatrix",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop",
        description: "Engineered 'The System' web application using React, Tailwind CSS, & GSAP with interactive 3D visualizations, improving engagement by 40%.",
        longDescription: "The System is a high-performance web application designed to showcase complex data through interactive 3D visualizations. Built with React and GSAP, it offers an immersive user experience that significantly boosts engagement and retention.",
        stats: [
            { label: "Frontend", value: "React" },
            { label: "Styling", value: "Tailwind" },
            { label: "Anim", value: "GSAP" },
            { label: "Perf", value: "+40%" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1740&auto=format&fit=crop"
        ],
        githubLink: "https://github.com/yourusername/the-system",
        technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
        features: ["3D Data Visualization", "High Performance Animation", "Interactive UI", "Responsive Design"],
        role: "Frontend Developer",
        duration: "Ongoing",
        backgroundColor: "#7f1d1d"
    },
    {
        id: 5,
        slug: "aadya-creation",
        title: "Aadya Creation",
        subtitle: "Event Management",
        image: "/aadya-creation.png",
        description: "Designed and developed a fully responsive, interactive event management website using Framer, highlighting corporate services with custom animations.",
        longDescription: "Aadya Creation is a visually stunning event management portfolio site. It showcases various corporate events and services through fluid animations and a modern design language, built on Framer for rapid deployment and high fidelity.",
        stats: [
            { label: "Tool", value: "Framer" },
            { label: "Type", value: "Events" },
            { label: "Design", value: "UI/UX" },
            { label: "Device", value: "Responsive" },
        ],
        gallery: [
            "/aadya-creation.png",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1740&auto=format&fit=crop"
        ],
        liveLink: "https://aadyacreation.com",
        technologies: ["Framer", "React", "Motion"],
        features: ["Custom Animations", "Service Showcase", "Contact Integration", "Mobile Responsive"],
        role: "Designer & Developer",
        duration: "1 Month",
        backgroundColor: "#831843"
    },
    {
        id: 6,
        slug: "prompt-consultants",
        title: "Prompt Consultants",
        subtitle: "Industrial 3D",
        image: "/prompt-consultants.png",
        description: "A premium high-performance industrial portfolio for boiler feed pump specialists. Built with Next.js 15 and React Three Fiber, featuring immersive 3D scrollytelling.",
        longDescription: "Prompt Consultants is an industrial portfolio website that pushes the boundaries of web design with immersive 3D elements. Using React Three Fiber and Next.js, it tells the story of boiler feed pump specialists through an engaging scrollytelling experience.",
        stats: [
            { label: "TECH", value: "Next.js + R3F" },
            { label: "FEATURES", value: "3D Scroll" },
            { label: "ANIMATION", value: "GSAP + Lenis" },
            { label: "UI", value: "Tailwind v4" },
        ],
        gallery: [
            "/prompt-consultants.png",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1740&auto=format&fit=crop"
        ],
        liveLink: "https://promptconsultants.com",
        technologies: ["Next.js 15", "React Three Fiber", "GSAP", "Tailwind CSS"],
        features: ["3D Product Showcase", "Scrollytelling", "Performance Optimization", "Industrial Aesthetic"],
        role: "Lead Frontend Engineer",
        duration: "2 Months",
        backgroundColor: "#0369a1"
    },
];
