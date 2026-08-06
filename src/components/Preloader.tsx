import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const titles = [
  "Product Designer",
  "Logo Designer",
  "UI/UX Designer",
  "Brand Identity Builder"
];

const mediaImages = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png"
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Total duration of the preloader (7 seconds so each title stays readable)
    const duration = 7000;
    const interval = 30; // update frequency
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Custom easing for progress to make it feel natural (fast at start, slow at end)
      const easeOutQuart = 1 - Math.pow(1 - (step / steps), 4);
      const currentProgress = Math.min(Math.floor(easeOutQuart * 100), 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // Pause at 100% before sliding up
      }
    }, interval);

    // Title cycler (change title evenly across the duration)
    const titleInterval = duration / titles.length;
    let titleStep = 0;
    const titleTimer = setInterval(() => {
      titleStep++;
      if (titleStep < titles.length) {
        setCurrentTitleIndex(titleStep);
      }
    }, titleInterval);

    return () => {
      clearInterval(timer);
      clearInterval(titleTimer);
    };
  }, [onComplete]);

  // GSAP Media Velocity Inertia Effect (active ONLY during preloader stage)
  useEffect(() => {
    if (!mediaContainerRef.current) return;
    const root = mediaContainerRef.current;
    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener('mousemove', handleMouseMove);

    const mediaElements = root.querySelectorAll<HTMLDivElement>('.media');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLDivElement;
      const image = target.querySelector('img');
      if (!image) return;

      gsap.killTweensOf(image);
      const randomRotate = (Math.random() - 0.5) * 30;

      gsap.timeline()
        .to(image, {
          x: deltaX * 1.8,
          y: deltaY * 1.8,
          rotate: randomRotate,
          duration: 0.25,
          ease: 'power2.out'
        })
        .to(image, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
    };

    mediaElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      mediaElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        const image = el.querySelector('img');
        if (image) gsap.killTweensOf(image);
      });
    };
  }, []);

  // Split text animation variants (pure Y-translation, no opacity fading)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04 }
    },
    exit: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 }
    }
  };

  const charVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: "0%", 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
    },
    exit: { 
      y: "-100%", 
      transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] as const }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#09090b] flex flex-col justify-between overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Growing Background Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-6 md:grid-cols-8 px-6 md:px-12 z-0">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="relative h-full w-full border-r border-white/[0.02] first:border-l first:border-white/[0.02]">
            <motion.div 
              className="absolute bottom-0 right-0 w-px bg-white/[0.06] h-full origin-bottom"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 4, 
                ease: [0.16, 1, 0.3, 1] as const, 
                delay: i * 0.12 
              }}
            />
          </div>
        ))}
      </div>

      {/* Interactive Media Grid (Inertia Velocity Effect) */}
      <div 
        ref={mediaContainerRef}
        className="mwg_free_effect001 relative z-10 w-full max-w-5xl mx-auto pt-12 px-6 flex-1 flex flex-col justify-center items-center pointer-events-auto"
      >
        <div className="medias grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 w-full">
          {mediaImages.map((src, i) => (
            <div key={i} className="media p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center justify-center cursor-pointer aspect-square">
              <img 
                src={src} 
                alt="" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain pointer-events-none select-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full px-6 pb-8 md:px-12 md:pb-12 relative z-10">
        <div className="flex justify-between items-end mb-4 font-tech text-xs tracking-widest uppercase text-white overflow-hidden">
          
          <div className="relative w-full h-12 flex items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitleIndex}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-0 bottom-0 flex overflow-hidden py-0.5"
              >
                {titles[currentTitleIndex].split('').map((char, index) => (
                  <span key={index} className="inline-block overflow-hidden">
                    <motion.span 
                      variants={charVariants}
                      className="inline-block text-sm md:text-base font-medium"
                      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Large percentage display matching reference */}
          <div className="font-display text-4xl md:text-6xl font-semibold text-white tracking-tighter tabular-nums leading-none flex items-baseline">
            <span>{progress}</span>
            <span className="text-zinc-500 text-2xl md:text-4xl font-normal ml-0.5">%</span>
          </div>
        </div>
        
        {/* Progress Bar Line */}
        <div className="w-full h-px bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
