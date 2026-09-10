import SplitTextReveal from './SplitTextReveal';

export default function ExperienceGrid() {
  const experiences = [
    {
      company: "BlurFathom",
      role: "Founder & Product Designer",
      location: "Remote",
      period: "Jan 2026 — Present",
      description: "Directing product strategy, design systems, and digital architectures from the ground up. Crafting bespoke user experiences and brand identities with an uncompromising focus on clarity, performance, and craft."
    },
    {
      company: "Trams",
      role: "UX Researcher Intern",
      location: "Gurugram",
      period: "Apr 2026 — Jul 2026",
      description: "Conducted qualitative user interviews, contextual inquiries, and usability benchmarking during an intensive 3-month tenure. Synthesized behavioral data to uncover friction points and optimize core product journeys."
    },
    {
      company: "Fiverr",
      role: "Music Producer & Sound Designer",
      location: "Freelance",
      period: "7+ Years — Present",
      description: "Delivering bespoke music production, sound engineering, and creative audio direction for over 7 years to clients worldwide. Channeling a refined sensitivity to rhythm, pacing, and sensory feedback into tactile digital interactions."
    }
  ];

  return (
    <section className="py-24 border-t border-white/10 bg-[#09090b]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-4">
            <div className="font-mono text-xs text-zinc-500 mb-4">[ 04 — BACKGROUND ]</div>
            <SplitTextReveal 
              text="Experience"
              as="h2"
              direction="bottom"
              mode="slide"
              splitBy="chars"
              stagger={0.025}
              randomize={false}
              className="font-heading text-4xl uppercase font-bold tracking-tighter mb-8"
            />
            <div className="flex flex-wrap gap-2">
              {['Design Systems', 'User Research', 'Prototyping', 'Sound Design', 'Frontend UI', 'Figma', 'React', 'Motion'].map((skill) => (
                <div key={skill} className="px-3 py-1 border border-white/10 rounded-full font-tech text-[10px] uppercase tracking-widest text-zinc-400">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors -mx-6 px-6 cursor-pointer interactive group">
                <div className="md:col-span-3">
                  <div className="font-tech text-xs tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">{exp.period}</div>
                </div>
                <div className="md:col-span-9 flex flex-col gap-2">
                  <h3 className="font-display text-2xl">
                    <SplitTextReveal 
                      text={exp.company}
                      direction="bottom"
                      mode="slide"
                      splitBy="chars"
                      stagger={0.025}
                      randomize={false}
                    />
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-wider">
                    <span className="text-zinc-300">[ {exp.role} ]</span>
                    {exp.location && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400">{exp.location}</span>
                      </>
                    )}
                  </div>
                  <p className="text-zinc-400 font-light text-sm mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

