import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export type PostitColor = 'white' | 'light-grey' | 'mid-grey' | 'black';
export type DoodleType = 'star' | 'smiley' | 'wireframe' | 'lightning';

interface DraggablePostitProps {
  text: string;
  color: PostitColor;
  doodleType: DoodleType;
  defaultPosition: { x: number; y: number };
  defaultRotation: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const DraggablePostit: React.FC<DraggablePostitProps> = ({
  text,
  color,
  doodleType,
  defaultPosition,
  defaultRotation,
  containerRef
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Drag position values to calculate dynamic tilt during dragging
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 200], [-30, 30]);

  // Color mapping
  const colorClasses = {
    white: {
      bg: '#FFFFFF',
      border: 'border-gray-200',
      text: '#171717',
      marker: '#404040',
    },
    'light-grey': {
      bg: '#F4F5F7',
      border: 'border-gray-300/40',
      text: '#2D3748',
      marker: '#4A5568',
    },
    'mid-grey': {
      bg: '#E2E8F0',
      border: 'border-gray-400/30',
      text: '#1A202C',
      marker: '#2D3748',
    },
    black: {
      bg: '#18181B',
      border: 'border-zinc-800',
      text: '#FAFAFA',
      marker: '#D4D4D8',
    }
  };

  const activeColor = colorClasses[color];

  // Helper to get SVG doodle markup
  const renderDoodle = () => {
    switch (doodleType) {
      case 'star':
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none" stroke={activeColor.marker} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 10 L62 38 L92 38 L68 56 L78 86 L50 68 L22 86 L32 56 L8 38 L38 38 Z" />
            <path d="M50 25 L56 38 L72 38 L60 47 L65 62 L50 52 L35 62 L40 47 L28 38 L44 38 Z" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );
      case 'smiley':
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none" stroke={activeColor.marker} strokeWidth="3.5" strokeLinecap="round">
            {/* Hand-drawn circular face */}
            <path d="M 50 10 C 75 12, 90 28, 90 50 C 90 75, 72 90, 50 90 C 28 90, 10 75, 10 50 C 10 28, 28 10, 50 10" strokeDasharray="300" strokeDashoffset="0" />
            {/* Eyes */}
            <path d="M 35 40 Q 37 36, 39 40 M 35 40 Q 37 44, 39 40" strokeWidth="4" />
            <path d="M 61 40 Q 63 36, 65 40 M 61 40 Q 63 44, 65 40" strokeWidth="4" />
            {/* Smile */}
            <path d="M 30 60 Q 50 78, 70 60" strokeLinecap="round" />
            {/* Cheek detail */}
            <path d="M 24 58 Q 26 56, 28 58" strokeWidth="2.5" />
            <path d="M 72 58 Q 74 56, 76 58" strokeWidth="2.5" />
          </svg>
        );
      case 'wireframe':
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none" stroke={activeColor.marker} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Wireframe browser mock */}
            <rect x="15" y="20" width="70" height="60" rx="4" />
            <line x1="15" y1="35" x2="85" y2="35" />
            <circle cx="25" cy="27.5" r="2" />
            <circle cx="32" cy="27.5" r="2" />
            <circle cx="39" cy="27.5" r="2" />
            {/* Inner layout wireframe */}
            <rect x="25" y="45" width="20" height="25" rx="2" strokeWidth="2" />
            <line x1="53" y1="48" x2="75" y2="48" strokeWidth="2" />
            <line x1="53" y1="56" x2="71" y2="56" strokeWidth="2" />
            <line x1="53" y1="64" x2="65" y2="64" strokeWidth="2" />
          </svg>
        );
      case 'lightning':
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20" fill="none" stroke={activeColor.marker} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M55 10 L25 52 L48 52 L35 90 L75 42 L52 42 Z" />
            <path d="M60 20 L35 56 M42 46 L65 46" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        position: 'absolute',
        left: `${defaultPosition.x}%`,
        top: `${defaultPosition.y}%`,
        perspective: 1000,
        x: dragX,
        rotate: dragRotate,
        zIndex: isHovered || isDragging ? 50 : 20,
      }}
      className="hidden md:block select-none touch-none"
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered || isDragging ? 1.06 : 1.0,
          rotateZ: isDragging ? 0 : defaultRotation,
          y: isHovered && !isDragging ? -8 : 0,
        }}
        transition={{
          rotateY: { type: 'spring', stiffness: 150, damping: 20 },
          scale: { type: 'spring', stiffness: 300, damping: 25 },
          y: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handleDoubleClick}
        style={{
          transformStyle: 'preserve-3d',
          width: '160px',
          height: '160px',
        }}
        className={`relative rounded-sm shadow-md transition-shadow duration-300 ${
          isHovered || isDragging ? 'shadow-xl shadow-black/15' : 'shadow-md shadow-black/8'
        } border ${activeColor.border} cursor-grab active:cursor-grabbing`}
      >
        
        {/* Front Side */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: activeColor.bg,
            color: activeColor.text,
            width: '100%',
            height: '100%',
          }}
          className="absolute inset-0 flex flex-col justify-between p-4 rounded-sm"
        >
          {/* Tape Texture Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 w-14 h-5 bg-white/25 backdrop-blur-[1px] rotate-[1.5deg] border border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)] pointer-events-none" />

          {/* Cursive handwritten body text */}
          <div className="font-handwriting text-xl font-medium leading-tight pt-2 pr-1">
            {text}
          </div>

          {/* Hint indicator */}
          <div className="text-[9px] uppercase tracking-wider opacity-30 text-right select-none pointer-events-none">
            dbl click
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: activeColor.bg,
            transform: 'rotateY(180deg)',
            width: '100%',
            height: '100%',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 rounded-sm"
        >
          {/* Subtle grid pattern background on the back of post-it */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />

          {/* Render SVG Doodle */}
          <div className="relative z-10 flex items-center justify-center">
            {renderDoodle()}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};
