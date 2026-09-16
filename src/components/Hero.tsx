import React from 'react';
import { ArrowUpRight, Mouse } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeGlassBlob } from './ThreeGlassBlob';

interface Props {
  isDark: boolean;
  onViewWork: () => void;
  onOpenTalkModal: () => void;
}

export const Hero: React.FC<Props> = ({ isDark, onViewWork, onOpenTalkModal }) => {
  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 flex flex-col justify-center max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-7 z-10"
        >
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-100/90 dark:bg-purple-950/60 backdrop-blur-xl border border-purple-200/80 dark:border-purple-800/50 shadow-sm max-w-full">
            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-ping shrink-0" />
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest text-purple-900 dark:text-purple-300 truncate">
              WEB DESIGNER • UI/UX DESIGNER • GRAPHIC DESIGNER
            </span>
          </div>

          {/* Massive Display Heading */}
          <h1 className="font-heading font-black text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-slate-900 dark:text-white leading-[1.08] sm:leading-[1.05] break-words">
            DESIGNING <br className="hidden sm:inline" />
            DIGITAL <br className="hidden sm:inline" />
            EXPERIENCES <br />
            THAT <span className="gradient-text-purple">INSPIRE.</span>
          </h1>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={onViewWork}
              className="btn-primary-gradient px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all group active:scale-95 cursor-pointer shadow-lg shadow-purple-600/25"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={onOpenTalkModal}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/90 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 backdrop-blur-xl border border-purple-200/80 dark:border-white/10 transition-all group active:scale-95 cursor-pointer shadow-sm"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-5 h-5 text-purple-600 dark:text-purple-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-4 sm:pt-6 flex items-center gap-3 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            <div className="w-5 h-9 sm:w-6 sm:h-10 rounded-full border-2 border-slate-400/50 dark:border-slate-500/50 flex justify-center pt-1.5 sm:pt-2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400"
              />
            </div>
            <span className="text-[11px] sm:text-xs">Scroll Down</span>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Liquid Iridescent Glass Blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full flex items-center justify-center mt-4 lg:mt-0"
        >
          <ThreeGlassBlob isDark={isDark} />
        </motion.div>
      </div>
    </section>
  );
};
