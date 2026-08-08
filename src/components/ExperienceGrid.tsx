import SplitTextReveal from './SplitTextReveal';

export default function ExperienceGrid() {
  const experiences = [
    {
      company: "Stripe",
      role: "Lead Product Designer",
      period: "2022 — Present",
      description: "Leading the core billing design team. Created a new declarative workflow for recurring payments that reduced user drop-off by 24%."
    },
    {
      company: "Linear",
      role: "Senior UX Designer",
      period: "2020 — 2022",
      description: "Architected the keyboard-first navigation paradigm and built the command menu interface used by thousands of developers daily."
    },
    {
      company: "Vercel",
      role: "Product Designer",
      period: "2018 — 2020",
      description: "Designed the deployment dashboard and unified the design system across marketing and product."
    }
  ];

  return (
    <section className="py-24 border-t hairline-border">
      <div className="max-w-[1920px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-4">
            <div className="font-mono text-xs text-zinc-500 mb-4">[ 04 — BACKGROUND ]</div>
            <SplitTextReveal 
              text="Experience"
              as="h2"
              direction="bottom"
              mode="blur"
              splitBy="chars"
              randomize={true}
              className="font-heading text-4xl uppercase font-bold tracking-tighter mb-8"
            />
            <div className="flex flex-wrap gap-2">
              {['Design Systems', 'Prototyping', 'User Research', 'Frontend UI', 'Figma', 'React', 'Motion'].map((skill) => (
                <div key={skill} className="px-3 py-1 border hairline-border rounded-full font-tech text-[10px] uppercase tracking-widest text-zinc-400">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b hairline-border last:border-b-0 hover:bg-white/[0.02] transition-colors -mx-6 px-6 cursor-pointer interactive group">
                <div className="md:col-span-3">
                  <div className="font-tech text-xs tracking-widest uppercase text-zinc-500 group-hover:text-white transition-colors">{exp.period}</div>
                </div>
                <div className="md:col-span-9 flex flex-col gap-2">
                  <h3 className="font-display text-2xl">
                    <SplitTextReveal 
                      text={exp.company}
                      direction="top"
                      mode="blur"
                      splitBy="chars"
                      randomize={true}
                    />
                  </h3>
                  <div className="font-mono text-[10px] text-zinc-400 uppercase">[ {exp.role} ]</div>
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
