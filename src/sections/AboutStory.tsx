import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { id: 'who', left: 'Who.', right: 'Made by people. Shaped for people.' },
  { id: 'what', left: 'What.', right: "Brands aren't explanations, they are history." },
  { id: 'why', left: 'Why.', right: 'Because you only get one chance to be remembered.' },
  { id: 'how', left: 'How.', right: "Don't change the essence, change the way you present it." },
];

export const AboutStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=300%', // Scroll 3 viewport heights to go through all steps
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Progress 0 to 1
          // We have 4 items, so index is based on 25% increments
          let index = Math.floor(self.progress * 4);
          if (index >= 4) index = 3;
          if (index < 0) index = 0;
          setActiveIndex(index);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-black flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-32 text-white relative z-30 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-24">
        
        {/* Left Column */}
        <div className="md:w-1/3 relative h-[80px] sm:h-[100px] md:h-[120px] w-full">
          {data.map((item, index) => (
            <h2
              key={item.id}
              className={`absolute top-0 left-0 text-6xl sm:text-7xl md:text-8xl font-display font-medium text-[#A0A0A0] transition-all duration-500 ease-out ${
                index === activeIndex 
                  ? 'opacity-100 translate-y-0' 
                  : index < activeIndex 
                    ? 'opacity-0 -translate-y-8' 
                    : 'opacity-0 translate-y-8'
              }`}
            >
              {item.left}
            </h2>
          ))}
        </div>

        {/* Right Column */}
        <div className="md:w-2/3">
          <p className="text-3xl sm:text-4xl md:text-5xl font-display leading-[1.3] font-medium text-[#404040]">
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <span
                  className={`transition-colors duration-500 ease-out ${
                    index === activeIndex ? 'text-white' : 'text-[#404040]'
                  }`}
                >
                  {item.right}
                </span>
                {index < data.length - 1 && ' '}
              </React.Fragment>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
};
