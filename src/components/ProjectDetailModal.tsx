import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, User, CheckCircle2, Layers, Trash2, ArrowLeft, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface Props {
  project: Project | null;
  isDevMode?: boolean;
  onClose: () => void;
  onInquireSimilar: (projectTitle: string) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectDetailModal: React.FC<Props> = ({
  project,
  isDevMode = false,
  onClose,
  onInquireSimilar,
  onDeleteProject,
}) => {
  // Close on Escape key press & prevent body background scrolling
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Dark Backdrop - Click to exit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          title="Click to close"
        />

        {/* Modal Content Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#150928] shadow-2xl border border-purple-200 dark:border-purple-800/50 z-10 p-4 sm:p-7 md:p-8"
        >
          {/* Top Bar with Primary Back Buttons and Close */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-100 dark:border-white/10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Primary Back to Projects Button */}
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer group shadow-md shadow-purple-600/25 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Projects</span>
              </button>

              {/* Back to Home Button */}
              <button
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm border border-slate-200/60 dark:border-white/10 active:scale-95"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Home</span>
              </button>
            </div>

            {/* Exit Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Close (Press ESC)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Project Image Banner with floating back button overlay */}
          <div className="relative w-full h-52 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-6 bg-slate-900 shadow-inner group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Floating Top Image Back Badge */}
            <div className="absolute top-3 left-3 z-10">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/85 text-white backdrop-blur-md text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-4 sm:p-6">
              <div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Story & Deliverables */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
                  Project Overview
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.deliverables && (
                <div>
                  <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Key Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-purple-50/50 dark:bg-white/5 border border-purple-100 dark:border-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Meta Info & CTA */}
            <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-[#1f0f3a]/70 border border-purple-200/60 dark:border-purple-800/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-purple-700 dark:text-purple-300">
                  Project Information
                </h5>

                {project.client && (
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Client</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.client}</span>
                    </div>
                  </div>
                )}

                {project.year && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Year</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.year}</span>
                    </div>
                  </div>
                )}

                {project.role && (
                  <div className="flex items-center gap-3 text-sm">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Role</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{project.role}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-purple-200/50 dark:border-purple-800/40 space-y-2.5">
                <button
                  onClick={() => {
                    onInquireSimilar(project.title);
                    onClose();
                  }}
                  className="w-full btn-primary-gradient py-3 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-transform"
                >
                  <span>Build Something Similar</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Bottom Back to Projects Button */}
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Projects</span>
                </button>

                {isDevMode && onDeleteProject && (
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${project.title}" from your portfolio?`)) {
                        onDeleteProject(project.id);
                        onClose();
                      }
                    }}
                    className="w-full py-2.5 rounded-full border border-red-300 dark:border-red-800/60 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Project (Developer)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
