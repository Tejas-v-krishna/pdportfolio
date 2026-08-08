import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

const titles = [
  "Product Designer",
  "Logo Designer",
  "UI/UX Designer",
  "Brand Identity Builder"
];

const stickers = [
  { id: 1, src: "/stickers/1.png", top: "6%", left: "4%", rotate: -18, scale: 1.1 },
  { id: 2, src: "/stickers/2.png", top: "2%", left: "25%", rotate: 16, scale: 0.95 },
  { id: 3, src: "/stickers/3.png", top: "0%", left: "46%", rotate: -22, scale: 1.2 },
  { id: 4, src: "/stickers/4.png", top: "8%", left: "68%", rotate: 14, scale: 0.95 },
  { id: 5, src: "/stickers/5.png", top: "4%", left: "85%", rotate: -16, scale: 1.1 },
  
  { id: 6, src: "/stickers/6.png", top: "52%", left: "6%", rotate: -12, scale: 1.2 },
  { id: 7, src: "/stickers/7.png", top: "32%", left: "20%", rotate: 10, scale: 1.0 },
  { id: 8, src: "/stickers/8.png", top: "44%", left: "42%", rotate: -8, scale: 1.25 },
  { id: 9, src: "/stickers/9.png", top: "30%", left: "60%", rotate: 22, scale: 1.1 },
  { id: 10, src: "/stickers/10.png", top: "48%", left: "78%", rotate: -15, scale: 1.15 },
  
  { id: 11, src: "/stickers/11.png", top: "74%", left: "42%", rotate: 8, scale: 1.05 },
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

  // GSAP Inertia Velocity Effect matching exact reference
  useEffect(() => {
    if (!mediaContainerRef.current) return;
    const root = mediaContainerRef.current;
    
    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate horizontal movement since the last mouse position
      deltaX = e.clientX - oldX;
      // Calculate vertical movement since the last mouse position
      deltaY = e.clientY - oldY;
      // Update old coordinates with the current mouse position
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener('mousemove', handleMouseMove);

    const mediaElements = root.querySelectorAll<HTMLDivElement>('.media');
    
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLDivElement;
      const image = target.querySelector('img');
      if (!image) return;

      const tl = gsap.timeline({ 
        onComplete: () => {
          tl.kill();
        }
      });
      tl.timeScale(1.2); // Animation will play 20% faster than normal

      tl.to(image, {
        inertia: {
          x: {
            velocity: deltaX * 30, // Higher number = movement amplified
            end: 0 // Go back to initial position
          },
          y: {
            velocity: deltaY * 30, // Higher number = movement amplified
            end: 0 // Go back to initial position
          }
        }
      });

      tl.fromTo(image, {
        rotate: 0
      }, {
        duration: 0.4,
        rotate: (Math.random() - 0.5) * 30, // Returns a value between -15 & 15
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut' // Will slow at the begin and the end
      }, '<'); // Starts at the same time as previous tween
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

      {/* Interactive Sticker Cloud Scatter Stage (Inertia Velocity Effect) */}
      <div 
        ref={mediaContainerRef}
        className="mwg_free_effect001 relative z-10 w-full max-w-7xl mx-auto pt-4 px-4 flex-1 flex flex-col justify-center items-center pointer-events-auto"
      >
        <div className="medias relative w-full h-[55vh] md:h-[62vh] max-w-6xl">
          {stickers.map((sticker, i) => (
            <motion.div
              key={sticker.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: sticker.scale
              }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.04 },
                scale: { type: "spring", stiffness: 260, damping: 20, delay: i * 0.04 }
              }}
              className="media absolute group flex items-center justify-center cursor-pointer w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 hover:z-30"
              style={{
                top: sticker.top,
                left: sticker.left,
                transform: `rotate(${sticker.rotate}deg)`
              }}
            >
              <img 
                src={sticker.src} 
                alt={`Sticker ${sticker.id}`} 
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.85)] transition-shadow duration-300 group-hover:drop-shadow-[0_26px_36px_rgba(0,0,0,0.95)]"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full px-6 pb-8 md:px-12 md:pb-12 relative z-10">
        <div className="flex justify-between items-end mb-4 font-display text-xl sm:text-2xl md:text-4xl font-semibold uppercase text-white overflow-hidden">
          
          <div className="relative w-full h-10 sm:h-12 md:h-16 flex items-end overflow-hidden">
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
                      className="inline-block text-xl sm:text-2xl md:text-4xl font-semibold text-white tracking-tight"
                      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Percentage display matching text size */}
          <div className="font-display text-xl sm:text-2xl md:text-4xl font-semibold text-white tracking-tight tabular-nums leading-none flex items-baseline shrink-0 ml-4">
            <span>{progress}%</span>
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
