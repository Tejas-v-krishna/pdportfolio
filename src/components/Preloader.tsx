import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onTransitionStart: () => void;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onTransitionStart, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Capture current props in a ref to avoid recreating the timeline when callbacks change
  const callbacksRef = useRef({ onTransitionStart, onComplete });
  useEffect(() => {
    callbacksRef.current = { onTransitionStart, onComplete };
  }, [onTransitionStart, onComplete]);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling
        document.body.style.overflow = '';
        callbacksRef.current.onComplete();
      }
    });

    // Initial state (blurred and GPU accelerated to prevent text wobbling)
    gsap.set(".preloader-logo-line", { opacity: 0, filter: 'blur(25px)', force3D: true });
    gsap.set(subRef.current, { opacity: 0, filter: 'blur(12px)', force3D: true });

    // Animation sequence (blur-in focus transition)
    tl.to(".preloader-logo-line", {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'power3.out',
      stagger: 0.2,
      delay: 0.4,
      force3D: true
    })
    .to(subRef.current, {
      opacity: 0.55,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power3.out',
      force3D: true
    }, '-=1.2')
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.8,
      ease: 'expo.inOut',
      delay: 1.1, // Duration of display before exit
      onStart: () => {
        callbacksRef.current.onTransitionStart();
      }
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []); // Run exactly once on mount to prevent any timeline resets

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white pointer-events-auto"
    >
      <div className="flex flex-col items-center text-center px-4">
        
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <span className="preloader-logo-line font-display font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.85] text-white lowercase tracking-tight block">
            tejjxuu.ui
          </span>
        </div>

        {/* Subtitle */}
        <div ref={subRef}>
          <span className="font-body text-sm sm:text-base text-white opacity-55 tracking-[0.2em] sm:tracking-[0.25em] uppercase">
            Product designer
          </span>
        </div>

      </div>
    </div>
  );
};
