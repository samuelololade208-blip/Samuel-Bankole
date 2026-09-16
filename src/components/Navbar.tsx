import React, { useState } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X, ShieldCheck, Sparkles, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTalkModal: () => void;
  isDevMode?: boolean;
  onOpenDevModal?: () => void;
}

export const Navbar: React.FC<Props> = ({
  isDark,
  onToggleTheme,
  activeSection,
  onNavigate,
  onOpenTalkModal,
  isDevMode = false,
  onOpenDevModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-2 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-white/92 dark:bg-[#140828]/95 backdrop-blur-2xl border border-purple-200/70 dark:border-purple-800/40 shadow-xl shadow-purple-950/5 pointer-events-auto">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer focus:outline-none min-w-0"
          >
            {/* Stylized Logo Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="font-heading text-base sm:text-lg tracking-tighter">B</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-heading font-extrabold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white tracking-tight leading-tight truncate">
                Samuel Bankole
              </span>
            </div>
          </button>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-purple-100/50 dark:bg-white/5 border border-purple-200/30 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 lg:px-5 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-purple-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white dark:bg-purple-600/30 shadow-sm border border-purple-200/40 dark:border-purple-400/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Developer Mode Button - Hidden on very small screens, placed inside mobile menu */}
            {onOpenDevModal && (
              <button
                onClick={onOpenDevModal}
                title={isDevMode ? "Developer Mode: Active" : "Developer Access"}
                aria-label="Developer Access"
                className={`hidden sm:flex h-8 sm:h-9 px-2.5 sm:px-3 rounded-full items-center gap-1.5 text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                  isDevMode
                    ? 'bg-purple-600/15 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-400/50 dark:border-purple-500/40 shadow-sm shadow-purple-500/10'
                    : 'bg-purple-50/70 hover:bg-purple-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 border-purple-200/50 dark:border-white/10'
                }`}
              >
                <Code2 className={`w-3.5 h-3.5 ${isDevMode ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="text-[11px] uppercase tracking-wider">{isDevMode ? 'Dev: Active' : 'Dev'}</span>
                {isDevMode && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              </button>
            )}

            {/* Desktop Let's Talk CTA */}
            <button
              onClick={onOpenTalkModal}
              className="hidden sm:flex btn-primary-gradient px-4 lg:px-5 py-2 rounded-full text-white text-xs lg:text-sm font-bold tracking-wider items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center bg-purple-100/70 hover:bg-purple-200/70 dark:bg-white/10 dark:hover:bg-white/20 text-purple-900 dark:text-purple-200 transition-all border border-purple-200/50 dark:border-white/10 cursor-pointer active:scale-95 shrink-0"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-500 rotate-0 hover:rotate-90 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-500 hover:-rotate-12 text-purple-700" />
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-purple-100/80 dark:bg-white/10 text-slate-800 dark:text-white border border-purple-200/60 dark:border-white/10 active:scale-95 cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-purple-600 dark:text-purple-300" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu with pointer-events-auto */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden mt-2 p-4 rounded-3xl bg-white/98 dark:bg-[#150928]/98 backdrop-blur-2xl border border-purple-200/80 dark:border-purple-800/80 shadow-2xl overflow-hidden pointer-events-auto max-w-lg mx-auto"
            >
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-white/5 active:bg-purple-100 dark:active:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                    </button>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-purple-100 dark:border-purple-900/50 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTalkModal();
                    }}
                    className="w-full btn-primary-gradient py-3 rounded-2xl text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/25 active:scale-95 cursor-pointer"
                  >
                    <span>Let's Talk</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {onOpenDevModal && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenDevModal();
                      }}
                      className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-colors active:scale-95 cursor-pointer ${
                        isDevMode
                          ? 'bg-purple-600/20 text-purple-700 dark:text-purple-300 border-purple-400'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{isDevMode ? 'Developer Mode: Active' : 'Developer Access (Add Projects)'}</span>
                      {isDevMode && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
