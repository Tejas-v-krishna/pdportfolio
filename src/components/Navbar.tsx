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
          {/* Main Logo Image */}
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10 md:h-12 object-contain"
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
