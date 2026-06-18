import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    name: 'Trams Internal Dashboard',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    leftLabel: 'B2B SaaS',
    rightLabel: 'UI/UX & Frontend',
  },
  {
    name: 'Bold Cursor Agency',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80',
    leftLabel: 'Creative Studio',
    rightLabel: 'Web Platform',
  },
  {
    name: 'University Club Branding',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    leftLabel: 'Identity',
    rightLabel: 'Visual Design',
  },
  {
    name: 'LearnWith Platform',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    leftLabel: 'EdTech',
    rightLabel: 'Product Design',
  },
  {
    name: 'Snapdeal Checkout Flow',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
    leftLabel: 'E-Commerce',
    rightLabel: 'UX Research',
  },
  {
    name: 'CyberDiag Health',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&q=80',
    leftLabel: 'Healthcare',
    rightLabel: 'Mobile App',
  },
  {
    name: 'Zenith FinTech',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&q=80',
    leftLabel: 'Finance',
    rightLabel: 'System Architecture',
  },
  {
    name: 'ChromaBlock System',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=80',
    leftLabel: 'Design System',
    rightLabel: 'React / Tailwind',
  },
];

const N = projects.length;

export const SelectedWork: React.FC = () => {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const sectionRef             = useRef<HTMLElement>(null);
  const indexH1Ref             = useRef<HTMLHeadingElement>(null);
  const imagesContainerRef     = useRef<HTMLDivElement>(null);
  const namesContainerRef      = useRef<HTMLDivElement>(null);
  const leftLabelsContainerRef = useRef<HTMLDivElement>(null);
  const imgRefs                = useRef<HTMLDivElement[]>([]);
  const nameRefs               = useRef<HTMLDivElement[]>([]);
  const nameListRefs           = useRef<HTMLSpanElement[]>([]);
  const nameIndexRefs          = useRef<HTMLSpanElement[]>([]);
  const leftLabelRefs          = useRef<HTMLDivElement[]>([]);
  const rightLabelRefs         = useRef<HTMLDivElement[]>([]);
  const bgLinesRef             = useRef<SVGGElement>(null);

  // ── GSAP setup ───────────────────────────────────────────────────────────
  useEffect(() => {
    const section        = sectionRef.current;
    const indexEl        = indexH1Ref.current;
    const imagesCont     = imagesContainerRef.current;
    const namesCont      = namesContainerRef.current;
    const leftLabelsCont = leftLabelsContainerRef.current;
    const bgLines        = bgLinesRef.current;
    if (!section || !indexEl || !imagesCont || !namesCont || !leftLabelsCont || !bgLines) return;

    const sectionPadding = parseFloat(getComputedStyle(section).padding) || 32;
    const indexHeight    = indexEl.offsetHeight;

    const moveDistanceIndex = window.innerHeight - sectionPadding * 2 - indexHeight;
    const itemHeight = 130; // Consistent vertical height for list items

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start:   'top top',
        end:     `+=${window.innerHeight * 5}px`,
        pin:     true,
        pinType: 'transform',
        pinSpacing: true,
        scrub:   1,

        onUpdate: (self) => {
          const p = self.progress;

          // Background subtle rotation
          gsap.set(bgLines, { rotation: p * 90, transformOrigin: 'center center' });

          // Counter text + downward drift
          const current = Math.min(Math.floor(p * N) + 1, N);
          
          // Format as "01 / 08" like the screenshot
          const currentStr = String(current).padStart(2, '0');
          const totalStr = String(N).padStart(2, '0');
          indexEl.innerHTML = `${currentStr}<span style="font-size: 0.4em; margin-left: 0.2em; color: #000000;">/${totalStr}</span>`;
          gsap.set(indexEl, { y: p * moveDistanceIndex });

          // Vertical scrolling of name container: active item stays centered at 50vh
          const namesContY = - (p * (N - 1) + 0.5) * itemHeight;
          gsap.set(namesCont, { y: namesContY });
          // Note: leftLabelsCont is no longer translated since left labels are pinned absolute at 50vh

          // Animate each project item
          for (let i = 0; i < N; i++) {
            const p_i = i / (N - 1);
            const deltaP = p - p_i;
            const t_i = Math.max(0, 1 - Math.abs(deltaP) * (N - 1));
            const ease_t = Math.sin(t_i * Math.PI / 2); // Smooth sine transition

            // 1. Thumbnail Image crossfade & scale
            const img = imgRefs.current[i];
            if (img) {
              gsap.set(img, {
                opacity: ease_t,
                scale: 0.92 + 0.08 * ease_t,
                zIndex: ease_t > 0.1 ? 2 : 1,
              });
            }

            // 2a. Left labels (blurred crossfade & stagger up with narrow transition window to prevent overlap)
            const leftLabel = leftLabelRefs.current[i];
            if (leftLabel) {
              // Narrow transition window so only one text is visible at a time
              const left_t_i = Math.max(0, 1 - Math.abs(deltaP) * 16);
              const left_ease_t = Math.sin(left_t_i * Math.PI / 2);

              const dir = deltaP > 0 ? -1 : 1;
              const yOffset = dir * 40 * (1 - left_ease_t);
              const blurVal = 16 * (1 - left_ease_t);

              gsap.set(leftLabel, {
                opacity: left_ease_t,
                y: yOffset,
                filter: `blur(${blurVal}px)`,
              });
            }

            // 2b. Right labels (subtext under name, staggered slide up/down)
            const rightLabel = rightLabelRefs.current[i];
            if (rightLabel) {
              const dir = deltaP > 0 ? -1 : 1;
              const yOffset = dir * 15 * (1 - ease_t);

              gsap.set(rightLabel, {
                opacity: ease_t,
                y: yOffset,
              });
            }

            // 3. Name Item styling: Swap font family, interpolate size on a SINGLE span (no overlays)
            const nameItemDiv = nameRefs.current[i];
            const spanName = nameListRefs.current[i];
            const spanIndex = nameIndexRefs.current[i];

            if (nameItemDiv && spanName) {
              // Keep normal vertical spacing (no accordion push translation)
              gsap.set(nameItemDiv, { x: 0, y: 0 });

              const opacity = 0.3 + 0.7 * ease_t;
              const fontFamily = 'var(--font-display)';
              const fontWeight = '400';

              // Fluidly interpolate font size (approx. 24px/18px to 54px/32px)
              const isMobile = window.innerWidth < 640;
              const minSize = isMobile ? 18 : 24;
              const maxSize = isMobile ? 32 : 54;
              const currentSize = minSize + (maxSize - minSize) * ease_t;

              gsap.set(spanName, {
                opacity: opacity,
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                fontSize: `${currentSize}px`,
              });

              if (spanIndex) {
                gsap.set(spanIndex, { 
                  opacity: ease_t,
                  x: 20 * (1 - ease_t) // Slide leftwards into position as it active-fades
                });
              }
            }
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        padding: '2rem',
        overflow: 'visible',
        background: 'var(--color-base)',
        color: 'var(--color-text-dark)',
      }}
    >
      {/* ── Background Geometric Lines ────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Static Horizontal Line */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.06)' }} />
        
        {/* Rotating SVG group for circle and diagonals */}
        <svg style={{ position: 'absolute', top: '50%', left: '50%', width: '150vh', height: '150vh', transform: 'translate(-50%, -50%)', overflow: 'visible' }}>
          <g ref={bgLinesRef}>
            {/* Massive Circle */}
            <circle cx="50%" cy="50%" r="45vh" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="75vh" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
            
            {/* Diagonal Lines crossing through center */}
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* ── Project Index (top-left, drifts downward) ─────────────────── */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
        <h1
          ref={indexH1Ref}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 10vw, 12rem)', // Giant font matching design
            fontWeight: 400,
            lineHeight: 0.8,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: 'var(--color-text-dark)',
            willChange: 'transform',
            display: 'flex',
            alignItems: 'baseline'
          }}
        >
          01<span style={{ fontSize: '0.4em', marginLeft: '0.2em', color: '#000000' }}>/{String(N).padStart(2, '0')}</span>
        </h1>
      </div>

      {/* ── Center-Left Labels Pinned Stack (Only active label clear, staggers up and blurs out) ── */}
      <div 
        ref={leftLabelsContainerRef}
        style={{ 
          position: 'absolute', 
          left: '18%', 
          top: '50vh', 
          transform: 'translateY(-50%)',
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', 
          zIndex: 5 
        }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => { if (el) leftLabelRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--color-text-dark)',
              opacity: 0,
              willChange: 'opacity, transform, filter',
            }}
          >
            {project.leftLabel}
          </div>
        ))}
      </div>

      {/* ── Centered Pinned Thumbnails Stack ───────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2, pointerEvents: 'none' }}>
        <div
          ref={imagesContainerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32%',
            aspectRatio: '16/10',
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { if (el) imgRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transform: 'scale(0.92)',
                overflow: 'hidden',
                borderRadius: '0',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                willChange: 'opacity, transform',
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Names List (right side vertical list, scrolls to center active item) ── */}
      <div
        style={{
          position: 'absolute',
          right: '5vw',
          top: '50vh',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
          zIndex: 10,
          width: '35vw', // Ensures adequate horizontal space for dividers and elements
        }}
      >
        <div
          ref={namesContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            willChange: 'transform',
            width: '100%',
          }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { if (el) nameRefs.current[i] = el; }}
              style={{
                height: '130px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                willChange: 'transform',
                whiteSpace: 'nowrap',
                position: 'relative',
                width: '100%',
                borderBottom: '1px solid rgba(0,0,0,0.06)', // Divider lines matching screenshot
              }}
            >
              {/* Single name element: normal flow, serves as relative anchor for the index prefix */}
              <span
                ref={(el) => { if (el) nameListRefs.current[i] = el; }}
                style={{
                  position: 'relative',
                  color: 'var(--color-text-dark)',
                  whiteSpace: 'nowrap',
                  willChange: 'opacity, font-size, font-family',
                  transformOrigin: 'right center',
                  lineHeight: 1.1,
                  display: 'inline-block',
                }}
              >
                {/* Nested parenthesized Index: absolute-positioned left of the name */}
                <span
                  ref={(el) => { if (el) nameIndexRefs.current[i] = el; }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                    fontWeight: 400,
                    color: 'var(--color-text-dark)',
                    whiteSpace: 'nowrap',
                    position: 'absolute',
                    right: '100%',
                    marginRight: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0,
                    willChange: 'opacity, transform',
                  }}
                >
                  ({String(i + 1).padStart(2, '0')})
                </span>
                
                {project.name}
              </span>

              {/* Right Label (Subtext under name - aligned vertically in list item) */}
              <div
                ref={(el) => { if (el) rightLabelRefs.current[i] = el; }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  color: 'var(--color-text-dark)',
                  opacity: 0,
                  marginTop: '4px',
                  willChange: 'opacity, transform',
                }}
              >
                {project.rightLabel}
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};
