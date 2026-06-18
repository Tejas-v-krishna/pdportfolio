import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    name: 'Trams Dashboard',
    tag: 'B2B SaaS · UI/UX & Frontend',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  },
  {
    name: 'Bold Cursor Agency',
    tag: 'Creative Studio · Web Platform',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
  },
  {
    name: 'Uni Club Branding',
    tag: 'Identity · Visual Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  },
  {
    name: 'LearnWith Platform',
    tag: 'EdTech · Product Design',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
  },
  {
    name: 'Snapdeal Checkout',
    tag: 'E-Commerce · UX Research',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  },
];

// ─── Config ────────────────────────────────────────────────────────────────────
const CONFIG = {
  gap: 0.15,        // time gap between each floating image starting
  speed: 0.28,      // how long each image takes to traverse the curve
  arcRadius: 260,   // px — how wide the bezier arc bulges to the right
};

// Quadratic Bezier position calculator
function getBezierPosition(t: number) {
  const h = window.innerHeight;
  const start = { x: 0, y: -h * 0.5 };
  const cp    = { x: CONFIG.arcRadius, y: h * 0.5 };
  const end   = { x: 0, y: h * 1.5 };
  const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x;
  const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y;
  return { x, y };
}

// Normalized progress for a single image within the overall [0,1] range
function getImageState(index: number, progress: number) {
  const start = index * CONFIG.gap;
  const end   = start + CONFIG.speed;
  if (progress < start) return -1;   // not yet
  if (progress > end)   return 2;    // finished
  return (progress - start) / (end - start); // 0 → 1
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const SelectedWork: React.FC = () => {
  const sectionRef      = useRef<HTMLElement>(null);
  const bgContainerRef  = useRef<HTMLDivElement>(null);
  const bgImageRef      = useRef<HTMLImageElement>(null);
  const introLeftRef    = useRef<HTMLDivElement>(null);
  const introRightRef   = useRef<HTMLDivElement>(null);
  const titlesCtnRef    = useRef<HTMLDivElement>(null);
  const imagesAreaRef   = useRef<HTMLDivElement>(null);
  const headerRef       = useRef<HTMLDivElement>(null);
  const activeTitleIdx  = useRef<number>(-1);

  useEffect(() => {
    const section       = sectionRef.current;
    const bgCtn         = bgContainerRef.current;
    const bgImg         = bgImageRef.current;
    const introL        = introLeftRef.current;
    const introR        = introRightRef.current;
    const titlesCtn     = titlesCtnRef.current;
    const imagesArea    = imagesAreaRef.current;
    const header        = headerRef.current;

    if (!section || !bgCtn || !bgImg || !introL || !introR || !titlesCtn || !imagesArea || !header) return;

    // Grab generated elements
    const titleEls  = Array.from(titlesCtn.querySelectorAll<HTMLElement>('.sw-title'));
    const imageEls  = Array.from(imagesArea.querySelectorAll<HTMLElement>('.sw-float-img'));

    // Set initial states
    gsap.set(bgCtn,    { scale: 0 });
    gsap.set(bgImg,    { scale: 1.5 });
    gsap.set(imageEls, { opacity: 0 });
    gsap.set(header,   { opacity: 0 });
    gsap.set(titlesCtn,{ y: window.innerHeight });

    activeTitleIdx.current = -1;

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     '+=900%',   // 9× viewport scroll distance
      pin:     true,
      pinSpacing: true,
      scrub:   1.2,

      onUpdate: (self) => {
        const p = self.progress;

        /* ── SEGMENT 1: Opening (0% – 20%) ─────────────────────── */
        if (p <= 0.2) {
          const ip = p / 0.2; // 0 → 1
          const offset = window.innerWidth * 0.45 * ip;

          gsap.set(introL,  { x: -offset, opacity: 1 - ip * 0.3 });
          gsap.set(introR,  { x:  offset, opacity: 1 - ip * 0.3 });
          gsap.set(bgCtn,   { scale: ip });
          gsap.set(bgImg,   { scale: 1.5 - 0.5 * ip });
          gsap.set(header,  { opacity: 0 });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
          gsap.set(titlesCtn, { y: window.innerHeight });
          activeTitleIdx.current = -1;
        }

        /* ── SEGMENT 2: Main Scroll (25% – 95%) ────────────────── */
        else if (p > 0.25 && p <= 0.95) {
          const sp = (p - 0.25) / 0.70; // 0 → 1 within segment

          gsap.set(introL, { opacity: 0 });
          gsap.set(introR, { opacity: 0 });
          gsap.set(bgCtn,  { scale: 1 });
          gsap.set(bgImg,  { scale: 1 });
          gsap.set(header, { opacity: 1 });

          // Scroll titles vertically through clip window
          const titlesH   = titlesCtn.getBoundingClientRect().height;
          const startY    =  window.innerHeight * 0.5;
          const endY      = -titlesH - window.innerHeight * 0.2;
          gsap.set(titlesCtn, { y: startY + (endY - startY) * sp });

          // Float images along bezier arc
          imageEls.forEach((imgEl, i) => {
            const state = getImageState(i, sp);
            if (state === -1 || state === 2) {
              gsap.set(imgEl, { opacity: 0 });
            } else {
              const pos = getBezierPosition(state);
              gsap.set(imgEl, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
            }
          });

          // Highlight nearest title to vertical center
          const center = window.innerHeight / 2;
          let closestIdx = 0;
          let minDist    = Infinity;
          titleEls.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height / 2 - center);
            if (dist < minDist) { minDist = dist; closestIdx = i; }
          });

          if (closestIdx !== activeTitleIdx.current) {
            if (activeTitleIdx.current !== -1) {
              const prev = titleEls[activeTitleIdx.current];
              gsap.to(prev, { opacity: 0.2, scale: 0.95, duration: 0.4, ease: 'power2.out' });
            }
            const cur = titleEls[closestIdx];
            gsap.to(cur, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
            activeTitleIdx.current = closestIdx;

            // Swap background image
            if (bgImg && projects[closestIdx]) {
              bgImg.src = projects[closestIdx].image;
            }
          }
        }

        /* ── SEGMENT 3: Outro (95%+) ──────────────────────────── */
        else if (p > 0.95) {
          const op = 1 - (p - 0.95) / 0.05;
          gsap.set(header, { opacity: op });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}
    >
      {/* ── Full-bleed background image ─────────────────────────── */}
      <div
        ref={bgContainerRef}
        style={{
          position: 'absolute', inset: 0,
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        <img
          ref={bgImageRef}
          src={projects[0].image}
          alt="Project background"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            willChange: 'transform',
          }}
        />
        {/* Dark vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.65) 100%)',
        }} />
      </div>

      {/* ── AWARD / WINNING split text ─────────────────────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%', display: 'flex', justifyContent: 'center', gap: '3vw',
        zIndex: 10, pointerEvents: 'none',
      }}>
        <div
          ref={introLeftRef}
          style={{
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            willChange: 'transform',
          }}
        >
          SELECTED
        </div>
        <div
          ref={introRightRef}
          style={{
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            willChange: 'transform',
          }}
        >
          WORK
        </div>
      </div>

      {/* ── Diagonal clip-path titles window ───────────────────── */}
      <div style={{
        position: 'absolute', top: '50%', left: '6%',
        transform: 'translateY(-50%)',
        width: '52%', height: '55vh',
        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        zIndex: 3,
        overflow: 'hidden',
      }}>
        <div
          ref={titlesCtnRef}
          style={{
            position: 'absolute', width: '100%',
            display: 'flex', flexDirection: 'column',
            gap: '5vh', paddingLeft: '12%',
            willChange: 'transform',
          }}
        >
          {projects.map((p, i) => (
            <div key={i} className="sw-title" style={{
              opacity: 0.2,
              transform: 'scale(0.95)',
              willChange: 'transform, opacity',
              transformOrigin: 'left center',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 6rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: '#fff',
                textTransform: 'uppercase',
                margin: 0,
                whiteSpace: 'nowrap',
              }}>
                {p.name}
              </h2>
              <p style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.6rem, 0.9vw, 0.85rem)',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginTop: '0.4em',
              }}>
                {p.tag}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating images (bezier arc, right side) ────────────── */}
      <div
        ref={imagesAreaRef}
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '48vw', height: '100vh',
          pointerEvents: 'none', zIndex: 4,
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="sw-float-img"
            style={{
              position: 'absolute',
              width: 220, height: 160,
              opacity: 0,
              willChange: 'transform, opacity',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* ── Side header label ────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          position: 'absolute', top: '50%', right: '5vw',
          transform: 'translateY(-50%)',
          zIndex: 5, opacity: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
        }}>
          Portfolio / 2025
        </span>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
        }}>
          Selected Work
        </span>
      </div>

      {/* ── Bottom progress indicator ────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem',
        zIndex: 6,
      }}>
        {projects.map((_, i) => (
          <div key={i} style={{
            width: 24, height: 2,
            background: 'rgba(255,255,255,0.25)',
            borderRadius: 2,
          }} />
        ))}
      </div>
    </section>
  );
};
