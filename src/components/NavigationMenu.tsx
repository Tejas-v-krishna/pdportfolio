import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import StaggerText from './StaggerText';
import { useISTDate } from '../hooks/useIST';

interface NavigationMenuProps {
  isMounted: boolean;
  isOpen: boolean;
  onClose: () => void;
  onItemClick?: (link: string) => void;
}

export default function NavigationMenu({ isMounted, isOpen, onClose, onItemClick }: NavigationMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Use a ref for magneticX to drive the motion value without causing React re-renders on every mousemove
  const magneticXRef = useRef(0);
  const magneticMotionRef = useRef<HTMLDivElement>(null);
  const time = useISTDate();
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    magneticXRef.current = normalizedX * 140;
    // Directly write to DOM — no React state update needed
    if (magneticMotionRef.current) {
      magneticMotionRef.current.style.transform = `translateX(${magneticXRef.current}px)`;
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    magneticXRef.current = 0;
    if (magneticMotionRef.current) {
      magneticMotionRef.current.style.transform = `translateX(0px)`;
    }
  };

  // GSAP Power1.inOut Staggered Down-to-Up Text & Element Animation
  useEffect(() => {
    if (!menuContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      if (isOpen) {
        const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

        // Set initial positions cleanly below the overflow mask
        gsap.set(".menu-char", { yPercent: 150 });
        gsap.set(".menu-item-num", { yPercent: 150, rotate: 5 });
        gsap.set(".menu-line", { scaleX: 0, transformOrigin: "center" });
        gsap.set(".menu-fade-item", { y: 25, opacity: 0 });

        // 1. Expand divider lines
        tl.to(".menu-line", {
          scaleX: 1,
          duration: 0.4,
          stagger: 0.03
        }, 0);

        // 2. Stagger text numbers (down to up)
        tl.to(".menu-item-num", {
          yPercent: 0,
          rotate: 0,
          duration: 0.45,
          stagger: 0.05
        }, 0);

        // 3. Stagger individual text characters (down to up)
        tl.to(".menu-char", {
          yPercent: 0,
          duration: 0.45,
          stagger: {
            each: 0.018,
            from: "start"
          },
          ease: "power1.inOut"
        }, 0);

        // 4. Fade/slide in header and footer details
        tl.to(".menu-fade-item", {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02
        }, 0);

      } else {
        const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

        // Stagger exit characters downwards cleanly out of view
        tl.to(".menu-char", {
          yPercent: 150,
          duration: 0.25,
          stagger: { each: 0.015, from: "end" },
          ease: "power1.inOut"
        }, 0);

        tl.to(".menu-item-num", {
          yPercent: 150,
          rotate: 5,
          duration: 0.25,
          stagger: { each: 0.03, from: "end" }
        }, 0);

        tl.to(".menu-fade-item", {
          y: 25,
          opacity: 0,
          duration: 0.2
        }, 0);

        tl.to(".menu-line", {
          scaleX: 0,
          duration: 0.25
        }, 0.05);
      }
    }, menuContainerRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleItemClick = (link: string) => {
    if (onItemClick) {
      onItemClick(link);
    } else {
      onClose();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const menuItems = [
    {
      num: "01",
      label: "ABOUT",
      marquee: "MY JOURNEY ↗",
      link: "about"
    },
    {
      num: "02",
      label: "PROJECTS",
      marquee: "RECENT WORK ↗",
      link: "projects"
    },
    {
      num: "03",
      label: "SERVICES",
      marquee: "CAPABILITIES ↗",
      link: "services"
    },
    {
      num: "04",
      label: "CONTACT",
      marquee: "LET'S TALK ↗",
      link: "contact"
    }
  ];

  return (
    <div 
      ref={menuContainerRef}
      className={`fixed inset-0 z-[9990] bg-[#f4f4f0] text-[#18181b] overflow-y-auto overflow-x-hidden transition-opacity duration-[200ms] ${isMounted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="relative z-10 flex flex-col justify-between min-h-full w-full">
        {/* Top Header */}
        <div className="relative w-full px-8 py-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="menu-fade-item w-12 h-12 rounded-full border border-black flex items-center justify-center font-heading font-black text-base tracking-tighter">
              TVK
            </span>
          </div>
          
          <div className="overflow-hidden">
            <button
              onClick={onClose}
              className="menu-fade-item w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white cursor-pointer group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Option 4: Bottom-Anchored Heavy Typography Layout */}
        <div className="flex-1 flex flex-col justify-end w-full relative z-20 mt-auto pb-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative w-full py-1 md:py-3 px-8 md:px-16 cursor-pointer interactive group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleItemClick(item.link)}
            >
              {/* Number & Massive Label */}
              <div className="flex items-baseline justify-between w-full">
                <div className="py-1">
                  <a
                    href={item.link}
                    className="inline-block font-heading font-black text-[min(10vw,14vh)] md:text-[min(8.5vw,15vh)] leading-[0.82] uppercase tracking-[-0.05em] text-[#18181b]"
                  >
                    {item.label}
                  </a>
                </div>

                <div className="overflow-hidden leading-none shrink-0 mb-2">
                  <div className="menu-item-num font-mono text-base md:text-2xl text-zinc-500 font-semibold leading-none">
                    [{item.num}]
                  </div>
                </div>
              </div>

              {/* Horizontal Divider Line Growing From Center Between Menu Items */}
              {index < menuItems.length - 1 && (
                <div className="menu-line absolute bottom-0 left-0 right-0 h-px bg-[#323232]/15" />
              )}

              {/* Venetian Horizontal Slice Reveal with Magnetic Cursor Drag */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="absolute -top-[0.25em] -bottom-[0.25em] left-0 right-0 z-10 flex items-center overflow-hidden"
                  >
                    {/* 8 Horizontal Venetian Slicing Bars */}
                    <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
                      {[...Array(8)].map((_, barIdx) => (
                        <motion.div
                          key={barIdx}
                          initial={{ scaleY: 0, transformOrigin: barIdx % 2 === 0 ? "top" : "bottom" }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            ease: [0.65, 0, 0.35, 1], 
                            delay: barIdx * 0.02 
                          }}
                          className="flex-1 bg-[#09090b] w-full"
                        />
                      ))}
                    </div>

                    {/* Outer Magnetic Wrapper - driven by direct DOM ref, not React state */}
                    <div 
                      ref={magneticMotionRef}
                      style={{ 
                        opacity: 0,
                        transition: 'opacity 0.25s ease 0.08s',
                        animation: 'menuMagneticIn 0.25s ease 0.08s forwards'
                      }}
                      className="relative z-10 w-full flex items-center pointer-events-none"
                    >
                      {/* Inner Continuous CSS Marquee Loop - no per-char motion.span */}
                      <div className="animate-marquee flex whitespace-nowrap gap-12 font-heading font-black text-[11vw] md:text-[8.5vw] uppercase text-white tracking-tighter items-center select-none pl-8 md:pl-16">
                        {[...Array(3)].map((_, i) => {
                          const word = item.marquee.replace(" ↗", "");
                          return (
                            <span key={i} className="flex items-center gap-6 menu-hover-text-in">
                              <span className="inline-block">
                                {word}
                              </span>
                              <span 
                                className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl md:text-4xl font-normal shrink-0"
                              >
                                ↗
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Option 2: High-Density Monospace Tech Bar */}
        <div className="relative w-full grid grid-cols-2 md:grid-cols-4 text-xs font-mono text-zinc-700 z-20 border-t border-[#323232]/15">
          
          {/* Cell 1: Philosophy */}
          <div className="p-4 md:p-8 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-[#323232]/15">
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[ 01 / PHILOSOPHY ]</div>
            <p className="menu-fade-item text-zinc-800 leading-relaxed font-sans text-sm md:text-base font-normal">
              Driven by clarity, performance, and detail. Simple, fast, intentional product systems.
            </p>
            <div className="menu-fade-item font-mono text-[10px] text-zinc-400">
              ©{new Date().getFullYear()} tejjxuu
            </div>
          </div>

          {/* Cell 2: Direct Contact */}
          <div className="p-4 md:p-8 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-[#323232]/15">
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[ 02 / INQUIRIES ]</div>
            <a href="mailto:hello@tejasvkrishna.com" className="group font-mono text-xs text-[#18181b] w-fit">
              <StaggerText text="hello@tejasvkrishna.com" />
            </a>
            <div className="text-zinc-500 font-mono text-[10px]">Bengaluru, India</div>
          </div>

          {/* Cell 3: Networks */}
          <div className="p-4 md:p-8 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-[#323232]/15">
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[ 03 / NETWORKS ]</div>
            <div className="menu-fade-item flex flex-col gap-1 text-[#18181b] font-mono text-xs">
              <a href="#" className="group hover:text-black w-fit">
                <StaggerText text="INSTAGRAM ↗" />
              </a>
              <a href="#" className="group hover:text-black w-fit">
                <StaggerText text="LINKEDIN ↗" />
              </a>
              <a href="#" className="group hover:text-black w-fit">
                <StaggerText text="DRIBBBLE ↗" />
              </a>
            </div>
          </div>

          {/* Cell 4: System Clock */}
          <div className="p-4 md:p-8 flex flex-col justify-between gap-4">
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[ 04 / SYSTEM CLOCK ]</div>
            <div className="menu-fade-item font-mono text-sm font-bold text-[#18181b] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#000000] shrink-0"></span>
              <span>{formatTime(time)}</span>
            </div>
            <div className="menu-fade-item font-mono text-[10px] text-zinc-400">
              TIMEZONE: IST (UTC+5:30)
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
