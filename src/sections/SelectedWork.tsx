import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Only Horizontal Scroll Animation
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>('.panel');
        if (!panelsContainerRef.current) return;

        // Horizontal scroll animation
        const horizontalScrollTween = gsap.to(panelsContainerRef.current, {
          x: () => -(panelsContainerRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${panelsContainerRef.current!.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.5,
              delay: 0.08,
              ease: "power1.inOut"
            }
          }
        });

        // Parallax scroll on the project preview image and watermark
        panels.forEach((panel) => {
          const img = panel.querySelector('.bg-img');
          if (img) {
            gsap.fromTo(img, 
              { xPercent: -12 },
              { 
                xPercent: 12, 
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalScrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          }

          const watermark = panel.querySelector('.watermark-txt');
          if (watermark) {
            gsap.fromTo(watermark,
              { xPercent: 15 },
              {
                xPercent: -15,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalScrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Seller AI Assistant",
      description: "Redesigning a bilingual, Hindi-first AI dashboard so Tier 2/3 city sellers can actually trust and act on AI recommendations.",
      tags: ["AI UX", "Bilingual Design", "Dashboard"],
      image: "https://placehold.co/1200x800/E5EBE4/1A1A18?text=Seller+AI+Assistant",
      bgColorCode: "#EAEFE9", // light soft green
      accentColor: "#3B4E36",
      link: "#"
    },
    {
      title: "ExamWaliSite",
      description: "A full UX audit and design-system rebuild for an ed-tech client, including light/dark mode and an interactive prototype.",
      tags: ["UX Audit", "Design Systems", "Web"],
      image: "https://placehold.co/1200x800/E6E3EB/1A1A18?text=ExamWaliSite",
      bgColorCode: "#ECE8F1", // light soft lavender
      accentColor: "#4E3663",
      link: "#"
    },
    {
      title: "LearnWith",
      description: "Built a complete design system and story-driven UX copy for a design-learning product, backed by user research.",
      tags: ["Design Systems", "UX Research", "EdTech"],
      image: "https://placehold.co/1200x800/EBE8E3/1A1A18?text=LearnWith",
      bgColorCode: "#EFEAE2", // light soft sand
      accentColor: "#614F35",
      link: "#"
    }
  ];

  return (
    <section 
      ref={containerRef} 
      id="work" 
      className="relative w-full bg-[var(--color-base)] overflow-x-hidden"
    >
      {/* Mobile Title Section */}
      <div className="px-6 py-12 md:hidden">
        <h2 className="font-display font-bold text-4xl text-[var(--color-text-dark)] mb-2">
          Some recent work
        </h2>
        <p className="opacity-70 text-sm">Case studies · shipped products</p>
      </div>

      {/* Projects List Container */}
      <div 
        ref={panelsContainerRef}
        className="flex flex-col md:flex-row md:h-screen w-full md:w-max"
      >
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className="panel flex-shrink-0 w-full md:w-screen md:h-screen overflow-hidden relative flex items-center"
            style={{ 
              backgroundColor: project.bgColorCode,
            }}
          >
            
            {/* Giant Magazine Watermark (Desktop Only) */}
            <div className="watermark-txt hidden md:block absolute right-[-5%] top-1/2 -translate-y-1/2 text-[24vw] font-display font-black text-[var(--color-text-dark)]/[0.02] select-none pointer-events-none tracking-tighter leading-none z-0">
              0{idx + 1}
            </div>

            {/* Main Content Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 md:items-center w-full max-w-7xl mx-auto px-6 md:px-24 lg:px-28 py-12 md:py-24 relative z-10">
              
              {/* Left Side Content */}
              <div className="text-block md:col-span-5 flex flex-col justify-center order-2 md:order-1">
                
                {/* Floating index count for desktop */}
                <span 
                  className="hidden md:inline-block font-mono text-xs font-semibold uppercase tracking-widest mb-6"
                  style={{ color: project.accentColor }}
                >
                  CASE STUDY 0{idx + 1}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="bg-white/70 backdrop-blur-md text-[var(--color-text-dark)] font-medium text-xs px-3.5 py-1.5 rounded-full border border-black/[0.04] shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[var(--color-text-dark)] mb-5 leading-tight tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg opacity-80 mb-8 md:mb-10 leading-relaxed max-w-xl">
                  {project.description}
                </p>

                {/* CTA Link */}
                <Magnetic>
                  <a 
                    href={project.link} 
                    className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 w-fit shadow-lg shadow-black/5 group/btn"
                    style={{ backgroundColor: 'var(--color-text-dark)' }}
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </Magnetic>

              </div>

              {/* Right Side Image Frame */}
              <div className="md:col-span-7 order-1 md:order-2">
                <a 
                  href={project.link} 
                  className="group relative block w-full aspect-[4/3] bg-black/[0.02] rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                >
                  <div className="absolute inset-0 bg-[var(--color-text-dark)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="bg-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:absolute md:inset-0 md:scale-[1.15]" 
                  />
                  
                  <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-semibold text-[var(--color-text-dark)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md flex items-center gap-1.5">
                    <span>View case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
