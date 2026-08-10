import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface PageTransitionRef {
  triggerMenuOpen: (onCovered: () => void, onComplete?: () => void) => void;
  triggerMenuClose: (onCovered: () => void, onComplete?: () => void) => void;
  triggerLinkTransition: (onCovered?: () => void) => void;
}

const PageTransitionManager = forwardRef<PageTransitionRef>((_props, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const createBlocks = (color = '#09090b', mode: 'vertical' | 'horizontal') => {
    if (!overlayRef.current) return;
    overlayRef.current.className = `transition-overlay ${mode}-mode`;
    overlayRef.current.innerHTML = '';
    blocksRef.current = [];
    
    const numBlocks = 20;
    
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement('div');
      block.className = 'transition-block';
      block.style.backgroundColor = color;
      overlayRef.current.appendChild(block);
      blocksRef.current.push(block);
    }
  };

  const cleanupOverlays = () => {
    if (overlayRef.current) {
      overlayRef.current.innerHTML = '';
      gsap.set(overlayRef.current, { display: 'none', opacity: 0 });
    }
    if (logoOverlayRef.current) {
      gsap.set(logoOverlayRef.current, { display: 'none', opacity: 0 });
    }
    blocksRef.current = [];
  };

  useEffect(() => {
    cleanupOverlays();
  }, []);

  useImperativeHandle(ref, () => ({
    // 1. Menu Button Click: Bottom-to-Top Slicing Transition
    triggerMenuOpen: (onCovered: () => void, onComplete?: () => void) => {
      if (isTransitioning.current || !overlayRef.current) return;
      isTransitioning.current = true;

      createBlocks('#f4f4f0', 'vertical');

      const blocks = blocksRef.current;
      gsap.killTweensOf(blocks);
      gsap.set(overlayRef.current, { display: 'flex', opacity: 1 });
      gsap.set(blocks, { scaleY: 0, scaleX: 1, opacity: 1, transformOrigin: "bottom" });

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false;
          cleanupOverlays();
          if (onComplete) onComplete();
        }
      });

      tl.to(blocks, {
        scaleY: 1.05,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.inOut"
      });

      tl.add(() => {
        onCovered();
      });

      tl.set(blocks, { transformOrigin: "top" });
      tl.to(blocks, {
        scaleY: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.inOut"
      });
    },

    // 2. Menu Close Button Click: Bottom-to-Top Slicing Transition with Black blocks
    triggerMenuClose: (onCovered: () => void) => {
      if (isTransitioning.current || !overlayRef.current) return;
      isTransitioning.current = true;

      createBlocks('#09090b', 'vertical'); // Obsidian black blocks to cover white menu

      const blocks = blocksRef.current;
      gsap.killTweensOf(blocks);
      gsap.set(overlayRef.current, { display: 'flex', opacity: 1 });
      gsap.set(blocks, { scaleY: 0, scaleX: 1, opacity: 1, transformOrigin: "bottom" });

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false;
          cleanupOverlays();
        }
      });

      tl.to(blocks, {
        scaleY: 1.05,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.inOut"
      });

      tl.add(() => {
        onCovered();
      });

      tl.set(blocks, { transformOrigin: "top" });
      tl.to(blocks, {
        scaleY: 0,
        duration: 0.35,
        stagger: 0.02,
        ease: "power2.inOut"
      });
    },

    // 3. Link or Menu Link Click: Left-to-Right Slicing with Logo Draw Transition
    triggerLinkTransition: (onCovered?: () => void) => {
      if (isTransitioning.current || !overlayRef.current || !logoOverlayRef.current) return;
      isTransitioning.current = true;

      createBlocks('#09090b', 'horizontal');

      const blocks = blocksRef.current;
      gsap.killTweensOf(blocks);
      gsap.set(overlayRef.current, { display: 'flex', opacity: 1 });
      gsap.set(blocks, { scaleX: 0, scaleY: 1, opacity: 1, transformOrigin: "left" });

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false;
          cleanupOverlays();
        }
      });

      // Scale blocks left to right
      tl.to(blocks, {
        scaleX: 1.05,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.inOut"
      });

      // Call cover callback
      tl.add(() => {
        if (onCovered) onCovered();
        gsap.set(logoOverlayRef.current, { display: 'flex', opacity: 0 });
      });

      // Fade in Logo
      tl.to(logoOverlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Hold Logo
      tl.to(logoOverlayRef.current, {
        opacity: 1,
        duration: 0.5
      });

      // Fade out logo
      tl.to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.3
      });

      // Scale blocks right
      tl.set(blocks, { transformOrigin: "right" });
      tl.to(blocks, {
        scaleX: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.inOut"
      }, "-=0.3");
    }
  }));

  return (
    <>
      <div ref={overlayRef} className="transition-overlay vertical-mode" />
      
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <img src="/logo.png" alt="Transition Logo" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </>
  );
});

PageTransitionManager.displayName = 'PageTransitionManager';

export default PageTransitionManager;
