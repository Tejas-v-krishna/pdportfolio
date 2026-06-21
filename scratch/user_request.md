==============================
<USER_REQUEST>
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import './spotlight.css'; // Import the CSS file (see below)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const config = {
  gap: 0.15,
  speed: 0.3,
  arcRadius: 300
};

const spotlightItems = [
  { name: "First Concept", img: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000" },
  { name: "Second Concept", img: "https://images.unsplash.com/photo-1707345512638-b97c4e47e8e5?q=80&w=1000" },
  { name: "Third Concept", img: "https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=1000" },
  { name: "Fourth Concept", img: "https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?q=80&w=1000" },
  { name: "Fifth Concept", img: "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1000" },
];

export default function SpotlightScroll() {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const bgContainerRef = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);
  const headerRef = useRef(null);
  const titlesContainerRef = useRef(null);
  
  // React state is too slow for 60fps scroll animations. 
  // We use a mutable ref to track the active index without triggering re-renders.
  const activeTitleIndex = useRef(-1);

  useGSAP(() => {
    // Select elements scoped to our containerRef
    const titlesList = gsap.utils.toArray('.title-item');
    const imageElements = gsap.utils.toArray('.floating-image');

    const getBezierPosition = (t) => {
      const h = window.innerHeight;
      const start = { x: 0, y: -h * 0.5 };
      const cp = { x: config.arcRadius, y: h * 0.5 };
      const end = { x: 0, y: h * 1.5 };

      const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x;
      const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y;
      return { x, y };
    };

    const getImageProgressState = (index, progress) => {
      const start = index * config.gap;
      const end = start + config.speed;
      if (progress < start) return -1; 
      if (progress > end) return 2;    
      return (progress - start) / (end - start);
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Segment 1: The Intro Opening (0% - 20%)
        if (p <= 0.2) {
          const introP = p / 0.2;
          const offset = window.innerWidth * 0.5 * introP;
          
          gsap.set(introLeftRef.current, { x: -offset, opacity: 1 });
          gsap.set(introRightRef.current, { x: offset, opacity: 1 });
          gsap.set(bgContainerRef.current, { scale: introP });
          gsap.set(bgImageRef.current, { scale: 1.5 - (0.5 * introP) });
          gsap.set(headerRef.current, { opacity: 0 });
          imageElements.forEach(el => gsap.set(el, { opacity: 0 }));
        } 
        
        // Segment 2: The Main Scroll (25% - 95%)
        else if (p > 0.25 && p <= 0.95) {
          const switchProgress = (p - 0.25) / (0.95 - 0.25);

          gsap.set(introLeftRef.current, { opacity: 0 });
          gsap.set(introRightRef.current, { opacity: 0 });
          gsap.set(headerRef.current, { opacity: 1 });

          // Move Titles up
          const titlesHeight = titlesContainerRef.current.getBoundingClientRect().height;
          const startY = window.innerHeight;
          const targetY = -titlesHeight;
          const currentY = startY - ((startY - targetY) * switchProgress);
          gsap.set(titlesContainerRef.current, { y: currentY });

          // Calculate Floating Images
          imageElements.forEach((img, index) => {
            const state = getImageProgressState(index, switchProgress);
            if (state === -1 || state === 2) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(state);
              gsap.set(img, { 
                x: pos.x - 100, 
                y: pos.y - 75,
                opacity: 1
              });
            }
          });

          // Update Active Title & Background
          const center = window.innerHeight / 2;
          let closestIdx = 0;
          let minDistance = Infinity;

          titlesList.forEach((title, idx) => {
            const rect = title.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height/2 - center);
            if(dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });

          if(closestIdx !== activeTitleIndex.current) {
            if(activeTitleIndex.current !== -1) {
              gsap.to(titlesList[activeTitleIndex.current], { opacity: 0.2, duration: 0.3 });
            }
            gsap.to(titlesList[closestIdx], { opacity: 1, duration: 0.3 });
            activeTitleIndex.current = closestIdx;
            
            // Swap background image instantly
            if(bgImageRef.current) {
              bgImageRef.current.src = spotlightItems[closestIdx].img;
            }
          }
        } 
        
        // Segment 3: The Outro Fade (95%+)
        else if (p > 0.95) {
          gsap.set(headerRef.current, { opacity: 0 });
        }
      }
    });
  }, { scope: containerRef }); // Scope isolates our selectors to this component only

  return (
    <ReactLenis root>
      <main className="bg-black text-white overflow-x-hidden font-sans">
        
        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-5xl">Scroll Down 👇</h1>
        </section>

        {/* Spotlight Main Container */}
        <section ref={containerRef} className="spotlight-section">
          
          {/* Intro text blocks */}
          <div className="spotlight-intro-text-wrapper">
            <div ref={introLeftRef} className="spotlight-intro-text">
              <p>AWARD</p>
            </div>
            <div ref={introRightRef} className="spotlight-intro-text">
              <p>WINNING</p>
            </div>
          </div>

          {/* Scalable Background */}
          <div ref={bgContainerRef} className="spotlight-background-image">
            <img 
              ref={bgImageRef} 
              src={spotlightItems[0].img} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title Window */}
          <div className="spotlight-titles-wrapper">
            <div ref={titlesContainerRef} className="spotlight-titles-container">
               {spotlightItems.map((item, index) => (
                 <h1 key={index} className="title-item">
                   {item.name}
                 </h1>
               ))}
            </div>
          </div>

          {/* Floating Images */}
          <div className="spotlight-images">
            {spotlightItems.map((item, index) => (
              <div key={index} className="floating-image">
                <img src={item.img} alt={`Floating ${item.name}`} />
              </div>
            ))}
          </div>

          {/* Side Header */}
          <div ref={headerRef} className="spotlight-header">
            <p>Spotlight / 2025</p>
          </div>

        </section>

        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-5xl">Outro Section</h1>
        </section>

      </main>
    </ReactLenis>
  );
}

