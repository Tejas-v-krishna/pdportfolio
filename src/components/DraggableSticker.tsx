import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const stickerPool = [
  '/stickers/3.png',
  '/stickers/1.png',
  '/stickers/7.png',
  '/stickers/10.png',
  '/stickers/5.png',
  '/stickers/8.png',
  '/stickers/11.png',
];

interface Particle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  sticker: string;
}

interface DraggableStickerProps {
  src?: string;
  alt?: string;
  initialRotate?: number;
  className?: string;
  delay?: number;
}

export default function DraggableSticker({
  src = '/stickers/3.png',
  alt = 'Interactive Sticker',
  initialRotate = 12,
  className = '',
  delay = 2.5
}: DraggableStickerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [stickerIndex, setStickerIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [spinKey, setSpinKey] = useState(0);

  const activeSrc = clickCount > 3 ? stickerPool[stickerIndex] : src;

  const handleTap = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount > 3) {
      setStickerIndex((prev) => (prev + 1) % stickerPool.length);
      setSpinKey((prev) => prev + 1);

      // Generate burst particles around the sticker
      const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 280,
        y: (Math.random() - 0.5) * 280 - 40,
        rotate: Math.random() * 360 - 180,
        scale: 0.4 + Math.random() * 0.6,
        sticker: stickerPool[Math.floor(Math.random() * stickerPool.length)],
      }));

      setParticles(newParticles);

      // Auto-clean particles after animation completes
      setTimeout(() => {
        setParticles([]);
      }, 1400);
    }
  };

  return (
    <div ref={constraintsRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Floating Particles / Easter Egg Confetti Burst */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: '50%', y: '50%', rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              scale: p.scale,
              x: `calc(50% + ${p.x}px)`,
              y: `calc(50% + ${p.y}px)`,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 w-12 h-12 pointer-events-none z-40"
          >
            <img src={p.sticker} alt="Confetti Sticker" className="w-full h-full object-contain drop-shadow-md" />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onTap={handleTap}
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotate: spinKey > 0 ? [initialRotate, initialRotate + 360] : initialRotate 
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: delay,
          rotate: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }}
        whileHover={{ scale: 1.1, rotate: initialRotate - 8, cursor: 'grab' }}
        whileTap={{ scale: 0.92, cursor: 'grabbing' }}
        whileDrag={{ scale: 1.15, rotate: 0 }}
        className={`pointer-events-auto absolute cursor-grab active:cursor-grabbing select-none group touch-none ${className}`}
      >
        <img
          key={activeSrc}
          src={activeSrc}
          alt={alt}
          draggable={false}
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)] transition-shadow duration-300"
        />
      </motion.div>
    </div>
  );
}
