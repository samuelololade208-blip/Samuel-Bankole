import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Sparkles, Trash2, FolderPlus, Lock, Code2, AlertTriangle, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { AddProjectModal } from './AddProjectModal';

interface Props {
  projects: Project[];
  selectedCategory: string;
  isDevMode?: boolean;
  onOpenDevModal?: () => void;
  onSelectCategory: (category: string) => void;
  onAddProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onRestoreDefaultProjects?: () => void;
  onInquireProject: (projectTitle: string) => void;
  onSuccessToast: (msg: string) => void;
  onCloseShowcase?: () => void;
}

export const CATEGORIES = [
  'All',
  'Web Design',
  'UI/UX Design',
  'Graphic Design',
  'Logo Design',
  'Social Media Design',
  'Flyer / Poster Design',
];

export const ProjectsSection: React.FC<Props> = ({
  projects,
  selectedCategory,
  isDevMode = false,
  onOpenDevModal,
  onSelectCategory,
  onAddProject,
  onDeleteProject,
  onRestoreDefaultProjects,
  onInquireProject,
  onSuccessToast,
  onCloseShowcase,
}) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
        );

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getCategoryDotColor = (cat: string) => {
    switch (cat) {
      case 'Web Design':
        return 'bg-blue-500';
      case 'UI/UX Design':
        return 'bg-purple-500';
      case 'Graphic Design':
        return 'bg-indigo-500';
      case 'Logo Design':
        return 'bg-violet-500';
      case 'Social Media Design':
        return 'bg-pink-500';
      case 'Flyer / Poster Design':
        return 'bg-amber-500';
      default:
        return 'bg-purple-500';
    }
  };

  return (
    <section id="works" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-28">
      
      {/* Category Navigation Top Bar */}
      {onCloseShowcase && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-purple-100/60 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 backdrop-blur-md">
          <button
            onClick={onCloseShowcase}
            className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-white/10 hover:bg-purple-50 dark:hover:bg-white/20 text-purple-900 dark:text-purple-200 text-xs sm:text-sm font-bold border border-purple-200/60 dark:border-white/10 shadow-sm transition-all cursor-pointer group active:scale-95 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to "What I Do" (Services)</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-400">Viewing:</span>
            <span className="px-3 py-1 rounded-full bg-purple-600 text-white font-extrabold shadow-sm truncate">
              {selectedCategory === 'All' ? 'All Disciplines' : `${selectedCategory} Projects`}
            </span>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-extrabold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
            {selectedCategory === 'All' ? 'SELECTED PROJECTS' : `${selectedCategory.toUpperCase()} WORKS`}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Developer Controls */}
          {isDevMode ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAddModalOpen(true)}
                className="btn-primary-gradient px-4 sm:px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-transform cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>

              {onRestoreDefaultProjects && (
                <button
                  onClick={() => {
                    if (confirm('Reset portfolio back to initial default showcase projects?')) {
                      onRestoreDefaultProjects();
                    }
                  }}
                  title="Reset to default showcase projects"
                  className="px-3 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Reset Defaults</span>
                </button>
              )}
            </div>
          ) : (
            onOpenDevModal && (
              <button
                onClick={onOpenDevModal}
                title="I am the Developer (Samuel Bankole) — Unlock Add Project"
                className="px-3 py-2 rounded-full bg-purple-50 hover:bg-purple-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-300 border border-purple-200/50 dark:border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Developer?</span>
              </button>
            )
          )}

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Previous Projects"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Next Projects"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedCategory === 'All'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                : 'bg-purple-100/80 hover:bg-purple-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-purple-900 dark:text-purple-200 border-purple-200/50 dark:border-white/10'
            }`}
          >
            <span>All Works</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none touch-pan-x -webkit-overflow-scrolling-touch">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === 'All'
              ? projects.length
              : projects.filter(
                  (p) =>
                    p.category.toLowerCase() === cat.toLowerCase() ||
                    p.tags.some((t) => t.toLowerCase() === cat.toLowerCase())
                ).length;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-white/10 border border-purple-200/40 dark:border-white/5'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-100 dark:bg-white/10 text-purple-800 dark:text-purple-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Project Carousel / Grid Layout */}
      {filteredProjects.length === 0 && !isDevMode ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white/70 dark:bg-[#160a2b]/70 border border-purple-200/60 dark:border-purple-800/30 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 dark:bg-white/5 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-2">
            No projects in {selectedCategory} yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
            New case studies and design projects are uploaded regularly. Click below to view all projects or select another discipline.
          </p>
          <button
            onClick={() => onSelectCategory('All')}
            className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/25 transition-all cursor-pointer active:scale-95"
          >
            View All Projects
          </button>
        </div>
      ) : (
        <div
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-[85%] xs:auto-cols-[78%] sm:auto-cols-[48%] lg:auto-cols-[calc(33.333%-16px)] xl:auto-cols-[calc(25%-18px)] gap-4 sm:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory touch-pan-x px-1"
        >
          {/* Render Existing Projects */}
          {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            onClick={() => setActiveModalProject(project)}
            className="snap-start group relative rounded-3xl overflow-hidden bg-white/70 dark:bg-[#160a2b]/70 backdrop-blur-xl border border-purple-200/60 dark:border-purple-800/30 shadow-lg hover:border-purple-400 dark:hover:border-purple-500/60 transition-all duration-500 flex flex-col justify-between cursor-pointer min-h-[380px]"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Delete button in Developer Mode - Developer can delete ANY project */}
                {isDevMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProjectToDelete(project);
                    }}
                    title={`Delete "${project.title}" from portfolio`}
                    aria-label="Delete project"
                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white backdrop-blur-md text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                  <div className="w-10 h-10 rounded-full bg-white text-purple-900 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6">
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                {/* Category Indicator Dot */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${getCategoryDotColor(project.category)}`} />
                  <span>{project.category}</span>
                  {project.isCustom && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold">
                      Custom Upload
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tags pill */}
            <div className="p-5 sm:p-6 pt-0 flex flex-wrap gap-1.5 border-t border-purple-100 dark:border-white/5 mt-auto">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100/70 dark:bg-white/5 text-purple-900 dark:text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Prominent "+ Upload / Add Project" Interactive Card - Only visible in Developer Mode */}
        {isDevMode && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAddModalOpen(true)}
            className="snap-start group relative rounded-3xl p-6 border-2 border-dashed border-purple-300 dark:border-purple-800/60 hover:border-purple-600 dark:hover:border-purple-400 bg-purple-50/50 hover:bg-purple-100/60 dark:bg-purple-950/20 dark:hover:bg-purple-900/30 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[380px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white mb-2">
              Upload New Project
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-[220px] mb-4">
              {selectedCategory === 'All'
                ? 'Add your latest website, branding, or graphic design.'
                : `Add your latest ${selectedCategory} design.`}
            </p>

            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-600/20 group-hover:bg-purple-700 transition-colors">
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Upload Design (Developer)</span>
            </span>
          </motion.div>
        )}
      </div>
      )}

      {/* Developer Project Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectToDelete(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#180b2e] border border-red-200 dark:border-red-900/50 shadow-2xl p-6 sm:p-7 z-10"
            >
              <button
                onClick={() => setProjectToDelete(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/60 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 dark:text-red-400">
                    DEVELOPER ACTION
                  </div>
                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                    Delete Project?
                  </h3>
                </div>
              </div>

              {/* Project Snippet Preview */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3.5 mb-5">
                <img
                  src={projectToDelete.image}
                  alt={projectToDelete.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {projectToDelete.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {projectToDelete.category} • {projectToDelete.year || 'Showcase'}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-900 dark:text-white font-bold">"{projectToDelete.title}"</strong> from your portfolio? It will be removed immediately.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setProjectToDelete(null)}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDeleteProject(projectToDelete.id);
                    setProjectToDelete(null);
                    if (activeModalProject?.id === projectToDelete.id) {
                      setActiveModalProject(null);
                    }
                  }}
                  className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Yes, Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        isDevMode={isDevMode}
        onClose={() => setActiveModalProject(null)}
        onInquireSimilar={onInquireProject}
        onDeleteProject={(projectId) => {
          onDeleteProject(projectId);
          setActiveModalProject(null);
        }}
      />

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        defaultCategory={selectedCategory === 'All' ? 'Web Design' : selectedCategory}
        onAddProject={onAddProject}
        onSuccessToast={onSuccessToast}
      />
    </section>
  );
};
