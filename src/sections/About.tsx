import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const typeSplit = new SplitType(textRef.current, {
      types: 'lines, chars',
      tagName: 'span'
    });

    const ctx = gsap.context(() => {
      // Create the timeline
      const fadeInTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Mimic the nested SplitText logic using SplitType's generated lines
      if (typeSplit.lines) {
        typeSplit.lines.forEach((line, i) => {
          const chars = line.querySelectorAll('.char');
          fadeInTimeline.from(
            chars,
            {
              y: 12,
              opacity: 0,
              stagger: 0.025
            },
            i * 0.1
          );
        });
      }

      gsap.set(textRef.current, { opacity: 1 });
    }, textRef);

    return () => {
      ctx.revert();
      typeSplit.revert();
    };
  }, []);

  return (
    <section id="about" className="relative z-20 w-full bg-[#f5f4ef] border-t border-b border-[#ccc9c2] flex items-stretch min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]">
      
      {/* Left Sidebar */}
      <div className="w-[50px] md:w-[70px] lg:w-[90px] flex-shrink-0 border-r border-[#ccc9c2] flex flex-col justify-between py-6">
        {/* Top Asterisk */}
        <div className="text-3xl md:text-5xl lg:text-6xl text-[#1a1a18] font-display font-medium leading-none text-center">
          *
        </div>

        {/* Middle ABOUT */}
        <div className="flex-grow flex items-center justify-center">
          <span 
            className="font-display font-bold text-[10px] md:text-[11px] lg:text-[12px] tracking-[0.15em] text-[#1a1a18]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textTransform: 'uppercase' }}
          >
            ABOUT
          </span>
        </div>

        {/* Bottom [00-1] */}
        <div className="text-center font-mono text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.08em] text-[#8e8c87]">
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', textTransform: 'uppercase' }}>
            [00-1]
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Space */}
        <div className="flex-grow flex items-end px-6 md:px-12 lg:px-20 pb-2">
          <div className="w-full max-w-4xl mx-auto">
            <span className="font-mono text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.05em] text-[#1a1a18] uppercase" style={{ textTransform: 'uppercase' }}>
              [ + ] A BIT MORE ABOUT YOURS TRULY
            </span>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-[1px] bg-[#ccc9c2]"></div>

        {/* Bottom Space & Text */}
        <div className="px-6 md:px-12 lg:px-20 py-10 md:py-16 lg:py-20 flex-shrink-0 flex items-center">
          <div className="w-full max-w-4xl mx-auto">
            <p ref={textRef} className="font-body text-lg md:text-2xl lg:text-[26px] leading-[1.4] text-[#1a1a18] font-light" style={{ textTransform: 'none' }}>
              Hey, I'm <strong className="font-semibold" style={{ textTransform: 'none' }}>Tejas, a UI/UX Designer</strong> focused on bridging intuitive digital experiences with pixel-perfect frontend execution. From founding Bold Cursor to my current work as a Product Designer at Trams, I work at the intersection of creative design and technical problem-solving, merging everyday usability with strong, scalable visuals built to last.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
