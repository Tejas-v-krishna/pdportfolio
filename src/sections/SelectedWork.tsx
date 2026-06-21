import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './spotlight.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    name: 'Trams Internal Dashboard',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900',
    leftLabel: 'B2B SaaS',
    rightLabel: 'UI/UX & Frontend',
  },
  {
    name: 'Bold Cursor Agency',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=900',
    leftLabel: 'Creative Studio',
    rightLabel: 'Web Platform',
  },
  {
    name: 'University Club Branding',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=900',
    leftLabel: 'Identity',
    rightLabel: 'Visual Design',
  },
  {
    name: 'LearnWith Platform',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900',
    leftLabel: 'EdTech',
    rightLabel: 'Product Design',
  },
  {
    name: 'Snapdeal Checkout Flow',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=900',
    leftLabel: 'E-Commerce',
    rightLabel: 'UX Research',
  },
  {
    name: 'CyberDiag Health',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=900',
    leftLabel: 'Healthcare',
    rightLabel: 'Mobile App',
  },
  {
    name: 'Zenith FinTech',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=900',
    leftLabel: 'Finance',
    rightLabel: 'System Architecture',
  },
  {
    name: 'ChromaBlock System',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=900',
    leftLabel: 'Design System',
    rightLabel: 'React / Tailwind',
  },
];

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  arcRadius: 300,  // how far right the bezier control point sits (px)
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getBezierPos(t: number, arcRadius: number) {
  const h  = window.innerHeight;
  const sx = 0,          sy = -h * 0.5;
  const cx = arcRadius,  cy =  h * 0.5;
  const ex = 0,          ey =  h * 1.5;
  const mt = 1 - t;
  return {
    x: mt * mt * sx + 2 * mt * t * cx + t * t * ex,
    y: mt * mt * sy + 2 * mt * t * cy + t * t * ey,
  };
}

