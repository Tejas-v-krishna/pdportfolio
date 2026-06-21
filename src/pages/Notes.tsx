import React from 'react';

const notesData = [
  {
    category: 'DESIGN SYSTEMS',
    title: 'Design is never meant to be handed off',
    date: 'FEB 2024',
    description: 'A talk about why design cannot stop at handoff in modern product teams. Exploring how designers increasingly work across product thinking, systems, and implementation.',
  },
  {
    category: 'AI UX',
    title: 'Designing AI beyond the chatbox',
    date: 'JAN 2024',
    description: 'A session exploring how teams can move beyond chat-style interfaces when designing AI products. Focusing on practical prototyping approaches.',
    image: 'https://placehold.co/800x400/EFEFEF/1A1A18?text=Talk+Photo',
  },
  {
    category: 'UX RESEARCH',
    title: 'Building a centralized insights repository',
    date: 'NOV 2023',
    description: 'A talk about creating a shared insights system for product teams — turning research, experiments, and user feedback into a centralized knowledge base.',
  },
  {
    category: 'CAREER',
    title: 'The golden age for designers is here',
    date: 'OCT 2023',
    description: 'An exploration of why the rise of AI expands the role of designers — and how designers can shape more collaborative, intelligent product experiences.',
    image: 'https://placehold.co/800x400/EFEFEF/1A1A18?text=Speaker+Photo',
  },
  {
    category: 'PRODUCT',
    title: 'Growth Design Ask Me Anything',
    date: 'DEC 2024',
    description: 'A live Q&A covering career growth, developing strong product instincts, and lessons from building and shipping products in fast-moving teams.',
    video: 'https://placehold.co/800x450/EFEFEF/1A1A18?text=Video+Thumbnail',
  }
];

export const Notes: React.FC = () => {
  return (
    <main className="relative z-10 w-full pt-32 pb-10">
      <section className="px-6 sm:px-12 md:px-16 lg:px-20 w-full">
        <div className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div>
              <h1 className="font-display font-bold text-5xl sm:text-7xl text-[var(--color-text-dark)] mb-4 tracking-tight">
                Notes & Writings
              </h1>
              <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
                Thoughts, essays, and explorations on product design, AI UX, growth, and the craft of building.
              </p>
            </div>
            
            {/* Toggle (Visual Only) */}
            <div className="flex bg-gray-100 p-1 rounded-full shrink-0">
              <button className="px-5 py-2 text-sm font-medium bg-white rounded-full shadow-sm">All</button>
              <button className="px-5 py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Essays</button>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-12">
            {notesData.map((note, idx) => (
              <div key={idx} className="skew-on-scroll flex flex-col">
                
                {/* Eyebrow */}
                <div className="font-mono text-xs tracking-widest uppercase opacity-50 mb-2">
                  {note.category}
                </div>

                {/* Title & Date Row with Dotted Line */}
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text-dark)] shrink-0">
                    {note.title}
                  </h2>
                  <div className="flex-grow border-b-2 border-dotted border-gray-200 relative top-[-6px]"></div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50 shrink-0">
                    {note.date}
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg opacity-80 leading-relaxed max-w-3xl mb-6">
                  {note.description}
                </p>

                {/* Optional Media */}
                {note.image && (
                  <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-gray-100">
                    <img src={note.image} alt={note.title} className="w-full h-auto object-cover" />
                  </div>
                )}
                {note.video && (
                  <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-gray-100 group cursor-pointer">
                    <img src={note.video} alt={note.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white pl-1 transform transition-transform group-hover:scale-110 shadow-lg">
                        ▶
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};
