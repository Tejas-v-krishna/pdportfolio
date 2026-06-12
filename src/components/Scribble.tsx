import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScribbleType = 'underline' | 'circle' | 'arrow' | 'asterisk';

interface ScribbleProps extends React.SVGProps<SVGSVGElement> {
  type: ScribbleType;
  delay?: number;
}

const Scribble: React.FC<ScribbleProps> = ({ type, className, delay = 0, ...props }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      ScrollTrigger.create({
        trigger: path,
        start: 'top 95%', // Trigger slightly lower so it starts as soon as visible
        onEnter: () => {
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
            delay: delay,
          });
        },
      });
    } else {
      gsap.set(path, { strokeDashoffset: 0 });
    }
  }, [delay]);

  const getPath = () => {
    switch (type) {
      case 'underline':
        return 'M5,20 Q50,5 95,20 T195,15';
      case 'circle':
        return 'M50,10 C80,5 95,40 70,80 C40,110 5,80 15,40 C20,10 60,5 80,20';
      case 'arrow':
        return 'M10,50 L90,50 M70,30 L90,50 L70,70';
      case 'asterisk':
        return 'M50,10 L50,90 M10,50 L90,50 M20,20 L80,80 M20,80 L80,20';
      default:
        return '';
    }
  };

  const getBox = () => {
    switch (type) {
      case 'underline': return '0 0 200 40';
      case 'circle': return '0 0 100 100';
      case 'arrow': return '0 0 100 100';
      case 'asterisk': return '0 0 100 100';
      default: return '0 0 100 100';
    }
  };

  return (
    <svg
      viewBox={getBox()}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path ref={pathRef} d={getPath()} />
    </svg>
  );
};

export default Scribble;
