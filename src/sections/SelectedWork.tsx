import React from 'react';
import { CaseStudyCard } from '../components/CaseStudyCard';

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="relative px-6 sm:px-12 md:px-16 lg:px-20 w-full mb-20">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-2">
          Some recent work
        </h2>
        <p className="opacity-70 text-sm">Case studies · shipped products</p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-12">
        <CaseStudyCard 
          title="Seller AI Assistant"
          description="Redesigning a bilingual, Hindi-first AI dashboard so Tier 2/3 city sellers can actually trust and act on AI recommendations."
          tags={['AI UX', 'Bilingual Design', 'Dashboard']}
        />

        <CaseStudyCard 
          title="ExamWaliSite"
          description="A full UX audit and design-system rebuild for an ed-tech client, including light/dark mode and an interactive prototype."
          tags={['UX Audit', 'Design Systems', 'Web']}
        />

        <CaseStudyCard 
          title="LearnWith"
          description="Built a complete design system and story-driven UX copy for a design-learning product, backed by user research."
          tags={['Design Systems', 'UX Research', 'EdTech']}
        />
      </div>
      
    </section>
  );
};
