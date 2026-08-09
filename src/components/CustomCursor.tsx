import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let isRunning = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const EPSILON = 0.05; // Skip write if ring moved less than this

    const startRAF = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Immediately update dot position (no lerp needed)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      // Restart RAF if it went idle
      startRAF();
      // Reset idle timer - stop RAF after 2s of no movement
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isRunning = false;
        cancelAnimationFrame(rafId);
      }, 2000);
    };

    const updatePosition = () => {
      if (!isRunning) return;

      // Smooth lerp for ring
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.18;
      ringY += dy * 0.18;

      // Only write to DOM if ring actually moved meaningfully
      if (Math.abs(dx) > EPSILON || Math.abs(dy) > EPSILON) {
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    // Use event delegation on document body for hover states (avoids
    // querying all interactive elements at mount time and re-querying
    // when new elements are added later e.g. menu items)
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        document.body.classList.add('hovering-link');
      }
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        document.body.classList.remove('hovering-link');
      }
    };

    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
