import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export const HoverRollingText: React.FC<{ text: string, className?: string, isHovered?: boolean }> = ({ text, className, isHovered }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const text1 = containerRef.current.querySelector('.text-1') as HTMLElement;
    const text2 = containerRef.current.querySelector('.text-2') as HTMLElement;

    // Split into lines + chars for both copies
    const split1 = new SplitType(text1, { types: 'lines,chars' });
    const split2 = new SplitType(text2, { types: 'lines,chars' });

    // Apply clip-path to each LINE (not the outer container).
    // - Clips chars within that line's height only → no bleed between lines
    // - clip-path doesn't affect baseline (unlike overflow:hidden)
    // - Negative vertical inset gives ascenders & descenders breathing room
    const allLines = [...(split1.lines ?? []), ...(split2.lines ?? [])];
    allLines.forEach(line => {
      // Top: 0 clips flush at line top; Bottom: -0.2em gives descenders room.
      // Applying to the line (block) doesn't break baseline.
      (line as HTMLElement).style.clipPath = 'inset(0 0 -0.2em 0)';
    });

    // Start text-2 chars below their own line's clip boundary
    gsap.set(split2.chars, { yPercent: 120 });

    const tl = gsap.timeline({ paused: true });

    tl.to(split1.chars, {
      yPercent: -120,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.inOut',
    })
    .to(split2.chars, {
      yPercent: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.inOut',
    }, '<');

    tlRef.current = tl;

    if (isHovered) tl.progress(1);

    return () => {
      split1.revert();
      split2.revert();
      tl.kill();
    };
  }, [text]);

  useEffect(() => {
    if (isHovered !== undefined && tlRef.current) {
      if (isHovered) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => { if (tlRef.current) tlRef.current.play(); };
  const handleMouseLeave = () => { if (tlRef.current) tlRef.current.reverse(); };

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* text-1 sets the layout size; text-2 sits on top via absolute */}
      <span className="text-1 inline-block">{text}</span>
      <span className="text-2 absolute top-0 left-0 w-full" aria-hidden="true">{text}</span>
    </span>
  );
};
