import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!menuPanelRef.current || !backdropRef.current) return;

    // Set initial position off-screen via GSAP to avoid conflict with Tailwind v4's CSS translate property
    gsap.set(menuPanelRef.current, { xPercent: 100 });

    // Create slide-in GSAP timeline
    const tl = gsap.timeline({ paused: true })
      // 1. Fade in backdrop overlay
      .to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, 0)
      // 2. Slide in drawer from right
      .to(menuPanelRef.current, { 
        xPercent: 0, 
        duration: 0.65, 
        ease: 'power3.inOut' 
      }, 0)
      // 3. Stagger slide-up, fade-in and de-blur of main navigation links
      .fromTo('.drawer-link-item',
        { y: 45, opacity: 0, filter: 'blur(10px)' },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 0.65, 
          ease: 'power3.out', 
          stagger: 0.07 
        },
        0.25
      )
      // 4. Fade in secondary elements (socials, cta button)
      .fromTo('.drawer-secondary-item',
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'power2.out',
          stagger: 0.08
        },
        0.45
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
      document.body.style.overflow = ''; // Restore page scrolling on unmount
    };
  }, []);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      tlRef.current?.play();
      document.body.style.overflow = 'hidden'; // Disable scroll when open
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = ''; // Enable scroll when closed
    }
  };

  const handleLinkClick = (path: string, label: string) => {
    toggleMenu();
    
    if (label === 'Work' && window.location.pathname === '/') {
      const workSec = document.getElementById('work');
      if (workSec) {
        setTimeout(() => {
          workSec.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    } else {
      navigate(path);
    }
  };

  const menuLinks = [
    { label: 'Work', path: '/' },
    { label: 'Play', path: '/play' },
    { label: 'About', path: '/about' },
    { label: 'Notes', path: '/notes' },
  ];

  return (
    <>
      {/* 1. Minimal Fixed Header Bar (Always Visible) */}
      <header className="fixed top-0 inset-x-0 z-[800] px-6 sm:px-12 md:px-16 lg:px-20 py-8 flex items-center justify-between pointer-events-none select-none">
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => { if (isOpen) toggleMenu(); }}
          className="pointer-events-auto font-display font-bold text-xl text-[var(--color-text-dark)] tracking-tight hover:opacity-75 transition-opacity lowercase"
        >
          tejas.
        </Link>

        {/* Menu Trigger */}
        <button 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="pointer-events-auto flex items-center gap-1.5 text-[var(--color-text-dark)] hover:text-black transition-colors focus:outline-none cursor-pointer"
        >
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Menu</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block">
            <path d="M7 1V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M13 5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

      </header>

      {/* 2. Backdrop Blur Overlay */}
      <div 
        ref={backdropRef}
        onClick={toggleMenu}
        className="fixed inset-0 z-[900] bg-black/40 backdrop-blur-[4px] opacity-0 pointer-events-none transition-shadow duration-300"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* 3. Slide-In Menu Drawer */}
      <div 
        ref={menuPanelRef}
        className="fixed top-0 right-0 bottom-0 h-screen w-full sm:w-[480px] md:w-[500px] z-[1000] bg-[#0E0F0E] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col justify-between"
      >
        {/* Drawer Header (Close Button) */}
        <div className="pt-16 px-12 md:px-20 flex justify-end">
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase font-mono text-[10px] tracking-widest cursor-pointer select-none focus:outline-none"
          >
            <span>Close</span>
            <span className="text-xs">✕</span>
          </button>
        </div>

        {/* Content Wrapper (Centered Vertically) */}
        <div className="px-12 md:px-20 py-8 flex-grow flex flex-col justify-center gap-12 sm:gap-14">
          
          {/* Main Navigation Links */}
          <nav className="flex flex-col gap-4 sm:gap-5">
            {menuLinks.map((link, idx) => (
              <div key={idx} className="overflow-hidden py-1">
                <button
                  onClick={() => handleLinkClick(link.path, link.label)}
                  className="drawer-link-item block font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white hover:text-[#E2FF3B] hover:translate-x-3 text-left transition-all duration-300 ease-out focus:outline-none cursor-pointer"
                >
                  {link.label}
                </button>
              </div>
            ))}
          </nav>

          {/* Secondary Links & Call-To-Action */}
          <div className="flex flex-col gap-8">
            
            {/* Social Media Links */}
            <div className="flex flex-col gap-2.5">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="drawer-secondary-item text-[10px] tracking-widest font-mono text-white/40 hover:text-[#E2FF3B] transition-colors uppercase w-fit block"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="drawer-secondary-item text-[10px] tracking-widest font-mono text-white/40 hover:text-[#E2FF3B] transition-colors uppercase w-fit block"
              >
                LINKEDIN
              </a>
            </div>

            {/* Yellow Notched CTA Button */}
            <a 
              href="/resume.pdf"
              download="Tejas_Resume.pdf"
              onClick={toggleMenu}
              className="drawer-secondary-item bg-[#E2FF3B] text-black font-body font-bold text-xs py-4 px-7 hover:opacity-90 tracking-widest uppercase transition-opacity w-fit block text-center shadow-lg shadow-black/20"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
            >
              DOWNLOAD RESUME
            </a>

          </div>
        </div>

        {/* Footer Metadata */}
        <div className="px-12 md:px-20 pb-16 mt-auto flex justify-between text-[9px] tracking-widest text-white/20 uppercase font-mono">
          <span>©2026 TEJAS</span>
          <span>MUMBAI, IN</span>
        </div>

      </div>
    </>
  );
};