.spotlight-section {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-color: #000;
}

.spotlight-intro-text-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 10;
  pointer-events: none;
}

.spotlight-intro-text {
  font-size: 8vw;
  font-weight: bold;
  will-change: transform;
}

.spotlight-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: scale(0);
  will-change: transform;
  z-index: 1;
}

.spotlight-background-image img {
  will-change: transform;
}

.spotlight-titles-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 40vh;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%); 
  z-index: 3;
}

.spotlight-titles-container {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-left: 20%;
  will-change: transform;
}

.title-item {
  font-size: 5vw;
  text-transform: uppercase;
  opacity: 0.2;
  margin: 0;
}

.spotlight-images {
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  pointer-events: none;
  z-index: 4;
}

.floating-image {
  position: absolute;
  width: 200px;
  height: 150px;
  opacity: 0;
  will-change: transform, opacity;
}

.floating-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-header {
  position: absolute;
  top: 50%;
  left: 5vw;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  will-change: opacity;
}

@media (max-width: 768px) {
  .spotlight-titles-wrapper {
    width: 90%;
    clip-path: none;
  }
  .title-item {
    font-size: 10vw;
  }
  .spotlight-header {
    display: none;
  }
}

implement this for the projects section
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-06-18T16:56:21+05:30.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Gemini 3.5 Flash (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>
==============================
==============================
<USER_REQUEST>
'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import './spotlight.css'; // Import the CSS file (see below)

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const config = {
  gap: 0.15,
  speed: 0.3,
  arcRadius: 300
};

const spotlightItems = [
  { name: "First Concept", img: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000" },
  { name: "Second Concept", img: "https://images.unsplash.com/photo-1707345512638-b97c4e47e8e5?q=80&w=1000" },
  { name: "Third Concept", img: "https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=1000" },
  { name: "Fourth Concept", img: "https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?q=80&w=1000" },
  { name: "Fifth Concept", img: "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1000" },
];

export default function SpotlightScroll() {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const bgContainerRef = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);
  const headerRef = useRef(null);
  const titlesContainerRef = useRef(null);
  
  // React state is too slow for 60fps scroll animations. 
  // We use a mutable ref to track the active index without triggering re-renders.
  const activeTitleIndex = useRef(-1);

  useGSAP(() => {
    // Select elements scoped to our containerRef
    const titlesList = gsap.utils.toArray('.title-item');
    const imageElements = gsap.utils.toArray('.floating-image');

    const getBezierPosition = (t) => {
      const h = window.innerHeight;
      const start = { x: 0, y: -h * 0.5 };
      const cp = { x: config.arcRadius, y: h * 0.5 };
      const end = { x: 0, y: h * 1.5 };

      const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x;
      const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y;
      return { x, y };
    };

    const getImageProgressState = (index, progress) => {
      const start = index * config.gap;
      const end = start + config.speed;
      if (progress < start) return -1; 
      if (progress > end) return 2;    
      return (progress - start) / (end - start);
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Segment 1: The Intro Opening (0% - 20%)
        if (p <= 0.2) {
          const introP = p / 0.2;
          const offset = window.innerWidth * 0.5 * introP;
          
          gsap.set(introLeftRef.current, { x: -offset, opacity: 1 });
          gsap.set(introRightRef.current, { x: offset, opacity: 1 });
          gsap.set(bgContainerRef.current, { scale: introP });
          gsap.set(bgImageRef.current, { scale: 1.5 - (0.5 * introP) });
          gsap.set(headerRef.current, { opacity: 0 });
          imageElements.forEach(el => gsap.set(el, { opacity: 0 }));
        } 
        
        // Segment 2: The Main Scroll (25% - 95%)
        else if (p > 0.25 && p <= 0.95) {
          const switchProgress = (p - 0.25) / (0.95 - 0.25);

          gsap.set(introLeftRef.current, { opacity: 0 });
          gsap.set(introRightRef.current, { opacity: 0 });
          gsap.set(headerRef.current, { opacity: 1 });

          // Move Titles up
          const titlesHeight = titlesContainerRef.current.getBoundingClientRect().height;
          const startY = window.innerHeight;
          const targetY = -titlesHeight;
          const currentY = startY - ((startY - targetY) * switchProgress);
          gsap.set(titlesContainerRef.current, { y: currentY });

          // Calculate Floating Images
          imageElements.forEach((img, index) => {
            const state = getImageProgressState(index, switchProgress);
            if (state === -1 || state === 2) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(state);
              gsap.set(img, { 
                x: pos.x - 100, 
                y: pos.y - 75,
                opacity: 1
              });
            }
          });

          // Update Active Title & Background
          const center = window.innerHeight / 2;
          let closestIdx = 0;
          let minDistance = Infinity;

          titlesList.forEach((title, idx) => {
            const rect = title.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height/2 - center);
            if(dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });

          if(closestIdx !== activeTitleIndex.current) {
            if(activeTitleIndex.current !== -1) {
              gsap.to(titlesList[activeTitleIndex.current], { opacity: 0.2, duration: 0.3 });
            }
            gsap.to(titlesList[closestIdx], { opacity: 1, duration: 0.3 });
            activeTitleIndex.current = closestIdx;
            
            // Swap background image instantly
            if(bgImageRef.current) {
              bgImageRef.current.src = spotlightItems[closestIdx].img;
            }
          }
        } 
        
        // Segment 3: The Outro Fade (95%+)
        else if (p > 0.95) {
          gsap.set(headerRef.current, { opacity: 0 });
        }
      }
    });
  }, { scope: containerRef }); // Scope isolates our selectors to this component only

  return (
    <ReactLenis root>
      <main className="bg-black text-white overflow-x-hidden font-sans">
        
        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-5xl">Scroll Down 👇</h1>
        </section>

        {/* Spotlight Main Container */}
        <section ref={containerRef} className="spotlight-section">
          
          {/* Intro text blocks */}
          <div className="spotlight-intro-text-wrapper">
            <div ref={introLeftRef} className="spotlight-intro-text">
              <p>AWARD</p>
            </div>
            <div ref={introRightRef} className="spotlight-intro-text">
              <p>WINNING</p>
            </div>
          </div>

          {/* Scalable Background */}
          <div ref={bgContainerRef} className="spotlight-background-image">
            <img 
              ref={bgImageRef} 
              src={spotlightItems[0].img} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title Window */}
          <div className="spotlight-titles-wrapper">
            <div ref={titlesContainerRef} className="spotlight-titles-container">
               {spotlightItems.map((item, index) => (
                 <h1 key={index} className="title-item">
                   {item.name}
                 </h1>
               ))}
            </div>
          </div>

          {/* Floating Images */}
          <div className="spotlight-images">
            {spotlightItems.map((item, index) => (
              <div key={index} className="floating-image">
                <img src={item.img} alt={`Floating ${item.name}`} />
              </div>
            ))}
          </div>

          {/* Side Header */}
          <div ref={headerRef} className="spotlight-header">
            <p>Spotlight / 2025</p>
          </div>

        </section>

        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <h1 className="text-5xl">Outro Section</h1>
        </section>

      </main>
    </ReactLenis>
  );
}

