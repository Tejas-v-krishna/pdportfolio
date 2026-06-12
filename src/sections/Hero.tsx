import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tejasProfile from '../assets/tejas-profile.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
import { Magnetic } from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger, CustomEase);

interface HeroProps {
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoading = false }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stampContainerRef = useRef<HTMLDivElement>(null);
  const stampSvgRef = useRef<SVGSVGElement>(null);
  const mouseOrbRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isLoading) return;

    const heading = headingRef.current;
    if (!heading) return;

    // Register CustomEase
    CustomEase.create(
      "hop",
      "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 "
    );

    // Use split-type to split text into lines
    const typeSplit = new SplitType(heading, {
      types: 'lines',
      tagName: 'span'
    });

    const lines = heading.querySelectorAll('.line');
    const wrapper = heading.closest('.hero-content-wrapper');
    const ellipseImgs = heading.querySelectorAll('.animate-ellipse-appear img');
    const stamp = heading.closest('#hero')?.querySelector('.hero-stamp');

    // Re-bind click event handlers on links inside the split text
    const links = heading.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        if (href.startsWith('/')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(href);
          });
        } else if (href.startsWith('#')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(target, { duration: 1.2 });
              } else {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }
          });
        }
      }
    });

    // Make heading visible now that it is split
    gsap.set(heading, { opacity: 1 });

    // Initial states (blurred and shifted for zoom in)
    gsap.set(wrapper, { 
      scale: 0.82,
      filter: "blur(25px)",
      force3D: true 
    });
    gsap.set(ellipseImgs, { scale: 1.3, force3D: true });
    gsap.set(lines, { opacity: 0, y: 80, filter: 'blur(15px)', force3D: true });
    if (stamp) {
      gsap.set(stamp, { opacity: 0, scale: 0.8, filter: 'blur(10px)', force3D: true });
    }

    // Create reveal timeline matching preloader reveal
    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(wrapper, {
      scale: 1.0,
      filter: "blur(0px)",
      duration: 2.25,
      ease: "power3.inOut",
    }, 0)
    .to(ellipseImgs, {
      scale: 1.0,
      duration: 2.25,
      ease: "power3.inOut",
    }, 0)
    .to(lines, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 2.0,
      ease: "power4.out",
      stagger: 0.15,
      force3D: true
    }, 0.2);

    if (stamp) {
      tl.to(stamp, {
        opacity: 0.8,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.0,
        ease: "power4.out",
        force3D: true
      }, 0.5);
    }

    // Continuous rotation of circular text stamp
    let rotationTween: gsap.core.Tween | null = null;
    const stampSvg = stampSvgRef.current;
    const stampContainer = stampContainerRef.current;

    const handleMouseEnter = () => {
      if (rotationTween) {
        gsap.to(rotationTween, { timeScale: 2.5, duration: 0.6, ease: "power2.out" });
      }
    };

    const handleMouseLeave = () => {
      if (rotationTween) {
        gsap.to(rotationTween, { timeScale: 1.0, duration: 0.8, ease: "power2.out" });
      }
    };

    if (stampSvg && stampContainer) {
      rotationTween = gsap.to(stampSvg, {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%"
      });

      stampContainer.addEventListener('mouseenter', handleMouseEnter);
      stampContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    // Mouse following background orb tracking
    const mouseOrb = mouseOrbRef.current;
    if (mouseOrb) {
      gsap.set(mouseOrb, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (mouseOrb) {
        gsap.to(mouseOrb, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      tl.kill();
      typeSplit.revert();
      if (rotationTween) {
        rotationTween.kill();
      }
      if (stampContainer) {
        stampContainer.removeEventListener('mouseenter', handleMouseEnter);
        stampContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mousemove', handleWindowMouseMove);
      if (mouseOrb) {
        gsap.killTweensOf(mouseOrb);
      }
    };
  }, [isLoading, navigate]);

  return (
    <section id="hero" className="relative min-h-screen py-20 px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Blob Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Yellow Orb (Top Left, slowly drifting) */}
        <div 
          className="absolute w-[45vw] h-[45vw] rounded-full bg-[#FFEBA5] opacity-25 blur-[120px] animate-float-slow"
          style={{
            top: '-15%',
            left: '-15%',
          }}
        />
        {/* Blue Orb (Bottom Right, slowly drifting) */}
        <div 
          className="absolute w-[50vw] h-[50vw] rounded-full bg-[#BCE2FC] opacity-25 blur-[130px] animate-float-slow-reverse"
          style={{
            bottom: '-15%',
            right: '-15%',
          }}
        />
        {/* Purple Mouse-Following Orb */}
        <div 
          ref={mouseOrbRef}
          className="absolute w-[35vw] h-[35vw] rounded-full bg-[#E1CFFC] opacity-20 blur-[110px]"
          style={{
            top: '0px',
            left: '0px',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform'
          }}
        />
      </div>

      {/* 1. Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between z-0 px-6 sm:px-12 md:px-16 lg:px-20 w-full">
        <div className="w-px h-full bg-black/[0.03]"></div>
        <div className="w-px h-full bg-black/[0.03] hidden sm:block"></div>
        <div className="w-px h-full bg-black/[0.03] hidden md:block"></div>
        <div className="w-px h-full bg-black/[0.03] hidden lg:block"></div>
        <div className="w-px h-full bg-black/[0.03]"></div>
      </div>

      {/* 4. Central Headline (with wrapper for scale zoom / blur focus reveal) */}
      <div 
        className="hero-content-wrapper flex flex-col items-center text-center z-10 w-full max-w-7xl"
        style={{ 
          transform: "scale(0.82)",
          filter: "blur(25px)",
          willChange: "transform, filter"
        }}
      >
        
        {/* Headline */}
        <h1 ref={headingRef} className="opacity-0 font-display text-[2.2rem] sm:text-[3.5rem] md:text-[4.8rem] lg:text-[6rem] xl:text-[6.6rem] leading-[1.12] text-[var(--color-text-dark)] tracking-tight max-w-7xl w-full">
          I{' '}
          <Magnetic strength={0.25}>
            <Link 
              to="/about" 
              className="inline-block relative w-[1.35em] h-[1em] mx-1 sm:mx-3 align-baseline top-[0.08em] animate-ellipse-appear cursor-pointer group" 
              style={{ animationDelay: '0.4s' }}
            >
              {/* Ellipse Container */}
              <span className="absolute inset-0 m-auto w-[1.35em] h-[1em] rounded-full overflow-hidden border border-black/10 shadow-md group-hover:w-[1em] transition-all duration-300">
                <img 
                  src={tejasProfile} 
                  alt="Tejas Profile" 
                  className="w-full h-full object-cover" 
                  style={{ transform: "scale(1.4)", willChange: "transform" }}
                />
                {/* Overlay Text */}
                <span className="absolute inset-0 bg-white/85 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                  <span className="text-[var(--color-text-dark)] text-[0.15em] tracking-tight font-medium leading-none whitespace-nowrap">
                    about
                  </span>
                </span>
              </span>
            </Link>
          </Magnetic>{' '}
          create living, breathing
          <br className="hidden md:inline" />
          websites for brands{' '}
          <Magnetic strength={0.25}>
            <a 
              href="#work" 
              className="inline-block relative w-[1.35em] h-[1em] mx-1 sm:mx-3 align-baseline top-[0.08em] animate-ellipse-appear cursor-pointer group" 
              style={{ animationDelay: '0.8s' }}
            >
              {/* Ellipse Container */}
              <span className="absolute inset-0 m-auto w-[1.35em] h-[1em] rounded-full overflow-hidden border border-black/10 shadow-md group-hover:w-[1em] transition-all duration-300 bg-gray-100">
                <img 
                  src="https://placehold.co/400x250/111111/FFFFFF?text=UI/UX" 
                  alt="Product UI Mockup" 
                  className="w-full h-full object-cover" 
                  style={{ transform: "scale(1.4)", willChange: "transform" }}
                />
                {/* Overlay Text */}
                <span className="absolute inset-0 bg-white/85 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                  <span className="text-[var(--color-text-dark)] text-[0.15em] tracking-tight font-medium leading-none whitespace-nowrap">
                    work
                  </span>
                </span>
              </span>
            </a>
          </Magnetic>
          <br className="hidden md:inline" />
          that want to be felt, not just seen.
        </h1>

      </div>

      {/* 5. Circular Text Stamp */}
      <div 
        ref={stampContainerRef}
        className="hero-stamp absolute right-6 sm:right-12 md:right-16 lg:right-20 bottom-8 sm:bottom-12 md:bottom-16 z-10 select-none pointer-events-auto cursor-pointer opacity-80"
      >
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
          {/* Circular Text SVG */}
          <svg
            ref={stampSvgRef}
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible origin-center"
          >
            <defs>
              <path
                id="stampTextPath"
                d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
              />
            </defs>
            <text
              fill="var(--color-text-dark)"
              className="font-body text-[10.5px] uppercase font-semibold"
              style={{ letterSpacing: '4.8px' }}
            >
              <textPath href="#stampTextPath" startOffset="0%">
                THOUGHTFUL DESIGN • MEANINGFUL IMPACT •
              </textPath>
            </text>
          </svg>

          {/* 8-pointed star in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
              fill="none"
            >
              <line x1="32" y1="14" x2="32" y2="50" stroke="var(--color-text-dark)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="32" x2="50" y2="32" stroke="var(--color-text-dark)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="19.3" y1="19.3" x2="44.7" y2="44.7" stroke="var(--color-text-dark)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="19.3" y1="44.7" x2="44.7" y2="19.3" stroke="var(--color-text-dark)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
};

