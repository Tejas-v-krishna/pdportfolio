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
import StickyServicesScroll from './components/StickyServicesScroll';
import ExperienceGrid from './components/ExperienceGrid';
import ClientReviewsSection from './components/ClientReviewsSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageTransitionManager, { type PageTransitionRef } from './components/PageTransitionManager';
import NavigationMenu from './components/NavigationMenu';
import CaseStudyPage from './components/CaseStudyPage';
import CookieConsent from './components/CookieConsent';

// Pages
import AccessoriesPage from './components/AccessoriesPage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  // Page States
  const [isAccessoriesPageOpen, setIsAccessoriesPageOpen] = useState(false);
  const [isServicesPageOpen, setIsServicesPageOpen] = useState(false);
  const [isAboutPageOpen, setIsAboutPageOpen] = useState(false);
  const [isProjectsPageOpen, setIsProjectsPageOpen] = useState(false);
  const [isContactPageOpen, setIsContactPageOpen] = useState(false);
  
  // 2-Phase Menu Lifecycle States
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Transition Refs
  const transitionRef = useRef<PageTransitionRef>(null);

  // Trigger page animations only after preloader curtain fully completes exit
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsPreloaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Initialize smooth scrolling & sync with GSAP ScrollTrigger via shared ticker
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Drive Lenis from the GSAP ticker so both share the same RAF loop
    // This prevents double-RAF and keeps ScrollTrigger in perfect sync
    const lenisRAF = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(lenisRAF);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing for most consistent frame timing

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(lenisRAF);
      lenis.destroy();
    };
  }, []);

  // Refresh ScrollTrigger when loading finishes so scroll positions are accurate
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300); // Extra time for paint to settle
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

  const resetAllPages = () => {
    setIsAccessoriesPageOpen(false);
    setIsServicesPageOpen(false);
    setIsAboutPageOpen(false);
    setIsProjectsPageOpen(false);
    setIsContactPageOpen(false);
    setActiveProjectId(null);
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
          resetAllPages();
          
          if (link === 'accessories') {
            setIsAccessoriesPageOpen(true);
          } else if (link === 'services') {
            setIsServicesPageOpen(true);
          } else if (link === 'about') {
            setIsAboutPageOpen(true);
          } else if (link === 'projects') {
            setIsProjectsPageOpen(true);
          } else if (link === 'contact') {
            setIsContactPageOpen(true);
          } else if (link === 'home') {
            // Returns to home, already reset
          } else if (link.startsWith('#')) {
            // Allow DOM to update before scrolling
            setTimeout(() => {
              const element = document.querySelector(link);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 50);
          }
        });
      } else {
        setIsMenuMounted(false);
      }
    }, 300);
  };

  const handleOpenCaseStudy = (id: string) => {
    navigateWithTransition(() => {
      resetAllPages();
      setActiveProjectId(id);
    });
  };

  const handleBackToHome = () => {
    navigateWithTransition(() => {
      resetAllPages();
    });
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

      {isServicesPageOpen ? (
        <ServicesPage onBack={handleBackToHome} />
      ) : isAboutPageOpen ? (
        <AboutPage onBack={handleBackToHome} />
      ) : isProjectsPageOpen ? (
        <ProjectsPage onBack={handleBackToHome} onOpenCaseStudy={handleOpenCaseStudy} />
      ) : isContactPageOpen ? (
        <ContactPage onBack={handleBackToHome} />
      ) : isAccessoriesPageOpen ? (
        <AccessoriesPage onBack={handleBackToHome} />
      ) : activeProjectId ? (
        <CaseStudyPage projectId={activeProjectId} onBack={handleBackToHome} />
      ) : (
        <div className={isLoading ? "h-screen overflow-hidden" : ""}>
          <Navbar onOpenMenu={handleOpenMenu} />
          
          <main>
            <Hero isPreloaded={isPreloaded} />
            <PhilosophyScroll />
            <SelectedWork onOpenCaseStudy={handleOpenCaseStudy} />
            <StickyServicesScroll onContactClick={() => { resetAllPages(); setIsContactPageOpen(true); }} />
            <ExperienceGrid />
            <ClientReviewsSection />
          </main>
          
          <Footer />

        </div>
      )}
    </>
  );
}



export default App;
