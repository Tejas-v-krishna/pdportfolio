import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SelectedWork from './SelectedWork';

interface ProjectsPageProps {
  onBack: () => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function ProjectsPage({ onBack, onOpenCaseStudy }: ProjectsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white"
    >
      {/* Sticky Floating Header Navigation */}
      <header className="sticky top-0 z-[100] bg-[#050505]/80 backdrop-blur-xl border-b border-[#323232]/30 px-4 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO HOME ]</span>
          </button>

          <div className="font-mono text-xs text-zinc-500 tracking-widest hidden md:block">
            SYSTEM // RECENT WORK
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="w-full">
        {/* Selected Work (interactive scroll list) */}
        <SelectedWork onOpenCaseStudy={onOpenCaseStudy} />
        
      </main>
    </motion.div>
  );
}
