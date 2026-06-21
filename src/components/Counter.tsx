import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

const Counter: React.FC<CounterProps> = ({ end, suffix = '', duration = 2, label }) => {
  const [value, setValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!counterRef.current) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setTimeout(() => setValue(end), 0);
      return;
    }

    const obj = { val: 0 };
    
    ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power3.out',
          onUpdate: () => {
            setValue(Math.floor(obj.val));
          }
        });
      },
      once: true
    });
  }, [end, duration]);

  return (
    <div ref={counterRef} className="flex flex-col gap-2">
      <div className="text-5xl md:text-7xl font-display font-bold text-primary">
        {value}{suffix}
      </div>
      <div className="text-sm tracking-widest uppercase text-accent font-semibold max-w-[150px]">
        {label}
      </div>
    </div>
  );
};

export default Counter;
