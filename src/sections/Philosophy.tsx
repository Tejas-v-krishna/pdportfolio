import React from 'react';
import { Magnetic } from '../components/Magnetic';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="px-6 sm:px-12 md:px-16 lg:px-20 w-full mb-20">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-8">
        
        {/* Top Text */}
        <div className="font-mono text-xs uppercase tracking-widest opacity-50 font-semibold text-[var(--color-text-dark)]">
          My philosophy
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[var(--color-text-dark)] leading-tight max-w-3xl">
          Design is how I think.<br />
          Building is how I prove it.
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-4">
          
          {/* Image */}
          <div className="w-full md:w-[40%] aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden shrink-0">
            <img src="https://placehold.co/800x450/EFEFEF/1A1A18?text=Building+Interfaces" alt="Working" className="w-full h-full object-cover" />
          </div>

          {/* Text Block */}
          <div className="flex-1 text-lg leading-relaxed opacity-90 max-w-xl">
            <p className="mb-6">
              I believe that great products aren't just designed in Figma—they're shaped by how they feel when you finally interact with them in the browser. 
            </p>
            <Magnetic>
              <a href="#about" className="inline-flex items-center gap-2 bg-[var(--color-text-dark)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                More about me ↗
              </a>
            </Magnetic>
          </div>

        </div>
      </div>
    </section>
  );
};
