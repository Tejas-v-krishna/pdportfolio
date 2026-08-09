import { motion, useInView } from 'framer-motion';
import { useRef, useMemo, type ElementType } from 'react';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  direction?: 'bottom' | 'top' | 'random';
  mode?: 'slide' | 'blur' | 'fade' | 'slide-blur' | 'skew';
  skew?: boolean;
  stagger?: number;
  delay?: number;
  randomize?: boolean;
  splitBy?: 'words' | 'chars';
  triggerOnScroll?: boolean;
  enabled?: boolean;
}

// Shared animate target — same object reference on every render
const ANIMATE_TARGET = { y: '0%', opacity: 1, filter: 'blur(0px)', skewY: 0 };

export default function SplitTextReveal({
  text,
  className = '',
  as: Component = 'span',
  direction = 'bottom',
  mode = 'slide',
  skew = false,
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

  const getInitialSkewY = () => {
    if (skew || mode === 'skew') {
      return direction === 'top' ? -6 : 6;
    }
    return 0;
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
            const initialSkew = getInitialSkewY();

            return (
              <span key={wordIdx} className="inline-block overflow-hidden py-[0.18em] -my-[0.18em] px-[0.08em] -mx-[0.08em] mr-[0.28em] last:mr-0">
                <motion.span
                  initial={{
                    y: initialY,
                    opacity: mode === 'fade' ? 0 : 1,
                    filter: initialFilter,
                    skewY: initialSkew,
                  }}
                  animate={
                    isAnimate
                      ? ANIMATE_TARGET
                      : { y: initialY }
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: itemDelay,
                  }}
                  className="inline-block origin-bottom-left"
                >
                  {word}
                </motion.span>
              </span>
            );
          } else {
            // splitBy === 'chars' (Splits every text into individual letter elements like reference)
            const chars = word.split('');
            const initialSkew = getInitialSkewY();

            return (
              <span key={wordIdx} className="inline-flex overflow-hidden py-[0.06em] -my-[0.06em] px-[0.03em] -mx-[0.03em] mr-[0.25em] last:mr-0 leading-none">
                {chars.map((char, charIdx) => {
                  const currentIdx = unitCounter++;
                  const itemDelay = delay + (delayMap[currentIdx] || 0);
                  const initialY = getInitialY(currentIdx);
                  const initialFilter = getInitialFilter();

                  return (
                    <motion.span
                      key={charIdx}
                      className="gsap_split_letter inline-block relative origin-bottom-left"
                      initial={{
                        y: initialY,
                        opacity: mode === 'fade' ? 0 : 1,
                        filter: initialFilter,
                        skewY: initialSkew,
                      }}
                      animate={
                        isAnimate
                          ? ANIMATE_TARGET
                          : { y: initialY }
                      }
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: itemDelay,
                      }}
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
