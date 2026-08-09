import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

interface ServicesPageProps {
  onBack: () => void;
}

const SERVICES_LIST = [
  { num: '01', title: 'UI/UX & Web Design', desc: 'Crafting intuitive, high-performance interfaces.' },
  { num: '02', title: 'Logo Design', desc: 'Distinctive marks that anchor your brand.' },
  { num: '03', title: 'Brand Identity Builder', desc: 'Comprehensive visual systems and guidelines.' },
  { num: '04', title: 'Product Design', desc: 'End-to-end digital product architecture.' },
  { num: '05', title: 'Poster Design', desc: 'High-impact visual communication & editorial.' },
  { num: '06', title: 'Interior Design', desc: 'Spatial aesthetics and environmental branding.' },
  { num: '07', title: 'Web Development', desc: 'Robust engineering for scale and speed.' }
];

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
      {/* Sticky Floating Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b hairline-border px-4 md:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          
          <button 
            onClick={onBack}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>[ BACK TO HOME ]</span>
          </button>

          <div className="font-mono text-xs text-zinc-500 tracking-widest hidden md:block">
            SYSTEM // CORE CAPABILITIES
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-12 pt-24 pb-32">
        
        {/* Section 01: Hero Header */}
        <section className="mb-24">
          <div className="flex items-center gap-3 font-mono text-xs text-indigo-400 uppercase tracking-widest mb-6">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">CAPABILITIES</span>
            <span>•</span>
            <span>END TO END</span>
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl md:text-9xl uppercase font-bold tracking-tighter mb-8 leading-[0.9]">
            <SplitTextReveal text="CORE SERVICES" as="span" direction="top" mode="blur" />
          </h1>
          
          <p className="max-w-2xl text-zinc-400 font-sans text-lg md:text-xl leading-relaxed mt-12">
            A specialized suite of design and engineering capabilities aimed at elevating digital products, brand identities, and physical environments.
          </p>
        </section>

        {/* Section 02: Interactive Services List */}
        <section className="border-t hairline-border">
          {SERVICES_LIST.map((service, index) => (
            <motion.div 
              key={service.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b hairline-border hover:bg-white/[0.02] transition-colors cursor-crosshair px-4 md:px-8 -mx-4 md:-mx-8"
            >
              <div className="flex items-start md:items-center gap-6 md:gap-16">
                <span className="font-mono text-sm md:text-base text-zinc-600 group-hover:text-indigo-400 transition-colors mt-2 md:mt-0">
                  [{service.num}]
                </span>
                <h2 className="font-heading text-4xl md:text-6xl uppercase font-medium tracking-tight group-hover:text-white text-zinc-300 transition-colors">
                  {service.title}
                </h2>
              </div>
              
              <div className="mt-6 md:mt-0 md:w-1/3 text-zinc-500 font-sans text-base md:text-lg pl-14 md:pl-0 group-hover:text-zinc-300 transition-colors">
                {service.desc}
              </div>
            </motion.div>
          ))}
        </section>

      </main>
    </motion.div>
  );
}
