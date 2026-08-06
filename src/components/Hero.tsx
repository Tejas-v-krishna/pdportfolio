import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StaggerText from './StaggerText';

export default function Hero() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (Indian Standard Time)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-112px)] flex flex-col bg-[#09090b] overflow-hidden">
      
      {/* Top Philosophy Row - Flex distribution to match exactly */}
      <div className="w-full px-8 flex-[0.8] grid grid-cols-12 gap-6 pb-6 border-b border-[#1f1f22]">
        
        {/* Left Column: Philosophy (col-span-5) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="col-span-5 flex flex-col justify-between h-full pt-12"
        >
          <h2 className="font-tech text-xs tracking-widest uppercase text-white">My design philosophy</h2>
          <div className="flex flex-col gap-4 text-[#a1a1aa] font-sans text-base max-w-sm leading-relaxed py-2 pr-4">
            <p>
              I make things simple. I don't believe in over-designing or adding stuff just because it looks cool. If it doesn't help the user, it shouldn't be there.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Location & Time (col-span-7) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="col-span-7 flex flex-col justify-between h-full pt-12 relative"
        >
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1 font-tech text-xs tracking-widest uppercase text-[#a1a1aa] leading-[1.6]">
              <p className="text-white">Based in Punjab • Worldwide ({time || 'IST'})</p>
              <p className="text-zinc-400">Founded in India 🤍</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="font-tech text-xs tracking-widest uppercase text-[#a1a1aa] max-w-xs leading-normal">
              Designer and builder. I design interfaces, build products, and try to solve real problems.
            </div>
            <div className="font-tech text-xs tracking-widest uppercase text-right shrink-0 flex items-center justify-end gap-2.5">
              <span className="w-2 h-2 rounded-full bg-white shrink-0"></span>
              <span className="animate-shimmer font-medium">
                Available for new projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Hero Row - Swapped layout */}
      <div className="w-full px-8 flex-[1.2] grid grid-cols-12 gap-6 pt-10 pb-8 relative">
        
        {/* Left: Massive Hero Text & CTA (col-span-7) */}
        <div className="col-span-7 flex flex-col justify-between h-full">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="font-sans font-medium text-[5.5vw] leading-[0.92] tracking-tighter text-white"
          >
            Making things that<br/> actually work and<br/> make sense.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="flex flex-col gap-2 font-tech text-xs tracking-widest uppercase text-[#a1a1aa]"
          >
            <p>Let's build something that feels right</p>
            <a href="#contact" className="group text-white hover:text-zinc-300 transition-colors border-b border-white/30 hover:border-white pb-0.5 w-fit flex items-center gap-1 cursor-pointer interactive">
              <StaggerText text="Start a project ↗" />
            </a>
          </motion.div>
        </div>

        {/* Right: Image Placeholder (col-span-5) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="col-span-5 flex items-end justify-end h-full"
        >
          <div className="w-[75%] aspect-[1.4/1] bg-zinc-900 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center text-zinc-700 font-tech text-[10px] tracking-widest uppercase">
            [ Project Preview Image ]
          </div>
        </motion.div>
      </div>

    </section>
  );
}
