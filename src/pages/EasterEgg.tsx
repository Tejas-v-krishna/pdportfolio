import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextReveal } from '../hooks/useTextReveal';

gsap.registerPlugin(ScrollTrigger);

const Vault = ({ isRevealed }: { isRevealed: boolean }) => {
  const vaultRef = useRef<HTMLDivElement>(null);
  const vaultHeadingRef = useRef<HTMLHeadingElement>(null);

  useTextReveal(vaultHeadingRef, { start: 'top 85%', duration: 0.9 });
  
  useEffect(() => {
    if (!isRevealed || !vaultRef.current) return;
    const images = vaultRef.current.querySelectorAll('.vault-image');
    
    images.forEach((img) => {
      gsap.fromTo(img,
        { opacity: 0, y: 50, filter: 'grayscale(100%) blur(5px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'grayscale(100%) blur(0px)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        }
      );
    });
  }, [isRevealed]);

  if (!isRevealed) return null;

  return (
    <div ref={vaultRef} className="w-full max-w-5xl mx-auto px-6 py-32 border-t border-white/10 mt-32">
      <div className="text-center mb-24">
        <h2 ref={vaultHeadingRef} className="font-body text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
          DIRECTOR'S CUT
        </h2>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40">
          The Vault — Early concepts and blueprints
        </p>
      </div>

      <div className="flex flex-col gap-32">
        <div className="vault-image relative group w-full aspect-[16/9] bg-white/5 overflow-hidden">
          <img src="/assets/vault-1.png" alt="Wireframe Sketch" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <div className="absolute bottom-4 left-4 font-body text-[9px] tracking-[0.2em] text-white/50 bg-black/50 px-3 py-1 uppercase backdrop-blur-sm border border-white/10">01 / Wireframe Sketch</div>
        </div>

        <div className="vault-image relative group w-full aspect-[16/9] bg-white/5 overflow-hidden">
          <img src="/assets/vault-2.png" alt="UI Blueprint" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <div className="absolute bottom-4 left-4 font-body text-[9px] tracking-[0.2em] text-white/50 bg-black/50 px-3 py-1 uppercase backdrop-blur-sm border border-white/10">02 / Architecture Blueprint</div>
        </div>

        <div className="vault-image relative group w-full aspect-[16/9] bg-white/5 overflow-hidden">
          <img src="/assets/vault-3.png" alt="Design System" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <div className="absolute bottom-4 left-4 font-body text-[9px] tracking-[0.2em] text-white/50 bg-black/50 px-3 py-1 uppercase backdrop-blur-sm border border-white/10">03 / Core Systems</div>
        </div>
      </div>
      
      <div className="mt-32 text-center pb-16">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/80 transition-colors duration-300"
        >
          [ Return to Top ]
        </button>
      </div>
    </div>
  );
};

const Manifesto = ({ onRevealVault }: { onRevealVault: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const lines = containerRef.current.querySelectorAll('.manifesto-line');
      
      // Initial fade in for the container
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Staggered reveal for the text lines
      gsap.fromTo(
        lines,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-6 opacity-0 min-h-screen flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center gap-6 md:gap-8 font-body text-white/80 leading-relaxed text-sm md:text-lg lg:text-xl font-thin">
        <p className="manifesto-line opacity-0">Design is not just what it looks like and feels like.</p>
        <p className="manifesto-line opacity-0">Design is how it works.</p>
        <p className="manifesto-line opacity-0">True minimalism isn't the absence of elements, but the presence of purpose. We strip away the unnecessary so the essential may speak.</p>
        <p className="manifesto-line opacity-0">Every pixel must justify its existence. Every interaction must feel profoundly intentional.</p>
        <p className="manifesto-line opacity-0 italic text-white/50">Thank you for exploring the hidden layer of my portfolio.</p>
        
        <div className="manifesto-line opacity-0 mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-8 w-full max-w-md mx-auto">
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 font-semibold">Tejas V Krishna</span>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              to="/" 
              className="inline-block relative overflow-hidden group py-3 px-6 border border-white/10 hover:border-white/30 transition-colors duration-300 text-center"
            >
              <span className="relative z-10 font-body text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                Return to Surface
              </span>
            </Link>
            <button 
              onClick={onRevealVault}
              className="inline-block relative overflow-hidden group py-3 px-6 border border-white/20 hover:border-white/80 transition-colors duration-300 text-center"
            >
              <span className="relative z-10 font-body text-[10px] tracking-[0.2em] uppercase text-white/80 group-hover:text-black transition-colors duration-300 font-bold">
                Enter The Vault ↓
              </span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EasterEgg = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [vaultRevealed, setVaultRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const restrictedRef = useRef<HTMLHeadingElement>(null);

  useTextReveal(restrictedRef, { start: 'top 80%', duration: 0.9, once: true });

  const handleRevealVault = () => {
    setVaultRevealed(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Scroll to top on mount just in case
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    
    if (trimmed === 'crack' || trimmed === 'open' || trimmed === 'tejjxuu') {
      setError(false);
      // Remove buggy GSAP out-animation and instantly unlock to prevent getting stuck
      setUnlocked(true);
      window.scrollTo(0, 0);
    } else {
      setError(true);
      setInput('');
      
      // Shake animation on error
      if (inputRef.current) {
        gsap.fromTo(inputRef.current, 
          { x: -10 }, 
          { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.set(inputRef.current, { x: 0 }) }
        );
      }
    }
  };

  return (
    <div className={`relative w-full min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black z-10 flex flex-col`}>
      {unlocked ? (
        <div className="w-full flex-grow flex flex-col pb-32">
          <Manifesto onRevealVault={handleRevealVault} />
          <Vault isRevealed={vaultRevealed} />
        </div>
      ) : (
        <div className="w-full flex-grow px-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-lg mb-24">
            <div className="text-center mb-12">
              <h1 ref={restrictedRef} className="font-body text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                RESTRICTED AREA
              </h1>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40">
                Enter passcode to continue
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col items-center w-full max-w-xs mx-auto relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="PASSCODE"
                className={`w-full bg-transparent border-b ${error ? 'border-red-500 text-red-500' : 'border-white/30 text-white'} outline-none text-center font-body text-sm tracking-[0.5em] uppercase py-3 transition-colors duration-300 placeholder:text-white/20`}
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <button type="submit" className="hidden">Submit</button>
            </form>

            <div className="mt-16 text-center">
              <Link 
                to="/" 
                className="font-body text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

