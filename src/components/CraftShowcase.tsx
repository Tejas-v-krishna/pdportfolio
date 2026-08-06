import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CraftShowcase() {
  const [activeTab, setActiveTab] = useState('components');
  
  return (
    <section className="py-24 border-t hairline-border bg-[#09090b]">
      <div className="max-w-[1920px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-zinc-500 mb-4">[ 03 — CAPABILITIES ]</div>
            <h2 className="font-heading text-4xl md:text-5xl uppercase font-bold tracking-tighter">Proof of Craft</h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-400 font-light text-sm">
              I don't just push pixels in Figma. I build functional, interactive systems that bridge the gap between design and engineering. 
            </p>
          </div>
        </div>

        <div className="border hairline-border bg-zinc-900/50 flex flex-col md:flex-row min-h-[400px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r hairline-border p-6 flex flex-col gap-4">
            <div className="font-mono text-[10px] text-zinc-500 mb-2">[ SYSTEM TOKENS ]</div>
            <button 
              onClick={() => setActiveTab('components')}
              className={`text-left font-tech text-xs tracking-widest uppercase transition-colors interactive ${activeTab === 'components' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              01. Components
            </button>
            <button 
              onClick={() => setActiveTab('motion')}
              className={`text-left font-tech text-xs tracking-widest uppercase transition-colors interactive ${activeTab === 'motion' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              02. Motion
            </button>
            <button 
              onClick={() => setActiveTab('typography')}
              className={`text-left font-tech text-xs tracking-widest uppercase transition-colors interactive ${activeTab === 'typography' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              Type Hierarchy
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 md:p-16 flex items-center justify-center relative overflow-hidden bg-[#09090b]">
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)' }}></div>
            
            {activeTab === 'components' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#18181b] border hairline-border p-8 shadow-2xl relative z-10 flex flex-col gap-6"
              >
                <div className="font-mono text-[10px] text-zinc-500">[ COMPONENT PREVIEW ]</div>
                <div className="flex flex-col gap-4">
                  <button className="bg-white text-black font-tech text-xs uppercase tracking-widest py-3 px-4 hover:bg-zinc-200 transition-colors interactive">
                    Primary Action
                  </button>
                  <button className="border hairline-border text-white font-tech text-xs uppercase tracking-widest py-3 px-4 hover:bg-white/5 transition-colors interactive">
                    Secondary Action
                  </button>
                  <div className="flex gap-4">
                    <input type="text" placeholder="Input Field" className="flex-1 bg-black/50 border hairline-border px-4 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors interactive cursor-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'motion' && (
              <div className="flex flex-col items-center gap-8 relative z-10">
                <div className="font-mono text-[10px] text-zinc-500">[ HOVER TO TEST SPRING PHYSICS ]</div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9, rotate: -90, borderRadius: "100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-32 h-32 bg-white interactive cursor-pointer flex items-center justify-center text-black font-mono text-xs font-bold"
                >
                  INTERACT
                </motion.div>
              </div>
            )}

            {activeTab === 'typography' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full relative z-10 space-y-6"
              >
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-1">[ DISPLAY / SYNE ]</div>
                  <h1 className="font-heading text-4xl font-bold uppercase">The quick brown fox</h1>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-1">[ SERIF / DM SERIF ]</div>
                  <h2 className="font-display text-3xl">Jumps over the lazy dog</h2>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-1">[ SANS / PLUS JAKARTA ]</div>
                  <p className="font-sans text-sm text-zinc-300">Design is not just what it looks like and feels like. Design is how it works.</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-zinc-500 mb-1">[ MONO / JETBRAINS ]</div>
                  <p className="font-mono text-xs text-zinc-300">console.log("Hello World");</p>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
