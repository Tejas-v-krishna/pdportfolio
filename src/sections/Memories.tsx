import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Memories: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%', // Trigger when the top of the section hits 70% down the viewport
        },
      });

      tl.fromTo(
        [text1Ref.current, text2Ref.current, text3Ref.current],
        { y: '100%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.15,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20 z-30"
    >
      <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-center">
        {/* Line 1 */}
        <div className="overflow-hidden pb-1">
          <div ref={text1Ref} className="text-white">
            Unforgettable
          </div>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden pb-1">
          <div ref={text2Ref} className="text-[#A0A0A0]">
            memories are not
          </div>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden pb-1">
          <div ref={text3Ref} className="text-[#6B6B6B]">
            defined by details.
          </div>
        </div>
      </h2>
    </section>
  );
};
