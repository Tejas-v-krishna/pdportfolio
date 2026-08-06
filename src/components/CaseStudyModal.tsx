import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export default function CaseStudyModal({ isOpen, onClose, projectId }: CaseStudyModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const getProjectDetails = () => {
    if (projectId === 'nexus') return {
      title: "Nexus AI OS",
      metric: "+38% Efficiency",
      problem: "Enterprise data scientists lacked a cohesive environment to build and deploy ML models, leading to fragmented workflows across 14 different tools.",
      solution: "Engineered a node-based visual workflow builder that consolidated the entire ML pipeline into a single, cohesive canvas interface.",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1600"
    };
    if (projectId === 'kroma') return {
      title: "Kroma Mobile",
      metric: "1.2M Active Users",
      problem: "Retail investors found existing crypto and wealth tracking apps overly complex, leading to high drop-off rates during onboarding.",
      solution: "Designed an ultra-minimalist, dark-mode native iOS/Android application focused on clarity, typography, and zero-friction interactions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
    };
    if (projectId === 'aura') return {
      title: "Aura Design System",
      metric: "120+ Designers using it",
      problem: "Inconsistent UI patterns across 8 different product squads resulted in massive technical debt and a fragmented user experience.",
      solution: "Built a comprehensive design token architecture and Figma component library that scaled across all platforms, ensuring 100% visual consistency.",
      image: "https://images.unsplash.com/photo-1507238692062-5a042e9e18c4?auto=format&fit=crop&q=80&w=1600"
    };
    return null;
  };

  const project = getProjectDetails();

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] interactive cursor-pointer"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[60vw] lg:w-[50vw] bg-[#09090b] border-l hairline-border z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#09090b]/90 backdrop-blur-md px-8 py-6 border-b hairline-border flex justify-between items-center z-10">
              <h2 className="font-heading font-bold uppercase text-2xl">{project.title}</h2>
              <button 
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Content */}
            <div className="p-8 pb-32">
              <div className="w-full aspect-video bg-zinc-900 mb-12 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-4">[ THE PROBLEM ]</div>
                  <p className="text-zinc-300 font-light leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-4">[ THE SOLUTION ]</div>
                  <p className="text-zinc-300 font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div className="border border-white/20 bg-white/5 p-8 text-center mb-16">
                <div className="font-mono text-[10px] text-zinc-400 mb-4">[ KEY OUTCOME ]</div>
                <div className="font-display text-4xl md:text-5xl text-white">{project.metric}</div>
              </div>

              {/* Mockup sections to show density */}
              <div className="space-y-8">
                <div className="font-mono text-[10px] text-zinc-500">[ SYSTEM ARTIFACTS ]</div>
                <div className="w-full h-64 bg-zinc-900 border hairline-border flex items-center justify-center text-zinc-700 font-tech text-sm uppercase">
                  Figma Embed / Image Asset 1
                </div>
                <div className="w-full h-96 bg-zinc-900 border hairline-border flex items-center justify-center text-zinc-700 font-tech text-sm uppercase">
                  Figma Embed / Image Asset 2
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
