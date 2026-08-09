import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white"
    >
      {/* Sticky Floating Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-[#323232]/30 px-4 md:px-8 py-4">
        <div className="w-full flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO HOME ]</span>
          </button>

          <div className="font-mono text-xs text-zinc-500 tracking-widest hidden md:block">
            SYSTEM // INQUIRIES
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="w-full pt-20">
        <Footer />
      </main>
    </motion.div>
  );
}
