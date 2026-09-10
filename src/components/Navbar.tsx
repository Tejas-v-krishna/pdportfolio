import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import StaggerText from './StaggerText';

interface NavbarProps {
  onOpenMenu?: () => void;
}

export default function Navbar({ onOpenMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{ viewTransitionName: "navbar" as any }}
      className={`w-full sticky top-0 z-40 pt-6 pb-5 shrink-0 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10' : 'bg-[#09090b] border-b border-transparent'}`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* 1. Left Section: Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Main Logo Image */}
          <img 
            src="/logo.png" 
            alt="Tejas V Krishna — home"
            className="h-9 md:h-10 object-contain"
          />
        </motion.div>

        {/* 2. Right Section: Menu Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-end items-center"
        >
          <button 
            onClick={onOpenMenu}
            className="group px-5 py-2 md:px-6 md:py-2.5 bg-white text-black rounded-full font-sans text-xs md:text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer interactive"
          >
            <StaggerText text="Menu" />
          </button>
        </motion.div>
        
      </div>
    </nav>
  );
}

