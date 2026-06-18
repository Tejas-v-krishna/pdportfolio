import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tejasProfile from '../assets/tejas-profile.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { BauhausCollage } from '../components/BauhausCollage';
import { HeroBackgroundElements } from '../components/HeroBackgroundElements';
import { HoverRollingText } from '../components/HoverRollingText';

gsap.registerPlugin(ScrollTrigger, CustomEase, Flip);

const workImages = [
  "https://placehold.co/1200x800/E5EBE4/1A1A18?text=Seller+AI+Assistant",
  "https://placehold.co/1200x800/E6E3EB/1A1A18?text=ExamWaliSite",
  "https://placehold.co/1200x800/EBE8E3/1A1A18?text=LearnWith"
];

interface HeroProps {
  isLoading?: boolean;
}

// 1. Magnetic plus-sign intersections for the grid lines
const MagneticPlus: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - elX, e.clientY - elY);

      if (dist < 100) {
        // Pull towards cursor smoothly
        const pullX = (e.clientX - elX) * 0.45;
        const pullY = (e.clientY - elY) * 0.45;
        gsap.to(el, {
          x: pullX,
          y: pullY,
          scale: 1.4,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Snap back to origin
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1.0,
          duration: 0.65,
          ease: 'elastic.out(1.1, 0.4)',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={elementRef}
      style={style}
      className="absolute pointer-events-auto select-none text-black/15 font-light text-base z-10 w-6 h-6 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:text-black/55"
    >
      +
    </div>
  );
};



const splitIntoWords = (text: string, startIdx: number = 0) => {
  return text.split(' ').map((word, index) => {
    if (word === '') return null;
    return (
      <React.Fragment key={index + startIdx}>
        <span 
          className="word inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </span>
        {index < text.split(' ').length - 1 && <span className="inline-block">&nbsp;</span>}
      </React.Fragment>
    );
  });
};



const animateImages = () => {
  const images = document.querySelectorAll(".hero-cascade-img");
  images.forEach(img => img.classList.remove("flip-animate-out"));
  
  // Capture the initial Top/Left layout
  const state = Flip.getState(images);
  
  // Switch elements to the Bottom/Right corner
  images.forEach(img => img.classList.add("flip-animate-out"));
  
  const scaleTimeline = gsap.timeline();
  
  // Let GSAP FLIP interpolate the transition
  const flipTimeline = Flip.from(state, {
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.1
  });
  
  images.forEach((img, index) => {
      // Adding a slight "bounce/pop" on the scaling as they slide
      const scaleUp = gsap.to(img, { scale: 2.5, duration: 0.45, ease: "power3.in" });
      const scaleDown = gsap.to(img, { scale: 1, duration: 0.45, ease: "power3.out" });
      
      const imgTl = gsap.timeline();
      imgTl.add(scaleUp).add(scaleDown);
      
      scaleTimeline.add(imgTl, index * 0.1);
  });
  
  const mainTl = gsap.timeline();
  mainTl.add(flipTimeline, 0).add(scaleTimeline, 0);
  return mainTl;
};

export const Hero: React.FC<HeroProps> = ({ isLoading = false }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stampSvgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null);

  const [currentWorkIdx, setCurrentWorkIdx] = useState(0);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);
  const workIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (workIntervalRef.current) {
        clearInterval(workIntervalRef.current);
      }
    };
  }, []);

  const handleMouseEnterStamp = () => {
    if (rotationTweenRef.current) {
      gsap.killTweensOf(rotationTweenRef.current);
      gsap.to(rotationTweenRef.current, { timeScale: 25.0, duration: 0.3, ease: "power3.in" });
    }
  };

  const handleMouseLeaveStamp = () => {
    if (rotationTweenRef.current) {
      gsap.killTweensOf(rotationTweenRef.current);
      gsap.to(rotationTweenRef.current, { timeScale: 1.0, duration: 1.2, ease: "power3.out" });
    }
  };

  useLayoutEffect(() => {
    if (isLoading) return;

    const heading = headingRef.current;
    if (!heading) return;

    // Register CustomEase
    CustomEase.create(
      "hop",
      "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1 "
    );

    const words = heading.querySelectorAll('.word');
    const ellipseImgs = heading.querySelectorAll('.animate-ellipse-appear img');
    const stamp = heading.closest('#hero')?.querySelector('.hero-stamp');
    const headings = heading.querySelectorAll('.hero-heading-clone-target');

    // Make heading visible
    gsap.set(headings.length > 0 ? headings : heading, { opacity: 1 });

    gsap.set(ellipseImgs, { scale: 1.3, force3D: true });
    gsap.set(words, { opacity: 0, y: 50, force3D: true });
    gsap.set(".hero-cascade-img", { scale: 0, opacity: 1 }); // Start scaled down

    if (stamp) {
      gsap.set(stamp, { opacity: 0, scale: 0.8, filter: 'blur(10px)', force3D: true });
    }

    // Create reveal timeline matching preloader reveal
    const tl = gsap.timeline({ delay: 0.1 });

    // Flip Cascade
    tl.to(".hero-cascade-img", { 
      scale: 1, 
      duration: 1, 
      stagger: 0.1, 
      ease: "power3.out" 
    }, 0)
    .add(animateImages(), "-=0.2")

    // Heading and other elements
    .to(ellipseImgs, {
      scale: 1.0,
      duration: 2.25,
      ease: "power3.inOut",
    }, 0)
    .to(words, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05,
      force3D: true
    }, 1.5);

    if (stamp) {
      tl.to(stamp, {
        opacity: 0.8,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.0,
        ease: "power4.out",
        force3D: true
      }, 1.8);
    }

    // Continuous rotation of circular text stamp
    const stampSvg = stampSvgRef.current;

    if (stampSvg) {
      rotationTweenRef.current = gsap.to(stampSvg, {
        rotation: 360,
        duration: 25,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%"
      });
    }

    // --- NEW: Fade Out Scroll Animation ---
    const heroSection = heroRef.current;
    const heroContent = heading.querySelector('.hero-outro-content');

    if (heroSection && heroContent) {
      const heroScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false, // Next section overlaps gracefully
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      heroScrollTimeline.to(
        heroContent,
        {
          y: -100,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      );
    }

    return () => {
      tl.kill();
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
        rotationTweenRef.current = null;
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, navigate]);

  const renderHeroHeading = (isClone: boolean = false) => (
    <h1 className="hero-heading-clone-target opacity-0 font-display text-[1.8rem] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[4.3rem] xl:text-[5.5rem] leading-[1.12] text-[var(--color-text-dark)] tracking-tight w-full select-none" aria-hidden={isClone ? "true" : "false"}>

          {/* Line 1 */}
          <span className="line-mask block overflow-visible py-1">
            <span className="line-item inline-block md:block md:whitespace-nowrap">
              <span 
                onMouseEnter={() => setIsAboutHovered(true)}
                onMouseLeave={() => setIsAboutHovered(false)}
                className="inline-flex items-center cursor-pointer group/about"
              >
                <span className="word inline-block font-semibold transition-colors duration-300 group-hover/about:text-black/40">
                  I
                </span>
                <Link 
                  to="/about"
                  className={`inline-block relative align-middle transition-all duration-700 ease-out -translate-y-[0.06em] ${
                    isAboutHovered ? 'w-[1.47em] mx-[0.25em]' : 'w-0 mx-0'
                  }`}
                  style={{ height: '1.12em', willChange: 'width, margin' }}
                >
                  <span 
                    className={`absolute left-1/2 top-1/2 h-[1em] rounded-full overflow-hidden transition-all duration-700 ease-out ${
                      isAboutHovered ? 'border border-black/10 shadow-md' : 'border border-transparent shadow-none'
                    }`}
                    style={{
                      width: isAboutHovered ? '1.35em' : '0',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <img 
                      src={tejasProfile} 
                      alt="Tejas Profile" 
                      className="absolute left-1/2 top-1/2 h-[1em] max-w-none object-cover transition-transform duration-700 ease-out" 
                      style={{
                        width: '1.35em',
                        transform: isAboutHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(1.3)'
                      }}
                    />
                  </span>
                </Link>
              </span>{' '}
              {splitIntoWords("design and build ", 300)}
              <span className="relative inline-block px-1.5 py-0.5 z-10 transition-[transform,color] duration-300 ease-out cursor-pointer text-black/50 hover:text-black/80">
                <HoverRollingText text="living, breathing" className="word inline-block" />
              </span>
            </span>
          </span>

          {/* Line 2 */}
          <span className="line-mask block overflow-visible py-1">
            <span className="line-item inline-block md:block md:whitespace-nowrap">
              <span className="relative inline-block px-1.5 py-0.5 z-10 transition-[transform,color] duration-300 ease-out cursor-pointer text-black/50 hover:text-black/80">
                <HoverRollingText text="digital products" className="word inline-block" />
              </span>{' '}
              {splitIntoWords("and frontend ", 600)}
              <span 
                onMouseEnter={() => {
                  setIsWorkHovered(true);
                  if (workIntervalRef.current) clearInterval(workIntervalRef.current);
                  workIntervalRef.current = setInterval(() => {
                    setCurrentWorkIdx((prev) => (prev + 1) % workImages.length);
                  }, 1500);
                }}
                onMouseLeave={() => {
                  setIsWorkHovered(false);
                  if (workIntervalRef.current) {
                    clearInterval(workIntervalRef.current);
                    workIntervalRef.current = null;
                  }
                  setCurrentWorkIdx(0);
                }}
                className="inline-flex items-center cursor-pointer group/work"
              >
                <a 
                  href="#work"
                  className="transition-colors duration-300 group-hover/work:text-black/40 font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    const workSection = document.getElementById('work');
                    if (workSection && (window as any).lenis) {
                      (window as any).lenis.scrollTo(workSection);
                    } else if (workSection) {
                      workSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="word inline-block">work</span>
                </a>
                <a 
                  href="#work"
                  className={`inline-block relative align-middle transition-all duration-700 ease-out -translate-y-[0.06em] ${
                    isWorkHovered ? 'w-[1.47em] mx-[0.25em]' : 'w-0 mx-0'
                  }`}
                  style={{ height: '1.12em', willChange: 'width, margin' }}
                  onClick={(e) => {
                    e.preventDefault();
                    const workSection = document.getElementById('work');
                    if (workSection && (window as any).lenis) {
                      (window as any).lenis.scrollTo(workSection);
                    } else if (workSection) {
                      workSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span 
                    className={`absolute left-1/2 top-1/2 h-[1em] rounded-full overflow-hidden transition-all duration-700 ease-out ${
                      isWorkHovered ? 'border border-black/10 shadow-md bg-gray-100' : 'border border-transparent shadow-none bg-transparent'
                    }`}
                    style={{
                      width: isWorkHovered ? '1.35em' : '0',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {workImages.map((imgUrl, idx) => (
                      <img 
                        key={idx}
                        src={imgUrl} 
                        alt={`Work ${idx + 1}`} 
                        className="absolute left-1/2 top-1/2 h-[1em] max-w-none object-cover transition-all duration-700 ease-out" 
                        style={{ 
                          width: '1.35em',
                          opacity: idx === currentWorkIdx ? 1 : 0,
                          transform: !isWorkHovered 
                            ? 'translate(-50%, -50%) scale(1.3)' 
                            : (idx === currentWorkIdx ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(1.3)'),
                          willChange: 'opacity, transform'
                        }}
                      />
                    ))}
                  </span>
                </a>
              </span>
            </span>
          </span>

          {/* Line 3 */}
          <span className="line-mask block overflow-visible py-1">
            <span className="line-item inline-block md:block md:whitespace-nowrap">
              {splitIntoWords("that demands to be felt, not just seen.", 700)}
            </span>
          </span>

    </h1>
  );

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col items-start justify-end overflow-hidden"
    >
      
      {/* Images Container (GSAP FLIP Cascade) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="hero-cascade-img absolute top-6 left-6 w-[20%] max-w-[200px] aspect-[5/3] rounded-xl overflow-hidden will-change-transform"
            style={{ transition: 'top 0s, left 0s, right 0s, bottom 0s' }} // prevent css transition interference
          >
            <img src={`https://picsum.photos/seed/${i + 10}/800/600`} alt={`Cascade ${i+1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 1. Background Grid Lines & Magnetic Nodes */}
      <div className="absolute inset-0 pointer-events-none flex justify-between z-0 px-6 sm:px-12 md:px-16 lg:px-20 w-full">
        {/* Column 1 */}
        <div className="relative w-px h-full bg-black/[0.03]"></div>
        
        {/* Column 2 */}
        <div className="relative w-px h-full bg-black/[0.03] hidden sm:block">
          <MagneticPlus style={{ top: '28%', transform: 'translateX(-50%)' }} />
          <MagneticPlus style={{ top: '65%', transform: 'translateX(-50%)' }} />
        </div>
        
        {/* Column 3 */}
        <div className="relative w-px h-full bg-black/[0.03] hidden md:block">
          <MagneticPlus style={{ top: '50%', transform: 'translateX(-50%)' }} />
        </div>
        
        {/* Column 4 */}
        <div className="relative w-px h-full bg-black/[0.03] hidden lg:block">
          <MagneticPlus style={{ top: '38%', transform: 'translateX(-50%)' }} />
          <MagneticPlus style={{ top: '80%', transform: 'translateX(-50%)' }} />
        </div>
        
        {/* Column 5 */}
        <div className="relative w-px h-full bg-black/[0.03]"></div>
      </div>

      {/* 2. Bauhaus Collage background layer */}
      <BauhausCollage />

      {/* Decorative background visual elements */}
      <HeroBackgroundElements />

      {/* Vertical Scroll Indicator (Right Side) */}
      <div className="absolute right-6 sm:right-12 md:right-16 lg:right-20 bottom-8 translate-x-1/2 hidden md:flex flex-col items-center gap-4 z-10 select-none pointer-events-none">
        {/* Top Line */}
        <div className="w-px h-28 bg-black/[0.08]" />
        
        {/* Text */}
        <span 
          className="text-[9px] tracking-[0.25em] font-medium text-black/35 uppercase my-3 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll to explore
        </span>
        
        {/* Bottom Line */}
        <div className="w-px h-12 bg-black/[0.08]" />
        
        {/* Circle with Down Arrow */}
        <div className="scroll-arrow-circle w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/50 text-xs bg-transparent">
          ↓
        </div>
      </div>





      {/* 5. Central Headline (with wrapper for scale zoom / blur focus reveal) */}
      <div 
        className="hero-content-wrapper relative flex flex-col items-start text-left z-10 w-full max-w-[1300px] px-0 py-6 mb-4 sm:mb-8"
      >
        {/* Soft color blur glow (Aurora effect) to focus Hero Text */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-gradient-to-r from-[#FFF2C3]/60 via-[#FFFBEB]/70 to-[#FFE4A0]/50 opacity-80 filter blur-[60px] sm:blur-[80px] pointer-events-none -z-10"
        />
        
        {/* Headline */}
        {/* Headline Wrapper */}
        <div ref={headingRef} className="relative w-full opacity-0" style={{ opacity: 1 }}>
           <div className="hero-outro-content relative z-20 w-full">
             {renderHeroHeading(false)}
           </div>
        </div>

      </div>

      {/* 6. Circular Text Stamp - Easter Egg Trigger */}
      <Link 
        to="/easter-egg"
        onMouseEnter={handleMouseEnterStamp}
        onMouseLeave={handleMouseLeaveStamp}
        className="hero-stamp absolute right-6 sm:right-12 md:right-16 lg:right-28 top-[50vh] -translate-y-1/2 z-10 select-none pointer-events-auto cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
        aria-label="Discover an easter egg"
      >
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border border-black/10 pointer-events-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
          {/* Hitbox circle to ensure 100% solid hover detection across the entire area */}
          <div className="absolute inset-0 rounded-full pointer-events-auto z-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} />
          
          {/* Circular Text SVG */}
          <svg
            ref={stampSvgRef}
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible origin-center z-10 pointer-events-none"
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
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
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
      </Link>
    </section>
  );
};
