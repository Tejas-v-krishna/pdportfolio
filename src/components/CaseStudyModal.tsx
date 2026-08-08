import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { PROJECTS, helperFormatFigmaEmbed } from '../data/projects';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export default function CaseStudyModal({ isOpen, onClose, projectId }: CaseStudyModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const project = PROJECTS.find((p) => p.id === projectId);
  const figmaEmbedSrc = project ? helperFormatFigmaEmbed(project.figmaUrl) : null;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] interactive cursor-pointer"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[60vw] lg:w-[50vw] bg-[#09090b] border-l hairline-border z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#09090b]/90 backdrop-blur-md px-8 py-6 border-b hairline-border flex justify-between items-center z-10">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">{project.category}</span>
                <h2 className="font-heading font-bold uppercase text-2xl text-white">{project.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors interactive"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Content */}
            <div className="p-8 pb-32">
              <div className="w-full aspect-video bg-zinc-900 mb-12 overflow-hidden border hairline-border">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              {project.problem || project.solution ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  {project.problem && (
                    <div>
                      <div className="font-mono text-[10px] text-zinc-500 mb-4">[ THE PROBLEM ]</div>
                      <p className="text-zinc-300 font-light leading-relaxed">{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <div className="font-mono text-[10px] text-zinc-500 mb-4">[ THE SOLUTION ]</div>
                      <p className="text-zinc-300 font-light leading-relaxed">{project.solution}</p>
                    </div>
                  )}
                </div>
              ) : null}

              {project.metric && (
                <div className="border border-white/20 bg-white/5 p-8 text-center mb-16">
                  <div className="font-mono text-[10px] text-zinc-400 mb-4">[ KEY OUTCOME ]</div>
                  <div className="font-display text-4xl md:text-5xl text-white">{project.metric}</div>
                </div>
              )}

              {/* Figma Live Embed Section */}
              {figmaEmbedSrc ? (
                <div className="space-y-4 mb-12">
                  <div className="flex justify-between items-center">
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[ LIVE FIGMA PROTOTYPE ]</div>
                    {project.figmaUrl && (
                      <a 
                        href={project.figmaUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-mono text-xs text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Open in Figma ↗
                      </a>
                    )}
                  </div>
                  <div className="w-full h-[500px] bg-zinc-900 border hairline-border overflow-hidden rounded-md">
                    <iframe 
                      title={`${project.title} Figma Embed`}
                      className="w-full h-full border-none"
                      src={figmaEmbedSrc} 
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="font-mono text-[10px] text-zinc-500">[ SYSTEM ARTIFACTS ]</div>
                  <div className="w-full h-64 bg-zinc-900 border hairline-border flex items-center justify-center text-zinc-600 font-tech text-sm uppercase">
                    Interactive Figma Embed Available
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
