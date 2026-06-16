import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const BauhausCollage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Slow, continuous animations
    // Rotate wireframe sphere
    const sphereRotate = gsap.to(sphereRef.current, {
      rotate: -360,
      duration: 45,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    // 2. Mouse move parallax tracking
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse positions to range [-1, 1]
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = (clientY / innerHeight) * 2 - 1;

      // Apply distinct depth parallax to each element
      // Closer elements move further and in the direction of the mouse, deeper elements move less or inverse
      gsap.to(archRef.current, {
        x: nx * -15,
        y: ny * -15,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });



      gsap.to(sphereRef.current, {
        x: nx * -30,
        y: ny * -30,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(linesRef.current, {
        x: nx * 10,
        y: ny * 10,
        duration: 1.0,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(gridRef.current, {
        x: nx * 8,
        y: ny * -8,
        duration: 1.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sphereRotate.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-30"
    >
      {/* 1. Minimalist Arch Shape (Top-Left area) */}
      <div
        ref={archRef}
        className="absolute left-[12%] top-[18%] w-48 h-72 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 100 150" fill="none" className="w-full h-full opacity-80 text-black/[0.08]">
          {/* Outlined arch */}
          <path
            d="M10,140 L10,50 A40,40 0 0,1 90,50 L90,140 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Inner concentric arch lines */}
          <path
            d="M25,140 L25,50 A25,25 0 0,1 75,50 L75,140"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </svg>
      </div>



      {/* 3. Wireframe 3D-Like Sphere (Bottom-Left area) */}
      <div
        ref={sphereRef}
        className="absolute left-[8%] bottom-[12%] w-56 h-56 hidden lg:block"
        style={{ transformOrigin: 'center center', willChange: 'transform' }}
      >
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full text-black/[0.06]">
          {/* Outer circle */}
          <circle cx="80" cy="80" r="75" stroke="currentColor" strokeWidth="1.2" />
          {/* Vertical ellipses representing 3D rotation */}
          <ellipse cx="80" cy="80" rx="45" ry="75" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="80" cy="80" rx="20" ry="75" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="80" y1="5" x2="80" y2="155" stroke="currentColor" strokeWidth="0.8" />
          {/* Horizontal ellipses */}
          <ellipse cx="80" cy="80" rx="75" ry="40" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="80" cy="80" rx="75" ry="18" stroke="currentColor" strokeWidth="0.8" />
          <line x1="5" y1="80" x2="155" y2="80" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 4. Diagonal Steps / Hatching Lines (Center-Right area) */}
      <div
        ref={linesRef}
        className="absolute right-[15%] bottom-[25%] w-40 h-40 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-black/[0.08]">
          {/* Isometric stairs line */}
          <path
            d="M10,110 L30,110 L30,90 L50,90 L50,70 L70,70 L70,50 L90,50 L90,30 L110,30"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Accent thin lines */}
          <line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" />
          <line x1="30" y1="110" x2="110" y2="30" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* 5. Minimalist Dot Grid segment (Scattered background depth) */}
      <div
        ref={gridRef}
        className="absolute left-[40%] top-[8%] w-32 h-32 hidden sm:block opacity-60"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-black/[0.08]">
          {/* Render a 5x5 dot grid */}
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="30" cy="10" r="1.5" />
          <circle cx="50" cy="10" r="1.5" />
          <circle cx="70" cy="10" r="1.5" />
          <circle cx="90" cy="10" r="1.5" />

          <circle cx="10" cy="30" r="1.5" />
          <circle cx="30" cy="30" r="1.5" />
          <circle cx="50" cy="30" r="1.5" />
          <circle cx="70" cy="30" r="1.5" />
          <circle cx="90" cy="30" r="1.5" />

          <circle cx="10" cy="50" r="1.5" />
          <circle cx="30" cy="50" r="1.5" />
          <circle cx="50" cy="50" r="1.5" />
          <circle cx="70" cy="50" r="1.5" />
          <circle cx="90" cy="50" r="1.5" />

          <circle cx="10" cy="70" r="1.5" />
          <circle cx="30" cy="70" r="1.5" />
          <circle cx="50" cy="70" r="1.5" />
          <circle cx="70" cy="70" r="1.5" />
          <circle cx="90" cy="70" r="1.5" />

          <circle cx="10" cy="90" r="1.5" />
          <circle cx="30" cy="90" r="1.5" />
          <circle cx="50" cy="90" r="1.5" />
          <circle cx="70" cy="90" r="1.5" />
          <circle cx="90" cy="90" r="1.5" />
        </svg>
      </div>
    </div>
  );
};
