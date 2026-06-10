import React from 'react';

const playProjects = [
  {
    title: 'NotchFlow',
    desc: 'Mac notch command center',
    img: 'https://placehold.co/1200x800/EFEFEF/1A1A18?text=NotchFlow',
    type: 'macOS App',
    wide: true,
  },
  {
    title: 'FetchAI',
    desc: 'AI desktop search',
    img: 'https://placehold.co/800x800/EFEFEF/1A1A18?text=FetchAI',
    type: 'macOS App',
    wide: false,
  },
  {
    title: 'LeftOverChef',
    desc: 'Recipes from what\'s in your fridge',
    img: 'https://placehold.co/600x900/EFEFEF/1A1A18?text=LeftOverChef',
    type: 'iOS App',
    wide: false,
  },
  {
    title: 'BraBra Talk',
    desc: 'Just talk.',
    img: 'https://placehold.co/600x900/EFEFEF/1A1A18?text=BraBra+Talk',
    type: 'iOS App',
    wide: false,
  },
  {
    title: 'MoodQuotes',
    desc: 'Daily motivational widget',
    img: 'https://placehold.co/600x900/EFEFEF/1A1A18?text=MoodQuotes',
    type: 'iOS App',
    wide: false,
  },
  {
    title: 'OpenDesign',
    desc: 'Open design resources',
    img: 'https://placehold.co/1200x600/EFEFEF/1A1A18?text=OpenDesign',
    type: 'Web Platform',
    wide: true,
  },
  {
    title: 'CodeCity',
    desc: 'Transform GitHub into art',
    img: 'https://placehold.co/1200x600/EFEFEF/1A1A18?text=CodeCity',
    type: 'Web App',
    wide: true,
  },
];

export const Play: React.FC = () => {
  return (
    <main className="relative z-10 w-full pt-32 pb-10">
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 w-full">
        <div className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
          
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display font-bold text-5xl sm:text-7xl text-[var(--color-text-dark)] mb-4">
              Side Projects
            </h1>
            <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
              Apps, tools, AI ideas, and product experiments I shipped on the side, each one built to test an idea or scratch a real itch.
            </p>
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {playProjects.map((project, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-gray-100 ${project.wide ? 'md:col-span-2' : 'col-span-1'} ${idx === 2 || idx === 3 || idx === 4 ? 'row-span-2' : 'row-span-1'}`}
              >
                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-0 left-0 w-full p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs font-medium uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3 inline-block">
                    {project.type}
                  </span>
                  <h3 className="font-display font-bold text-2xl mb-1 drop-shadow-md">{project.title}</h3>
                  <p className="text-sm font-medium drop-shadow-md">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};
