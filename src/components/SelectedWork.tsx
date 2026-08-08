import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  onOpenCaseStudy: (id: string) => void;
}

export default function SelectedWork({ onOpenCaseStudy }: SelectedWorkProps) {
  const projects = PROJECTS;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          let index = Math.floor(self.progress * projects.length);
          if (index >= projects.length) index = projects.length - 1;
          setActiveIndex(index);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section id="work" ref={containerRef} className="bg-[#050505] text-white relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-[100dvh] w-full flex items-center max-w-[1920px] mx-auto px-6 md:px-12 overflow-hidden py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full">
          
          {/* LEFT SIDE: Image and Meta */}
          <div className="lg:col-span-5 flex flex-col h-full justify-center">
            {/* Image Container with AnimatePresence for crossfade */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 mb-12 border border-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            
            {/* Meta Table */}
            <div className="flex flex-col border-t border-[#333333] text-sm font-sans tracking-wide">
              
              {/* Overview */}
              <div className="grid grid-cols-12 py-5 border-b border-[#333333]">
                <div className="col-span-3 text-zinc-500">Overview</div>
                <div className="col-span-9 text-zinc-300 leading-relaxed pr-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`overview-${activeProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeProject.overview}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-12 py-5 border-b border-[#333333]">
                <div className="col-span-3 text-zinc-500">Tags</div>
                <div className="col-span-9 text-zinc-300 flex flex-col gap-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`tags-${activeProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeProject.tags?.map((tag, i) => (
                        <div key={i}>{tag}</div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Industry */}
              <div className="grid grid-cols-12 py-5 border-b border-[#333333]">
                <div className="col-span-3 text-zinc-500">Industry</div>
                <div className="col-span-9 text-zinc-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`industry-${activeProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeProject.industry}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Client */}
              <div className="grid grid-cols-12 py-5 border-b border-[#333333]">
                <div className="col-span-3 text-zinc-500">Client</div>
                <div className="col-span-9 text-zinc-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`client-${activeProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeProject.client}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Explore Action */}
              <div 
                className="grid grid-cols-12 py-8 border-b border-[#333333] cursor-pointer group hover:bg-white/5 transition-colors"
                onClick={() => onOpenCaseStudy(activeProject.id)}
              >
                <div className="col-span-12 flex justify-between items-center text-white">
                  <span>Explore the case</span>
                  <motion.span 
                    className="group-hover:translate-x-2 transition-transform"
                  >
                    →
                  </motion.span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Massive Titles List */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start lg:pl-24 relative mt-16 lg:mt-0">
            
            <div className="flex flex-col w-full relative space-y-2">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div 
                    key={project.id}
                    className="relative group cursor-pointer flex items-center"
                    onClick={() => onOpenCaseStudy(project.id)}
                  >
                    {/* The Year floating left (only visible if active) */}
                    <div className="hidden lg:block absolute -left-16 w-12 text-right">
                      <AnimatePresence>
                        {isActive && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-mono text-sm text-white block"
                          >
                            {project.year}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* The Massive Title */}
                    <h2 
                      className={`font-sans font-bold text-5xl md:text-7xl lg:text-[7vw] leading-[1] tracking-tight transition-colors duration-500
                        ${isActive ? 'text-white' : 'text-[#333333] group-hover:text-[#555555]'}`}
                    >
                      {project.title}
                    </h2>
                  </div>
                );
              })}
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
