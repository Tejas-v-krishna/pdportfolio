import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhilosophyScroll from './components/PhilosophyScroll';
import SelectedWork from './components/SelectedWork';
import CraftShowcase from './components/CraftShowcase';
import ExperienceGrid from './components/ExperienceGrid';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageTransitionManager, { type PageTransitionRef } from './components/PageTransitionManager';
import NavigationMenu from './components/NavigationMenu';
import CaseStudyModal from './components/CaseStudyModal';
import CookieConsent from './components/CookieConsent';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  // 2-Phase Menu Lifecycle States
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Transition Refs
  const transitionRef = useRef<PageTransitionRef>(null);

  // Initialize smooth scrolling & sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function updateLenis(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Refresh ScrollTrigger when loading finishes so scroll positions are accurate
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Use the transition manager for navigation
  const navigateWithTransition = (callback: () => void) => {
    if (transitionRef.current) {
      transitionRef.current.triggerLinkTransition(callback);
    } else {
      callback();
    }
  };

  const handleOpenMenu = () => {
    if (transitionRef.current) {
      transitionRef.current.triggerMenuOpen(
        // Start menu mounting & element stagger immediately at curtain cover peak so it reveals without delay
        () => {
          setIsMenuMounted(true);
          setIsMenuOpen(true);
        }
      );
    } else {
      setIsMenuMounted(true);
      setIsMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    // Phase 1: Hide elements first
    setIsMenuOpen(false);
    
    // Phase 2: ONLY AFTER elements are fully hidden, trigger the slicing curtain
    setTimeout(() => {
      if (transitionRef.current) {
        transitionRef.current.triggerMenuClose(() => {
          setIsMenuMounted(false);
        });
      } else {
        setIsMenuMounted(false);
      }
    }, 300);
  };

  const handleMenuItemClick = (link: string) => {
    if (link === 'CLOSE_MENU') {
      handleCloseMenu();
      return;
    }
    
    // Phase 1: Hide elements first
    setIsMenuOpen(false);

    // Phase 2: ONLY AFTER elements are hidden, trigger link transition curtain
    setTimeout(() => {
      if (transitionRef.current) {
        transitionRef.current.triggerLinkTransition(() => {
          setIsMenuMounted(false);
          if (link.startsWith('#')) {
            const element = document.querySelector(link);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      } else {
        setIsMenuMounted(false);
      }
    }, 300);
  };

  const handleOpenCaseStudy = (id: string) => {
    navigateWithTransition(() => setActiveProjectId(id));
  };

  const handleCloseCaseStudy = () => {
    navigateWithTransition(() => setActiveProjectId(null));
  };

  return (
    <>
      <CookieConsent />
      <CustomCursor />
      <PageTransitionManager ref={transitionRef} />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <NavigationMenu 
        isMounted={isMenuMounted}
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onItemClick={handleMenuItemClick}
      />

      <div className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Navbar onOpenMenu={handleOpenMenu} />
        
        <main>
          <Hero />
          <PhilosophyScroll />
          <SelectedWork onOpenCaseStudy={handleOpenCaseStudy} />
          <CraftShowcase />
          <ExperienceGrid />
        </main>
        
        <Footer />

        <CaseStudyModal 
          isOpen={activeProjectId !== null} 
          onClose={handleCloseCaseStudy} 
          projectId={activeProjectId} 
        />
      </div>
    </>
  );
}

export default App;
