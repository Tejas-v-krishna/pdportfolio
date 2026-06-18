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
  gap:       0.15,  // stagger between images starting
  speed:     0.28,  // duration each image takes on the arc
  arcRadius: 260,   // how wide the bezier bulges right (px)
};

function getBezierPosition(t: number) {
  const h     = window.innerHeight;
  const start = { x: 0,                 y: -h * 0.5 };
  const cp    = { x: CONFIG.arcRadius,  y:  h * 0.5 };
  const end   = { x: 0,                 y:  h * 1.5 };
  const x = (1-t)**2 * start.x + 2*(1-t)*t * cp.x + t*t * end.x;
  const y = (1-t)**2 * start.y + 2*(1-t)*t * cp.y + t*t * end.y;
  return { x, y };
}

function getImageState(index: number, progress: number) {
  const start = index * CONFIG.gap;
  const end   = start + CONFIG.speed;
  if (progress < start) return -1;
  if (progress > end)   return  2;
  return (progress - start) / (end - start);
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const SelectedWork: React.FC = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const innerRef       = useRef<HTMLDivElement>(null);   // ← the real full-screen layer
  const bgImageRef     = useRef<HTMLImageElement>(null);
  const bgScaleRef     = useRef<HTMLDivElement>(null);   // the div we scale (not the whole section)
  const introLeftRef   = useRef<HTMLDivElement>(null);
  const introRightRef  = useRef<HTMLDivElement>(null);
  const titlesCtnRef   = useRef<HTMLDivElement>(null);
  const imagesAreaRef  = useRef<HTMLDivElement>(null);
  const headerRef      = useRef<HTMLDivElement>(null);
  const activeTitleIdx = useRef<number>(-1);

  useEffect(() => {
    const section    = sectionRef.current;
    const inner      = innerRef.current;
    const bgScale    = bgScaleRef.current;
    const bgImg      = bgImageRef.current;
    const introL     = introLeftRef.current;
    const introR     = introRightRef.current;
    const titlesCtn  = titlesCtnRef.current;
    const imagesArea = imagesAreaRef.current;
    const header     = headerRef.current;

    if (!section || !inner || !bgScale || !bgImg || !introL || !introR || !titlesCtn || !imagesArea || !header) return;

    const titleEls = Array.from(titlesCtn.querySelectorAll<HTMLElement>('.sw-title'));
    const imageEls = Array.from(imagesArea.querySelectorAll<HTMLElement>('.sw-float-img'));

    // ── Initial states ────────────────────────────────────────────
    // The bgScale wrapper starts at scale 0 (image hidden); everything else visible
    gsap.set(bgScale,    { scale: 0, transformOrigin: 'center center' });
    gsap.set(bgImg,      { scale: 1.5 });
    gsap.set(imageEls,   { opacity: 0, x: 0, y: 0 });
    gsap.set(header,     { opacity: 0 });
    gsap.set(titlesCtn,  { y: window.innerHeight });
    gsap.set(introL,     { x: 0, opacity: 1 });
    gsap.set(introR,     { x: 0, opacity: 1 });
    activeTitleIdx.current = -1;

    // ── ScrollTrigger ────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     '+=900%',
      pin:     true,
      pinSpacing: true,
      scrub:   1.0,
      anticipatePin: 1,

      onUpdate: (self) => {
        const p = self.progress;

        // ─ SEGMENT 1 : Intro opening  (0 → 0.22) ─────────────────
        if (p <= 0.22) {
          const ip     = p / 0.22;                          // 0 → 1
          const offset = window.innerWidth * 0.48 * ip;

          gsap.set(introL,   { x: -offset,       opacity: Math.max(0, 1 - ip) });
          gsap.set(introR,   { x:  offset,        opacity: Math.max(0, 1 - ip) });
          gsap.set(bgScale,  { scale: ip,         transformOrigin: 'center center' });
          gsap.set(bgImg,    { scale: 1.5 - 0.5 * ip });
          gsap.set(header,   { opacity: 0 });
          gsap.set(titlesCtn,{ y: window.innerHeight });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
          activeTitleIdx.current = -1;
        }

        // ─ SEGMENT BRIDGE : (0.22 → 0.28) — bg fully open, hold ──
        else if (p > 0.22 && p <= 0.28) {
          const bp = (p - 0.22) / 0.06;                    // 0 → 1
          gsap.set(introL,   { opacity: 0 });
          gsap.set(introR,   { opacity: 0 });
          gsap.set(bgScale,  { scale: 1 });
          gsap.set(bgImg,    { scale: 1 });
          gsap.set(header,   { opacity: bp });
          gsap.set(titlesCtn,{ y: window.innerHeight * (1 - bp * 0.5) });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
        }

        // ─ SEGMENT 2 : Main scroll  (0.28 → 0.94) ────────────────
        else if (p > 0.28 && p <= 0.94) {
          const sp = (p - 0.28) / 0.66;                    // 0 → 1

          gsap.set(introL,  { opacity: 0 });
          gsap.set(introR,  { opacity: 0 });
          gsap.set(bgScale, { scale: 1 });
          gsap.set(bgImg,   { scale: 1 });
          gsap.set(header,  { opacity: 1 });

          // Scroll titles vertically through the clip window
          const titlesH  = titlesCtn.scrollHeight;
          const startY   =  window.innerHeight * 0.35;
          const endY     = -titlesH - window.innerHeight * 0.1;
          gsap.set(titlesCtn, { y: startY + (endY - startY) * sp });

          // Float images along bezier arc
          imageEls.forEach((imgEl, i) => {
            const state = getImageState(i, sp);
            if (state === -1 || state === 2) {
              gsap.set(imgEl, { opacity: 0 });
            } else {
              const pos = getBezierPosition(state);
              gsap.set(imgEl, { x: pos.x - 110, y: pos.y - 80, opacity: 1 });
            }
          });

          // Activate the title closest to vertical center
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
              gsap.to(titleEls[activeTitleIdx.current], {
                opacity: 0.18, scale: 0.93, duration: 0.45, ease: 'power2.out',
              });
            }
            gsap.to(titleEls[closestIdx], {
              opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out',
            });
            activeTitleIdx.current = closestIdx;
            if (projects[closestIdx]) bgImg.src = projects[closestIdx].image;
          }
        }

        // ─ SEGMENT 3 : Outro fade  (0.94 → 1.0) ──────────────────
        else if (p > 0.94) {
          const op = Math.max(0, 1 - (p - 0.94) / 0.06);
          gsap.set(header, { opacity: op });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
        }
      },
    });

    return () => { st.kill(); };
  }, []);

  // ─── JSX ────────────────────────────────────────────────────────
  return (
    /*
     *  The <section> is what ScrollTrigger pins.
     *  `overflow: hidden` is NOT on the section — GSAP needs to be able to
     *  apply `position: fixed` without clipping issues.
     *  The `inner` div fills 100vh and clips its own children.
     */
    <section
      ref={sectionRef}
      id="work"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        // High z-index so the pinned fixed element always sits above later sections
        zIndex: 50,
      }}
    >
      {/* Inner full-screen container — clips overflow, provides solid background */}
      <div
        ref={innerRef}
        style={{
          position: 'absolute', inset: 0,
          background: '#060606',
          overflow: 'hidden',
        }}
      >
        {/* ── Full-bleed background (scales from 0) ─────────────── */}
        <div
          ref={bgScaleRef}
          style={{
            position: 'absolute', inset: 0,
            willChange: 'transform',
          }}
        >
          <img
            ref={bgImageRef}
            src={projects[0].image}
            alt="Project background"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              willChange: 'transform',
            }}
          />
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.7) 100%)',
          }} />
        </div>

        {/* ── "SELECTED  WORK" split intro text ─────────────────── */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%', display: 'flex', justifyContent: 'center',
          gap: '3vw', zIndex: 10, pointerEvents: 'none',
        }}>
          <div ref={introLeftRef} style={{
            fontSize: 'clamp(2.5rem, 7.5vw, 8.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em', textTransform: 'uppercase',
            willChange: 'transform, opacity',
          }}>
            SELECTED
          </div>
          <div ref={introRightRef} style={{
            fontSize: 'clamp(2.5rem, 7.5vw, 8.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.04em', textTransform: 'uppercase',
            willChange: 'transform, opacity',
          }}>
            WORK
          </div>
        </div>

        {/* ── Diagonal clip-path titles window ──────────────────── */}
        <div style={{
          position: 'absolute', top: '50%', left: '5%',
          transform: 'translateY(-50%)',
          width: '54%', height: '60vh',
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
          zIndex: 3, overflow: 'hidden',
        }}>
          <div ref={titlesCtnRef} style={{
            position: 'absolute', width: '100%',
            display: 'flex', flexDirection: 'column',
            gap: '6vh', paddingLeft: '12%',
            willChange: 'transform',
          }}>
            {projects.map((proj, i) => (
              <div key={i} className="sw-title" style={{
                opacity: 0.18, transformOrigin: 'left center',
                willChange: 'transform, opacity',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4.5vw, 5.5rem)',
                  lineHeight: 1.0, letterSpacing: '-0.04em',
                  color: '#fff', textTransform: 'uppercase',
                  margin: 0, whiteSpace: 'nowrap',
                }}>
                  {proj.name}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'clamp(0.55rem, 0.85vw, 0.8rem)',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase', marginTop: '0.45em',
                }}>
                  {proj.tag}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Floating thumbnails (bezier arc, right side) ────────── */}
        <div ref={imagesAreaRef} style={{
          position: 'absolute', top: 0, right: 0,
          width: '50vw', height: '100vh',
          pointerEvents: 'none', zIndex: 4,
        }}>
          {projects.map((proj, i) => (
            <div key={i} className="sw-float-img" style={{
              position: 'absolute',
              width: 220, height: 158,
              opacity: 0,
              willChange: 'transform, opacity',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              borderRadius: 4,
            }}>
              <img
                src={proj.image}
                alt={proj.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* ── Side header label ─────────────────────────────────── */}
        <div ref={headerRef} style={{
          position: 'absolute', top: '50%', right: '5vw',
          transform: 'translateY(-50%)',
          zIndex: 5, opacity: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', gap: '0.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.62rem', letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
          }}>
            Portfolio / 2025
          </span>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.62rem', letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase',
          }}>
            Selected Work
          </span>
        </div>

        {/* ── Bottom dot indicator ──────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '6px', zIndex: 6,
        }}>
          {projects.map((_, i) => (
            <div key={i} style={{
              width: 20, height: 2,
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 2,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};
