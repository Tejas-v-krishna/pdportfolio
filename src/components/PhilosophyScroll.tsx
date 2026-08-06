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

    // 1. Split the paragraph into individual words
    const splitText = new SplitType(textRef.current, { types: 'words' });

    // 2. Ensure each word is display: inline-block so transform translateY works reliably
    if (splitText.words) {
      splitText.words.forEach((word) => {
        word.style.display = 'inline-block';
        word.style.willChange = 'transform, opacity';
        word.style.marginRight = '0.24em';
        word.style.opacity = '0';
      });
    }

    // 3. Create scroll-driven word lighting and reveal animation from pitch black
    const ctx = gsap.context(() => {
      if (splitText.words && splitText.words.length > 0) {
        gsap.fromTo(
          splitText.words,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%', // Animation starts when top of section hits 80% down viewport
              end: 'bottom 45%', // Animation completes when bottom of section hits 45% down viewport
              scrub: 1, // Links animation progress smoothly to scroll movement
              refreshPriority: 1,
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger positions after text splitting
    ScrollTrigger.refresh();

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
        {/* Main Reveal Paragraph - Replicating Image 1: Balanced Font Size, Line-Height & Proportions */}
        <p 
          ref={textRef} 
          className="reveal-text font-sans font-normal text-white leading-[1.2] text-[clamp(1.6rem,3.2vw,3.2rem)] tracking-[-0.025em] max-w-[1050px] text-left select-none m-0"
        >
          Tejas is a UI/UX designer and builder focused on digital products that solve real problems. His approach is built around clarity, systems, and thoughtful design decisions. He creates interfaces that are functional, considered, and visually precise. Every project starts with understanding the problem, then shapes itself through intentional design and clean execution.
        </p>
      </div>
    </section>
  );
}


