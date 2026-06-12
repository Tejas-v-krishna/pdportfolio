import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);
  const navigate = useNavigate();

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const scrollToProject = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const start = st.start;
    const end = st.end;
    const targetScroll = start + (idx / projects.length) * (end - start) + 15;
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

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

  const animateImageEntry = (img: HTMLElement) => {
    gsap.fromTo(
      img,
      {
        scale: 1.25,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 0,
      },
      {
        scale: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      }
    );

    const innerImg = img.querySelector("img");
    if (innerImg) {
      gsap.fromTo(
        innerImg,
        {
          filter: "contrast(2) brightness(10)",
        },
        {
          filter: "contrast(1) brightness(1)",
          duration: 1,
          ease: "power2.inOut",
        }
      );
    }
  };

  const animateImageExitForward = (img: HTMLElement) => {
    gsap.to(img, {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const animateImageExitReverse = (img: HTMLElement) => {
    gsap.to(img, {
      scale: 1.25,
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power2.inOut",
    });

    const innerImg = img.querySelector("img");
    if (innerImg) {
      gsap.to(innerImg, {
        filter: "contrast(2) brightness(10)",
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Only Pinned Multi-Image Canvas
      mm.add("(min-width: 768px)", () => {
        const images = gsap.utils.toArray<HTMLElement>('.img');
        const textBlocks = gsap.utils.toArray<HTMLElement>('.work-text-block');

        if (images.length === 0) return;

        // Start by animating the first image and text block
        animateImageEntry(images[0]);
        gsap.to(textBlocks[0], { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        // Hide other text blocks initially
        textBlocks.slice(1).forEach((block) => {
          gsap.set(block, { opacity: 0, y: 30 });
        });

        let lastCycle = 0;

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`, // 3 screens scroll length
          pin: pinContainerRef.current,
          pinSpacing: true,
          scrub: 0.1,
          onUpdate: (self) => {
            const totalProgress = self.progress * images.length;
            const currentCycle = Math.floor(totalProgress);
            const cycleProgress = (totalProgress % 1) * 100;

            if (currentCycle < images.length) {
              const currentImage = images[currentCycle];
              if (currentImage) {
                const scale = 1 - (0.25 * cycleProgress) / 100;
                gsap.to(currentImage, {
                  scale: scale,
                  duration: 0.1,
                  overwrite: "auto",
                });
              }

              if (currentCycle !== lastCycle) {
                setActiveProjectIdx(currentCycle);
                if (self.direction > 0) {
                  // Scroll down (Forward)
                  if (lastCycle < images.length) {
                    animateImageExitForward(images[lastCycle]);
                    gsap.to(textBlocks[lastCycle], { 
                      opacity: 0, 
                      y: -30, 
                      duration: 0.8, 
                      ease: "power2.inOut",
                      onComplete: () => {
                        gsap.set(textBlocks[lastCycle], { pointerEvents: 'none' });
                      }
                    });
                  }
                  if (currentCycle < images.length) {
                    animateImageEntry(images[currentCycle]);
                    gsap.set(textBlocks[currentCycle], { pointerEvents: 'auto' });
                    gsap.fromTo(textBlocks[currentCycle],
                      { opacity: 0, y: 30 },
                      { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }
                    );
                    // Animate background color transition
                    gsap.to(containerRef.current, {
                      backgroundColor: projects[currentCycle].bgColorCode,
                      duration: 0.8,
                      ease: "power2.out"
                    });
                  }
                } else {
                  // Scroll up (Backward)
                  if (currentCycle < images.length) {
                    animateImageEntry(images[currentCycle]);
                    gsap.set(textBlocks[currentCycle], { pointerEvents: 'auto' });
                    gsap.fromTo(textBlocks[currentCycle],
                      { opacity: 0, y: -30 },
                      { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }
                    );
                    // Animate background color transition
                    gsap.to(containerRef.current, {
                      backgroundColor: projects[currentCycle].bgColorCode,
                      duration: 0.8,
                      ease: "power2.out"
                    });
                  }
                  if (lastCycle < images.length) {
                    animateImageExitReverse(images[lastCycle]);
                    gsap.to(textBlocks[lastCycle], { 
                      opacity: 0, 
                      y: 30, 
                      duration: 0.8, 
                      ease: "power2.inOut",
                      onComplete: () => {
                        gsap.set(textBlocks[lastCycle], { pointerEvents: 'none' });
                      }
                    });
                  }
                }
                lastCycle = currentCycle;
              }
            }
          },
        });
      });

    }, containerRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link === '#') {
      e.preventDefault();
      return;
    }
    if (link.startsWith('/')) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="work" 
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: projects[0].bgColorCode }}
    >
      {/* Desktop Pinned Gallery Layout */}
      <div ref={pinContainerRef} className="hidden md:flex md:h-screen w-full items-center relative z-10">
        
        {/* Left Column: Text Stack */}
        <div className="w-[45%] h-full pl-12 md:pl-24 lg:pl-28 flex flex-col justify-center relative">
          <div className="absolute top-16 left-12 md:left-24 lg:left-28 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-dark)] opacity-40 select-none">
            Selected Work
          </div>
          
          <div className="relative w-full h-[400px]">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="work-text-block absolute inset-0 flex flex-col justify-center"
                style={{ 
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translateY(0px)' : 'translateY(30px)',
                  pointerEvents: idx === 0 ? 'auto' : 'none' 
                }}
              >
                {/* index count */}
                <span 
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4 block text-black"
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
                    onClick={(e) => handleLinkClick(e, project.link)}
                    className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 w-fit shadow-lg shadow-black/5 group/btn"
                    style={{ backgroundColor: 'var(--color-text-dark)' }}
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </Magnetic>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image Stack */}
        <div className="w-[55%] h-full relative flex items-center justify-center">
          <div className="relative w-full h-full">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="img absolute rounded-[2.5rem] overflow-hidden border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-black/[0.02]"
                style={{
                  clipPath: idx === 0 ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                  opacity: idx === 0 ? 1 : 0,
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                  style={{
                    filter: idx === 0 ? "contrast(1) brightness(1)" : "contrast(2) brightness(10)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Progress Bar Sidebar */}
        <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 border border-black/10 bg-white/20 backdrop-blur-md rounded-2xl p-3.5 transition-all duration-300 hover:bg-white/65 hover:shadow-lg group/bar select-none w-11 hover:w-56 overflow-hidden">
          {projects.map((project, idx) => (
            <button
              key={idx}
              onClick={() => scrollToProject(idx)}
              className="flex items-center justify-between w-full cursor-pointer focus:outline-none text-left"
            >
              {/* Label */}
              <span 
                className="text-[10px] font-body font-bold tracking-widest uppercase transition-all duration-300 opacity-0 group-hover/bar:opacity-75 max-w-0 group-hover/bar:max-w-[150px] overflow-hidden whitespace-nowrap flex-grow group-hover/bar:pr-3"
                style={{ color: 'var(--color-text-dark)' }}
              >
                {project.title}
              </span>
              
              {/* Dot Wrapper (to ensure dots stay perfectly aligned in a column) */}
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {/* Dot */}
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeProjectIdx === idx 
                      ? 'scale-125' 
                      : 'bg-black/20 hover:bg-black/50 hover:scale-110'
                  }`}
                  style={{ 
                    backgroundColor: activeProjectIdx === idx ? '#000000' : undefined 
                  }}
                />
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Mobile Vertical Layout */}
      <div className="md:hidden w-full px-6 py-12 flex flex-col gap-16">
        <div>
          <h2 className="font-display font-bold text-4xl text-[var(--color-text-dark)] mb-2">
            Selected Work
          </h2>
          <p className="opacity-70 text-sm">Case studies · shipped products</p>
        </div>
        
        <div className="flex flex-col gap-16">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-6 rounded-[2rem] p-6 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100"
              style={{ backgroundColor: project.bgColorCode }}
            >
              <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-black">
                0{idx + 1} CASE STUDY
              </span>
              
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl mb-3 text-[var(--color-text-dark)]">{project.title}</h3>
                <p className="opacity-80 text-sm leading-relaxed mb-6">{project.description}</p>
                
                <a 
                  href={project.link} 
                  onClick={(e) => handleLinkClick(e, project.link)}
                  className="inline-flex items-center gap-1.5 text-white px-5 py-3 rounded-full text-xs font-semibold shadow-md"
                  style={{ backgroundColor: 'var(--color-text-dark)' }}
                >
                  <span>Read case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
