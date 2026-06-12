import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface HoverFollowPreviewProps {
  children: React.ReactNode;
  previewSrc: string;
  altText?: string;
}

export const HoverFollowPreview: React.FC<HoverFollowPreviewProps> = ({
  children,
  previewSrc,
  altText = 'Preview'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Motion values for client cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics spring configuration for smooth cursor lagging
  const springConfig = { damping: 22, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    // Offset card so it centers slightly above/right of the cursor
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 130);
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <span
      ref={triggerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block cursor-pointer font-semibold text-[var(--color-text-dark)]"
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              position: 'fixed',
              left: cursorX,
              top: cursorY,
              pointerEvents: 'none',
              zIndex: 1000,
              willChange: 'transform',
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.6, rotate: -5 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
            }}
            className="w-48 h-32 md:w-56 md:h-36 bg-[var(--color-card-bg)] border border-black/10 rounded-lg overflow-hidden shadow-2xl p-1.5 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-md overflow-hidden bg-black/5 relative">
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10" />
              <img
                src={previewSrc}
                alt={altText}
                className="w-full h-full object-cover scale-105"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
