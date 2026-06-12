import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const footer = footerRef.current;
    if (!path || !footer) return;

    const down = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
    const center = 'M0-0.3C0-0.3,464,0,1139,0S2278-0.3,2278-0.3V683H0V-0.3z';

    // Set initial path
    gsap.set(path, { attr: { d: down } });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      toggleActions: 'play pause resume reverse',
      onEnter: (self) => {
        const velocity = self.getVelocity();
        // Clamp variation to avoid extreme values and maintain smooth elasticity
        const variation = gsap.utils.clamp(-0.5, 0.5, velocity / 10000);

        gsap.fromTo(path,
          { attr: { d: down } },
          {
            duration: 2,
            attr: { d: center },
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: 'auto'
          }
        );
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer relative w-full overflow-visible mt-20">
      {/* Wavy SVG Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          id="footer-img" 
          viewBox="0 0 2278 683" 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <path 
            ref={pathRef}
            id="bouncy-path" 
            d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z" 
            fill="#ffffff" 
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-20 pt-28 sm:pt-36 md:pt-44 pb-16 flex flex-col md:flex-row justify-between gap-12">
        {/* On Repeat */}
        <div>
          <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-4">On repeat</h3>
          <div className="w-[300px] h-[80px] bg-red-800 rounded-xl overflow-hidden flex items-center justify-center text-white opacity-80">
            {/* Spotify Widget Placeholder */}
            <span className="text-sm font-medium">Spotify Placeholder</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex gap-16 lg:gap-32">
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-1">Navigation</h3>
            <Link to="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Recent work</Link>
            <Link to="/play" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Fun Stuff</Link>
            <Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About me</Link>
            <a href="mailto:tejas@example.com" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-1">Links</h3>
            <a href="https://linkedin.com/in/tejas-v-krishna" className="text-sm opacity-70 hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Github</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Resume</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Medium</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: transparent;
        }
        .footer:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-blend-mode: color-dodge;
          background-image: url("https://assets.codepen.io/16327/noise.png");
          opacity: 0.04;
          pointer-events: none;
          z-index: 20;
        }
        #footer-img {
          height: 100%;
          width: 100%;
          display: block;
          overflow: visible;
        }
      `}</style>
    </footer>
  );
};
