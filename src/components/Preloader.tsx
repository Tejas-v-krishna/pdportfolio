import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

interface PreloaderProps {
  onTransitionStart: () => void;
  onComplete: () => void;
}

const splitSubtextWords = (text: string) => {
  return text.split(' ').map((word, index) => (
    <span key={index} className="inline-block">
      <span className="preloader-sub-word inline-block translate-y-3 will-change-transform">
        {word}
      </span>
      {index < text.split(' ').length - 1 && <span className="inline-block">&nbsp;</span>}
    </span>
  ));
};

export const Preloader: React.FC<PreloaderProps> = ({ onTransitionStart, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // Capture current props in a ref to avoid recreating the timeline when callbacks change
  const callbacksRef = useRef({ onTransitionStart, onComplete });
  useEffect(() => {
    callbacksRef.current = { onTransitionStart, onComplete };
  }, [onTransitionStart, onComplete]);

  useLayoutEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    const word1 = document.querySelector('.word-1') as HTMLElement;
    const word2 = document.querySelector('.word-2') as HTMLElement;
    const word3 = document.querySelector('.word-3') as HTMLElement;
    const wordContainer = document.querySelector('.word-container') as HTMLElement;

    if (!word1 || !word2 || !word3 || !wordContainer) return;

    let tl: gsap.core.Timeline;
    let splits: SplitType[] = [];

    // Wait for custom fonts to load before measuring, to get precise pixel widths
    document.fonts.ready.then(() => {
      const w1 = word1.getBoundingClientRect().width;
      const w2 = word2.getBoundingClientRect().width;
      const w3 = word3.getBoundingClientRect().width;

      tl = gsap.timeline({
        onComplete: () => {
          // Re-enable scrolling
          document.body.style.overflow = '';
          callbacksRef.current.onComplete();
        }
      });

      splits = [word1, word2, word3].map(el => new SplitType(el, { types: 'chars' }));

      // Initial state (GPU accelerated to prevent text wobbling)
      gsap.set(containerRef.current, { force3D: true });
      gsap.set(".preloader-logo-line", { force3D: true }); // They start at opacity: 0 via CSS
      gsap.set(subRef.current, { force3D: true }); // Starts at opacity: 0 via CSS
      gsap.set(".preloader-sub-word", { y: 20, opacity: 0 }); // clean slide up instead of blur
      
      // Setup initial character positions for word2 and word3
      splits.forEach((split, i) => {
        if (i > 0 && split.chars) {
          gsap.set(split.chars, { yPercent: 200 });
        }
      });
      
      gsap.set(wordContainer, { width: w1 });

      // Animation sequence
      tl.to(".preloader-logo-line", {
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
        force3D: true
      }, 0.1)
      .to(subRef.current, {
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        force3D: true
      }, '-=0.6')
      .to(".preloader-sub-word", {
        opacity: 0.65,
        y: 0,
        duration: 0.8,
        stagger: 0.015,
        ease: 'power3.out',
        force3D: true
      }, '<+=0.2')
      
      // Morph 1: Product -> Experience
      .to(wordContainer, {
        width: w2,
        duration: 0.9,
        ease: 'expo.inOut'
      }, '+=0.4')
      .to(splits[0].chars, {
        yPercent: -200,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.inOut",
        force3D: true
      }, '<')
      .to(splits[1].chars, {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.inOut",
        force3D: true
      }, '<')

      // Morph 2: Experience -> Interaction
      .to(wordContainer, {
        width: w3,
        duration: 0.9,
        ease: 'expo.inOut'
      }, '+=0.6')
      .to(splits[1].chars, {
        yPercent: -200,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.inOut",
        force3D: true
      }, '<')
      .to(splits[2].chars, {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.inOut",
        force3D: true
      }, '<')

      // --- New Counter Logic ---
      const counter1 = document.querySelector(".counter-1") as HTMLElement;
      const counter2 = document.querySelector(".counter-2") as HTMLElement;
      const counter3 = document.querySelector(".counter-3") as HTMLElement;

      // Populate counter 1 (0 to 1)
      if (counter1) {
        counter1.innerHTML = '';
        ['0', '1'].forEach(num => {
          const div = document.createElement("div");
          div.className = "num font-display leading-[150px]";
          div.textContent = num;
          counter1.appendChild(div);
        });
      }

      // Populate counter 2 (0 to 10, replacing 10 with 0)
      if (counter2) {
        counter2.innerHTML = '';
        for (let i = 0; i <= 10; i++) {
          const div = document.createElement("div");
          div.className = "num font-display leading-[150px]";
          div.textContent = (i === 10) ? '0' : i.toString();
          counter2.appendChild(div);
        }
      }

      // Populate counter 3 (0 to 30 + final 0)
      if (counter3) {
        counter3.innerHTML = '';
        for (let i = 0; i < 30; i++) {
          const div = document.createElement("div");
          div.className = "num font-display leading-[150px]";
          div.textContent = (i % 10).toString();
          counter3.appendChild(div);
        }
        const finalZero = document.createElement("div");
        finalZero.className = "num font-display leading-[150px]";
        finalZero.textContent = '0';
        counter3.appendChild(finalZero);
      }

      // Helper to animate counter
      const animateCounter = (counterEl: HTMLElement, duration: number, delay: number = 0) => {
        const numEl = counterEl.querySelector(".num");
        if (!numEl) return;
        const numHeight = numEl.clientHeight;
        const totalDistance = (counterEl.querySelectorAll(".num").length - 1) * numHeight;
        
        tl.to(counterEl, {
          y: -totalDistance,
          duration: duration,
          ease: "power2.inOut"
        }, delay);
      };

      // Animate the counters concurrently with the main timeline
      if (counter3) animateCounter(counter3, 2.5, 0);
      if (counter2) animateCounter(counter2, 3, 0);
      if (counter1) animateCounter(counter1, 2, 1.5);

      // --- End Counter Logic ---

      // Exit preloader animation
      tl.to(containerRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.inOut',
        delay: 0.8,
        onStart: () => {
          callbacksRef.current.onTransitionStart();
        }
      });
    });

    return () => {
      if (tl) tl.kill();
      // Revert splits on cleanup
      splits.forEach(split => split.revert());
      document.body.style.overflow = '';
    };
  }, []); // Run exactly once on mount to prevent any timeline resets

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white pointer-events-auto"
    >
      <div className="flex flex-col items-center text-center px-4 max-w-4xl w-full">
        
        {/* Main Title Row */}
        <div ref={logoRef} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-6">
          <span className="preloader-logo-line opacity-0 font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium select-none sm:translate-y-[-0.2em]">
            I AM A(N)
          </span>
          <h1 className="preloader-logo-line opacity-0 font-display text-[2.6rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight select-none flex items-center justify-center sm:justify-start gap-3.5 sm:gap-5">
            <span className="word-container relative inline-block h-[1.1em] flex-shrink-0" style={{ clipPath: 'inset(-0.25em -0.3em -0.25em -0.3em)' }}>
              <span className="word-1 absolute left-0 top-0 text-left font-normal whitespace-nowrap">Product</span>
              <span className="word-2 absolute left-0 top-0 text-left font-normal whitespace-nowrap">Experience</span>
              <span className="word-3 absolute left-0 top-0 text-left font-normal whitespace-nowrap">Interaction</span>
            </span>
            <span>Designer</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subRef} className="max-w-xl flex flex-col items-center gap-4 mt-2 opacity-0">
          <p className="font-body text-base sm:text-[17px] text-zinc-400 tracking-normal leading-relaxed">
            {splitSubtextWords("a multidisciplinary designer driven by curiosity, learning through making.")}
          </p>
        </div>

      </div>

      {/* Counter */}
      <div 
        className="counter absolute right-4 sm:right-8 bottom-4 sm:bottom-8 flex font-display text-[80px] sm:text-[120px] h-[100px] sm:h-[150px] overflow-hidden text-zinc-400 pointer-events-none select-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <div className="counter-1 relative -top-[10px] sm:-top-[15px]"></div>
        <div className="counter-2 relative -top-[10px] sm:-top-[15px]"></div>
        <div className="counter-3 relative -top-[10px] sm:-top-[15px]"></div>
      </div>
    </div>
  );
};
