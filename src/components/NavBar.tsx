import React from 'react';
import StaggeredMenu from './StaggeredMenu';

export const NavBar: React.FC = () => {
  const menuItems = [
    { label: 'Work', ariaLabel: 'View selected work', link: '/' },
    { label: 'Play', ariaLabel: 'View playground designs', link: '/play' },
    { label: 'About', ariaLabel: 'Learn about Tejas', link: '/about' },
    { label: 'Notes', ariaLabel: 'Read my notes', link: '/notes' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  const cta = {
    label: 'Download resume',
    link: '/resume.pdf',
    download: 'Tejas_Resume.pdf'
  };

  const footerMetadata = {
    left: '©2026 TEJJXUU.UI',
    right: 'MUMBAI, IN'
  };

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="var(--color-text-dark)"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={true}
      colors={['#FFEBA5', '#BCE2FC', '#E1CFFC']} // Yellow, Blue, Purple postit colors
      accentColor="#FFEBA5" // Yellow postit accent hover color
      isFixed={true}
      cta={cta}
      footerMetadata={footerMetadata}
    />
  );
};

