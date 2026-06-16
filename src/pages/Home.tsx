import React from 'react';
import { Hero } from '../sections/Hero';
import { Philosophy } from '../sections/Philosophy';
import { SelectedWork } from '../sections/SelectedWork';
import { Services } from '../sections/Services';
import { About } from '../sections/About';
import { Testimonials } from '../sections/Testimonials';
import { Contact } from '../sections/Contact';

interface HomeProps {
  isLoading: boolean;
}

export const Home: React.FC<HomeProps> = ({ isLoading }) => {
  return (
    <main className="relative z-10 w-full">
      {/* Content sections */}
      <Hero isLoading={isLoading} />
      <About />
      <Philosophy />
      <SelectedWork />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
};
