import { useState, useRef, useEffect, useCallback } from 'react';
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
  // Track previous index in a ref to avoid closure-based stale captures
  const activeIndexRef = useRef(0);
  
  const activeProject = projects[activeIndex];

  // Stable callback avoids recreating ScrollTrigger on every render
  const handleUpdate = useCallback((self: ScrollTrigger) => {
    let index = Math.floor(self.progress * projects.length);
    if (index >= projects.length) index = projects.length - 1;
    if (activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  }, [projects.length]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: handleUpdate,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [handleUpdate]);

  return (
    <section id="work" ref={containerRef} className="bg-[#050505] text-white relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-[100dvh] w-full flex items-center max-w-[1920px] mx-auto px-6 md:px-12 overflow-hidden py-10 lg:py-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-24 w-full h-full lg:h-auto justify-center">
          
          {/* LEFT SIDE: Image and Meta */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 h-auto">
            {/* Image Container with AnimatePresence for crossfade */}
            <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 mb-6 lg:mb-12 border border-white/5 shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  loading="lazy"
                  decoding="async"
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
              <div className="flex flex-col md:grid md:grid-cols-12 py-4 md:py-5 border-b border-[#333333] gap-2 md:gap-0">
                <div className="md:col-span-3 text-zinc-500 text-xs md:text-sm uppercase tracking-wider md:normal-case md:tracking-normal">Overview</div>
                <div className="md:col-span-9 text-zinc-300 leading-relaxed md:pr-8">
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
              <div className="flex flex-col md:grid md:grid-cols-12 py-4 md:py-5 border-b border-[#333333] gap-2 md:gap-0">
                <div className="md:col-span-3 text-zinc-500 text-xs md:text-sm uppercase tracking-wider md:normal-case md:tracking-normal">Tags</div>
                <div className="md:col-span-9 text-zinc-300 flex flex-wrap md:flex-col gap-x-3 md:gap-x-0 gap-y-1">
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
              <div className="flex flex-col md:grid md:grid-cols-12 py-4 md:py-5 border-b border-[#333333] gap-2 md:gap-0">
                <div className="md:col-span-3 text-zinc-500 text-xs md:text-sm uppercase tracking-wider md:normal-case md:tracking-normal">Industry</div>
                <div className="md:col-span-9 text-zinc-300">
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
              <div className="flex flex-col md:grid md:grid-cols-12 py-4 md:py-5 border-b border-[#333333] gap-2 md:gap-0">
                <div className="md:col-span-3 text-zinc-500 text-xs md:text-sm uppercase tracking-wider md:normal-case md:tracking-normal">Client</div>
                <div className="md:col-span-9 text-zinc-300">
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
                className="flex flex-col md:grid md:grid-cols-12 py-6 md:py-8 border-b border-[#333333] cursor-pointer group hover:bg-white/5 transition-colors"
                onClick={() => onOpenCaseStudy(activeProject.id)}
              >
                <div className="md:col-span-12 flex justify-between items-center text-white w-full">
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
          <div className="lg:col-span-7 relative w-full h-[15vh] lg:h-full lg:pl-12 order-1 lg:order-2 shrink-0">
            
            {/* MOBILE ONLY: Single Title Fade */}
            <div className="flex lg:hidden absolute inset-0 items-center justify-start">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-sans font-medium text-[3.5rem] leading-[0.9] tracking-[-0.04em] text-white"
                >
                  {activeProject.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* DESKTOP ONLY: Scrolling List */}
            <div className="hidden lg:flex absolute inset-0 overflow-hidden lg:overflow-visible flex-col justify-center">
              <motion.div 
                className="absolute top-1/2 left-0 w-full flex flex-col"
                initial={false}
                animate={{ 
                  y: `${-(activeIndex * (100 / projects.length) + (100 / projects.length / 2))}%` 
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              >
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;
                  
                  return (
                    <div 
                      key={project.id}
                      className="relative group cursor-pointer flex items-center py-3"
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
                        className={`font-sans font-medium md:text-6xl lg:text-[5.5vw] leading-[1] tracking-tight transition-colors duration-500
                          ${isActive ? 'text-white' : 'text-[#333333] group-hover:text-[#555555]'}`}
                      >
                        {project.title}
                      </h2>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