export const SelectedWork: React.FC = () => {
  const containerRef       = useRef<HTMLDivElement>(null);
  const bgImageRef         = useRef<HTMLImageElement>(null);
  const bgContainerRef     = useRef<HTMLDivElement>(null);
  const introLeftRef       = useRef<HTMLDivElement>(null);
  const introRightRef      = useRef<HTMLDivElement>(null);
  const headerRef          = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);

  const activeIdx = useRef(-1);

  useEffect(() => {
    if (!containerRef.current || !titlesContainerRef.current) return;
    
    const ctx = gsap.context(() => {
      const titleEls = gsap.utils.toArray<HTMLElement>('.title-item');
      const imageEls = gsap.utils.toArray<HTMLElement>('.floating-image');

      const titlesHeight = titlesContainerRef.current!.scrollHeight;

      // Pre-load background images
      projects.forEach(({ image }) => {
        const preload = new Image();
        preload.src = image;
      });

      // Initial state
      gsap.set(bgContainerRef.current,     { scale: 0 });
      gsap.set(bgImageRef.current,         { scale: 1.5 });
      gsap.set(headerRef.current,          { opacity: 0 });
      gsap.set(introLeftRef.current,       { x: 0, opacity: 1 });
      gsap.set(introRightRef.current,      { x: 0, opacity: 1 });
      gsap.set(titlesContainerRef.current, { y: window.innerHeight });
      imageEls.forEach(el => gsap.set(el,  { opacity: 0 }));
      titleEls.forEach(el => gsap.set(el,  { opacity: 0.2 }));

      ScrollTrigger.create({
        trigger: containerRef.current,
        start:   'top top',
        end:     '+=1000%',
        pin:     true,
        pinType: 'transform',
        pinSpacing: true,
        scrub:   1,
        onUpdate(self) {
          const p = self.progress;

          // SEGMENT 1 (0 -> 20%)
          if (p <= 0.2) {
            const t      = p / 0.2;
            const offset = window.innerWidth * 0.4 * t;

            gsap.set(introLeftRef.current,       { x: -offset, opacity: 1 });
            gsap.set(introRightRef.current,      { x:  offset, opacity: 1 });
            gsap.set(bgContainerRef.current,     { scale: t });
            gsap.set(bgImageRef.current,         { scale: 1.5 - 0.5 * t });
            gsap.set(headerRef.current,          { opacity: 0 });
            gsap.set(titlesContainerRef.current, { y: window.innerHeight });
            imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
          }
          // SEGMENT 1->2 BRIDGE (20% -> 25%)
          else if (p > 0.2 && p <= 0.25) {
            const offset = window.innerWidth * 0.4;
            gsap.set(introLeftRef.current,       { x: -offset, opacity: 1 });
            gsap.set(introRightRef.current,      { x:  offset, opacity: 1 });
            gsap.set(bgContainerRef.current,     { scale: 1 });
            gsap.set(bgImageRef.current,         { scale: 1 });
            gsap.set(headerRef.current,          { opacity: 0 });
            gsap.set(titlesContainerRef.current, { y: window.innerHeight });
            imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
          }
          // SEGMENT 2 (25% -> 95%)
          else if (p > 0.25 && p <= 0.95) {
            const sp = (p - 0.25) / (0.95 - 0.25);

            gsap.set(introLeftRef.current,  { opacity: 0 });
            gsap.set(introRightRef.current, { opacity: 0 });
            gsap.set(headerRef.current,     { opacity: 1 });

            const startY  =  window.innerHeight;
            const targetY = -titlesHeight;
            gsap.set(titlesContainerRef.current, {
              y: startY - (startY - targetY) * sp,
            });

            // 1. READ phase: get true screen positions
            const titleGlobalYs = titleEls.map(el => {
              const rect = el.getBoundingClientRect();
              return rect.top + rect.height / 2;
            });

            // 2. LOGIC phase: find closest title
            const centerY = window.innerHeight / 2;
            let closestIdx  = 0;
            let minDist     = Infinity;

            titleGlobalYs.forEach((titleGlobalY, i) => {
              const dist = Math.abs(titleGlobalY - centerY);
              if (dist < minDist) { minDist = dist; closestIdx = i; }
            });

            // 3. WRITE phase: update images based perfectly on title position
            imageEls.forEach((img, i) => {
              const titleGlobalY = titleGlobalYs[i];
              // Map title Y from screen bottom (h) to screen top (0) -> t goes 0 to 1
              const t = 1 - (titleGlobalY / window.innerHeight);

              if (t < -0.2 || t > 1.2) {
                gsap.set(img, { opacity: 0 });
              } else {
                const { x, y } = getBezierPos(t, CONFIG.arcRadius);
                gsap.set(img, {
                  x:       x - 100,
                  y:       y - 75,
                  opacity: 1,
                });
              }
            });

            if (closestIdx !== activeIdx.current) {
              if (activeIdx.current !== -1) {
                gsap.to(titleEls[activeIdx.current], { opacity: 0.2, duration: 0.25, overwrite: true });
              }
              gsap.to(titleEls[closestIdx], { opacity: 1, duration: 0.25, overwrite: true });
              activeIdx.current = closestIdx;

              if (bgImageRef.current) {
                bgImageRef.current.src = projects[closestIdx].image;
              }
            }
          }
          // SEGMENT 3 (95% -> 100%)
          else if (p > 0.95) {
            const t = (p - 0.95) / 0.05;
            gsap.set(headerRef.current,          { opacity: 1 - t });
            gsap.set(titlesContainerRef.current, { opacity: 1 - t });
            imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="spotlight-section">
      {/* Intro split words */}
      <div className="spotlight-intro-text-wrapper">
        <div ref={introLeftRef}  className="spotlight-intro-text"><p>CURATED</p></div>
        <div ref={introRightRef} className="spotlight-intro-text"><p>PROJECTS</p></div>
      </div>

      {/* Scalable background image */}
      <div ref={bgContainerRef} className="spotlight-background-image">
        <img
          ref={bgImageRef}
          src={projects[0].image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Clipped title window */}
      <div className="spotlight-titles-wrapper">
        <div ref={titlesContainerRef} className="spotlight-titles-container">
          {projects.map((item, i) => (
            <h1 key={i} className="title-item">
              {item.name}
            </h1>
          ))}
        </div>
      </div>

      {/* Floating images (arc) */}
      <div className="spotlight-images">
        {projects.map((item, i) => (
          <div key={i} className="floating-image">
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>

      {/* Side label */}
      <div ref={headerRef} className="spotlight-header">
        <p>Spotlight / 2025</p>
      </div>
    </section>
  );
};
