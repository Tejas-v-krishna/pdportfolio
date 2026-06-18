import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import SplitType from 'split-type';
import { vertexShader, fragmentShader } from '../gl/shaders';

// ─── Project Data ────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Trams Dashboard',
    description: 'B2B SaaS · UI/UX & Frontend',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80',
  },
  {
    title: 'Bold Cursor',
    description: 'Creative Studio · Web Platform',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80',
  },
  {
    title: 'University Club',
    description: 'Identity · Visual Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
  },
  {
    title: 'LearnWith',
    description: 'EdTech · Product Design',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
  },
  {
    title: 'Snapdeal Flow',
    description: 'E-Commerce · UX Research',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80',
  },
  {
    title: 'CyberDiag Health',
    description: 'Healthcare · Mobile App',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920&q=80',
  },
  {
    title: 'Zenith FinTech',
    description: 'Finance · System Architecture',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1920&q=80',
  },
  {
    title: 'ChromaBlock System',
    description: 'Design System · React / Tailwind',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&q=80',
  },
];

// ─── Helper to get max corner distance for ripple end ────────────────────────
function getMaxCornerDist() {
  const ratio = window.innerHeight / window.innerWidth;
  return Math.sqrt(0.5 * 0.5 + (0.5 * ratio) * (0.5 * ratio));
}

