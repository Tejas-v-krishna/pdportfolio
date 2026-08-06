import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Handle interactive elements hover states
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .interactive');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
        el.removeEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
      });
    };
  }, []);

  // Use simple transform for performance
  return (
    <>
      <div 
        className="custom-cursor-dot"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <motion.div 
        className="custom-cursor-ring"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />
    </>
  );
}