.spotlight-section {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-color: #000;
}

.spotlight-intro-text-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 10;
  pointer-events: none;
}

.spotlight-intro-text {
  font-size: 8vw;
  font-weight: bold;
  will-change: transform;
}

.spotlight-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: scale(0);
  will-change: transform;
  z-index: 1;
}

.spotlight-background-image img {
  will-change: transform;
}

.spotlight-titles-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 40vh;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%); 
  z-index: 3;
}

.spotlight-titles-container {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-left: 20%;
  will-change: transform;
}

.title-item {
  font-size: 5vw;
  text-transform: uppercase;
  opacity: 0.2;
  margin: 0;
}

.spotlight-images {
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  pointer-events: none;
  z-index: 4;
}

.floating-image {
  position: absolute;
  width: 200px;
  height: 150px;
  opacity: 0;
  will-change: transform, opacity;
}

.floating-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-header {
  position: absolute;
  top: 50%;
  left: 5vw;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  will-change: opacity;
}

@media (max-width: 768px) {
  .spotlight-titles-wrapper {
    width: 90%;
    clip-path: none;
  }
  .title-item {
    font-size: 10vw;
  }
  .spotlight-header {
    display: none;
  }
}

implement this for the projects section
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-06-18T16:56:21+05:30.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Gemini 3.5 Flash (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>
==============================
==============================
<USER_REQUEST>
check the portfolio project and tell me what all mistakes or bugs we have in it
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-06-18T17:08:14+05:30.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Gemini 3.5 Flash (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>
==============================
==============================
<USER_REQUEST>
how can we fix this section
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-06-18T17:19:19+05:30.
</ADDITIONAL_METADATA>
==============================
==============================
<USER_REQUEST>
/* ─────────────────────────────────────────────────────────────────────────────
   spotlight.css  —  Spotlight Scroll Section
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Section shell ──────────────────────────────────────────────────────────── */
.spotlight-section {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background-color: #000;
}

/* ── Intro split text ───────────────────────────────────────────────────────── */
.spotlight-intro-text-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  z-index: 10;
  pointer-events: none;
}

.spotlight-intro-text {
  font-size: clamp(3rem, 8vw, 9rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  will-change: transform, opacity;
}

/* ── Scalable background ────────────────────────────────────────────────────── */
.spotlight-background-image {
  position: absolute;
  inset: 0;              /* shorthand for top/right/bottom/left: 0 */
  z-index: 1;
  transform-origin: center center;
  will-change: transform;
}

.spotlight-background-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0.05) 100%
  );
  z-index: 2;
}

