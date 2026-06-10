import React from 'react';

interface CaseStudyCardProps {
  title: string;
  description: string;
  tags: string[];
  imagePlaceholder?: string;
  link?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  tags,
  imagePlaceholder = 'https://placehold.co/1200x800/EFEFEF/1A1A18?text=Project+Preview',
  link = '#'
}) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-8 transition-transform duration-500 hover:-translate-y-1">
      
      {/* Content */}
      <div className="max-w-3xl">
        <h3 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-dark)] mb-4">
          {title}
        </h3>
        
        <p className="text-lg opacity-80 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-[var(--color-base)] text-[var(--color-text-dark)] font-medium text-xs px-3 py-1.5 rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image Preview */}
      <a href={link} className="group relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden block mt-4 border border-gray-100">
        <div className="absolute inset-0 bg-[var(--color-text-dark)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
        <img
          src={imagePlaceholder}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-dark)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          Read case study →
        </div>
      </a>

    </div>
  );
};
