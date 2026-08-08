import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './StaggerText';

gsap.registerPlugin(ScrollTrigger);

interface AccessoriesPageProps {
  onBack: () => void;
}

export default function AccessoriesPage({ onBack }: AccessoriesPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to('.bg-surreal', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Floating elements animation
      gsap.utils.toArray('.floating-element').forEach((el: any, i) => {
        gsap.to(el, {
          y: () => (i % 2 === 0 ? -100 : 100),
          rotation: () => (i % 2 === 0 ? 15 : -15),
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });
      
      // Reveal items
      gsap.from('.reveal-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.showcase-section',
          start: 'top 70%'
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="relative w-full min-h-screen bg-[#050505] text-[#e0e0e0] overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="bg-surreal absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-110"
          style={{ backgroundImage: "url('/accessories-bg.png')" }}
        />
        {/* Glassmorphic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] backdrop-blur-[2px]" />
      </div>

      {/* Navigation / Header */}
      <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-sm font-mono tracking-widest hover:opacity-70 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-90 transition-transform duration-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          RETURN
        </button>
        <div className="text-sm font-mono tracking-widest opacity-50 uppercase">
          04 / Accessories
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Surreal Hero Section */}
        <section className="relative h-screen w-full flex flex-col justify-center px-8 md:px-16 pt-32">
          
          {/* Floating abstract geometric blurs */}
          <div className="floating-element absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
          <div className="floating-element absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <h1 className="font-heading font-black text-[15vw] leading-[0.8] tracking-tighter uppercase text-white mix-blend-overlay">
              <StaggerText text="SURREAL" staggerStep={20} />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 ml-[10vw]">
                <StaggerText text="OBJECTS" staggerStep={30} />
              </span>
            </h1>
            
            <div className="mt-16 max-w-md ml-auto md:mr-16">
              <p className="font-sans text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                A collection of speculative accessories designed to blur the line between physical necessity and digital aestheticism. Form follows emotion.
              </p>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-8 md:left-16 flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-500">
            <span>SCROLL TO EXPLORE</span>
            <div className="w-12 h-px bg-zinc-700 overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-white"
              />
            </div>
          </div>
        </section>

        {/* Showcase Grid */}
        <section className="showcase-section relative w-full py-32 px-8 md:px-16 min-h-screen">
          <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            
            {/* Item 1 - Spans 7 cols */}
            <div className="reveal-item md:col-span-7 relative aspect-[4/5] md:aspect-auto md:h-[80vh] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-20 bg-[url('/accessories-bg.png')] bg-center bg-cover filter grayscale mix-blend-luminosity" />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="font-mono text-xs text-zinc-400 mb-2">01 — DIGITAL RING</div>
                <h3 className="font-heading font-bold text-4xl text-white">CHRONOS</h3>
              </div>
            </div>

            {/* Item 2 - Spans 5 cols */}
            <div className="reveal-item md:col-span-5 relative aspect-[3/4] md:h-[60vh] md:mt-[20vh] group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 w-full h-full bg-zinc-800/30 group-hover:bg-zinc-700/30 transition-colors duration-700" />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="font-mono text-xs text-zinc-400 mb-2">02 — NEURAL LINK</div>
                <h3 className="font-heading font-bold text-4xl text-white">SYNAPSE</h3>
              </div>
            </div>

            {/* Item 3 - Centered */}
            <div className="reveal-item md:col-span-12 md:col-start-3 md:col-end-11 relative aspect-video mt-16 md:mt-32 group cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-40 bg-[url('/accessories-bg.png')] bg-bottom bg-cover" />
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <h2 className="font-heading font-black text-6xl md:text-8xl text-white mix-blend-overlay tracking-tighter uppercase opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                  OBSERVE
                </h2>
              </div>
              <div className="absolute bottom-8 left-8 z-20">
                <div className="font-mono text-xs text-zinc-400 mb-2">03 — OPTIC WEAR</div>
                <h3 className="font-heading font-bold text-4xl text-white">VISIONARY</h3>
              </div>
            </div>
            
          </div>
        </section>

        {/* Footer Area */}
        <section className="relative w-full py-32 px-8 md:px-16 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-xs tracking-[0.3em] text-zinc-500 mb-8 uppercase">End of Collection</div>
          <button 
            onClick={onBack}
            className="group relative px-8 py-4 font-mono text-sm tracking-widest overflow-hidden border border-white/20 rounded-full hover:border-white/60 transition-colors duration-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500 delay-100">RETURN TO INDEX</span>
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          </button>
        </section>
      </main>
    </motion.div>
  );
}
