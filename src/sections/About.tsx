import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="px-6 sm:px-12 md:px-16 lg:px-20 w-full mb-20">
      
      <div className="skew-on-scroll bg-white rounded-3xl p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center relative overflow-hidden">
        
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-16 text-center z-10 relative">
          What's it like working with me?
        </h2>

        {/* Central Photo */}
        <div className="relative z-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8">
          <img src="https://placehold.co/400x400/EFEFEF/1A1A18?text=Me" alt="Working with me" className="w-full h-full object-cover" />
        </div>

        {/* Floating Quotes */}
        <div className="relative w-full max-w-4xl h-64 sm:h-auto">
          
          {/* Top Left Quote */}
          <div className="sm:absolute sm:-top-32 sm:left-0 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 max-w-[280px] transform sm:-rotate-2 z-20 mb-4 sm:mb-0">
            <p className="font-handwriting text-lg leading-tight opacity-90 mb-3">
              "Tejas is incredibly fast at prototyping. He doesn't just design the happy path; he thinks through the edge cases before development even starts."
            </p>
            <div className="text-xs font-medium font-body opacity-60">— Colleague @ Trams</div>
          </div>

          {/* Bottom Right Quote */}
          <div className="sm:absolute sm:-top-16 sm:right-0 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 max-w-[280px] transform sm:rotate-2 z-20">
            <p className="font-handwriting text-lg leading-tight opacity-90 mb-3">
              "It's rare to find a designer who can jump straight into the codebase and tweak the Tailwind classes to get the spacing exactly right."
            </p>
            <div className="text-xs font-medium font-body opacity-60">— Engineer @ Client</div>
          </div>

        </div>

      </div>
      
    </section>
  );
};