.spotlight-background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}

/* ── Title window (clipped) ─────────────────────────────────────────────────── */
.spotlight-titles-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 38vh;
  /* Parallelogram clip — left edge angled, right edge angled */
  clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
  z-index: 3;
  overflow: hidden;   /* belt-and-suspenders: belt clips even if clip-path fails */
}

.spotlight-titles-container {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding-left: 18%;
  will-change: transform;
}

.title-item {
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fff;
  opacity: 0.2;
  margin: 0;
  line-height: 1.1;
  white-space: nowrap;
  will-change: opacity;
}

/* ── Floating images (bezier arc) ───────────────────────────────────────────── */
.spotlight-images {
  position: absolute;
  /* Full viewport so images can move freely */
  inset: 0;
  pointer-events: none;
  z-index: 4;
}

.floating-image {
  position: absolute;
  /* Centred at origin; GSAP translates x/y from there */
  top: 0;
  left: 0;
  width: 200px;
  height: 150px;
  opacity: 0;
  will-change: transform, opacity;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}

.floating-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Side label ─────────────────────────────────────────────────────────────── */
.spotlight-header {
  position: absolute;
  top: 50%;
  left: 5vw;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  will-change: opacity;
}

.spotlight-header p {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* ── Mobile ─────────────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .spotlight-titles-wrapper {
    width: 90%;
    clip-path: none;
  }

  .spotlight-titles-container {
    padding-left: 8%;
  }

  .title-item {
    font-size: clamp(2rem, 10vw, 4rem);
    white-space: normal;
  }

  .spotlight-header {
    display: none;
  }

  .floating-image {
    width: 140px;
    height: 105px;
  }
}

