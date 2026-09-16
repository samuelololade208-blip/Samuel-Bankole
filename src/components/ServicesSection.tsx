import React from 'react';
import {
  Monitor,
  Smartphone,
  Palette,
  Sparkles,
  MessageSquareHeart,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';

interface Props {
  onSelectServiceCategory: (categoryName: string) => void;
}

export const ServicesSection: React.FC<Props> = ({ onSelectServiceCategory }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Monitor className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      case 'Smartphone':
        return <Smartphone className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      case 'Share2':
        return <MessageSquareHeart className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      case 'FileText':
        return <FileText className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-28">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-extrabold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHAT I DO</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight mt-1">
            SERVICES I OFFER
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
            Click on any service below to reveal and explore its dedicated project showcase.
          </p>
        </div>

        <button
          onClick={() => onSelectServiceCategory('All')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-lg shadow-purple-600/25 transition-all self-start md:self-auto cursor-pointer active:scale-95 group"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Services 6-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onClick={() => onSelectServiceCategory(service.title)}
            className="group relative p-7 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#160a2b]/60 backdrop-blur-xl border border-purple-200/60 dark:border-purple-800/30 shadow-lg shadow-purple-950/5 hover:border-purple-400/80 dark:hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Icon Pill */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100/90 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-800/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {service.description}
              </p>
            </div>

            {/* Bottom Action: Directly link to Projects */}
            <div className="pt-4 border-t border-purple-100/80 dark:border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Explore {service.title} Works</span>
              <div className="w-8 h-8 rounded-full bg-purple-100/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
