export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  image: string;
  caseStudyImage?: string;
  metric?: string;
  problem?: string;
  solution?: string;
  figmaUrl?: string; // Original or embed Figma URL
  tags?: string[];
  externalUrl?: string;
  client?: string;
  industry?: string;
  overview?: string;
}

export const helperFormatFigmaEmbed = (url?: string): string | null => {
  if (!url) return null;
  if (url.includes('figma.com/embed')) return url;
  if (url.includes('figma.com/')) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }
  return null;
};

export const PROJECTS: Project[] = [
  {
    id: 'ondecide',
    title: 'OnDecide',
    category: 'FinTech SaaS',
    role: 'Product Designer',
    year: '2026',
    image: '/ondecide_thumbnail.png',
    caseStudyImage: '/ondecide_casestudy.png',
    metric: 'Instant Market Intelligence',
    problem: 'Investors & analysts spend hours sifting through SEC filings, earnings transcripts, and financial metrics across fragmented research tools.',
    solution: 'Designed an AI-powered investment research agent that transforms tickers into actionable investment theses, automated financial model synthesis, and market intelligence in under 60 seconds.',
    figmaUrl: 'https://www.figma.com/design/FyFy4FWtm7J1AcxGekoQfB/Untitled?node-id=171-350&t=NFPl7K3LjmS72WWj-4',
    client: 'OnDecide AI',
    industry: 'Artificial Intelligence, FinTech SaaS',
    overview: 'OnDecide is an AI-powered investment research platform. We designed the product interface and built a high-performance workspace to clearly communicate its value.',
    tags: ['Product Design', 'UI/UX Architecture']
  },
  {
    id: 'nexus',
    title: 'Nexus AI OS',
    category: 'SaaS / AI Workflow',
    role: 'Lead Product Designer',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1600',
    metric: '+38% Efficiency',
    problem: 'Enterprise data scientists lacked a cohesive environment to build and deploy ML models, leading to fragmented workflows across 14 different tools.',
    solution: 'Engineered a node-based visual workflow builder that consolidated the entire ML pipeline into a single, cohesive canvas interface.',
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fsample',
    client: 'Nexus Data Inc.',
    industry: 'Enterprise AI, SaaS',
    overview: 'Nexus AI OS is a platform for data scientists. We engineered a node-based visual workflow builder that consolidated the entire ML pipeline.',
    tags: ['Product Design', 'Frontend Development']
  },
  {
    id: 'kroma',
    title: 'Kroma Mobile',
    category: 'Fintech / Neobank',
    role: 'UX Architect',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    metric: '1.2M Active Users',
    problem: 'Retail investors found existing crypto and wealth tracking apps overly complex, leading to high drop-off rates during onboarding.',
    solution: 'Designed an ultra-minimalist, dark-mode native iOS/Android application focused on clarity, typography, and zero-friction interactions.',
    client: 'Kroma Financial',
    industry: 'Fintech, Neobank',
    overview: 'Kroma is a native mobile banking application. We designed an ultra-minimalist dark-mode experience focused on clarity and typography.',
    tags: ['UX/UI Design', 'Mobile App']
  },
  {
    id: 'aura',
    title: 'Aura Design System',
    category: 'Enterprise UI Kit',
    role: 'Design Engineer',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?auto=format&fit=crop&q=80&w=1600',
    metric: '120+ Designers using it',
    problem: 'Inconsistent UI patterns across 8 different product squads resulted in massive technical debt and a fragmented user experience.',
    solution: 'Built a comprehensive design token architecture and Figma component library that scaled across all platforms, ensuring 100% visual consistency.',
    client: 'Aura Corp',
    industry: 'Design Systems',
    overview: 'Aura is a comprehensive design system supporting 120+ designers. We built a scalable Figma component library and token architecture.',
    tags: ['Design Systems', 'Design Engineering']
  }
];
