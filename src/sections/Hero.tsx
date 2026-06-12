import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tejasProfile from '../assets/tejas-profile.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, CustomEase);

interface HeroProps {
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoading = false }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
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

    return () => {
      tl.kill();
      typeSplit.revert();
    };
  }, [isLoading, navigate]);

  return (
    <section id="hero" className="relative min-h-screen py-20 px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col items-center justify-center overflow-hidden">
      
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
          </Link>{' '}
          create living, breathing
          <br className="hidden md:inline" />
          websites for brands{' '}
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
          <br className="hidden md:inline" />
          that want to be felt, not just seen.
        </h1>

      </div>

    </section>
  );
};