'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import './spotlight.css';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  gap: 0.15,       // fractional gap between each image entering the arc
  speed: 0.30,     // how long each image travels along the arc (in progress units)
  arcRadius: 300,  // how far right the bezier control point sits (px)
};

const ITEMS = [
  { name: 'First Concept',  img: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000' },
  { name: 'Second Concept', img: 'https://images.unsplash.com/photo-1707345512638-b97c4e47e8e5?q=80&w=1000' },
  { name: 'Third Concept',  img: 'https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=1000' },
  { name: 'Fourth Concept', img: 'https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?q=80&w=1000' },
  { name: 'Fifth Concept',  img: 'https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1000' },
];

// ─── HELPERS (defined outside component — no re-creation on render) ──────────

/**
 * Quadratic bezier along a right-arcing path:
 *   start  → top-center of viewport
 *   cp     → right of center
 *   end    → bottom-center of viewport
 * Returns {x, y} in pixels.
 */
function getBezierPos(t, arcRadius) {
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

/**
 * Maps global switchProgress → per-image local t (–1 = before, 2 = after).
 */
function getImageT(index, progress) {
  const start = index * CONFIG.gap;
  const end   = start + CONFIG.speed;
  if (progress < start) return -1;
  if (progress > end)   return  2;
  return (progress - start) / (end - start);
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SpotlightScroll() {
  const containerRef       = useRef(null);
  const bgImageRef         = useRef(null);
  const bgContainerRef     = useRef(null);
  const introLeftRef       = useRef(null);
  const introRightRef      = useRef(null);
  const headerRef          = useRef(null);
  const titlesContainerRef = useRef(null);

  // Mutable ref — tracks active index without triggering re-renders
  const activeIdx = useRef(-1);

  useGSAP(() => {
    const titleEls = gsap.utils.toArray('.title-item', containerRef.current);
    const imageEls = gsap.utils.toArray('.floating-image', containerRef.current);

    // Cache titles height once (it never changes)
    const titlesHeight = titlesContainerRef.current.scrollHeight;

    // Pre-load all background images so swaps are instant (no network flash)
    ITEMS.forEach(({ img }) => {
      const preload = new Image();
      preload.src = img;
    });

    // ── Initial state ────────────────────────────────────────────────────────
    gsap.set(bgContainerRef.current,     { scale: 0 });
    gsap.set(bgImageRef.current,         { scale: 1.5 });
    gsap.set(headerRef.current,          { opacity: 0 });
    gsap.set(introLeftRef.current,       { x: 0, opacity: 1 });
    gsap.set(introRightRef.current,      { x: 0, opacity: 1 });
    gsap.set(titlesContainerRef.current, { y: window.innerHeight });
    imageEls.forEach(el => gsap.set(el,  { opacity: 0 }));
    titleEls.forEach(el => gsap.set(el,  { opacity: 0.2 }));

    // ── Main ScrollTrigger ───────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top top',
      end:     '+=1000%',
      pin:     true,
      scrub:   1,

      onUpdate(self) {
        const p = self.progress;

        // ════════════════════════════════════════════════════════════════════
        // SEGMENT 1 — INTRO SPLIT  (0 → 20%)
        // ════════════════════════════════════════════════════════════════════
        if (p <= 0.2) {
          const t      = p / 0.2;                          // 0 → 1
          const offset = window.innerWidth * 0.4 * t;      // words slide out

          gsap.set(introLeftRef.current,       { x: -offset, opacity: 1 });
          gsap.set(introRightRef.current,      { x:  offset, opacity: 1 });
          gsap.set(bgContainerRef.current,     { scale: t });
          gsap.set(bgImageRef.current,         { scale: 1.5 - 0.5 * t });
          gsap.set(headerRef.current,          { opacity: 0 });
          gsap.set(titlesContainerRef.current, { y: window.innerHeight });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
        }

        // ════════════════════════════════════════════════════════════════════
        // SEGMENT 1→2 BRIDGE  (20% → 25%)  — keeps the final intro state
        // ════════════════════════════════════════════════════════════════════
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

        // ════════════════════════════════════════════════════════════════════
        // SEGMENT 2 — MAIN SCROLL  (25% → 95%)
        // ════════════════════════════════════════════════════════════════════
        else if (p > 0.25 && p <= 0.95) {
          const sp = (p - 0.25) / (0.95 - 0.25); // normalised 0 → 1

          // Hide intro text
          gsap.set(introLeftRef.current,  { opacity: 0 });
          gsap.set(introRightRef.current, { opacity: 0 });
          gsap.set(headerRef.current,     { opacity: 1 });

          // ── Titles scroll upward ─────────────────────────────────────────
          const startY  =  window.innerHeight;
          const targetY = -titlesHeight;
          gsap.set(titlesContainerRef.current, {
            y: startY - (startY - targetY) * sp,
          });

          // ── Floating images along bezier arc ────────────────────────────
          imageEls.forEach((img, i) => {
            const t = getImageT(i, sp);
            if (t === -1 || t === 2) {
              gsap.set(img, { opacity: 0 });
            } else {
              const { x, y } = getBezierPos(t, CONFIG.arcRadius);
              gsap.set(img, {
                x:       x - 100, // offset by half image width (200px / 2)
                y:       y - 75,  // offset by half image height (150px / 2)
                opacity: 1,
              });
            }
          });

          // ── Active title highlight & background swap ─────────────────────
          const centerY = window.innerHeight / 2;
          let closestIdx  = 0;
          let minDist     = Infinity;

          titleEls.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height / 2 - centerY);
            if (dist < minDist) { minDist = dist; closestIdx = i; }
          });

          if (closestIdx !== activeIdx.current) {
            // Dim the previous title
            if (activeIdx.current !== -1) {
              gsap.to(titleEls[activeIdx.current], { opacity: 0.2, duration: 0.25, overwrite: true });
            }
            // Brighten the new title
            gsap.to(titleEls[closestIdx], { opacity: 1, duration: 0.25, overwrite: true });
            activeIdx.current = closestIdx;

            // Swap background — preloaded so no flicker
            if (bgImageRef.current) {
              bgImageRef.current.src = ITEMS[closestIdx].img;
            }
          }
        }

        // ════════════════════════════════════════════════════════════════════
        // SEGMENT 3 — OUTRO FADE  (95% → 100%)
        // ════════════════════════════════════════════════════════════════════
        else if (p > 0.95) {
          const t = (p - 0.95) / 0.05; // 0 → 1
          gsap.set(headerRef.current,          { opacity: 1 - t });
          gsap.set(titlesContainerRef.current, { opacity: 1 - t });
          imageEls.forEach(el => gsap.set(el, { opacity: 0 }));
        }
      },
    });
  }, { scope: containerRef });

  return (
    <ReactLenis root>
      <main className="bg-black text-white overflow-x-hidden">

        {/* Pre-scroll intro section */}
        <section className="h-screen w-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">Scroll Down 👇</h1>
        </section>

        {/* ── Spotlight Section ─────────────────────────────────────────── */}
        <section ref={containerRef} className="spotlight-section">

          {/* Intro split words */}
          <div className="spotlight-intro-text-wrapper">
            <div ref={introLeftRef}  className="spotlight-intro-text"><p>AWARD</p></div>
            <div ref={introRightRef} className="spotlight-intro-text"><p>WINNING</p></div>
          </div>

          {/* Scalable background image */}
          <div ref={bgContainerRef} className="spotlight-background-image">
            <img
              ref={bgImageRef}
              src={ITEMS[0].img}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Clipped title window */}
          <div className="spotlight-titles-wrapper">
            <div ref={titlesContainerRef} className="spotlight-titles-container">
              {ITEMS.map((item, i) => (
                <h1 key={i} className="title-item">{item.name}</h1>
              ))}
            </div>
          </div>

          {/* Floating images (arc) */}
          <div className="spotlight-images">
            {ITEMS.map((item, i) => (
              <div key={i} className="floating-image">
                <img src={item.img} alt={item.name} />
              </div>
            ))}
          </div>

          {/* Side label */}
          <div ref={headerRef} className="spotlight-header">
            <p>Spotlight / 2025</p>
          </div>

        </section>

        {/* Post-scroll outro section */}
        <section className="h-screen w-full flex items-center justify-center">
          <h1 className="text-5xl font-bold">Outro Section</h1>
        </section>

      </main>
    </ReactLenis>
  );
}

use this for the project section. make it completely working and perfect. dont mess it up
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-06-18T17:34:58+05:30.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from Gemini 3.5 Flash (High) to Gemini 3.1 Pro (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>
==============================
