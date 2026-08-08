import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, type ElementType } from 'react';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  direction?: 'bottom' | 'top' | 'random';
  mode?: 'slide' | 'blur' | 'fade' | 'slide-blur';
  stagger?: number;
  delay?: number;
  randomize?: boolean;
  splitBy?: 'words' | 'chars';
  triggerOnScroll?: boolean;
  enabled?: boolean;
}

export default function SplitTextReveal({
  text,
  className = '',
  as: Component = 'span',
  direction = 'bottom',
  mode = 'slide',
  stagger,
  delay = 0,
  randomize = false,
  splitBy = 'words',
  triggerOnScroll = true,
  enabled = true
}: SplitTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  // Default stagger timing based on splitBy type (faster for chars)
  const effectiveStagger = stagger ?? (splitBy === 'chars' ? 0.025 : 0.05);

  // Split into words
  const words = useMemo(() => text.split(' '), [text]);

  // Total count of units for stagger index
  const totalUnits = useMemo(() => {
    if (splitBy === 'chars') {
      return text.replace(/\s+/g, '').length;
    }
    return words.length;
  }, [text, words, splitBy]);

  // Compute staggered delay map for each unit index
  const delayMap = useMemo(() => {
    const indices = Array.from({ length: totalUnits }, (_, i) => i);
    if (randomize) {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }
    const map = new Array(totalUnits);
    indices.forEach((originalIndex, order) => {
      map[originalIndex] = order * effectiveStagger;
    });
    return map;
  }, [totalUnits, randomize, effectiveStagger]);

  const getInitialY = (index: number) => {
    if (mode === 'fade') return '0%';
    if (direction === 'top') return '-120%';
    if (direction === 'random') return index % 2 === 0 ? '-120%' : '120%';
    return '120%';
  };

  const getInitialFilter = () => {
    if (mode === 'blur' || mode === 'slide-blur') return 'blur(12px)';
    return 'blur(0px)';
  };

  const isAnimate = enabled && (triggerOnScroll ? isInView : true);

  let unitCounter = 0;

  return (
    <Component className={`inline-block ${className}`}>
      <span ref={ref} className="inline-flex flex-wrap items-baseline">
        {words.map((word, wordIdx) => {
          if (splitBy === 'words') {
            const currentIdx = unitCounter++;
            const itemDelay = delay + (delayMap[currentIdx] || 0);
            const initialY = getInitialY(currentIdx);
            const initialFilter = getInitialFilter();

            return (
              <span key={wordIdx} className="inline-block overflow-hidden py-1 mr-[0.28em] last:mr-0">
                <motion.span
                  initial={{
                    y: initialY,
                    opacity: 0,
                    filter: initialFilter,
                  }}
                  animate={
                    isAnimate
                      ? {
                          y: '0%',
                          opacity: 1,
                          filter: 'blur(0px)',
                        }
                      : {}
                  }
                  transition={{
                    duration: mode.includes('blur') ? 0.75 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: itemDelay,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            );
          } else {
            // splitBy === 'chars'
            const chars = word.split('');
            return (
              <span key={wordIdx} className="inline-flex overflow-hidden py-1 mr-[0.28em] last:mr-0">
                {chars.map((char, charIdx) => {
                  const currentIdx = unitCounter++;
                  const itemDelay = delay + (delayMap[currentIdx] || 0);
                  const initialY = getInitialY(currentIdx);
                  const initialFilter = getInitialFilter();

                  return (
                    <motion.span
                      key={charIdx}
                      initial={{
                        y: initialY,
                        opacity: 0,
                        filter: initialFilter,
                      }}
                      animate={
                        isAnimate
                          ? {
                              y: '0%',
                              opacity: 1,
                              filter: 'blur(0px)',
                            }
                          : {}
                      }
                      transition={{
                        duration: mode.includes('blur') ? 0.75 : 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: itemDelay,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          }
        })}
      </span>
    </Component>
  );
}
