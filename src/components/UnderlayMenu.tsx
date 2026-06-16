import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HoverRollingText } from './HoverRollingText';

interface UnderlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  link: string;
  type: 'scroll' | 'route';
  targetId?: string;
}

export const UnderlayMenu: React.FC<UnderlayMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItemIdx, setHoveredItemIdx] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { label: 'works', link: '/', type: 'scroll', targetId: 'work' },
    { label: 'play', link: '/play', type: 'route' },
    { label: 'about', link: '/about', type: 'route' },
    { label: 'notes', link: '/notes', type: 'route' },
    { label: 'contact', link: '/', type: 'scroll', targetId: 'contact' },
  ];

  const socialLinks = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/tejas-v-krishna' },
    { label: 'Behance', link: 'https://behance.net' },
    { label: 'Twitter', link: 'https://twitter.com' }
  ];

  const quickLinks = [
    { label: 'Privacy Policy ↗', link: '#' },
    { label: 'Terms & Conditions ↗', link: '#' }
  ];

  const handleItemClick = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    onClose();

    if (item.type === 'scroll' && item.targetId) {
      if (location.pathname === '/') {
        const target = document.getElementById(item.targetId);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 500); // Wait for menu close slide
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById(item.targetId!);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 900); // Wait for route load
      }
    } else {
      setTimeout(() => {
        navigate(item.link);
      }, 400); // Wait for closing transition to start
    }
  };

  return (
    <div 
      className="fixed top-0 right-0 h-full w-[480px] max-w-[80vw] bg-white text-black z-[10] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
      style={{
        boxShadow: 'inset 10px 0 30px rgba(0,0,0,0.02)'
      }}
    >
      {/* Spacer for Top header */}
      <div className="h-12" />

      {/* Navigation Links */}
      <div className="flex flex-col items-start gap-1 my-auto w-full">
        <div className="text-[10px] uppercase tracking-[0.25em] text-black/40 font-mono mb-4">
          Navigation
        </div>
        <nav className="flex flex-col items-start w-full gap-2">
          {menuItems.map((item, index) => {
            const isActive = 
              (item.link === '/' && location.pathname === '/' && !isOpen) || 
              (item.link !== '/' && location.pathname.startsWith(item.link));

            return (
              <div key={item.label} className="overflow-hidden py-1 w-full relative">
                <a
                  href={item.link}
                  onClick={(e) => handleItemClick(e, item)}
                  onMouseEnter={() => setHoveredItemIdx(index)}
                  onMouseLeave={() => setHoveredItemIdx(null)}
                  data-reveal-l
                  className={`relative text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight transition-all duration-300 flex items-center no-underline font-display select-none lowercase px-4 py-2 rounded-lg w-full text-left ${
                    isActive 
                      ? 'text-white bg-black font-semibold' 
                      : 'text-black/60 hover:text-white hover:bg-black hover:translate-x-2'
                  }`}
                >
                  <HoverRollingText text={item.label} isHovered={hoveredItemIdx === index} />
                </a>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="flex flex-col gap-8 w-full border-t border-black/5 pt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Socials */}
          <div className="flex flex-col items-start gap-2">
            <span data-reveal-s className="text-[9px] uppercase tracking-[0.2em] text-black/45 font-mono mb-1">Socials</span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-black/65 hover:text-black hover:underline transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-2">
            <span data-reveal-s className="text-[9px] uppercase tracking-[0.2em] text-black/45 font-mono mb-1">Quick Links</span>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.link}
                className="text-xs sm:text-sm text-black/65 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider bar */}
        <div className="underlay-nav__bottom-border w-full h-[1px] bg-black/10 origin-left scale-x-0" />
      </div>
    </div>
  );
};

export default UnderlayMenu;
