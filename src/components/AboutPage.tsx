import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';
import ExperienceGrid from './ExperienceGrid';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500 selection:text-white"
    >
      {/* Sticky Floating Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#323232]/30 px-4 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO HOME ]</span>
          </button>

          <div className="font-mono text-xs text-zinc-500 tracking-widest hidden md:block">
            SYSTEM // MY JOURNEY
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="w-full pb-24">
        
        {/* Section 01: Hero Header */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-12 pt-24 pb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">PROFILE</span>
            <span>•</span>
            <span>ABOUT ME</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl md:text-9xl uppercase font-bold tracking-tighter mb-8 leading-[0.9]">
            <SplitTextReveal text="DESIGNER & BUILDER" as="span" direction="top" mode="blur" />
          </h1>
          
          <p className="max-w-2xl text-zinc-400 font-sans text-lg md:text-xl leading-relaxed mt-12">
            Driven by clarity, performance, and detail. I build simple, fast, intentional product systems that solve real problems.
          </p>
        </section>

        {/* Section 02: Experience Grid */}
        <div className="pt-8">
          <ExperienceGrid />
        </div>

      </main>
    </motion.div>
  );
}
