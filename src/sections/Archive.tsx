import React from 'react';

export const Archive: React.FC = () => {
  return (
    <section id="play" className="px-6 sm:px-12 md:px-16 lg:px-20 w-full mb-20">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-2">
          Some other things I do
        </h2>
        <p className="opacity-70 text-sm">Side projects · explorations</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Large Bento Item */}
        <div className="skew-on-scroll bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-xl sm:text-2xl">Flowdesk OS</h3>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">Personal Project</span>
          </div>
          <div className="w-full aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden">
            <img src="https://placehold.co/1200x500/EFEFEF/1A1A18?text=Flowdesk+Dashboard" alt="Flowdesk" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Two smaller bento items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="skew-on-scroll bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-display font-bold text-xl mb-1">KnowBase</h3>
                <p className="text-sm opacity-70">Team Project</p>
              </div>
              <a href="#" className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">View ↗</a>
            </div>
            <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <img src="https://placehold.co/600x400/EFEFEF/1A1A18?text=KnowBase" alt="KnowBase" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="skew-on-scroll bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">Other Explorations</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6">
                Exploring Framer Motion, GSAP, and building small utility apps. I also write occasionally about design systems and engineering.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold font-display opacity-50">#1</div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold font-display opacity-50">#2</div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center font-bold font-display opacity-50">#3</div>
            </div>
          </div>

        </div>

      </div>
      
    </section>
  );
};
