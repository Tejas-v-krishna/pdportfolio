import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuCTA {
  label: string;
  link: string;
  download?: string;
}

export interface StaggeredMenuFooterMetadata {
  left: string;
  right: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  cta?: StaggeredMenuCTA;
  footerMetadata?: StaggeredMenuFooterMetadata;
}

// 1. Reusable ScrambledText Component for Hover Decryption
interface ScrambledTextProps {
  text: string;
  className?: string;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!isAnimating.current) {
      setDisplayText(text);
    }
  }, [text]);

  const handleHover = () => {
    if (isAnimating.current || !text) return;
    isAnimating.current = true;
    
    const chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@#$';
    let frame = 0;
    const queue = text.split('').map((char) => ({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: char,
      start: Math.floor(Math.random() * 4),
      end: Math.floor(Math.random() * 10) + 10
    }));

    const tick = () => {
      let complete = 0;
      const output = queue.map((item) => {
        if (frame >= item.end) {
          complete++;
          return item.to;
        } else if (frame >= item.start) {
          if (item.to === ' ' || item.to === '—' || item.to === ':') return item.to;
          return chars[Math.floor(Math.random() * chars.length)];
        } else {
          return item.from;
        }
      }).join('');

      setDisplayText(output);

      if (complete === queue.length) {
        isAnimating.current = false;
        return;
      }

      frame++;
      requestAnimationFrame(tick);
    };

    tick();
  };

  return (
    <span onMouseEnter={handleHover} className={className}>
      {displayText}
    </span>
  );
};

