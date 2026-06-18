import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealOptions {
  start?: string;       // ScrollTrigger start e.g. 'top 80%'
  stagger?: number;     // delay between each line in seconds
  duration?: number;    // animation duration in seconds
  ease?: string;        // gsap ease string
  once?: boolean;       // play once or reverse on scroll back
  delay?: number;       // initial delay before animation starts
}

/**
 * Applies the award-winning clip-mask text line reveal animation.
 * Each line of text slides up from beneath an overflow:hidden mask.
 *
 * Usage:
 *   const ref = useRef<HTMLElement>(null);
 *   useTextReveal(ref);
 *   <h2 ref={ref}>Your text</h2>
 */
export function useTextReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: TextRevealOptions = {}
) {
  const {
    start = 'top 80%',
    stagger = 0.12,
    duration = 0.9,
    ease = 'power3.out',
    once = true,
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 1. Split text into lines
    const split = new SplitType(el, {
      types: 'lines',
      lineClass: 'reveal-line-content',
    });

    if (!split.lines || split.lines.length === 0) return;

    // 2. Wrap each line in an overflow:hidden mask div
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('reveal-line-mask');
      wrapper.style.overflow = 'hidden';
      // Preserve display so inline/block text looks right
      wrapper.style.display = 'block';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // 3. Set initial position: each line starts hidden below its mask
    gsap.set(split.lines, { y: '110%' });

    // 4. Animate in on scroll
    const tween = gsap.to(split.lines, {
      y: '0%',
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      // Remove wrapper divs and restore original structure
      split.revert();
      el.querySelectorAll('.reveal-line-mask').forEach((wrapper) => {
        const parent = wrapper.parentNode;
        while (wrapper.firstChild) {
          parent?.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
      });
    };
  }, []);
}
