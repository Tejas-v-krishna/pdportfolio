import sys

with open('src/sections/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update useLayoutEffect
old_use_layout = """    const words = heading.querySelectorAll('.word');
    const ellipseImgs = heading.querySelectorAll('.animate-ellipse-appear img');
    const stamp = heading.closest('#hero')?.querySelector('.hero-stamp');

    // Make heading visible
    gsap.set(heading, { opacity: 1 });"""

new_use_layout = """    const words = heading.querySelectorAll('.word');
    const ellipseImgs = heading.querySelectorAll('.animate-ellipse-appear img');
    const stamp = heading.closest('#hero')?.querySelector('.hero-stamp');
    const headings = heading.querySelectorAll('.hero-heading-clone-target');

    // Make heading visible
    gsap.set(headings.length > 0 ? headings : heading, { opacity: 1 });"""

content = content.replace(old_use_layout, new_use_layout)

# 2. Add scroll animation
old_return_clean = """    return () => {
      tl.kill();
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
        rotationTweenRef.current = null;
      }
    };
  }, [isLoading, navigate]);"""

new_return_clean = """    // --- NEW: Split Text Scroll Animation ---
    const heroSection = heroRef.current;
    const heroOutroLeft = heading.querySelector('.hero-outro-left');
    const heroOutroRight = heading.querySelector('.hero-outro-right');

    if (heroSection && heroOutroLeft && heroOutroRight) {
      gsap.set(heroOutroLeft, {
        clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
      });

      gsap.set(heroOutroRight, {
        clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
      });

      const heroScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.5}`,
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      heroScrollTimeline.to(
        heroOutroLeft,
        {
          xPercent: -50,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      heroScrollTimeline.to(
        heroOutroRight,
        {
          xPercent: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
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
  }, [isLoading, navigate]);"""

content = content.replace(old_return_clean, new_return_clean)

# 3. Extract h1 and add render function
# We know h1 starts at <h1 ref={headingRef} className="opacity-0 font-display...
# and ends at </h1> before </div>
h1_start = """        <h1 ref={headingRef} className="opacity-0 font-display text-[1.8rem] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[4.3rem] xl:text-[5.5rem] leading-[1.12] text-[var(--color-text-dark)] tracking-tight w-full select-none">"""
h1_end = """        </h1>"""

start_idx = content.find(h1_start)
end_idx = content.find(h1_end, start_idx) + len(h1_end)

h1_content_full = content[start_idx:end_idx]
h1_inner_content = h1_content_full[len(h1_start):-len(h1_end)]

render_func = f"""  const renderHeroHeading = (isClone: boolean = false) => (
    <h1 className="hero-heading-clone-target opacity-0 font-display text-[1.8rem] sm:text-[2.6rem] md:text-[3.1rem] lg:text-[4.3rem] xl:text-[5.5rem] leading-[1.12] text-[var(--color-text-dark)] tracking-tight w-full select-none" aria-hidden={{isClone ? "true" : "false"}}>
{h1_inner_content}
    </h1>
  );

  return (
"""

content = content.replace("  return (\n    <section ", render_func + "    <section ")

# Now replace the original h1 block with the split view
split_view = """        {/* Headline Wrapper for Text Split */}
        <div ref={headingRef} className="relative w-full opacity-0" style={{ opacity: 1 }}>
           {/* Left Half */}
           <div className="hero-outro-left relative z-20 w-full">
             {renderHeroHeading(false)}
           </div>
           {/* Right Half */}
           <div className="hero-outro-right absolute inset-0 z-10 w-full">
             {renderHeroHeading(true)}
           </div>
        </div>"""

content = content.replace(h1_content_full, split_view)

with open('src/sections/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement successful")
