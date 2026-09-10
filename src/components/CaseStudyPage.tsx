import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { PROJECTS, helperFormatFigmaEmbed, type Project } from '../data/projects';
import SplitTextReveal from './SplitTextReveal';

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
  onOpenNext?: (id: string) => void;
}

export default function CaseStudyPage({ projectId, onBack, onOpenNext }: CaseStudyPageProps) {
  const projectIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const project: Project | undefined = PROJECTS[projectIndex];
  const nextProject: Project = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const figmaEmbed = helperFormatFigmaEmbed(project?.figmaUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) return null;

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (onOpenNext) {
      onOpenNext(nextProject.id);
    } else {
      onBack();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black"
    >
      {/* Sticky Floating Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4">
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
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 pb-32">
        
        {/* Section 01: Hero Header & Overview */}
        <section id="overview" className="mb-20">
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white">{project.year}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl md:text-9xl uppercase font-bold tracking-tighter mb-8 leading-[0.9]">
            <SplitTextReveal text={project.title} as="span" direction="top" mode="blur" />
          </h1>

          {/* Key Meta Grid - Editorial Style */}
          <div className="flex flex-col md:flex-row items-stretch border-y border-white/10 mb-12">
            
            <div className="flex-1 py-8 md:py-10 md:pl-0 md:pr-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">01 / ROLE</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight">{project.role}</span>
            </div>

            <div className="flex-1 py-8 md:py-10 md:px-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">02 / DOMAIN</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight">{project.category}</span>
            </div>

            <div className="flex-1 py-8 md:py-10 md:px-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between group hover:bg-white/5 transition-colors">
              <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">03 / YEAR</span>
              <span className="text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight">{project.year}</span>
            </div>

            {project.metric && (
              <div className="flex-[1.5] py-8 md:py-10 md:px-8 flex flex-col justify-between group hover:bg-white/5 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/10 pointer-events-none" />
                <span className="relative z-10 text-zinc-400 font-mono text-xs uppercase tracking-[0.2em] mb-8 block">04 / KEY OUTCOME</span>
                <span className="relative z-10 text-white font-sans text-2xl md:text-3xl lg:text-4xl leading-none font-medium tracking-tight">{project.metric}</span>
              </div>
            )}

          </div>
        </section>

        {/* Hero Widescreen Showcase Image */}
        <section className="mb-24">
          <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-900 overflow-hidden border border-white/10 rounded-2xl relative shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </section>

        {/* Section 02: Problem & Solution — previously defined in data but never rendered */}
        {(project.problem || project.solution) && (
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {project.problem && (
              <div className="bg-[#09090b] p-8 md:p-12">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mb-6">[ PROBLEM ]</div>
                <p className="text-zinc-200 text-lg md:text-xl leading-relaxed font-light">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="bg-[#0e0e11] p-8 md:p-12">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mb-6">[ SOLUTION ]</div>
                <p className="text-white text-lg md:text-xl leading-relaxed font-light">{project.solution}</p>
              </div>
            )}
          </section>
        )}

        {/* Section 03: Live Figma embed when available */}
        {figmaEmbed && (
          <section className="mb-24">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mb-6">[ LIVE PROTOTYPE ]</div>
            <div className="w-full aspect-[16/10] bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
              <iframe
                src={figmaEmbed}
                title={`${project.title} Figma prototype`}
                loading="lazy"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </section>
        )}



        {/* Section 04: Full Case Study Presentation */}
        {project.caseStudyImage && (
          <section id="presentation-section" className="mb-24 scroll-mt-28">
              <div className="w-full bg-zinc-950 border border-white/10 overflow-hidden rounded-2xl shadow-2xl p-2 md:p-6 mt-16">
                <img 
                  src={project.caseStudyImage} 
                  alt={`${project.title} Case Study`} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
          </section>
        )}



        {/* Bottom Project Switcher & Footer Navigation */}
        <div className="border-t border-white/10 pt-16 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="font-mono text-xs uppercase tracking-widest bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-5 border border-white/10 transition-colors rounded-xl interactive w-fit"
            >
              ← BACK TO ALL PROJECTS
            </button>

            {/* Next Project Teaser Card */}
            {nextProject && (
              <div 
                onClick={handleNext}
                className="bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 p-8 rounded-2xl cursor-pointer interactive group transition-all duration-300 flex justify-between items-center"
              >
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">NEXT PROJECT</span>
                  <h4 className="font-heading text-2xl uppercase font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {nextProject.title}
                  </h4>
                  <span className="font-tech text-xs text-zinc-400 uppercase tracking-widest">{nextProject.category}</span>
                </div>
                <span className="font-mono text-2xl text-zinc-500 group-hover:text-white group-hover:translate-x-2 transition-all">→</span>
              </div>
            )}

          </div>
        </div>

      </main>
    </motion.div>
  );
}

