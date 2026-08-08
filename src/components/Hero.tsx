import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StaggerText from './StaggerText';
import SplitTextReveal from './SplitTextReveal';
import DraggableSticker from './DraggableSticker';

interface HeroProps {
  isPreloaded?: boolean;
}

export default function Hero({ isPreloaded = true }: HeroProps) {
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
      
      {/* Interactive Draggable Sticker floating near Hero CTA */}
      <DraggableSticker 
        src="/stickers/3.png" 
        initialRotate={14} 
        className="bottom-6 left-[45%] md:left-[48%] w-28 h-28 md:w-36 md:h-36" 
        delay={2.5}
      />
      
      {/* Top Philosophy Row - Flex distribution to match exactly */}
      <div className="w-full px-8 flex-[0.8] grid grid-cols-12 gap-6 pb-6 border-b border-[#1f1f22]">
        
        {/* Left Column: Philosophy (col-span-5) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          className="col-span-5 flex flex-col justify-between h-full pt-12"
        >
          {/* STEP 2A: Subheading */}
          <SplitTextReveal 
            text="My design philosophy" 
            as="h2" 
            direction="bottom" 
            mode="slide" 
            splitBy="words"
            stagger={0.04}
            delay={1.1} 
            randomize={false}
            enabled={isPreloaded}
            className="font-tech text-xs tracking-widest uppercase text-white" 
          />
          {/* STEP 3A: Body Text */}
          <div className="flex flex-col gap-4 text-[#e4e4e7] font-sans text-lg md:text-xl font-medium max-w-md leading-snug py-2 pr-4">
            <p>
              <SplitTextReveal 
                text="I make things simple. If it doesn't help the user, it shouldn't be there."
                direction="bottom"
                mode="blur"
                delay={1.6}
                stagger={0.03}
                randomize={false}
                splitBy="words"
                enabled={isPreloaded}
              />
            </p>
          </div>
        </motion.div>

        {/* Right Column: Location & Time (col-span-7) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="col-span-7 flex flex-col justify-between h-full pt-12 relative"
        >
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1 font-tech text-xs tracking-widest uppercase text-[#a1a1aa] leading-[1.6]">
              {/* STEP 2B: Location Subheading */}
              <p className="text-white">
                <SplitTextReveal 
                  text={`Based in Punjab • Worldwide (${time || 'IST'})`}
                  direction="bottom"
                  mode="blur"
                  splitBy="words"
                  stagger={0.03}
                  delay={1.35}
                  randomize={false}
                  enabled={isPreloaded}
                />
              </p>
              <p className="text-zinc-400">Founded in India 🤍</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            {/* STEP 3B: Small Text / Description */}
            <div className="font-tech text-xs tracking-widest uppercase text-[#a1a1aa] max-w-xs leading-normal">
              <SplitTextReveal 
                text="Designer & builder. Solving real problems."
                direction="bottom"
                mode="blur"
                splitBy="words"
                stagger={0.03}
                delay={2.0}
                randomize={false}
                enabled={isPreloaded}
              />
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
          {/* STEP 1: Main Hero Text (Animates First) */}
          <div className="font-sans font-medium text-[5.5vw] leading-[0.92] tracking-tighter text-white">
            <SplitTextReveal 
              text="Making things that actually work and make sense."
              as="h1"
              direction="bottom"
              mode="blur"
              delay={0.1}
              randomize={false}
              splitBy="chars"
              stagger={0.02}
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
                direction="bottom"
                mode="blur"
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
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
