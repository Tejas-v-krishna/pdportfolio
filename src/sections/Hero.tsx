import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 px-6 sm:px-12 md:px-16 lg:px-20 w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between z-0 px-6 sm:px-12 md:px-16 lg:px-20 w-full">
        <div className="w-px h-full bg-black/[0.03]"></div>
        <div className="w-px h-full bg-black/[0.03] hidden sm:block"></div>
        <div className="w-px h-full bg-black/[0.03] hidden md:block"></div>
        <div className="w-px h-full bg-black/[0.03] hidden lg:block"></div>
        <div className="w-px h-full bg-black/[0.03]"></div>
      </div>

      {/* 2. Blurred Gradients */}
      {/* Top Left Red-Orange Blur */}
      <div className="absolute top-[-5%] left-[-15%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-orange-400 to-red-500 opacity-20 blur-[80px] sm:blur-[110px] pointer-events-none z-0"></div>
      
      {/* Bottom Right Blue-Purple-Green Blur */}
      <div className="absolute bottom-[-5%] right-[-10%] w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-green-200 opacity-25 blur-[90px] sm:blur-[120px] pointer-events-none z-0"></div>

      {/* 4. Central Headline */}
      <div className="flex flex-col items-center text-center z-10 w-full">
        
        {/* Headline */}
        <h1 className="font-display text-[2.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] leading-[1.1] text-[var(--color-text-dark)] tracking-tight">
          I{' '}
          <span className="inline-block w-[1.25em] h-[1.25em] rounded-full overflow-hidden align-baseline relative top-[0.2em] mx-1 sm:mx-3 border border-black/10 shadow-md transform -rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-300">
            <img 
              src="https://placehold.co/200x200/111111/FFFFFF?text=Tejas" 
              alt="Tejas Profile" 
              className="w-full h-full object-cover" 
            />
          </span>{' '}
          design & build{' '}
          <span className="inline-block w-[2.2em] h-[1.25em] rounded-full overflow-hidden align-baseline relative top-[0.2em] mx-1 sm:mx-3 border border-black/10 shadow-md transform rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-300 bg-gray-100">
            <img 
              src="https://placehold.co/400x250/111111/FFFFFF?text=UI/UX" 
              alt="Product UI Mockup" 
              className="w-full h-full object-cover" 
            />
          </span>{' '}
          digital experiences that solve real-world problems.
        </h1>

      </div>

    </section>
  );
};
