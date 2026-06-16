import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { HoverRollingText } from '../components/HoverRollingText';

/* ─── Service Data ────────────────────────────────────────────────────── */
const services = [
  {
    id: '00-1',
    title: 'UX/UI DESIGN',
    label: '// UX/UI DESIGN',
    bullets: ['/ USER RESEARCH', '/ WIREFRAMING', '/ PROTOTYPING', '/ INTERACTION DESIGN', '/ USABILITY TESTING'],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=900&q=80',
    paragraph: 'CRAFTING INTUITIVE USER EXPERIENCES AND STUNNING VISUAL INTERFACES. I FOCUS ON CONVERTING COMPLEX USER JOURNEYS INTO SEAMLESS, ENJOYABLE, AND MEANINGFUL INTERACTIONS.',
  },
  {
    id: '00-2',
    title: 'FRONTEND DEV',
    label: '// FRONTEND DEV',
    bullets: ['/ REACT & NEXT.JS', '/ TAILWIND CSS', '/ GSAP ANIMATIONS', '/ ARCHITECTURE', '/ PERFORMANCE TUNING'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
    paragraph: 'TRANSLATING VISUALLY RICH CONCEPTS INTO PIXEL-PERFECT, HIGH-PERFORMANCE CODE. I BUILD FLUID FRONTEND EXPERIENCES WITH SMOOTH TRANSITIONS AND ANIMATIONS.',
  },
  {
    id: '00-3',
    title: 'PRODUCT STRATEGY',
    label: '// PRODUCT STRATEGY',
    bullets: ['/ SYSTEMS THINKING', '/ USER JOURNEYS', '/ SCALABILITY', '/ ROADMAPPING', '/ BUSINESS ALIGNMENT'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&q=80',
    paragraph: 'ALIGNING USER NEEDS WITH BUSINESS GOALS. I HELP DEFINE PRODUCT DIRECTION AND ARCHITECTURE TO ENSURE LONG-TERM SCALABILITY AND MARKET FIT.',
  },
  {
    id: '00-4',
    title: 'DESIGN SYSTEMS',
    label: '// DESIGN SYSTEMS',
    bullets: ['/ COMPONENT LIBRARIES', '/ DESIGN TOKENS', '/ DOCUMENTATION', '/ AUTO LAYOUT', '/ GOVERNANCE'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80',
    paragraph: 'BUILDING SCALABLE, REUSABLE COMPONENT LIBRARIES THAT BRIDGE THE GAP BETWEEN DESIGN AND ENGINEERING FOR FASTER ITERATION CYCLES.',
  },
  {
    id: '00-5',
    title: 'VISUAL & MOTION',
    label: '// VISUAL & MOTION',
    bullets: ['/ MICRO-INTERACTIONS', '/ TYPOGRAPHY', '/ BRANDING', '/ CREATIVE DIRECTION', '/ VISUAL IDENTITY'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80',
    paragraph: 'DEVELOPING UNIQUE VISUAL STORIES WITH DELIGHTFUL MOTION DESIGN. I BRING INTERFACES TO LIFE WITH CAREFULLY TIMED ANIMATIONS AND POLISHED AESTHETICS.',
  },
];

/* ─── Layout constants ────────────────────────────────────────────────── */
const BG         = '#f5f4ef';
const BORDER_CLR = '#ccc9c2';
const FLEX_EQ    = 1;
const FLEX_EXP   = 3.5;
const FLEX_SHR   = 0.4;
const PAD        = 24; // px

/* ─── Component ───────────────────────────────────────────────────────── */
export const Services: React.FC = () => {
  const gridRef   = useRef<HTMLDivElement>(null);
  const colRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const tlsRef    = useRef<gsap.core.Timeline[]>([]);
  const activeIdx = useRef<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const cols = colRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cols.length) return;

    const tls: gsap.core.Timeline[] = [];
    const enterHandlers: (() => void)[] = [];

    cols.forEach((col, idx) => {
      /* ── Query inner elements ── */
      /* Clip-masked elements: we animate the INNER element inside each clip wrapper */
      const labelInner   = col.querySelector<HTMLElement>('.svc-label-inner');
      const bulletInners = col.querySelectorAll<HTMLElement>('.svc-bullet-inner');
      const paraInner    = col.querySelector<HTMLElement>('.svc-para-inner');
      const imgWrap      = col.querySelector<HTMLElement>('.svc-img-wrap');

      /* ── Set initial positions — below their clip boundary (yPercent: 110) ── */
      /* No opacity used — the clip container hides them completely */
      gsap.set(labelInner,   { yPercent: 110 });
      gsap.set(bulletInners, { yPercent: 110 });
      gsap.set(paraInner,    { yPercent: 110 });
      gsap.set(imgWrap,      { scaleY: 0.05, scaleX: 0.6, opacity: 0, transformOrigin: 'top center' });

      /* ── Build timeline ──
           Forward play  = hover enter  (timeScale 1.0)
           Reverse       = hover exit   (timeScale 1.4 grid-leave, 1.8 cross-column)
         All text uses clip-mask reveal: yPercent 110 → 0 (no opacity change)
      ───────────────────────────────────────────────────────────── */
      const tl = gsap.timeline({ paused: true })

        /* ② // LABEL — clip-slide UP from below */
        .fromTo(labelInner,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.45, ease: 'power3.out' },
          0.05)

        /* ④ IMAGE — snap-open from compressed sliver at top */
        .fromTo(imgWrap,
          { scaleY: 0.05, scaleX: 0.6, opacity: 0, transformOrigin: 'top center' },
          { scaleY: 1,    scaleX: 1,   opacity: 1, duration: 0.5, ease: 'expo.out' },
          0.1)

        /* ③ BULLETS — stagger clip-slide UP, top-to-bottom cascade */
        .fromTo(bulletInners,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.38, ease: 'power2.out', stagger: 0.07 },
          0.12)

        /* ⑤ DESCRIPTION — clip-slide UP */
        .fromTo(paraInner,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.4, ease: 'power2.out' },
          0.28);

      tls[idx] = tl;

      /* ── mouseenter handler ── */
      const onEnter = () => {
        const prev = activeIdx.current;

        if (prev !== null && prev !== idx) {
          /* Cross-column: collapse previous at 1.8× */
          const prevTl = tls[prev];
          if (prevTl) { prevTl.timeScale(1.8); prevTl.reverse(); }
        }

        activeIdx.current = idx;
        setHoveredIdx(idx);

        /* ① Flex-grow: expand this, compress siblings */
        gsap.killTweensOf(cols, 'flexGrow');
        cols.forEach((c, i) => {
          gsap.to(c, { flexGrow: i === idx ? FLEX_EXP : FLEX_SHR, duration: 0.55, ease: 'power3.out' });
          
          const headline = c.querySelector<HTMLElement>('.svc-headline');
          if (headline) {
            gsap.to(headline, {
              y: i === idx ? -65 : 0, // Elevate active heading to make room for paragraph
              scale: i === idx ? 1 : 0.35, // Shrink inactive headings to prevent clipping
              transformOrigin: "left bottom",
              duration: 0.55,
              ease: 'power3.out'
            });
          }
        });

        tl.timeScale(1).play();
      };

      enterHandlers[idx] = onEnter;
      col.addEventListener('mouseenter', onEnter);
    });

    tlsRef.current = tls;

    /* ── Grid-level mouseleave ── */
    const grid = gridRef.current;
    const onGridLeave = () => {
      const prev = activeIdx.current;
      if (prev === null) return;

      const prevTl = tls[prev];
      if (prevTl) { prevTl.timeScale(1.4); prevTl.reverse(); }

      gsap.killTweensOf(cols, 'flexGrow');
      cols.forEach(c => {
        gsap.to(c, { flexGrow: FLEX_EQ, duration: 0.55, ease: 'power3.out' });
        
        const headline = c.querySelector<HTMLElement>('.svc-headline');
        if (headline) {
          gsap.to(headline, {
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out'
          });
        }
      });

      activeIdx.current = null;
      setHoveredIdx(null);
    };

    grid?.addEventListener('mouseleave', onGridLeave);

    return () => {
      cols.forEach((col, i) => col.removeEventListener('mouseenter', enterHandlers[i]));
      grid?.removeEventListener('mouseleave', onGridLeave);
      tls.forEach(tl => tl?.kill());
    };
  }, []);

  /* ── Render ── */
  return (
    <section style={{ width: '100%', background: BG }}>
      <div
        ref={gridRef}
        style={{ display: 'flex', width: '100%', height: '72vh', background: BG, position: 'relative' }}
      >
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            ref={el => { colRefs.current[idx] = el; }}
            style={{ flex: FLEX_EQ, position: 'relative', overflow: 'hidden', background: BG, cursor: 'default', userSelect: 'none' }}
          >
            {/* ── Vertical border lines ── */}
            {idx === 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: 1, height: '100%', background: BORDER_CLR }} />
            )}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: '100%', background: BORDER_CLR }} />

            {/* ── ① Index label — top-left, always visible ── */}
            <span style={{
              position: 'absolute', top: PAD, left: PAD,
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 11, letterSpacing: '0.08em', color: '#1a1a18', lineHeight: 1,
            }}>
              {svc.id}
            </span>

            {/* ── ② Default headline — bottom-left, no clip wrapper needed ── */}
            <div style={{ position: 'absolute', bottom: PAD + 8, left: PAD, right: 0, overflow: 'visible' }}>
              <h3
                className="svc-headline"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
                  fontSize: 'clamp(1.25rem, 1.8vw, 2rem)', lineHeight: 1.0,
                  letterSpacing: '-0.025em', color: '#1a1a18', margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <HoverRollingText text={svc.title} isHovered={hoveredIdx === idx} />
              </h3>
            </div>

            {/* ── ③ // LABEL — top-right
                    Clip wrapper + inner element, slides UP from below ── */}
            <div style={{
              position: 'absolute', top: PAD - 2, right: PAD,
              overflow: 'hidden', lineHeight: 1,
            }}>
              <span
                className="svc-label-inner"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
                  fontSize: 'clamp(0.62rem, 0.85vw, 0.82rem)',
                  letterSpacing: '0.01em', color: '#1a1a18', whiteSpace: 'nowrap',
                }}
              >
                {svc.label}
              </span>
            </div>

            {/* ── ④ Feature bullet list — left side, each line clip-masked ── */}
            <div style={{ position: 'absolute', top: 58, left: PAD, width: '44%' }}>
              {svc.bullets.map((bullet, bIdx) => (
                /* Each bullet gets its own clip container so each line reveals independently */
                <div key={bIdx} style={{ overflow: 'hidden', marginBottom: '0.45rem', lineHeight: 1.25 }}>
                  <div
                    className="svc-bullet-inner"
                    style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 'clamp(0.58rem, 0.82vw, 0.78rem)',
                      textTransform: 'uppercase', letterSpacing: '0.025em',
                      color: '#1a1a18', lineHeight: 1.25,
                    }}
                  >
                    {bullet}
                  </div>
                </div>
              ))}
            </div>

            {/* ── ⑤ Preview image — right side ── */}
            <div
              className="svc-img-wrap"
              style={{
                position: 'absolute', top: 58, left: '47%', right: PAD, bottom: 148,
                overflow: 'hidden', border: `1px solid ${BORDER_CLR}`, background: '#e5e3de',
              }}
            >
              <img
                src={svc.image} alt={svc.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
                loading="lazy" draggable={false}
              />
            </div>

            {/* ── ⑥ Description paragraph — bottom
                    Single clip wrapper, full block slides up as one unit ── */}
            <div style={{
              position: 'absolute', bottom: PAD + 8, left: PAD, right: PAD,
              overflow: 'hidden',
            }}>
              <p
                className="svc-para-inner"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'clamp(0.5rem, 0.68vw, 0.62rem)',
                  textTransform: 'uppercase', letterSpacing: '0.055em',
                  lineHeight: 1.7, color: '#5c5a56', margin: 0,
                }}
              >
                {svc.paragraph}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