// 2. LogoText Component for Hover Split-Rolling Effect
const LogoText = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <span className="relative inline-flex flex-col h-[1.2em] overflow-hidden group leading-none font-display font-bold text-2xl tracking-tight transition-colors duration-300">
      {/* Original Text */}
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        tejjxuu.ui
      </span>
      {/* Target Roll Text */}
      <span 
        className={`absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full font-body text-[11px] tracking-[0.2em] uppercase font-semibold py-[3px] whitespace-nowrap ${
          isOpen ? 'text-white/60' : 'text-black/50'
        }`}
      >
        product.designer
      </span>
    </span>
  );
};

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#FFEBA5', '#BCE2FC', '#E1CFFC'], 
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#000000', 
  openMenuButtonColor = '#ffffff', 
  changeMenuColorOnOpen = true,
  accentColor = '#FFEBA5', 
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  cta,
  footerMetadata
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const navigate = useNavigate();

  // Mumbai time state calculation
  const [mumbaiTime, setMumbaiTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setMumbaiTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    const ctaBtn = panel.querySelector('.sm-cta-btn') as HTMLElement | null;
    const footerMeta = panel.querySelector('.sm-footer-metadata') as HTMLElement | null;

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    if (ctaBtn) gsap.set(ctaBtn, { y: 20, opacity: 0 });
    if (footerMeta) gsap.set(footerMeta, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    if (ctaBtn) {
      const ctaStart = panelInsertTime + panelDuration * 0.5;
      tl.to(ctaBtn, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, ctaStart);
    }

    if (footerMeta) {
      const footerStart = panelInsertTime + panelDuration * 0.6;
      tl.to(footerMeta, { opacity: 1, duration: 0.5, ease: 'power2.out' }, footerStart);
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        const ctaBtn = panel.querySelector('.sm-cta-btn') as HTMLElement | null;
        const footerMeta = panel.querySelector('.sm-footer-metadata') as HTMLElement | null;

        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        if (ctaBtn) gsap.set(ctaBtn, { y: 20, opacity: 0 });
        if (footerMeta) gsap.set(footerMeta, { opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
      document.body.style.overflow = 'hidden';
    } else {
      onMenuClose?.();
      playClose();
      document.body.style.overflow = '';
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
      document.body.style.overflow = '';
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [closeOnClickAway, open, closeMenu]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, it: StaggeredMenuItem) => {
    if (it.link.startsWith('http://') || it.link.startsWith('https://')) {
      closeMenu();
      return;
    }
    
    e.preventDefault();
    closeMenu();

    if (it.label === 'Work' && window.location.pathname === '/') {
      const workSec = document.getElementById('work');
      if (workSec) {
        setTimeout(() => {
          workSec.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    } else {
      navigate(it.link);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className={`sm-scope z-[999] pointer-events-none ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden' : 'w-full h-full'}`}
    >
      <div
        className={
          (className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-40'
        }
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 bg-transparent pointer-events-none z-[1001]"
          aria-label="Main navigation header"
        >
          {/* Logo Container */}
          <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="no-underline transition-colors duration-300"
              style={{ color: open ? '#ffffff' : 'var(--color-text-dark)' }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="sm-logo-img block h-8 w-auto object-contain"
                  draggable={false}
                  width={110}
                  height={24}
                />
              ) : (
                <LogoText isOpen={open} />
              )}
            </Link>
          </div>

          {/* Central Live Status & Clock Widget */}
          <div className="hidden md:flex items-center gap-6 pointer-events-auto text-[11px] uppercase tracking-[0.25em] font-semibold font-body select-none">
            {/* Status */}
            <div className={`flex items-center gap-2.5 transition-colors duration-300 ${open ? 'text-white/60' : 'text-[var(--color-text-dark)]/60'}`}>
              <ScrambledText text="Available for work" />
            </div>
            
            {/* Separator */}
            <span className={open ? 'text-white/20' : 'text-black/15'}>|</span>
            
            {/* Clock Time */}
            <div className={`transition-colors duration-300 ${open ? 'text-white/60' : 'text-[var(--color-text-dark)]/60'}`}>
              <span>MUMBAI, IN — </span>
              <ScrambledText text={mumbaiTime} />
            </div>
          </div>

          <button
            ref={toggleBtnRef}
            className={`sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto transition-colors duration-300 ${
              open ? 'text-white' : 'text-[var(--color-text-dark)]'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
              aria-hidden="true"
            >
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[1.5px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#000000] flex flex-col overflow-y-auto z-10 pointer-events-auto border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col justify-between gap-12 sm:gap-14 h-full">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-4 sm:gap-5"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none py-1" key={it.label + idx}>
                    <a
                      className="sm-panel-item relative text-white font-bold cursor-pointer leading-none uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em] hover:translate-x-3 duration-300"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={(e) => handleItemClick(e, it)}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none py-1" aria-hidden="true">
                  <span className="sm-panel-item relative text-white font-bold cursor-pointer leading-none uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* Socials & CTA Area */}
            <div className="flex flex-col gap-8">
              {displaySocials && socialItems && socialItems.length > 0 && (
                <div className="sm-socials flex flex-col gap-3" aria-label="Social links">
                  <h3 className="sm-socials-title m-0">Socials</h3>
                  <ul
                    className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                    role="list"
                  >
                    {socialItems.map((s, i) => (
                      <li key={s.label + i} className="sm-socials-item">
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cta && (
                <div className="sm-cta">
                  <a
                    href={cta.link}
                    download={cta.download}
                    onClick={closeMenu}
                    className="sm-cta-btn group/btn bg-white text-black font-body font-semibold text-sm py-4 px-8 tracking-[0.25em] uppercase w-fit flex items-center gap-2.5 transition-all duration-300 hover:bg-transparent hover:text-white border border-transparent hover:border-white/20 shadow-lg shadow-black/25 cursor-pointer"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
                  >
                    <span>{cta.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                    >
                      <path d="M6 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 6L6 9L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Footer Metadata */}
            {footerMetadata && (
              <div className="sm-footer-metadata mt-auto flex justify-between">
                <span>{footerMetadata.left}</span>
                <span>{footerMetadata.right}</span>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; background: transparent; pointer-events: none; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; line-height: 1; overflow: visible; font-family: var(--font-body); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: 60px; min-width: 60px; }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(280px, 45vw, 500px); height: 100%; display: flex; flex-direction: column; padding: 12em 3em 3em 3em; overflow-y: auto; z-index: 10; }
@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; padding: 10em 2em 2em 2em; }
}
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(280px, 45vw, 500px); pointer-events: none; z-index: 5; }
@media (max-width: 640px) {
  .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; }
}
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; }
.sm-scope .sm-socials { display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-family: var(--font-body); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; color: rgba(255, 255, 255, 0.4); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-family: var(--font-body); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; font-weight: 600; color: rgba(255, 255, 255, 0.4); text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #fff; font-family: var(--font-display); font-weight: 700; font-size: clamp(2.5rem, 5vw, 4.5rem); cursor: pointer; line-height: 1.1; letter-spacing: -1px; text-transform: uppercase; transition: color 0.25s, transform 0.3s ease; display: inline-block; text-decoration: none; padding-right: 1.4em; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.15em; right: 2.2em; font-size: 14px; font-family: var(--font-body); font-weight: 600; color: var(--sm-accent, #ff0000); letter-spacing: 0.2em; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); transition: opacity 0.3s ease; }
.sm-scope .sm-footer-metadata { font-family: var(--font-body); font-size: 11px; tracking: 0.2em; font-weight: 600; text-transform: uppercase; color: rgba(255, 255, 255, 0.2); }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
