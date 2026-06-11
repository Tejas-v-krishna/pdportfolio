import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tejasProfile from '../assets/tejas-profile.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

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

    // Use split-type to split text into lines
    const typeSplit = new SplitType(heading, {
      types: 'lines',
      tagName: 'span'
    });

    // Wrap each line in a mask span with overflow hidden for reveal effect
    const lines = heading.querySelectorAll('.line');
    lines.forEach((line) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'line-wrapper block overflow-hidden';
      if (line.parentNode) {
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      }
    });

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
        }
      }
    });

    // Make heading visible now that it is split
    gsap.set(heading, { opacity: 1 });

    const wrappers = heading.querySelectorAll('.line-wrapper');

    // Create coordinated timeline for the portal reveal + de-blur
    const tl = gsap.timeline();

    tl.fromTo(wrappers,
      {
        clipPath: 'inset(0% 50% 0% 50%)'
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power3.inOut',
        stagger: 0.15
      }
    );

    tl.fromTo(lines, 
      {
        y: '100%',
        opacity: 0,
        filter: 'blur(15px)'
      },
      {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.45,
        ease: 'power3.out',
        stagger: 0.15
      },
      '<0.15'
    );

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

      {/* 2. Blurred Gradients */}
      {/* Top Left Red-Orange Blur */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-orange-400 to-red-500 opacity-20 blur-[80px] sm:blur-[110px] pointer-events-none z-0"></div>
      
      {/* Bottom Right Blue-Purple-Green Blur */}
      <div className="absolute bottom-[-5%] right-[-10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-green-200 opacity-25 blur-[90px] sm:blur-[120px] pointer-events-none z-0"></div>

      {/* 4. Central Headline */}
      <div className="flex flex-col items-center text-center z-10 w-full max-w-7xl">
        
        {/* Headline */}
        <h1 ref={headingRef} className="opacity-0 font-display text-[2rem] sm:text-[3rem] md:text-[4.2rem] lg:text-[5.2rem] xl:text-[5.8rem] leading-[1.15] text-[var(--color-text-dark)] tracking-tight max-w-7xl w-full">
          I{' '}
          <Link 
            to="/about" 
            className="inline-block mx-1 sm:mx-3 align-baseline relative top-[0.08em] animate-ellipse-appear cursor-pointer group" 
            style={{ animationDelay: '0.4s' }}
          >
            <span className="block w-[2em] h-[1em] rounded-full overflow-hidden border border-black/10 shadow-md transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={tejasProfile} 
                alt="Tejas Profile" 
                className="w-full h-full object-cover" 
              />
            </span>
          </Link>{' '}
          create living, breathing
          <br className="hidden md:inline" />
          websites for brands{' '}
          <a 
            href="#work" 
            className="inline-block mx-1 sm:mx-3 align-baseline relative top-[0.08em] animate-ellipse-appear cursor-pointer group" 
            style={{ animationDelay: '0.8s' }}
          >
            <span className="block w-[1.8em] h-[1em] rounded-full overflow-hidden border border-black/10 shadow-md transform rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300 bg-gray-100">
              <img 
                src="https://placehold.co/400x250/111111/FFFFFF?text=UI/UX" 
                alt="Product UI Mockup" 
                className="w-full h-full object-cover" 
              />
            </span>
          </a>{' '}
          that want
          <br className="hidden md:inline" />
          to be felt, not just seen.
        </h1>

      </div>

    </section>
  );
};
