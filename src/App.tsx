import { useEffect, useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { About } from './pages/About';
import { Notes } from './pages/Notes';
import { Preloader } from './components/Preloader';
import { SmoothCursor } from './components/SmoothCursor';
import { EasterEgg } from './pages/EasterEgg';
import { BottomStatusBar } from './components/BottomStatusBar';
import { UnderlayMenu } from './components/UnderlayMenu';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ConditionalFooter() {
  const { pathname } = useLocation();
  if (pathname === '/easter-egg') return null;
  return <Footer />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [readyToAnimate, setReadyToAnimate] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  const handleTransitionStart = useCallback(() => {
    setReadyToAnimate(true);
  }, []);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Register custom ease
    CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");

    const isMobile = window.innerWidth <= 768;
    const menuWidth = isMobile ? window.innerWidth * 0.8 : 480;

    const xOffset = isMenuOpen ? -menuWidth : 0;
    const borderRadius = isMenuOpen ? '24px' : '0px';

    // Toggle scroll lock
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }

    // Main shift
    gsap.to(mainRef.current, {
      x: xOffset,
      borderRadius: borderRadius,
      duration: 0.7,
      ease: "energy"
    });

    // Dark overlay opacity fade
    gsap.to(darkRef.current, {
      opacity: isMenuOpen ? 1 : 0,
      pointerEvents: isMenuOpen ? 'auto' : 'none',
      duration: 0.5
    });

    // Toggle button label roll-up
    gsap.to(".underlay-nav__toggle-labels-wrapper", {
      yPercent: isMenuOpen ? -50 : 0,
      duration: 0.4,
      ease: "energy"
    });

    // Toggle bars rotation to X
    const barTop = document.querySelector(".underlay-nav__toggle-bar-top");
    const barBottom = document.querySelector(".underlay-nav__toggle-bar-bottom");
    if (barTop && barBottom) {
      gsap.to(barTop, {
        y: isMenuOpen ? 3 : 0,
        rotation: isMenuOpen ? 45 : 0,
        duration: 0.35,
        ease: isMenuOpen ? "back.out(1.4)" : "power3.out"
      });
      gsap.to(barBottom, {
        y: isMenuOpen ? -3 : 0,
        rotation: isMenuOpen ? -45 : 0,
        duration: 0.35,
        ease: isMenuOpen ? "back.out(1.4)" : "power3.out"
      });
    }

    // Toggle button color
    gsap.to(".underlay-nav__toggle-btn", {
      color: isMenuOpen ? '#000000' : '#1A1A18',
      duration: 0.4
    });

    // Border line inside menu
    gsap.to(".underlay-nav__bottom-border", {
      scaleX: isMenuOpen ? 1 : 0,
      duration: 0.5,
      ease: "energy"
    });

    // Large Menu Items stagger
    const largeItems = document.querySelectorAll("[data-reveal-l]");
    if (isMenuOpen) {
      gsap.fromTo(largeItems,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "energy",
          delay: 0.1
        }
      );
    } else {
      gsap.to(largeItems, {
        opacity: 0,
        x: 20,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    // Small Menu Items stagger
    const smallItems = document.querySelectorAll("[data-reveal-s]");
    if (isMenuOpen) {
      gsap.fromTo(smallItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.3
        }
      );
    } else {
      gsap.to(smallItems, {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.in"
      });
    }

    // Handle Resize adjustment
    const handleResize = () => {
      if (isMenuOpen && mainRef.current) {
        const isMobile = window.innerWidth <= 768;
        const menuWidth = isMobile ? window.innerWidth * 0.8 : 480;
        gsap.set(mainRef.current, { x: -menuWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis once loading is complete
    const lenis = new Lenis({
      duration: 2.3, // Slower decay for more cinematic transition
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean exponential ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // Slower per-notch scroll speed
    });

    // Expose Lenis globally
    (window as any).lenis = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker (prevents pin jittering/stuttering)
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      (window as any).lenis = null;
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <Router>
      <ScrollToTop />
      <SmoothCursor />
      {loading && (
        <Preloader 
          onTransitionStart={handleTransitionStart}
          onComplete={handleComplete} 
        />
      )}

      {/* Underlay Navigation Menu */}
      <UnderlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content Area */}
      <div 
        ref={mainRef}
        className="relative min-h-screen selection:bg-[var(--color-text-dark)] selection:text-[var(--color-base)] flex flex-col bg-[var(--color-base)] z-[20] shadow-2xl"
        style={{
          transformOrigin: 'right center',
        }}
      >
        {/* Click to Close & Dimming Overlay */}
        <div 
          ref={darkRef}
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-[1000] opacity-0 pointer-events-none transition-opacity duration-500 ease-out"
        />

        {/* Global Navigation */}
        <NavBar isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />

        {/* Page Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isLoading={!readyToAnimate} />} />
            <Route path="/play" element={<Play />} />
            <Route path="/about" element={<About />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/easter-egg" element={<EasterEgg />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <ConditionalFooter />

        {/* Dynamic Status Bar */}
        <BottomStatusBar />
        
      </div>
    </Router>
  );
}

export default App;