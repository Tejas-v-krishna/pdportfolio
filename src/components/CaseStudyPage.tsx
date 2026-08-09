import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import SplitTextReveal from './SplitTextReveal';

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
}

export default function CaseStudyPage({ projectId, onBack }: CaseStudyPageProps) {
  const projectIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const project: Project | undefined = PROJECTS[projectIndex];
  const nextProject: Project = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500 selection:text-white"
    >
      {/* Sticky Floating Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b hairline-border px-4 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO ALL WORK ]</span>
          </button>



        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-12 pt-16 pb-32">
        
        {/* Section 01: Hero Header & Overview */}
        <section id="overview" className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-indigo-400 uppercase tracking-widest mb-6">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">{project.year}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl md:text-9xl uppercase font-bold tracking-tighter mb-8 leading-[0.9]">
            <SplitTextReveal text={project.title} as="span" direction="top" mode="blur" />
          </h1>

          {/* Key Meta Grid - Editorial Style */}
          <div className="flex flex-col md:flex-row items-stretch border-y hairline-border border-[#333333] mb-12">
            
            <div className="flex-1 py-8 md:py-10 md:pl-0 md:pr-8 border-b md:border-b-0 md:border-r border-[#333333] flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">01 / ROLE</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight group-hover:text-indigo-400 transition-colors">{project.role}</span>
            </div>

            <div className="flex-1 py-8 md:py-10 md:px-8 border-b md:border-b-0 md:border-r border-[#333333] flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">02 / DOMAIN</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight group-hover:text-indigo-400 transition-colors">{project.category}</span>
            </div>

            <div className="flex-1 py-8 md:py-10 md:px-8 border-b md:border-b-0 md:border-r border-[#333333] flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">03 / YEAR</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight group-hover:text-indigo-400 transition-colors">{project.year}</span>
            </div>

            {project.metric && (
              <div className="flex-[1.5] py-8 md:py-10 md:px-8 flex flex-col justify-between group hover:bg-white/5 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/10 pointer-events-none" />
                <span className="relative z-10 text-indigo-400/80 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">04 / KEY OUTCOME</span>
                <span className="relative z-10 text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight group-hover:text-indigo-300 transition-colors">{project.metric}</span>
              </div>
            )}

          </div>
        </section>

        {/* Hero Widescreen Showcase Image */}
        <section className="mb-24">
          <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-900 overflow-hidden border hairline-border rounded-2xl relative shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
            />
          </div>
        </section>



        {/* Section 02: Full Case Study Presentation */}
        {project.caseStudyImage && (
          <section id="presentation-section" className="mb-24 scroll-mt-28">
              <div className="w-full bg-zinc-950 border hairline-border overflow-hidden rounded-2xl shadow-2xl p-2 md:p-6 mt-16">
                <img 
                  src={project.caseStudyImage} 
                  alt={`${project.title} Case Study`} 
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
          </section>
        )}



        {/* Bottom Project Switcher & Footer Navigation */}
        <div className="border-t hairline-border pt-16 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="font-mono text-xs uppercase tracking-widest bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-5 border hairline-border transition-colors rounded-xl interactive w-fit"
            >
              ← BACK TO ALL PROJECTS
            </button>

            {/* Next Project Teaser Card */}
            {nextProject && (
              <div 
                onClick={() => {
                  window.scrollTo(0, 0);
                  onBack();
                }}
                className="bg-zinc-900/60 hover:bg-zinc-900 border hairline-border p-8 rounded-2xl cursor-pointer interactive group transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">NEXT PROJECT</span>
                  <h4 className="font-heading text-2xl uppercase font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {nextProject.title}
                  </h4>
                  <span className="font-tech text-xs text-zinc-400 uppercase tracking-widest">{nextProject.category}</span>
                </div>
                <span className="font-mono text-2xl text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-2 transition-all">→</span>
              </div>
            )}

          </div>
        </div>

      </main>
    </motion.div>
  );
}
