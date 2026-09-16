import React from 'react';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface Props {
  onOpenInquiry: () => void;
  onOpenEmailClient: () => void;
}

export const ContactCta: React.FC<Props> = ({ onOpenInquiry, onOpenEmailClient }) => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-purple-100/90 via-purple-50/70 to-violet-100/80 dark:from-[#1d0b38] dark:via-[#140726] dark:to-[#0c0418] border border-purple-200/80 dark:border-purple-800/40 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl"
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-500/20 dark:bg-purple-600/15 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-400/20 dark:bg-indigo-700/10 filter blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Subtext */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-700 dark:text-purple-400">
                HAVE A PROJECT
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight mt-1">
                LET'S CREATE <br className="hidden sm:inline" />
                SOMETHING <span className="gradient-text-purple">GREAT</span> <br className="hidden sm:inline" />
                TOGETHER.
              </h2>
            </div>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-xl font-medium">
              I'm available for new projects and collaborations. Let's bring your ideas to life with purposeful design and seamless execution.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
              
              {/* WhatsApp Button */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-gradient px-6 sm:px-7 py-3.5 rounded-full text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Me</span>
              </a>

              {/* Email Me Button */}
              <button
                onClick={onOpenEmailClient}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-slate-800 dark:text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 border border-purple-200 dark:border-white/10 backdrop-blur-xl shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Email Me</span>
              </button>

              {/* Project Inquiry Modal Button */}
              <button
                onClick={onOpenInquiry}
                className="px-6 sm:px-7 py-3.5 rounded-full bg-purple-200/60 dark:bg-purple-950/60 hover:bg-purple-200 dark:hover:bg-purple-900/80 text-purple-950 dark:text-purple-200 text-sm sm:text-base font-bold flex items-center justify-center gap-2 border border-purple-300/60 dark:border-purple-800/60 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
              >
                <span>Project Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Diamond / Crystal Gem Graphic */}
          <div className="lg:col-span-4 flex items-center justify-center mt-2 lg:mt-0">
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 flex items-center justify-center"
            >
              {/* Faceted Crystal Graphic SVG with glowing gradients */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_15px_35px_rgba(168,85,247,0.4)]">
                <defs>
                  <linearGradient id="crystalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="crystalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
                  </linearGradient>
                  <linearGradient id="crystalGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                {/* Top facets */}
                <polygon points="100,20 150,70 100,90 50,70" fill="url(#crystalGrad2)" />
                <polygon points="100,20 150,70 175,60 100,10" fill="url(#crystalGrad1)" opacity="0.8" />
                <polygon points="100,20 50,70 25,60 100,10" fill="url(#crystalGrad2)" opacity="0.8" />
                
                {/* Mid body facets */}
                <polygon points="50,70 100,90 100,165 35,115" fill="url(#crystalGrad3)" />
                <polygon points="150,70 100,90 100,165 165,115" fill="url(#crystalGrad1)" />
                <polygon points="100,90 100,165 100,190" stroke="#f3e8ff" strokeWidth="2" opacity="0.6" />
                
                {/* Outer edge highlights */}
                <polygon points="100,20 150,70 165,115 100,190 35,115 50,70" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