export const SelectedWork: React.FC = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const canvasWrapRef  = useRef<HTMLDivElement>(null);
  const titleRef       = useRef<HTMLHeadingElement>(null);
  const descRef        = useRef<HTMLParagraphElement>(null);
  const counterRef     = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Non-reactive GL state
  const glRef = useRef({
    renderer:      null as THREE.WebGLRenderer | null,
    uniforms:      null as Record<string, { value: any }> | null,
    textures:      [] as THREE.Texture[],
    currentIndex:  0,
    isTransitioning: false,
    rippleTween:   null as gsap.core.Tween | null,
    waveWidth:     0.8,
    endValue:      1.5,
    duration:      2.4,
  });

  // Split refs
  const titleSplit = useRef<SplitType | null>(null);
  const descSplit  = useRef<SplitType | null>(null);

  // ── 1. Initialize Three.js ──────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasWrapRef.current || !sectionRef.current) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x111111, 1);
    canvasWrapRef.current.appendChild(renderer.domElement);
    glRef.current.renderer = renderer;

    // ── Uniforms ────────────────────────────────────────────────────────────
    const uniforms: Record<string, { value: any }> = {
      uTexCurrent:    { value: null },
      uTexNext:       { value: null },
      uProgress:      { value: 0.0 },
      uResolution:    { value: new THREE.Vector2() },
      uImageRes:      { value: new THREE.Vector2(1920, 1280) },
      uWaveFreq:      { value: 25.0 },
      uWavePow:       { value: 0.035 },
      uWaveWidth:     { value: glRef.current.waveWidth },
      uFalloff:       { value: 10.0 },
      uBoostStrength: { value: 0.5 },
      uCrossfadeWidth:{ value: 0.05 },
    };
    glRef.current.uniforms = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    // ── Load textures ───────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    Promise.all(
      projects.map(p =>
        new Promise<THREE.Texture>(resolve =>
          loader.load(p.image, tex => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            resolve(tex);
          })
        )
      )
    ).then(textures => {
      glRef.current.textures = textures;
      uniforms.uTexCurrent.value = textures[0];
      uniforms.uTexNext.value    = textures[1 % textures.length];
    });

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!sectionRef.current) return;
      const w = sectionRef.current.clientWidth;
      const h = sectionRef.current.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
      glRef.current.endValue = getMaxCornerDist() + glRef.current.waveWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    // ── Render loop ─────────────────────────────────────────────────────────
    let raf: number;
    const tick = () => {
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      canvasWrapRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      plane.geometry.dispose();
    };
  }, []);

  // ── 2. Text split & animate-in whenever activeIndex changes ─────────────────
  useLayoutEffect(() => {
    if (!titleRef.current || !descRef.current) return;

    // Revert old splits
    titleSplit.current?.revert();
    descSplit.current?.revert();

    // Create fresh splits
    titleSplit.current = new SplitType(titleRef.current, {
      types: 'chars',
      tagName: 'span',
    });
    descSplit.current = new SplitType(descRef.current, {
      types: 'lines',
      tagName: 'span',
    });

    const chars = titleSplit.current.chars ?? [];
    const lines = descSplit.current.lines ?? [];

    // Wrap lines in overflow:hidden masks
    lines.forEach(line => {
      const wrap = document.createElement('span');
      wrap.style.cssText = 'display:block;overflow:hidden;';
      line.parentNode!.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    // Set initial positions
    gsap.set(chars, { y: '110%', rotation: 8 });
    gsap.set(lines, { y: '105%' });

    // Update counter
    if (counterRef.current) {
      counterRef.current.textContent =
        String(activeIndex + 1).padStart(2, '0') + ' / ' + String(projects.length).padStart(2, '0');
    }

    // Animate in
    const tl = gsap.timeline();
    tl.to(chars, {
      y: '0%',
      rotation: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out',
    }).to(lines, {
      y: '0%',
      duration: 0.7,
      stagger: 0.05,
      ease: 'power3.out',
    }, 0.15);
  }, [activeIndex]);

  // ── 3. Transition handler ────────────────────────────────────────────────────
  const handleClick = () => {
    const gl = glRef.current;
    if (gl.isTransitioning || gl.textures.length === 0 || !gl.uniforms) return;

    gl.isTransitioning = true;

    const nextIndex = (gl.currentIndex + 1) % projects.length;

    // Kill any in-progress tween
    gl.rippleTween?.kill();
    gl.uniforms.uProgress.value = 0;
    gl.uniforms.uTexCurrent.value = gl.textures[gl.currentIndex];
    gl.uniforms.uTexNext.value    = gl.textures[nextIndex];

    // Text exit
    const chars = titleSplit.current?.chars ?? [];
    const lines = descSplit.current?.lines ?? [];

    const exitTl = gsap.timeline();
    if (chars.length) {
      exitTl.to(chars, {
        y: '-110%',
        rotation: -8,
        duration: 0.5,
        stagger: 0.01,
        ease: 'power2.in',
      });
    }
    if (lines.length) {
      exitTl.to(lines, {
        y: '-105%',
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.in',
      }, 0.05);
    }

    // Ripple
    let unlocked = false;
    gl.rippleTween = gsap.to(gl.uniforms.uProgress, {
      value: gl.endValue,
      duration: gl.duration,
      ease: 'power2.out',
      onUpdate() {
        if (!unlocked && gl.uniforms!.uProgress.value > 0.6) {
          unlocked = true;
          gl.currentIndex = nextIndex;
          gl.isTransitioning = false;
        }
      },
      onComplete() {
        gl.uniforms!.uTexCurrent.value = gl.textures[gl.currentIndex];
        gl.uniforms!.uProgress.value = 0;
        gl.rippleTween = null;
        if (!unlocked) {
          gl.currentIndex = nextIndex;
          gl.isTransitioning = false;
        }
      },
    });

    // After text exits, swap React state to trigger new text
    exitTl.then(() => {
      setActiveIndex(nextIndex);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
      }}
    >
      {/* ── WebGL Canvas ── */}
      <div
        ref={canvasWrapRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* ── Dark gradient overlay (bottom) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Text overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 3vw, 3rem)',
          pointerEvents: 'none',
          zIndex: 2,
          color: '#fff',
          mixBlendMode: 'normal',
        }}
      >
        {/* Title — bottom left */}
        <div style={{ flex: '0 1 auto', maxWidth: '60%' }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 8rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              margin: 0,
              overflow: 'hidden',
              color: '#fff',
            }}
          >
            {projects[activeIndex].title}
          </h2>
        </div>

        {/* Description + counter — bottom right */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1rem',
            maxWidth: '30%',
            minWidth: '180px',
          }}
        >
          <p
            ref={descRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              margin: 0,
              textAlign: 'right',
              lineHeight: 1.4,
              overflow: 'hidden',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {projects[activeIndex].description}
          </p>
          <span
            ref={counterRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            01 / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── "Click to navigate" hint ── */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 3vw, 3rem)',
          right: 'clamp(1.5rem, 3vw, 3rem)',
          pointerEvents: 'none',
          zIndex: 2,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Click to navigate
      </div>
    </section>
  );
};
