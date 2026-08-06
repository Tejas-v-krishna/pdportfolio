import { motion } from 'framer-motion';
import StaggerText from './StaggerText';

interface SelectedWorkProps {
  onOpenCaseStudy: (id: string) => void;
}

export default function SelectedWork({ onOpenCaseStudy }: SelectedWorkProps) {
  const projects = [
    {
      id: 'nexus',
      title: 'Nexus AI OS',
      category: 'SaaS / AI Workflow',
      role: 'Lead Product Designer',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'kroma',
      title: 'Kroma Mobile',
      category: 'Fintech / Neobank',
      role: 'UX Architect',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
    },
    {
      id: 'aura',
      title: 'Aura Design System',
      category: 'Enterprise UI Kit',
      role: 'Design Engineer',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?auto=format&fit=crop&q=80&w=1600'
    }
  ];

  return (
    <section id="work" className="py-24 border-t hairline-border">
      <div className="max-w-[1920px] mx-auto px-6">
        
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-heading text-4xl md:text-6xl uppercase font-bold tracking-tighter">Selected Work</h2>
          <div className="font-mono text-xs text-zinc-500">[ 02 — FEATURED ]</div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:gap-24">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer interactive"
              onClick={() => onOpenCaseStudy(project.id)}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Project Image */}
                <div className="md:col-span-8 overflow-hidden bg-zinc-900 aspect-video relative">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 z-20 font-mono text-xs bg-black/80 backdrop-blur-md px-3 py-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <StaggerText text="VIEW CASE STUDY ↗" />
                  </div>
                </div>

                {/* Project Meta */}
                <div className="md:col-span-4 flex flex-col justify-center">
                  <div className="font-mono text-[10px] text-zinc-500 mb-4">[ {project.year} ]</div>
                  <h3 className="font-display text-4xl md:text-5xl mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                  
                  <div className="flex flex-col gap-2 mt-6 border-t hairline-border pt-6">
                    <div className="flex justify-between items-center font-tech text-xs tracking-widest uppercase">
                      <span className="text-zinc-500">Domain</span>
                      <span>{project.category}</span>
                    </div>
                    <div className="flex justify-between items-center font-tech text-xs tracking-widest uppercase mt-2">
                      <span className="text-zinc-500">Role</span>
                      <span>{project.role}</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
