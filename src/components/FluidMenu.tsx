import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface MenuItem {
  label: string;
  link: string;
  type: 'scroll' | 'route';
  targetId?: string;
}

const LogoText = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <span className="relative inline-grid grid-cols-1 grid-rows-1 h-[1.2em] overflow-hidden leading-none font-display font-medium text-xl tracking-tight transition-colors duration-300">
      {/* Original Text */}
      <span className="block row-start-1 col-start-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        tejjxuu.ui
      </span>
      {/* Target Roll Text */}
      <span 
        className={`block row-start-1 col-start-1 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 font-body text-[11px] tracking-[0.2em] uppercase font-medium py-[2px] whitespace-nowrap ${
          isOpen ? 'text-black/40' : 'text-black/50'
        }`}
      >
        product.designer
      </span>
    </span>
  );
};

export const FluidMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 580, h: 800 });
  const navigate = useNavigate();
  const location = useLocation();

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const menuItems: MenuItem[] = [
    { label: 'works', link: '/', type: 'scroll', targetId: 'work' },
    { label: 'play', link: '/play', type: 'route' },
    { label: 'about', link: '/about', type: 'route' },
    { label: 'notes', link: '/notes', type: 'route' },
    { label: 'contact', link: '/', type: 'scroll', targetId: 'contact' },
  ];

  const socialLinks = [
    { icon: <svg className="w-[18px] h-[18px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>, link: 'https://instagram.com' },
    { icon: <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, link: 'https://twitter.com' },
    { icon: <span className="font-sans font-bold text-xs leading-none">Bē</span>, link: 'https://behance.net' },
    { icon: <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, link: 'https://linkedin.com/in/tejas-v-krishna' }
  ];

  // Dynamically calculate paths based on width and height
  const getPaths = useCallback((w: number, h: number) => {
    const r = 28; // Card corner radius
    const cx = w - 40; // Menu button X position
    const cy = 24; // Menu button Y position

    // 1. Collapsed to the menu button (top-right corner)
    const closed = `M ${cx} ${cy} L ${cx} ${cy} Q ${cx} ${cy} ${cx} ${cy} L ${cx} ${cy} Q ${cx} ${cy} ${cx} ${cy} L ${cx} ${cy} Q ${cx} ${cy} ${cx} ${cy} L ${cx} ${cy} Q ${cx} ${cy} ${cx} ${cy} Z`;

    // 2. Beautiful rounded rectangle card
    const open = `M ${r} 0 L ${w - r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0 Z`;

    return { closed, open };
  }, []);

  // Update card dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const w = isMobile ? window.innerWidth - 32 : 540;
      const h = isMobile ? window.innerHeight - 32 : window.innerHeight - 48;
      setDimensions({ w, h });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    const paths = getPaths(dimensions.w, dimensions.h);

    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Reset visibility before animating
    gsap.set(backdropRef.current, { display: 'block' });
    gsap.set(cardWrapperRef.current, { display: 'block' });

    // 1. Backdrop fade and blur
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, 0);

    // 2. Hide toggle button
    tl.to(toggleBtnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: 'power2.inOut'
    }, 0);

    // 3. Fluid Expansion: Closed (collapsed at menu button) -> Open (rounded rectangle card)
    tl.to(pathRef.current, {
      attr: { d: paths.open },
      duration: 0.85,
      ease: 'elastic.out(1, 0.85)'
    }, 0);

    // 4. Staggered reveal of card contents (delayed slightly to align with fluid flow)
    tl.fromTo('.fluid-menu-item',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 },
      0.4
    );

    tl.fromTo(['.fluid-menu-close', '.fluid-menu-email', '.fluid-menu-social-btn'],
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', stagger: 0.04 },
      0.5
    );
  }, [dimensions, getPaths]);

  const handleClose = useCallback(() => {
    const paths = getPaths(dimensions.w, dimensions.h);

    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        gsap.set(backdropRef.current, { display: 'none' });
        gsap.set(cardWrapperRef.current, { display: 'none' });
      }
    });
    timelineRef.current = tl;

    // 1. Collapse SVG path back to right
    tl.to(pathRef.current, {
      attr: { d: paths.closed },
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0);

    // 2. Fade out backdrop
    tl.to(backdropRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.05);

    // 3. Fade back in toggle button
    tl.to(toggleBtnRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.15);

    // 4. Fade out card items
    tl.to('.fluid-menu-item, .fluid-menu-close, .fluid-menu-email, .fluid-menu-social-btn', {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in'
    }, 0);
  }, [dimensions, getPaths]);

  // Handle scroll lock (Lenis & body overflow)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  // Close menu on click outside card
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cardWrapperRef.current && 
        !cardWrapperRef.current.contains(e.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

  // Set initial path state
  useEffect(() => {
    if (pathRef.current && !isOpen) {
      const paths = getPaths(dimensions.w, dimensions.h);
      gsap.set(pathRef.current, { attr: { d: paths.closed } });
    }
  }, [dimensions, getPaths, isOpen]);

  const handleItemClick = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    
    // Close the menu
    handleClose();

    if (item.type === 'scroll' && item.targetId) {
      if (location.pathname === '/') {
        // Scroll directly if already on Home
        const target = document.getElementById(item.targetId);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      } else {
        // Navigate to Home, then scroll
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(item.targetId!);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 550); // Small delay for route transition
      }
    } else {
      navigate(item.link);
    }
  };

  return (
    <>
      {/* Global Fixed Header (raised z-index to sit on top of the menu card and prevent clipping) */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 bg-transparent pointer-events-none z-[1010]">
        {/* Logo */}
        <div className="pointer-events-auto select-none">
          <Link 
            to="/" 
            className="no-underline text-black hover:text-black/85 transition-colors group cursor-pointer inline-block"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
          >
            <LogoText isOpen={isOpen} />
          </Link>
        </div>

        {/* Menu Toggle Button */}
        <button
          ref={toggleBtnRef}
          onClick={handleOpen}
          className={`bg-transparent border-0 cursor-pointer font-body text-sm font-semibold uppercase tracking-[0.2em] text-black hover:opacity-60 transition-all py-3 -my-3 flex items-center gap-2 ${
            isOpen ? 'pointer-events-none select-none opacity-0' : 'pointer-events-auto'
          }`}
          aria-label="Open menu"
        >
          <span>menu</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black block" />
        </button>
      </header>

      {/* Dark Blurred Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[995] pointer-events-auto"
        style={{ display: 'none', opacity: 0 }}
        onClick={handleClose}
      />

      {/* Floating White Card Modal */}
      <div
        ref={cardWrapperRef}
        className="fixed z-[1000] pointer-events-auto"
        style={{
          display: 'none',
          top: window.innerWidth <= 768 ? '16px' : '24px',
          right: window.innerWidth <= 768 ? '16px' : '24px',
          bottom: window.innerWidth <= 768 ? '16px' : '24px',
          width: `${dimensions.w}px`,
          height: `${dimensions.h}px`,
        }}
      >
        {/* Morphing SVG Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg
            className="w-full h-full filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.15)]"
            viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
            style={{ overflow: 'visible' }}
          >
            <path ref={pathRef} fill="#FFFFFF" />
          </svg>
        </div>

        {/* Card Content Layer */}
        <div 
          className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-12 md:p-14"
        >
          {/* Top Row: Close Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={handleClose}
              className="fluid-menu-close flex items-center gap-3 cursor-pointer group text-black font-body text-xs tracking-widest uppercase font-semibold border-0 bg-transparent"
              aria-label="Close menu"
            >
              <span className="opacity-60 group-hover:opacity-100 transition-opacity lowercase font-normal text-base">close</span>
              <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-90 duration-300">
                <X size={15} strokeWidth={2.5} />
              </span>
            </button>
          </div>

          {/* Middle Row: Navigation Links */}
          <div className="flex flex-col items-start gap-4 sm:gap-6 my-auto">
            <nav className="flex flex-col items-start menu-links-container w-full">
              {menuItems.map((item) => {
                const isActive = 
                  (item.link === '/' && location.pathname === '/' && !isOpen) || 
                  (item.link !== '/' && location.pathname.startsWith(item.link));

                return (
                  <div key={item.label} className="overflow-hidden py-1 w-full">
                    <a
                      href={item.link}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`fluid-menu-item relative text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.05] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] inline-block no-underline font-body select-none lowercase ${
                        isActive ? 'text-black font-semibold' : 'text-black/45 hover:text-black hover:translate-x-4'
                      }`}
                    >
                      {item.label}
                    </a>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Row: Contact Email and Social Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full border-t border-black/5 pt-6 sm:pt-8">
            {/* Email Address */}
            <div className="fluid-menu-email">
              <a
                href="mailto:tejaskrishna2018@gmail.com"
                className="text-black/85 hover:text-black text-sm sm:text-base font-body tracking-wide no-underline transition-colors border-b border-black/10 hover:border-black py-0.5"
              >
                tejaskrishna2018@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fluid-menu-social-btn w-10 h-10 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 border border-transparent hover:border-black/15 shadow-sm"
                  aria-label={`Visit our page`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Dynamic link stagger dimming on hover */
        .menu-links-container:hover .fluid-menu-item:not(:hover) {
          opacity: 0.3;
          transform: scale(0.97);
        }
      `}</style>
    </>
  );
};

export default FluidMenu;
