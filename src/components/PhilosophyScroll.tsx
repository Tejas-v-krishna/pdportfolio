import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    // 1. Split text into words
    const splitText = new SplitType(textRef.current, { types: 'words' });

    // 2. Format words for transform & skew headroom
    if (splitText.words) {
      splitText.words.forEach((word) => {
        word.style.display = 'inline-block';
        word.style.willChange = 'transform, opacity';
        word.style.padding = '0.15em 0.06em';
        word.style.margin = '-0.15em 0.19em -0.15em 0';
        word.style.transformOrigin = 'top left';
      });
    }

    // 3. GSAP ScrollTrigger Scrub Animation (Top-to-Bottom entrance with Skew)
    const ctx = gsap.context(() => {
      if (splitText.words && splitText.words.length > 0) {
        gsap.fromTo(
          splitText.words,
          {
            opacity: 0,
            y: -35,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.3,
              refreshPriority: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      splitText.revert();
    };
  }, []);

  return (
    <section 
      id="philosophy"
      ref={sectionRef} 
      className="relative w-full bg-[#0b0b0b] py-20 md:py-28 px-8 md:px-12 border-t border-b border-[#1f1f22]"
    >
      <div className="w-full flex justify-start">
        <p 
          ref={textRef} 
          className="reveal-text font-sans font-normal text-white leading-[1.2] text-[clamp(1.2rem,2.2vw,2.2rem)] tracking-[-0.04em] max-w-[1050px] text-left select-none m-0"
        >
          Tejas is a UI/UX designer and builder focused on digital products that solve real problems. His approach is built around clarity, systems, and thoughtful design decisions. He creates interfaces that are functional, considered, and visually precise. Every project starts with understanding the problem, then shapes itself through intentional design and clean execution.
        </p>
      </div>
    </section>
  );
}


