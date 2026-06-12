import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { About } from './pages/About';
import { Notes } from './pages/Notes';
import { Preloader } from './components/Preloader';
import { SmoothCursor } from './components/SmoothCursor';

gsap.registerPlugin(ScrollTrigger);

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  const handleTransitionStart = useCallback(() => {
    setReadyToAnimate(true);
  }, []);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Initialize Lenis once loading is complete
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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

      <div className="relative min-h-screen selection:bg-[var(--color-text-dark)] selection:text-[var(--color-base)] flex flex-col">
        
        {/* Global Navigation */}
        <NavBar />

        {/* Page Routes */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isLoading={!readyToAnimate} />} />
            <Route path="/play" element={<Play />} />
            <Route path="/about" element={<About />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;