import { motion } from 'framer-motion';
import StaggerText from './StaggerText';

interface NavbarProps {
  onOpenMenu?: () => void;
}

export default function Navbar({ onOpenMenu }: NavbarProps) {
  return (
    <nav style={{ viewTransitionName: "navbar" as any }} className="w-full bg-[#09090b] pt-10 pb-6 shrink-0">
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        
        {/* 1. Left Section: Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Custom SVG Icon */}
          <div className="w-10 h-10 md:w-12 md:h-12 text-white flex-shrink-0 -mt-1">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M10 30 C 5 20, 20 10, 35 15 C 30 35, 10 35, 10 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-heading text-[1.8rem] md:text-[2.4rem] leading-none pb-1 font-normal tracking-tight text-white group-hover:opacity-80 transition-opacity">
            tejjxuu
          </span>
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
