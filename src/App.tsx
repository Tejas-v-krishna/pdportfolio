import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { About } from './pages/About';
import { Notes } from './pages/Notes';
import { Preloader } from './components/Preloader';

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <Router>
      <ScrollToTop />
      {loading && (
        <Preloader 
          onExitStart={() => setReadyToAnimate(true)} 
          onComplete={() => setLoading(false)} 
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