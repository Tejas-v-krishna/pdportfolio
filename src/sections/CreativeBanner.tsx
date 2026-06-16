import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CreativeBanner: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const track = marquee.querySelector('.marquee-track');
    if (!track) return;

    // Duplicate the track for a seamless loop
    const clone = track.cloneNode(true);
    marquee.appendChild(clone);

    const tracks = marquee.querySelectorAll('.marquee-track');

    const anim = gsap.to(tracks, {
      xPercent: -100,
      ease: 'none',
      duration: 32, // Adjust duration for scroll speed (higher = slower)
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <section className="relative w-full bg-[#1E1311] py-28 overflow-hidden select-none flex flex-col items-center justify-between min-h-[580px] gap-12">
      
      {/* 1. Top Label */}
      <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[#C8A882]/70 font-semibold z-10">
        STUDIO
      </span>

      {/* 2. Overlapping Center Content */}
      <div className="relative w-full flex items-center justify-center flex-grow z-10 px-6 sm:px-12 md:px-16 lg:px-20">
        
        {/* Giant Pink Calligraphy Marquee (runs behind the main text) */}
        <div 
          ref={marqueeRef}
          className="absolute inset-0 flex items-center w-full overflow-hidden pointer-events-none select-none z-0 opacity-[0.9]"
        >
          <div className="marquee-track flex whitespace-nowrap items-center shrink-0">
            <span className="font-calligraphy text-[6.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem] text-[#FF5CA8] italic leading-none pr-8 sm:pr-16">
              Tejas v Krishna
            </span>
            <span className="font-calligraphy text-[6.5rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem] text-[#FF5CA8] italic leading-none pr-8 sm:pr-16">
              Product Designer
            </span>
          </div>
        </div>

        {/* Foreground Main Statement (placed on top with z-10) */}
        <div className="max-w-4xl text-center z-10 pointer-events-none">
          <h2 className="font-display text-[1.8rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[1.2] text-[#F9F6EE] tracking-tight uppercase">
            TEJAS V KRISHNA IS A PRODUCT DESIGNER BORN OUT OF A DESIRE TO SHAPE MEMORABLE DIGITAL INTERFACES & EXPERIENCES
          </h2>
        </div>

      </div>

      {/* 3. Bottom Label */}
      <span className="font-body text-[9px] uppercase tracking-[0.25em] text-[#C8A882]/70 font-semibold text-center px-6 z-10">
        WE COMBINE THE ART OF DESIGN WITH THE RIGOR OF CODE
      </span>

    </section>
  );
};
