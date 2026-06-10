import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="px-6 sm:px-12 md:px-16 lg:px-20 w-full mb-20 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="mb-10 w-full">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-2">
          Interested in collaborating?
        </h2>
        <p className="opacity-70 text-sm">I'm currently looking for new opportunities.</p>
      </div>

      {/* Yellow Letter Card */}
      <div className="w-full bg-[#FFFBEB] rounded-[2rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-[#FDE68A] flex flex-col md:flex-row gap-12 relative overflow-hidden">
        
        {/* Subtle texture/lines for notepad feel */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #000 100%)', backgroundSize: '100% 2rem' }} />

        <div className="flex-1 relative z-10">
          <p className="font-handwriting text-2xl sm:text-3xl leading-relaxed text-[var(--color-text-dark)] opacity-90 mb-8 max-w-xl">
            Hi! If you made it this far, thank you for reading. <br /><br />
            I'm currently looking for full-time Product Design roles or freelance projects. If you have something in mind, or just want to chat about design, I'd love to hear from you.
          </p>

          <div className="font-handwriting text-2xl text-[var(--color-text-dark)] opacity-90">
            Cheers,<br />
            Tejas
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4 relative z-10 justify-end">
          <a href="mailto:tejas@example.com" className="w-full text-center bg-[var(--color-text-dark)] text-white font-medium py-3 px-6 rounded-full hover:opacity-90 transition-opacity shadow-sm">
            Email Me
          </a>
          <a href="https://linkedin.com/in/tejas-v-krishna" target="_blank" rel="noreferrer" className="w-full text-center bg-white text-[var(--color-text-dark)] font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
            LinkedIn
          </a>
          <a href="#" className="w-full text-center bg-white text-[var(--color-text-dark)] font-medium py-3 px-6 rounded-full hover:bg-gray-50 transition-colors shadow-sm border border-gray-200">
            Read my Resume
          </a>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-between w-full opacity-50 text-xs font-medium">
        <div>© 2026 Tejas V Krishna</div>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">Resume</a>
        </div>
      </div>
      
    </section>
  );
};
