import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderNavLink = (path: string, label: string) => {
    const isActive = location.pathname === path;
    return (
      <Link 
        to={path} 
        className={`transition-all duration-200 font-body font-medium text-sm flex items-center gap-1.5 ${
          isActive 
            ? 'text-[var(--color-text-dark)]' 
            : 'text-[var(--color-text-dark)] opacity-40 hover:opacity-85'
        }`}
      >
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-dark)] shrink-0"></span>}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent">
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 py-8 flex justify-between items-start">
        
        {/* Column 1: Logo */}
        <div className="w-1/2 md:w-1/4">
          <Link to="/" className="inline-block hover:opacity-85 transition-opacity group">
            <span className="font-display font-bold text-2xl sm:text-3xl leading-[0.9] text-[var(--color-text-dark)] lowercase tracking-tight block">
              tejas.
            </span>
            <span className="font-display font-bold text-2xl sm:text-3xl leading-[0.9] text-[var(--color-text-dark)] lowercase tracking-tight block mt-0.5">
              designs
            </span>
          </Link>
        </div>

        {/* Column 2: Role (Desktop Only) - Flows up on scroll */}
        <div className={`hidden md:block w-1/4 pt-1.5 transition-all duration-500 ease-out ${
          isScrolled ? 'opacity-0 -translate-y-5 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          <span className="font-body text-xs text-[var(--color-text-dark)] opacity-45 tracking-wider uppercase font-mono">
            Product designer
          </span>
        </div>

        {/* Column 3: Location (Desktop Only) - Flows up on scroll */}
        <div className={`hidden md:block w-1/4 pt-1.5 transition-all duration-500 ease-out ${
          isScrolled ? 'opacity-0 -translate-y-5 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          <span className="font-body text-xs text-[var(--color-text-dark)] opacity-45 tracking-wider uppercase font-mono">
            Based in Punjab, India
          </span>
        </div>

        {/* Column 4: Vertical Nav Links (Right-Aligned) */}
        <div className="w-1/2 md:w-1/4 flex justify-end pt-1.5">
          <nav className="flex flex-col gap-1.5 items-end">
            {renderNavLink('/', 'Home')}
            {renderNavLink('/play', 'Play')}
            {renderNavLink('/about', 'About')}
            {renderNavLink('/notes', 'Notes')}
          </nav>
        </div>

      </div>
    </header>
  );
};
