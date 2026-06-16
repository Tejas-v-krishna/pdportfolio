import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);



export const Philosophy: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const s1 = section1Ref.current;
    const s2 = section2Ref.current;
    const s3 = section3Ref.current;

    if (!wrapper || !s1 || !s2 || !s3) return;

    const ctx = gsap.context(() => {
      // Process and split all philosophy paragraphs and headings
      const pElements = wrapper.querySelectorAll('.philosophy-paragraph, .philosophy-heading');
      const splitsMap = new Map<Element, SplitType>();
      pElements.forEach(p => splitsMap.set(p, new SplitType(p as HTMLElement, { types: 'lines,chars' })));

      // Set initial states
      gsap.set(s3.querySelectorAll('img'), { opacity: 0, y: 60, scale: 0.96 });
      gsap.set(s2, { opacity: 0, pointerEvents: 'none' });
      gsap.set(s3, { opacity: 0, pointerEvents: 'none' });

      Array.from(splitsMap.values()).forEach(split => {
        if (split.chars) {
          gsap.set(split.chars, { opacity: 0, y: 25 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

      // SECTION 1 IN
      tl.addLabel("s1Start");
      const s1Texts = Array.from(s1.querySelectorAll('.philosophy-heading'));
      s1Texts.forEach((el) => {
        const split = splitsMap.get(el);
        if (split && split.lines) {
          split.lines.forEach((line, i) => {
            tl.to(line.querySelectorAll('.char'), {
              y: 0,
              opacity: 1,
              stagger: 0.025,
              duration: 1.4,
              ease: "power3.out"
            }, `s1Start+=${i * 0.3}`);
          });
        }
      });

      tl.to({}, { duration: 1.5 }); // Pause

      // SECTION 1 OUT & SECTION 2 IN
      tl.addLabel("s2Start");
      tl.to(s1, { opacity: 0, pointerEvents: 'none', duration: 1.2, ease: "power2.inOut" }, "s2Start");
      
      // Animate Section 1 text out (opposite animation)
      s1Texts.forEach((el) => {
        const split = splitsMap.get(el);
        if (split && split.lines) {
          split.lines.forEach((line, i) => {
            tl.to(line.querySelectorAll('.char'), {
              y: -25,
              opacity: 0,
              stagger: 0.015,
              duration: 0.8,
              ease: "power2.in"
            }, `s2Start+=${i * 0.1}`);
          });
        }
      });

      tl.to(s2, { opacity: 1, pointerEvents: 'auto', duration: 1.2, ease: "power2.inOut" }, "s2Start");

      // Animate Section 2 text in
      const s2Texts = Array.from(s2.querySelectorAll('.philosophy-paragraph, .philosophy-heading'));
      s2Texts.forEach((el, elIndex) => {
        const split = splitsMap.get(el);
        if (split && split.lines) {
          split.lines.forEach((line, i) => {
            tl.to(line.querySelectorAll('.char'), {
              y: 0,
              opacity: 1,
              stagger: 0.025,
              duration: 1.2,
              ease: "power2.out"
            }, `s2Start+=${0.4 + (elIndex * 0.5) + (i * 0.3)}`);
          });
        }
      });

      tl.to({}, { duration: 2.2 }); // Pause

      // SECTION 2 OUT & SECTION 3 IN
      tl.addLabel("s3Start");
      tl.to(s2, { opacity: 0, pointerEvents: 'none', duration: 1.2, ease: "power2.inOut" }, "s3Start");

      // Animate Section 2 text out
      s2Texts.forEach((el) => {
        const split = splitsMap.get(el);
        if (split && split.lines) {
          split.lines.forEach((line, i) => {
            tl.to(line.querySelectorAll('.char'), {
              y: -25,
              opacity: 0,
              stagger: 0.015,
              duration: 0.8,
              ease: "power2.in"
            }, `s3Start+=${i * 0.1}`);
          });
        }
      });

      tl.to(s3, { opacity: 1, pointerEvents: 'auto', duration: 1.2, ease: "power2.inOut" }, "s3Start");

      // Animate Section 3 text in
      const s3Texts = Array.from(s3.querySelectorAll('.philosophy-paragraph, .philosophy-heading'));
      s3Texts.forEach((el, elIndex) => {
        const split = splitsMap.get(el);
        if (split && split.lines) {
          split.lines.forEach((line, i) => {
            tl.to(line.querySelectorAll('.char'), {
              y: 0,
              opacity: 1,
              stagger: 0.025,
              duration: 1.2,
              ease: "power2.out"
            }, `s3Start+=${0.4 + (elIndex * 0.5) + (i * 0.3)}`);
          });
        }
      });

      tl.to(s3.querySelectorAll('img'),
        { opacity: 0.9, y: 0, scale: 1, duration: 1.6, ease: "power2.out", stagger: 0.12 },
        "s3Start"
      );

      // 4. Final pause to read Section 3 before un-sticking
      tl.to({}, { duration: 1.5 });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    // Tall wrapper to create scrollable space for the timeline
    <div ref={wrapperRef} className="relative w-full" style={{ height: '700vh' }}>
      
      {/* Sticky container that keeps philosophy locked in screen during animations */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-base)]">
        
        {/* SECTION 1: Big Typography */}
        <section ref={section1Ref} className="absolute inset-0 w-full h-full flex items-center justify-center bg-[var(--color-base)] z-[10]">

          {/* Center Typography */}
          <div className="w-full flex justify-start z-20 px-6 sm:pl-[10vw] md:pl-[15vw] lg:pl-[20vw]">
            <div className="flex flex-col items-start">
              <h2 className="philosophy-heading font-display font-bold uppercase text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.85] tracking-[-0.03em] select-none text-black">
                DESIGN IS NOT JUST<br />
                AESTHETICS, IT'S<br />
                A SYSTEM FOR<br />
                SOLVING COMPLEX<br />
                PROBLEMS.
              </h2>
            </div>
          </div>
        </section>

        {/* SECTION 2: Way of Thinking */}
        <section ref={section2Ref} className="absolute inset-0 w-full h-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-20 flex items-center justify-center font-mono text-[var(--color-text-dark)] tracking-widest z-[20] pointer-events-none">
          <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 xl:gap-48 items-center pointer-events-auto">
            
            {/* Left Side: Heading */}
            <div className="flex flex-col justify-center">
              <h3 className="philosophy-heading font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5rem] leading-[0.95] uppercase font-light text-black tracking-normal pl-2 sm:pl-4 lg:pl-6">
                IT'S NOT JUST A JOB — IT'S HOW I<br />
                INTERPRET THE WORLD.
              </h3>
            </div>

            {/* Right Side: Paragraphs */}
            <div className="flex flex-col gap-8 items-start pt-8 lg:pt-0">
              
              <div className="w-full flex justify-start">
                <div className="uppercase inline-flex hover:text-black transition-colors text-sm sm:text-base tracking-[0.2em] font-semibold text-black cursor-default overflow-hidden py-[0.15em] -my-[0.15em]">
                  <span className="slide-word flex items-center gap-3">
                    MY PHILOSOPHY
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <p className="philosophy-paragraph font-body tracking-normal text-left text-base md:text-lg leading-relaxed text-black/80 max-w-lg">
                My background in engineering and design has shaped how I work. I dissect how systems operate under the hood, but I care just as much about how people experience them on the surface.
              </p>

              <p className="philosophy-paragraph font-body tracking-normal text-left text-base md:text-lg leading-relaxed text-black/80 max-w-lg">
                I value clarity, meaning, and functionality. I believe that a great product isn't just about how it looks, but how it feels to use — leaving only what makes sense and works for results. I love simple interfaces backed by robust code and deep meaning.
              </p>

            </div>
          </div>
        </section>

        {/* SECTION 3: Lifestyle & Photos */}
        <section ref={section3Ref} className="absolute inset-0 w-full h-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-20 flex items-center justify-center font-mono text-[var(--color-text-dark)] tracking-widest z-[30] pointer-events-none">
          <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 xl:gap-48 items-center pointer-events-auto">
            
            {/* Left Column: Photos and Contact */}
            <div className="flex flex-col items-center lg:items-start gap-8 pointer-events-auto">
              <div className="flex items-end gap-6 sm:gap-8">
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80" 
                  alt="Workspace Lifestyle" 
                  className="w-40 sm:w-48 lg:w-56 h-[18rem] sm:h-[22rem] lg:h-[26rem] object-cover opacity-90 shadow-md" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
                  alt="Architectural Aesthetics" 
                  className="w-32 sm:w-40 lg:w-48 h-[22rem] sm:h-[26rem] lg:h-[30rem] object-cover opacity-90 pb-8 shadow-md" 
                />
              </div>
              
              <div className="w-full flex justify-center lg:justify-start lg:pl-4">
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center gap-5 bg-black text-white px-8 py-4 sm:px-10 sm:py-5 pointer-events-auto transition-all duration-300 hover:bg-[#121214] border border-black select-none"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-white group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M8 6v10h10" />
                    <polyline points="14 12 18 16 14 20" />
                  </svg>
                  <span 
                    className="font-display text-sm sm:text-base font-semibold tracking-[0.2em] text-white"
                    style={{ textShadow: '-1.5px -0.5px 0 rgba(0, 191, 255, 0.6), 1.5px 0.5px 0 rgba(255, 69, 0, 0.6)' }}
                  >
                    LET'S CONNECT
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="flex flex-col gap-8 pt-8 lg:pt-0 items-start pointer-events-auto">
              
              <div className="w-full flex justify-start">
                <div className="uppercase inline-flex hover:text-black transition-colors text-sm sm:text-base tracking-[0.2em] font-semibold text-black cursor-default overflow-hidden py-[0.15em] -my-[0.15em]">
                  <span className="slide-word flex items-center gap-3">
                    MY LIFESTYLE
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <p className="philosophy-paragraph font-body tracking-normal text-left text-base md:text-lg leading-relaxed text-black/80 max-w-lg">
                I look for aesthetics everywhere: in the forms of nature, in the details of architecture, in the colors of city streets, and even in the simple things of everyday life. It's not just a hobby — it's a way of seeing the world.
              </p>

              <p className="philosophy-paragraph font-body tracking-normal text-left text-base md:text-lg leading-relaxed text-black/80 max-w-lg">
                Every project for me is more than a task. It's a story that I help tell through design. I believe that a good interface is not just about colors and fonts, but about the feelings it evokes.
              </p>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
