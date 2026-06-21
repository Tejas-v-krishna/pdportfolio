import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface Project {
  title: string;
  tech: string;
  desc: string;
  role: string;
  highlight: string;
}

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.1'
        );
    } else {
      document.body.style.overflow = '';
    }
  }, [project]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  };

  if (!project) return null;

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[100] bg-base/90 backdrop-blur-md opacity-0 flex items-center justify-center p-6 md:p-12"
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-surface border border-white/10 w-full max-w-5xl max-h-full rounded-3xl overflow-y-auto flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 bg-base rounded-full text-primary hover:text-accent transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="aspect-video bg-base relative overflow-hidden flex items-center justify-center border-b border-white/5">
           {/* Placeholder for real project image */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-base to-base"></div>
           <h3 className="text-4xl md:text-6xl font-display font-bold text-white/10 tracking-tighter uppercase relative z-10">{project.title}</h3>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="inline-block px-4 py-2 bg-white/5 rounded-full text-xs uppercase tracking-widest font-semibold mb-6 text-accent">
            {project.tech}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{project.title}</h2>
          <div className="text-xl text-primary/70 mb-12 max-w-3xl">
            {project.desc}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
             <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/50 mb-4">Role</h4>
                <p className="text-lg">{project.role}</p>
             </div>
             <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/50 mb-4">Outcome</h4>
                <p className="text-lg font-bold text-accent">{project.highlight}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
