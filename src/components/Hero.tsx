import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggerText from './StaggerText';
import SplitTextReveal from './SplitTextReveal';
import DraggableSticker from './DraggableSticker';
import { useIST } from '../hooks/useIST';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isPreloaded?: boolean;
}

export default function Hero({ isPreloaded = true }: HeroProps) {
  const time = useIST();
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // GSAP Right-Fixed Left-Expanding Diagonal Animation & Parallax Zoom-Out
  useEffect(() => {
    if (!previewRef.current || !isPreloaded) return;

    // 1. Pure Smooth Resizing (Ultra-silky expo.out easing & 3D GPU acceleration)
    gsap.fromTo(
      previewRef.current,
      {
        opacity: 1,
        scaleX: 0.18,
        scaleY: 0.25,
        transformOrigin: '100% 100%', // Locks right & bottom edge; left & top side grows smoothly
        force3D: true,
      },
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 1.8,
        delay: 0.8,
        ease: 'expo.out',
        force3D: true,
      }
    );

    // 2. Parallax Zoom-Out on Stock Image Inside
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.35,
          yPercent: -8,
          force3D: true,
        },
        {
          scale: 1.0,
          yPercent: 0,
          duration: 1.8,
          delay: 0.8,
          ease: 'expo.out',
          force3D: true,
        }
      );

      // 3. Scroll-driven Parallax effect while scrolling down
      gsap.to(imageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, [isPreloaded]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[calc(100vh-112px)] md:h-[calc(100vh-112px)] flex flex-col bg-[#09090b] overflow-hidden">
      
      {/* Interactive Draggable Sticker floating near Hero CTA */}
      <DraggableSticker 
        src="/stickers/3.png" 
        initialRotate={14} 
        className="bottom-6 left-[45%] md:left-[48%] w-28 h-28 md:w-36 md:h-36" 
        delay={2.5}
      />
      
      {/* DESKTOP & TABLET LAYOUT */}
      <div className="hidden md:flex flex-col flex-1 w-full h-full">
        {/* Top Philosophy Row - Option 4: The Split-Screen (Selected Permanent Choice) */}
        <div className="w-full px-4 md:px-8 flex-none md:flex-[0.8] grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#1f1f22] pt-8 md:pt-12">
          
          {/* Left 50%: Philosophy & Mission (col-span-6) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="col-span-1 md:col-span-6 flex flex-col justify-between h-full gap-4"
          >
            <div className="font-tech text-[11px] tracking-widest uppercase text-zinc-500">
              <SplitTextReveal 
                text="[ MY DESIGN PHILOSOPHY ]" 
                direction="top"
                mode="slide" 
                splitBy="words"
                delay={0.8} 
                enabled={isPreloaded}
              />
            </div>
            <div className="text-[#e4e4e7] font-sans text-base md:text-xl font-medium leading-snug max-w-lg">
              <p>
                <SplitTextReveal 
                  text="I make things simple. If it doesn't help the user, it shouldn't be there."
                  direction="bottom"
                  mode="slide"
                  delay={1.2}
                  stagger={0.03}
                  randomize={false}
                  splitBy="words"
                  enabled={isPreloaded}
                />
              </p>
            </div>
          </motion.div>

          {/* Right 50%: Utility & Presence (col-span-6) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="col-span-1 md:col-span-6 flex flex-col justify-between h-full pl-0 md:pl-12 border-l-0 md:border-l border-[#1f1f22] gap-6"
          >
            {/* Location & Time */}
            <div className="flex justify-between items-start font-tech text-xs tracking-widest uppercase text-[#a1a1aa]">
              <div>
                <SplitTextReveal 
                  text={`Based in Kerala • Worldwide (${time || 'IST'})`}
                  direction="top"
                  mode="slide"
                  delay={1.3}
                  enabled={isPreloaded}
                />
              </div>
            </div>

            {/* Role & Availability Status */}
            <div className="flex justify-between items-end pt-4">
              <div className="font-tech text-xs tracking-widest uppercase text-zinc-400 max-w-xs leading-normal">
                <SplitTextReveal 
                  text="Designer & builder. Solving real problems."
                  direction="bottom"
                  mode="slide"
                  delay={1.5}
                  enabled={isPreloaded}
                />
              </div>
              <div className="font-tech text-xs tracking-widest uppercase flex items-center gap-2.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-white shrink-0"></span>
                <span className="animate-shimmer font-medium text-white">
                  Available for new projects
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      {/* Bottom Hero Row - Swapped layout */}
      <div className="w-full px-4 md:px-8 flex-none md:flex-[1.2] flex flex-col-reverse md:grid md:grid-cols-12 gap-6 pt-8 md:pt-10 pb-8 relative">
        
        {/* Left: Massive Hero Text & CTA (col-span-7) */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-between h-full gap-8 md:gap-0">
          {/* STEP 1: Main Hero Text (Animates First) */}
          <div className="font-sans font-medium text-[clamp(2rem,3.8vw,4.2rem)] leading-[0.92] tracking-[-0.04em] text-white flex flex-col">
            <SplitTextReveal 
              text="Making things that actually"
              as="h1"
              direction="bottom"
              mode="slide"
              delay={0.1}
              randomize={false}
              splitBy="chars"
              stagger={0.025}
              triggerOnScroll={false}
              enabled={isPreloaded}
            />
            <SplitTextReveal 
              text="work and make sense."
              direction="bottom"
              mode="slide"
              delay={0.4}
              randomize={false}
              splitBy="chars"
              stagger={0.025}
              triggerOnScroll={false}
              enabled={isPreloaded}
            />
          </div>

          {/* STEP 3C: Small Text & CTA (Animates Third) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.3 }}
            className="flex flex-col gap-2 font-tech text-xs tracking-widest uppercase text-[#a1a1aa]"
          >
            <p>
              <SplitTextReveal 
                text="Let's build something that feels right"
                direction="top"
                mode="slide"
                splitBy="words"
                stagger={0.03}
                delay={2.4}
                randomize={false}
                triggerOnScroll={false}
                enabled={isPreloaded}
              />
            </p>
            <a href="#contact" className="group text-white hover:text-zinc-300 transition-colors border-b border-white/30 hover:border-white pb-0.5 w-fit flex items-center gap-1 cursor-pointer interactive">
              <StaggerText text="Start a project ↗" />
            </a>
          </motion.div>
        </div>

        {/* Right: Image Placeholder (col-span-5) */}
        <div className="col-span-1 md:col-span-5 flex items-end justify-center md:justify-end h-full mt-4 md:mt-0">
          <div 
            ref={previewRef}
            className="w-[75%] aspect-[1.4/1] bg-zinc-900 rounded-xl overflow-hidden border border-white/10 relative shadow-2xl group"
            aria-label="Project Preview Image"
          >
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
              alt="Project Preview" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover pointer-events-none select-none transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-4 text-white/70 font-tech text-[10px] tracking-widest uppercase pointer-events-none">
              [ Project Preview Image ]
            </span>
          </div>
        </div>
      </div>
      </div>

      {/* MOBILE DEDICATED LAYOUT */}
      <div className="flex md:hidden flex-col w-full px-6 pt-8 pb-12 gap-10 overflow-y-auto">
        
        {/* Massive Hero Text First */}
        <div className="font-sans font-medium text-[2.2rem] leading-[0.9] tracking-[-0.05em] text-white flex flex-col">
          <SplitTextReveal 
            text="Making things that actually" 
            as="h1"
            direction="bottom"
            mode="slide"
            delay={0.1}
            randomize={false}
            splitBy="chars"
            stagger={0.025}
            triggerOnScroll={false}
            enabled={isPreloaded}
          />
          <SplitTextReveal 
            text="work and make sense." 
            direction="bottom"
            mode="slide"
            delay={0.4}
            randomize={false}
            splitBy="chars"
            stagger={0.025}
            triggerOnScroll={false}
            enabled={isPreloaded}
          />
        </div>

        {/* Availability & CTA */}
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-tech text-[10px] tracking-widest uppercase text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="animate-shimmer">Available for new projects</span>
            </div>
          </div>

          <a href="#contact" className="text-white hover:text-zinc-300 border-b border-white/30 pb-0.5 w-fit flex items-center gap-1 font-tech text-[10px] tracking-widest uppercase">
            <StaggerText text="Start a project ↗" />
          </a>
        </div>

        {/* Image at bottom */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          className="w-full aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center text-zinc-700 font-tech text-[10px] tracking-widest uppercase mt-2 mb-12"
        >
          [ Project Preview Image ]
        </motion.div>
      </div>

    </section>
  );
}
