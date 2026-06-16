import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const connector = connectorRef.current;
    const circle = circleRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      // Entrance animations for footer elements
      gsap.fromTo(leftCard, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom-=50',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(rightCard, 
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom-=50',
            toggleActions: 'play none none none',
          }
        }
      );

      if (connector) {
        gsap.fromTo(connector,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom-=50',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      if (circle) {
        gsap.fromTo(circle,
          { scale: 0.7, opacity: 0, transformOrigin: 'center center' },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom-=50',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer relative w-full bg-[var(--color-text-dark)] text-[var(--color-base)] font-body overflow-hidden">
      
      {/* 1. Geometric Collage Banner Section */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-16 pb-12 flex flex-col gap-3">
        
        {/* Body Grid */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          
          {/* Left Card: 38% width */}
          <div 
            ref={leftCardRef}
            className="w-full md:w-[38%] bg-[var(--color-base)] rounded-2xl aspect-[1.4/1] relative flex items-center justify-center p-8 overflow-hidden select-none"
          >
            {/* Animated SVG Bee Sticker */}
            <div className="bee-container cursor-pointer">
              <svg width="64" height="64" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="bee-svg">
                {/* Sting */}
                <path d="M12 34L4 36L10 28Z" fill="#000000" />
                {/* Body (Pink/Peach Oval) */}
                <ellipse cx="28" cy="28" rx="18" ry="12" transform="rotate(-15 28 28)" fill="#E8CFC4" />
                {/* Stripes (Black) */}
                <path d="M22 17.5C24.5 17 27.5 17 30 17.5L26 38.5C23.5 38.5 20.5 38 18 36.5L22 17.5Z" fill="#000000" />
                <path d="M32 18.5C34.5 19 37.5 20 39 21.5L31 38.5C29.5 37.5 26.5 36 25 34.5L32 18.5Z" fill="#000000" />
                {/* Head */}
                <circle cx="43" cy="24" r="7" fill="#000000" />
                {/* Antennae */}
                <path d="M43 18C43 14 46 12 48 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="48" cy="12" r="1.5" fill="#000000" />
                <path d="M41 18C40 13 42 10 44 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="44" cy="9" r="1.5" fill="#000000" />
                {/* Wings */}
                <ellipse cx="22" cy="12" rx="6" ry="12" transform="rotate(25 22 12)" fill="rgba(255, 255, 255, 0.7)" stroke="#000000" strokeWidth="1.2" className="wing back-wing" />
                <ellipse cx="28" cy="8" rx="7" ry="14" transform="rotate(10 28 8)" fill="rgba(255, 255, 255, 0.85)" stroke="#000000" strokeWidth="1.2" className="wing front-wing" />
                {/* Eye */}
                <circle cx="45" cy="22" r="1" fill="#ffffff" />
                {/* Smile */}
                <path d="M45 25C44.5 25.8 43.5 25.8 43 25.2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Middle Spacer: 14% width */}
          <div className="hidden md:flex md:w-[14%] relative items-center justify-center">
            {/* Connector Line */}
            <div 
              ref={connectorRef}
              className="w-full h-3 bg-[var(--color-base)] rounded-full" 
            />
          </div>

          {/* Right Card: 48% width */}
          <div 
            ref={rightCardRef}
            className="w-full md:w-[48%] bg-[#1c1917] rounded-2xl aspect-[1.6/1] relative overflow-hidden border border-white/5"
          >
            {/* Large cream circle forming the curve */}
            <div 
              ref={circleRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full bg-[var(--color-base)]" 
            />
            {/* Dark cutout circle on bottom right */}
            <div className="absolute right-[-15%] bottom-[-15%] w-[45%] h-[45%] rounded-full bg-[#1c1917] border-t border-l border-white/5 z-10" />
          </div>

        </div>

      </div>

      {/* 2. Links and Addresses Section */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-16 pb-10 border-t border-white/10 flex flex-col gap-16">
        
        {/* Link Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-3">
            <Link to="/studio" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Studio</Link>
            <Link to="/spaces" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Spaces</Link>
            <Link to="/the-buzz" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">The Buzz</Link>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <Link to="/dear-honey" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Dear Honey</Link>
            <Link to="/press-room" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Press Room</Link>
            <Link to="/contact" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Get in Touch</Link>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-2">
            <a 
              href="https://instagram.com/houseofhoney" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
            <span className="text-xs opacity-50 font-normal">@houseofhoney</span>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-2">
            <Link to="/careers" className="text-[15px] font-medium tracking-wide hover:opacity-70 transition-opacity">Careers</Link>
            <a href="mailto:jobs@houseofhoney.com" className="text-xs opacity-50 hover:opacity-70 transition-opacity font-normal break-all">
              jobs@houseofhoney.com
            </a>
          </div>

        </div>

        {/* Address Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 text-xs tracking-wider opacity-60 leading-relaxed font-light">
          <div>
            1518 Mission Street,<br />
            South Pasadena, CA, 91030
          </div>
          <div>
            525 San Ysidro Rd,<br />
            Montecito, CA, 93108
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          
          {/* Copyright */}
          <div className="text-[10px] tracking-[0.2em] uppercase opacity-40 font-medium text-center sm:text-left">
            © HOUSE OF HONEY 2026. ALL RIGHTS RESERVED.
          </div>

          {/* Privacy Button */}
          <Link 
            to="/privacy" 
            className="bg-[var(--color-base)] text-[var(--color-text-dark)] px-5 py-2.5 rounded-lg text-xs font-semibold hover:opacity-95 transition-opacity"
          >
            Privacy Policy
          </Link>

        </div>

      </div>

      <style>{`
        .footer:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-blend-mode: color-dodge;
          background-image: url("https://assets.codepen.io/16327/noise.png");
          opacity: 0.02;
          pointer-events: none;
          z-index: 20;
        }

        /* Float animation for the bee */
        @keyframes float {
          0% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-8px) rotate(-12deg); }
          100% { transform: translateY(0px) rotate(-15deg); }
        }

        .bee-container {
          animation: float 4s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          filter: drop-shadow(2px 5px 6px rgba(0,0,0,0.08));
        }

        .bee-container:hover {
          transform: scale(1.15) rotate(-5deg);
          filter: drop-shadow(4px 8px 12px rgba(0,0,0,0.12));
        }

        /* Wing flap animation on hover */
        @keyframes flap-front {
          0% { transform: rotate(10deg) scaleY(1); }
          50% { transform: rotate(35deg) scaleY(0.25); }
          100% { transform: rotate(10deg) scaleY(1); }
        }

        @keyframes flap-back {
          0% { transform: rotate(25deg) scaleY(1); }
          50% { transform: rotate(45deg) scaleY(0.25); }
          100% { transform: rotate(25deg) scaleY(1); }
        }

        .bee-container:hover .front-wing {
          animation: flap-front 0.08s linear infinite;
          transform-origin: 28px 16px;
        }

        .bee-container:hover .back-wing {
          animation: flap-back 0.08s linear infinite;
          transform-origin: 22px 18px;
        }
      `}</style>

    </footer>
  );
};
