import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';



export const HeroBackgroundElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for Viewfinder corners
  const tlCornerRef = useRef<SVGSVGElement>(null);
  const trCornerRef = useRef<SVGSVGElement>(null);
  const blCornerRef = useRef<SVGSVGElement>(null);
  const brCornerRef = useRef<SVGSVGElement>(null);

  // Ref for Inset Border Frame
  const borderRef = useRef<HTMLDivElement>(null);
  
  // Refs for Horizontal Rules
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);

  // Breathing wave state
  const [wavePath1, setWavePath1] = useState('');
  const [wavePath2, setWavePath2] = useState('');

  useEffect(() => {
    // --- 1. Viewfinder Corner Animations ---
    const corners = [
      { ref: tlCornerRef, x: -30, y: -30 },
      { ref: trCornerRef, x: 30, y: -30 },
      { ref: blCornerRef, x: -30, y: 30 },
      { ref: brCornerRef, x: 30, y: 30 },
    ];

    corners.forEach(({ ref, x, y }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { x, y, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1.8, ease: 'power3.out', delay: 0.5 }
        );
      }
    });

    // --- Inset Border Frame Animation ---
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.8 }
      );
    }

    // --- Horizontal lines expand animation ---
    const lines = [lineTopRef.current, lineBottomRef.current];
    gsap.fromTo(
      lines,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 2.0, ease: 'power3.inOut', delay: 0.3, transformOrigin: 'center center' }
    );

    // --- 2. Breathing Wave Path Generator (Animation Loop) ---
    let frameId: number;
    let phase = 0;
    
    const updateWaves = () => {
      phase += 0.008;
      const width = 1200;
      const height = 100;
      const midY = height / 2;
      
      // Generate Wave 1 path d (Slow Sine Wave)
      let d1 = `M 0 ${midY}`;
      for (let x = 0; x <= width; x += 15) {
        const angle = (x / width) * Math.PI * 4 + phase;
        const y = midY + Math.sin(angle) * 18 * Math.cos(phase * 0.5);
        d1 += ` L ${x} ${y}`;
      }
      setWavePath1(d1);

      // Generate Wave 2 path d (Slightly faster, offset phase)
      let d2 = `M 0 ${midY}`;
      for (let x = 0; x <= width; x += 15) {
        const angle = (x / width) * Math.PI * 5.2 - phase * 1.3;
        const y = midY + Math.sin(angle) * 12 * Math.sin(phase * 0.7);
        d2 += ` L ${x} ${y}`;
      }
      setWavePath2(d2);

      frameId = requestAnimationFrame(updateWaves);
    };
    updateWaves();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Viewfinder Corner Brackets */}
      <svg
        ref={tlCornerRef}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 w-6 h-6 text-black/[0.08] dark:text-white/[0.08]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M24 1H1V24" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        ref={trCornerRef}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 w-6 h-6 text-black/[0.08] dark:text-white/[0.08]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M0 1H23V24" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        ref={blCornerRef}
        className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-6 h-6 text-black/[0.08] dark:text-white/[0.08]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M24 23H1V0" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg
        ref={brCornerRef}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-6 h-6 text-black/[0.08] dark:text-white/[0.08]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M0 23H23V0" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* 3. Breathing Waves (Bottom Area, behind content) */}
      <div className="absolute bottom-20 left-0 w-full opacity-[0.05] h-24 pointer-events-none">
        <svg
          viewBox="0 0 1200 100"
          className="w-full h-full overflow-visible text-black"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d={wavePath1} stroke="currentColor" strokeWidth="1" />
          <path d={wavePath2} stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 4. Isometric Perspective Grid Plane (Bottom Receding Grid) */}
      <div className="absolute bottom-0 left-0 w-full h-[22vh] opacity-[0.035] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1000 300"
          className="w-full h-full overflow-visible text-black"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Radial Lines from vanishing point */}
          <line x1="500" y1="-50" x2="-200" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="0" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="200" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="400" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="600" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="800" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="1000" y2="300" stroke="currentColor" strokeWidth="1.5" />
          <line x1="500" y1="-50" x2="1200" y2="300" stroke="currentColor" strokeWidth="1.5" />

          {/* Receding horizontal lines */}
          <line x1="-200" y1="50" x2="1200" y2="50" stroke="currentColor" strokeWidth="0.8" />
          <line x1="-200" y1="120" x2="1200" y2="120" stroke="currentColor" strokeWidth="1.0" />
          <line x1="-200" y1="200" x2="1200" y2="200" stroke="currentColor" strokeWidth="1.2" />
          <line x1="-200" y1="300" x2="1200" y2="300" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>

      {/* Option 1: Inset Border Frame */}
      <div
        ref={borderRef}
        className="absolute inset-6 sm:inset-8 border border-black/[0.04] dark:border-white/[0.04] pointer-events-none z-0"
      />

      {/* Option 2: Horizontal Rules */}
      <div
        ref={lineTopRef}
        className="absolute left-0 right-0 top-24 sm:top-28 h-px bg-black/[0.04] dark:bg-white/[0.04] pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={lineBottomRef}
        className="absolute left-0 right-0 bottom-20 sm:bottom-24 h-px bg-black/[0.04] dark:bg-white/[0.04] pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
