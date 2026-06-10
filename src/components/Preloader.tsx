import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Initial state
    gsap.set(".preloader-logo-line", { opacity: 0, y: 40 });
    gsap.set(subRef.current, { opacity: 0, y: 15 });

    // Animation sequence
    tl.to(".preloader-logo-line", {
      opacity: 1,
      y: 0,
      duration: 1.6,
      ease: 'power4.out',
      stagger: 0.18,
      delay: 0.4
    })
    .to(subRef.current, {
      opacity: 0.5,
      y: 0,
      duration: 1.2,
      ease: 'power4.out'
    }, '-=1.0')
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.8,
      ease: 'expo.inOut',
      delay: 0.8 // Duration of display before exit
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white pointer-events-auto"
    >
      <div className="flex flex-col items-center text-center px-4">
        
        {/* Logo */}
        <div ref={logoRef} className="mb-4">
          <span className="preloader-logo-line font-display font-bold text-3xl sm:text-4xl leading-[0.9] text-white lowercase tracking-tight block">
            tejas.
          </span>
          <span className="preloader-logo-line font-display font-bold text-3xl sm:text-4xl leading-[0.9] text-white lowercase tracking-tight block mt-0.5">
            designs
          </span>
        </div>

        {/* Subtitle */}
        <div ref={subRef}>
          <span className="font-body text-xs text-white opacity-50 tracking-widest uppercase font-mono">
            Product designer
          </span>
        </div>

      </div>
    </div>
  );
};
