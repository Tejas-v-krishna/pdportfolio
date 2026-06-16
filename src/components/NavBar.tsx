import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HoverRollingText } from './HoverRollingText';

interface NavBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 bg-transparent pointer-events-none z-[1010]">
      {/* Logo */}
      <div className="pointer-events-auto select-none">
        <Link 
          to="/" 
          className="no-underline text-black hover:text-black/85 transition-colors group cursor-pointer inline-block"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
        >
          <span className="relative inline-grid grid-cols-1 grid-rows-1 h-[1.2em] overflow-hidden leading-none font-display font-medium text-xl tracking-tight transition-colors duration-300">
            <span className="block row-start-1 col-start-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              tejjxuu.ui
            </span>
            <span 
              className={`block row-start-1 col-start-1 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 font-body text-[11px] tracking-[0.2em] uppercase font-medium py-[2px] whitespace-nowrap ${
                isOpen ? 'text-black/40' : 'text-black/50'
              }`}
            >
              product.designer
            </span>
          </span>
        </Link>
      </div>

      {/* Underlay Nav Toggle Button */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        className="underlay-nav__toggle-btn pointer-events-auto bg-transparent border-0 cursor-pointer font-display font-medium text-xl tracking-tight text-black hover:opacity-60 transition-all py-3 -my-3 flex items-center gap-3 z-[1020]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative h-[1.2em] w-20 overflow-hidden text-right flex items-center">
          <div className="underlay-nav__toggle-labels-wrapper w-full absolute top-0 flex flex-col items-end">
            <span className="flex h-[1.2em] items-center justify-end w-full leading-none"><HoverRollingText text="menu" isHovered={isBtnHovered} /></span>
            <span className="flex h-[1.2em] items-center justify-end w-full leading-none"><HoverRollingText text="close" isHovered={isBtnHovered} /></span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px] w-5 justify-center py-1 mt-1">
          <span className="underlay-nav__toggle-bar-top w-full h-[2px] bg-black origin-center transition-transform duration-300" />
          <span className="underlay-nav__toggle-bar-bottom w-full h-[2px] bg-black origin-center transition-transform duration-300" />
        </div>
      </button>
    </header>
  );
};

export default NavBar;
