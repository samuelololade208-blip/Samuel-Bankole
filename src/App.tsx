import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactCta } from './components/ContactCta';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { DeveloperAuthModal } from './components/DeveloperAuthModal';
import { ShaderBackground } from './components/ShaderBackground';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PERSONAL_INFO, PROJECTS as INITIAL_PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { isDeveloperModeActive, setDeveloperModeOverride } from './utils/devMode';
import { loadProjectsFromStorage, saveProjectsToStorage, clearProjectsStorage } from './utils/projectStorage';

export default function App() {
  // Theme state: defaults to dark mode (Deep Obsidian Black + Electric Purple)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('samuel_portfolio_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default to Dark mode
  });

  // Developer mode is active only in Google AI Studio dev environment or with developer access
  const [isDevMode, setIsDevMode] = useState<boolean>(() => isDeveloperModeActive());
  const [devAuthModalOpen, setDevAuthModalOpen] = useState(false);
  const [addProjectModalOpenTrigger, setAddProjectModalOpenTrigger] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('All');
  const [isProjectsVisible, setIsProjectsVisible] = useState<boolean>(false);
  
  // Projects state with IndexedDB & LocalStorage persistence for user uploads
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [hasLoadedProjects, setHasLoadedProjects] = useState(false);

  // Load saved projects on initial mount from persistent storage
  useEffect(() => {
    let isMounted = true;
    loadProjectsFromStorage(INITIAL_PROJECTS)
      .then((loaded) => {
        if (isMounted && loaded && loaded.length > 0) {
          setProjects(loaded);
        }
      })
      .catch((err) => {
        console.error('Error loading projects:', err);
      })
      .finally(() => {
        if (isMounted) {
          setHasLoadedProjects(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('samuel_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('samuel_portfolio_theme', 'light');
    }
  }, [isDark]);

  // Persist projects to IndexedDB & fallback whenever changed (after initial load)
  useEffect(() => {
    if (hasLoadedProjects) {
      saveProjectsToStorage(projects).catch((err) => {
        console.warn('Storage sync notification:', err);
      });
    }
  }, [projects, hasLoadedProjects]);

  // Scroll Spy to highlight active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'works', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl+Shift+D or Cmd+Shift+D) to toggle Developer Mode or open auth
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        if (isDevMode) {
          setIsDevMode(false);
          setDeveloperModeOverride(false);
          addToast('Viewing as Public Visitor (Add Project tools hidden)', 'info');
        } else {
          setDevAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevMode]);

  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'works') {
      setIsProjectsVisible(true);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 95;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, sectionId === 'works' && !isProjectsVisible ? 80 : 0);
  };

  // When a service card is clicked, open Works and filter by that service category
  const handleSelectServiceCategory = (categoryName: string) => {
    setSelectedProjectCategory(categoryName);
    setIsProjectsVisible(true);
    setTimeout(() => {
      const el = document.getElementById('works');
      if (el) {
        const headerOffset = 95;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 60);
    addToast(categoryName === 'All' ? 'Viewing all portfolio works' : `Viewing ${categoryName} projects`, 'info');
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setSelectedProjectCategory(newProject.category);
    setIsProjectsVisible(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    addToast('Project removed from portfolio', 'info');
  };

  const handleRestoreDefaultProjects = () => {
    setProjects(INITIAL_PROJECTS);
    clearProjectsStorage().catch((err) => console.warn(err));
    addToast('Restored default portfolio showcase projects', 'success');
  };

  const handleInquireProject = (projectTitle: string) => {
    setPreselectedService(`Inquiry related to ${projectTitle}`);
    setInquiryModalOpen(true);
  };

  const handleOpenEmailClient = () => {
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20from%20Portfolio`;
    addToast(`Opening email client to ${PERSONAL_INFO.email}`, 'info');
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500 selection:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Background WebGL Simplex Noise Shader */}
      <ShaderBackground isDark={isDark} />

      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenTalkModal={() => setInquiryModalOpen(true)}
        isDevMode={isDevMode}
        onOpenDevModal={() => setDevAuthModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          isDark={isDark}
          onViewWork={() => {
            setIsProjectsVisible(true);
            scrollToSection('works');
          }}
          onOpenTalkModal={() => setInquiryModalOpen(true)}
        />

        {/* Services Section - Directly routes into Works */}
        <ServicesSection onSelectServiceCategory={handleSelectServiceCategory} />

        {/* Selected Projects Showcase - Only visible when user selects a service or clicks explore */}
        <AnimatePresence>
          {isProjectsVisible && (
            <motion.div
              key="portfolio-works-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectsSection
                projects={projects}
                selectedCategory={selectedProjectCategory}
                isDevMode={isDevMode}
                onOpenDevModal={() => setDevAuthModalOpen(true)}
                onSelectCategory={setSelectedProjectCategory}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
                onRestoreDefaultProjects={handleRestoreDefaultProjects}
                onInquireProject={handleInquireProject}
                onSuccessToast={addToast}
                onCloseShowcase={() => {
                  setIsProjectsVisible(false);
                  scrollToSection('services');
                  addToast('Closed showcase, back to Services', 'info');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Samuel & Stats & Testimonials */}
        <AboutSection />

        {/* Contact CTA with 3D Crystal Gem */}
        <ContactCta
          onOpenInquiry={() => setInquiryModalOpen(true)}
          onOpenEmailClient={handleOpenEmailClient}
        />
      </main>

      {/* Footer with Newsletter & Links */}
      <Footer
        onNavigate={scrollToSection}
        onSuccessToast={addToast}
        isDevMode={isDevMode}
        onToggleDevMode={() => {
          if (isDevMode) {
            setIsDevMode(false);
            setDeveloperModeOverride(false);
            addToast('Viewing as Public Visitor (Add Project tools hidden)', 'info');
          } else {
            setDevAuthModalOpen(true);
          }
        }}
      />

      {/* Developer Studio Status Pill (Only shown to developer) */}
      {isDevMode && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-900/90 dark:bg-purple-950/90 text-white text-xs font-semibold shadow-2xl border border-purple-500/40 backdrop-blur-xl transition-all">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-purple-300">Studio Dev Mode:</span>
            <span className="text-slate-200">Add Project visible to you</span>
          </div>

          <button
            onClick={() => {
              setIsDevMode(false);
              setDeveloperModeOverride(false);
              addToast('Switched to Visitor Preview: "Add Project" is hidden from public view.', 'info');
            }}
            title="Click to test what public visitors see when published"
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
          >
            Preview as Visitor
          </button>
        </div>
      )}

      {/* Developer Authentication / Access Modal */}
      <DeveloperAuthModal
        isOpen={devAuthModalOpen}
        onClose={() => setDevAuthModalOpen(false)}
        isDevMode={isDevMode}
        onToggleDevMode={(enable) => {
          setIsDevMode(enable);
          setDeveloperModeOverride(enable);
        }}
        onOpenAddProject={() => {
          const worksEl = document.getElementById('works');
          if (worksEl) {
            worksEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onSuccessToast={addToast}
      />

      {/* Project Inquiry & Booking Drawer Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => {
          setInquiryModalOpen(false);
          setPreselectedService('');
        }}
        preselectedService={preselectedService}
        onSuccessToast={addToast}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
