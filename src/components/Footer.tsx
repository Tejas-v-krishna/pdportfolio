import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState<boolean>(false);
  const email = "hello@tejasvkrishna.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact" 
      className="w-full bg-[#09090b] text-white min-h-[92vh] flex flex-col justify-between pt-16 md:pt-24 pb-4 md:pb-6 px-6 md:px-12 relative overflow-hidden select-none border-t hairline-border"
    >
      {/* =========================================================
          TOP SECTION: Hook & CTA (Left) + Nav & Socials (Right)
          ========================================================= */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Left: Headline & Button */}
        <div className="flex flex-col items-start gap-6 max-w-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Relax. We got you.
          </h2>

          <a 
            href={`mailto:${email}`}
            className="px-6 py-2.5 rounded-xl border border-white/20 hover:border-white text-xs sm:text-sm text-white hover:bg-white hover:text-black transition-all duration-300 interactive cursor-pointer"
          >
            Take a seat
          </a>
        </div>

        {/* Right: Nav & Socials Columns */}
        <div className="flex gap-16 sm:gap-24 text-xs sm:text-sm">
          {/* Nav Column */}
          <div className="flex flex-col gap-2.5 text-zinc-400">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors text-left interactive cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('#work')}
              className="hover:text-white transition-colors text-left interactive cursor-pointer"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('#philosophy')}
              className="hover:text-white transition-colors text-left interactive cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('#reviews')}
              className="hover:text-white transition-colors text-left interactive cursor-pointer"
            >
              Services & Models
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="hover:text-white transition-colors text-left interactive cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col gap-2.5 text-zinc-400">
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1.5 interactive"
            >
              <span>X</span>
              <span className="text-[10px]">↗</span>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1.5 interactive"
            >
              <span>Instagram</span>
              <span className="text-[10px]">↗</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1.5 interactive"
            >
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>

      </div>

      {/* =========================================================
          MIDDLE SECTION: Locations (Left) + Email & Copyright (Right)
          ========================================================= */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-16 md:pt-24 pb-6 text-xs sm:text-sm text-zinc-400 font-light">
        
        {/* Left: Location */}
        <div className="flex flex-col leading-snug">
          <span>Kerala—India</span>
          <span className="text-zinc-500">Worldwide—Remote</span>
        </div>

        {/* Right: Email & Legal */}
        <div className="flex items-center gap-8 sm:gap-14">
          <button 
            onClick={handleCopy}
            className="hover:text-white transition-colors relative interactive cursor-pointer"
            title="Click to copy email address"
          >
            <span>{email}</span>
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-black font-sans text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>

          <span className="text-zinc-500">
            ©{new Date().getFullYear()} legal
          </span>
        </div>

      </div>

      {/* =========================================================
          BOTTOM SECTION: Giant Full-Width Wordmark Anchor
          ========================================================= */}
      <div className="w-full overflow-hidden leading-none pt-2 -mb-2 md:-mb-4 border-t border-white/5">
        <h1 className="text-[clamp(3.8rem,14.5vw,17.5rem)] font-normal tracking-[-0.04em] text-white/95 lowercase leading-[0.78] select-none text-center sm:text-left py-1 overflow-visible">
          tejas krishna
        </h1>
      </div>

    </footer>
  );
}
