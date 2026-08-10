import { useEffect } from 'react';
import { motion } from 'framer-motion';
import StickyServicesScroll from './StickyServicesScroll';

interface ServicesPageProps {
  onBack: () => void;
}

export default function ServicesPage({ onBack }: ServicesPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500 selection:text-white"
    >
      {/* Floating Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b hairline-border px-4 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO HOME ]</span>
          </button>

          <div className="font-mono text-xs text-zinc-500 tracking-widest hidden md:block">
            SYSTEM // 3D STICKY SERVICES SCROLL
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="pt-12">
        <StickyServicesScroll onContactClick={onBack} />
      </main>
    </motion.div>
  );
}

