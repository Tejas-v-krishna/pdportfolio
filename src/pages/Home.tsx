import React from 'react';
import { Hero } from '../sections/Hero';
import { Philosophy } from '../sections/Philosophy';
import { SelectedWork } from '../sections/SelectedWork';
import { Archive } from '../sections/Archive';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';

interface HomeProps {
  isLoading: boolean;
}

export const Home: React.FC<HomeProps> = ({ isLoading }) => {
  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      {/* Content sections */}
      <Hero isLoading={isLoading} />
      <Philosophy />
      <SelectedWork />
      <Archive />
      <About />
      <Contact />
    </main>
  );
};
