import { useState } from 'react';
import StaggerText from './StaggerText';
import SplitTextReveal from './SplitTextReveal';
import { useIST } from '../hooks/useIST';

export default function Footer() {
  const time = useIST();
  const [copied, setCopied] = useState<boolean>(false);
  const email = "hello@tejasvkrishna.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="w-full bg-[#050505] text-white pt-10 pb-6 px-4 md:px-8 flex flex-col justify-between min-h-screen relative overflow-hidden select-none border-t border-[#1f1f22]">
      
      {/* =========================================================
          ROW 1: TOP HEADER BAR (Logo, Equalizer Bars, Nav Links)
          ========================================================= */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-white/10">
        
        {/* Left: Brand Name */}
        <div className="font-sans text-base md:text-lg font-medium tracking-tight text-white">
          <SplitTextReveal text="Tejas V Krishna" direction="bottom" mode="slide" splitBy="words" randomize={false} />
        </div>

        {/* Center: Equalizer / Audio Waveform Bars */}
        <div className="hidden md:flex items-center gap-1.5 opacity-90">
          <div className="h-2.5 w-20 bg-white"></div>
          <div className="h-2.5 w-28 bg-white"></div>
          <div className="h-2.5 w-12 bg-white"></div>
          <div className="h-2.5 w-4 bg-white"></div>
          <div className="h-2.5 w-4 bg-white"></div>
          <div className="h-2.5 w-4 bg-white"></div>
          <div className="h-2.5 w-4 bg-white"></div>
          <div className="h-2.5 w-2 bg-white"></div>
          <div className="h-2.5 w-2 bg-white"></div>
          <div className="h-2.5 w-2 bg-white"></div>
          <div className="h-2.5 w-1 bg-white"></div>
        </div>

        {/* Right: Quick Action Nav Links */}
        <div className="flex items-center gap-6 font-mono text-[10px] md:text-xs tracking-wider uppercase text-zinc-300">
          <a href="#work" className="hover:text-white transition-colors flex items-center gap-1 interactive">
            <span className="text-[9px]">►</span> <StaggerText text="WORK 4" />
          </a>
          <a href="#about" className="hover:text-white transition-colors flex items-center gap-1 interactive">
            <span className="text-[8px]">▫</span> <StaggerText text="ABOUT" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1 interactive">
            <span className="text-[8px]">▫</span> <StaggerText text="CONTACT" />
          </a>
        </div>
      </div>

      {/* =========================================================
          ROW 2: UPPER CONTENT GRID (Large Role Title + Direct Directory)
          ========================================================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 pb-20">
        
        {/* Left: Giant Role Headline */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <SplitTextReveal 
            text="UI/UX Designer + Product Builder"
            as="h2"
            direction="bottom"
            mode="slide"
            splitBy="chars"
            stagger={0.02}
            randomize={false}
            className="font-sans font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tighter text-white"
          />
        </div>

        {/* Right: Directory Grid (Menu, Get In Touch, Socials) */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Column 1: MENU */}
          <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-zinc-300">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[ MENU ]</span>
            <a href="#hero" className="hover:text-white transition-colors w-fit interactive group"><StaggerText text="Home" /></a>
            <a href="#work" className="hover:text-white transition-colors w-fit interactive group"><StaggerText text="Work" /></a>
            <a href="#philosophy" className="hover:text-white transition-colors w-fit interactive group"><StaggerText text="About" /></a>
            <a href="#contact" className="hover:text-white transition-colors w-fit interactive group"><StaggerText text="Contact" /></a>
          </div>

          {/* Column 2: GET IN TOUCH */}
          <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-zinc-300">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[ GET IN TOUCH ]</span>
            <a 
              href={`mailto:${email}`} 
              onClick={handleCopy}
              className="hover:text-white transition-colors w-fit relative interactive group"
              title="Click to copy email address"
            >
              <StaggerText text={email} />
              {copied && (
                <span className="absolute -top-7 left-0 bg-white text-black font-mono text-[9px] px-2 py-0.5 rounded shadow">
                  COPIED!
                </span>
              )}
            </a>
            <a href="tel:+919876543210" className="hover:text-white transition-colors w-fit interactive group">
              <StaggerText text="+91 98765 43210" />
            </a>
          </div>

          {/* Column 3: SOCIALS */}
          <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-zinc-300">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[ SOCIALS ]</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit flex items-center justify-between gap-4 interactive group">
              <StaggerText text="Instagram" />
              <span className="font-mono text-[10px]">↗</span>
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit flex items-center justify-between gap-4 interactive group">
              <StaggerText text="Dribbble" />
              <span className="font-mono text-[10px]">↗</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit flex items-center justify-between gap-4 interactive group">
              <StaggerText text="LinkedIn" />
              <span className="font-mono text-[10px]">↗</span>
            </a>
          </div>

        </div>

      </div>

      {/* =========================================================
          ROW 3: LOWER INFO BAR (Clock, Location, Policies, Progress Blocks)
          ========================================================= */}
      <div className="w-full flex flex-wrap justify-between items-end gap-6 pt-8 pb-4">
        
        {/* Left: Clock & Location */}
        <div className="font-mono text-[10px] md:text-xs tracking-wider text-zinc-400 uppercase leading-relaxed">
          <div>{time || '01:28:15 PM'}</div>
          <div>KERALA, IN</div>
        </div>

        {/* Center: Terms & Privacy */}
        <div className="font-mono text-[10px] md:text-xs tracking-wider text-zinc-400 uppercase flex flex-col sm:flex-row gap-2 sm:gap-6">
          <a href="#" className="hover:text-white transition-colors interactive">TERMS OF USE</a>
          <a href="#" className="hover:text-white transition-colors interactive">PRIVACY POLICY</a>
        </div>

        {/* Right: Progress Indicator Bar Blocks */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-3 w-28 md:w-36 bg-zinc-700"></div>
          <div className="h-3 w-8 md:w-12 bg-zinc-400"></div>
        </div>

      </div>

      {/* =========================================================
          ROW 4: MASSIVE OVERSIZED MARQUEE (Giant Name + Interlocking TVK Badge)
          ========================================================= */}
      <div className="w-full overflow-hidden py-4 border-t border-white/5 my-2">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-8 text-[11vw] sm:text-[12vw] md:text-[13vw] font-sans font-medium text-white tracking-tighter leading-none select-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span>Tejas V Krishna</span>
              
              {/* Interlocking Double Pill Outline TVK Badge (Replicating (D)(B) badge) */}
              <div className="inline-flex items-center mx-4 align-middle">
                <div className="flex items-center -space-x-3">
                  <div className="w-12 h-14 sm:w-16 sm:h-20 md:w-24 md:h-28 rounded-full border-2 border-zinc-500/80 flex items-center justify-center font-heading font-medium text-lg sm:text-2xl md:text-4xl text-zinc-300 bg-black/40">
                    T
                  </div>
                  <div className="w-12 h-14 sm:w-16 sm:h-20 md:w-24 md:h-28 rounded-full border-2 border-zinc-500/80 flex items-center justify-center font-heading font-medium text-lg sm:text-2xl md:text-4xl text-zinc-300 bg-black/40">
                    VK
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          ROW 5: VERY BOTTOM COPYRIGHT & CREDIT LINE
          ========================================================= */}
      <div className="w-full flex justify-between items-center pt-4 font-mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest border-t border-white/5">
        <div>© {new Date().getFullYear()} TEJAS V KRISHNA</div>
        <div>WEBSITE BY TEJAS STUDIO</div>
      </div>

    </footer>
  );
}

