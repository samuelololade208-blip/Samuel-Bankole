import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Briefcase,
  Compass,
  Building2,
  Rocket,
  Palette,
  Layers,
  MapPin,
  Flame,
  Globe,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const whoIWorkWith = [
    { label: 'Startups', icon: Rocket },
    { label: 'Small businesses', icon: Building2 },
    { label: 'Personal brands', icon: Sparkles },
    { label: 'Restaurants', icon: Flame },
    { label: 'E-commerce businesses', icon: Globe },
    { label: 'Tech companies', icon: Layers },
    { label: 'Creative agencies', icon: Palette },
  ];

  const whatIDo = [
    {
      title: 'Web Design',
      desc: 'My main focus—crafting modern digital experiences for brands that want to stand out with pristine responsiveness and visual punch.',
      isPrimary: true,
    },
    {
      title: 'UI/UX Design',
      desc: 'Intuitive, modern, and user-centric interfaces designed with precision in Figma.',
      isPrimary: false,
    },
    {
      title: 'Graphic Design',
      desc: 'Impactful digital and print visual collateral that brings concepts to life.',
      isPrimary: false,
    },
    {
      title: 'Logo Design',
      desc: 'Memorable brand marks, typography systems, and luxury identity guidelines.',
      isPrimary: false,
    },
  ];

  const clientBrands = ['Bavcol Farms Ltd', 'Abeke The Tailor'];

  return (
    <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-28">
      
      {/* Section Header */}
      <div className="mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-extrabold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT ME • ABOUT BANKOLE</span>
        </div>
        <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight uppercase leading-[1.1] break-words">
          A CREATIVE MIND <br />
          <span className="gradient-text-purple">TURNING IDEAS INTO</span> <br />
          VISUAL EXPERIENCES.
        </h2>
      </div>

      {/* Main Grid: Story, Philosophy & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-12 sm:mb-16">
        
        {/* Left Column (7 cols): Bio, Style, and Design Philosophy */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          
          {/* Main Bio Card */}
          <div className="p-5 sm:p-8 md:p-9 rounded-3xl bg-white/70 dark:bg-[#160a2b]/60 backdrop-blur-xl border border-purple-200/60 dark:border-purple-800/30 shadow-lg space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Based in Ibadan, Nigeria • 2+ Years Experience</span>
            </div>

            <p className="text-slate-800 dark:text-slate-200 text-base sm:text-xl font-medium leading-relaxed">
              I’m Bankole, a creative designer based in Ibadan, Nigeria, with 2+ years of experience in design.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              My journey started with a strong interest in UI design and has grown into a passion for creating digital experiences that are minimal, modern, bold, and visually impactful.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              I enjoy turning ideas into visuals—taking a simple concept and transforming it into something people can see, understand, and connect with.
            </p>

            <div className="pt-2 p-4 sm:p-5 rounded-2xl bg-purple-50/70 dark:bg-white/5 border border-purple-100 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
                My Design Style
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                My design style combines <strong className="font-semibold text-slate-900 dark:text-white">minimalism, modern aesthetics, luxury, bold visual direction, clean layouts, futuristic ideas,</strong> and <strong className="font-semibold text-slate-900 dark:text-white">expressive color</strong>. I believe great design isn't just about making something look good; it's about bringing the idea behind the design to life.
              </p>
            </div>
          </div>

          {/* Design Philosophy Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/90 via-[#1f0b38] to-[#120624] text-white border border-purple-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-300 mb-3">
              <Compass className="w-4 h-4 text-purple-300 shrink-0" />
              <span>MY DESIGN PHILOSOPHY</span>
            </div>

            <blockquote className="font-heading font-black text-lg sm:text-2xl text-white tracking-tight leading-snug mb-3 sm:mb-4">
              “A great design starts with a creative mind, builds with purpose, and finishes with an experience.”
            </blockquote>

            <p className="text-purple-200 text-xs sm:text-sm md:text-base leading-relaxed">
              I believe great design should bring an idea to life while making people feel part of the experience. That's what I aim to achieve with every project I work on.
            </p>
          </div>

        </div>

        {/* Right Column (5 cols): Experience Stats & Who I Work With */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          
          {/* 2+ Years Experience & 10+ Projects Highlight */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/70 dark:bg-[#160a2b]/60 backdrop-blur-xl border border-purple-200/60 dark:border-purple-800/30 shadow-lg space-y-5 sm:space-y-6">
            <div className="border-b border-purple-100 dark:border-white/5 pb-4">
              <div className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
                EXPERIENCE
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                2+ Years of Design Experience
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Over the past two-plus years, I've worked on projects across different industries and design needs.
              </p>
            </div>

            {/* Quick Stat Tiles */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/80 dark:bg-white/5 border border-purple-100 dark:border-white/5 text-center">
                <div className="font-heading font-black text-2xl sm:text-3xl text-purple-700 dark:text-purple-300">
                  2+
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                  Years Experience
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/80 dark:bg-white/5 border border-purple-100 dark:border-white/5 text-center">
                <div className="font-heading font-black text-2xl sm:text-3xl text-purple-700 dark:text-purple-300">
                  10+
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 mt-0.5">
                  Clients / Projects
                </div>
              </div>
            </div>

            {/* Featured Client Brands Highlight */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/60 dark:bg-purple-950/40 border border-purple-200/70 dark:border-purple-800/50">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Featured Client Work Includes:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {clientBrands.map((brand, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#1a0c33] text-purple-900 dark:text-purple-200 font-bold text-xs shadow-sm border border-purple-200/60 dark:border-purple-700/40"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                Each project has helped me develop my creative thinking and strengthen my ability to turn ideas into meaningful visual experiences.
              </p>
            </div>
          </div>

          {/* Who I Work With Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/70 dark:bg-[#160a2b]/60 backdrop-blur-xl border border-purple-200/60 dark:border-purple-800/30 shadow-lg">
            <div className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
              WHO I WORK WITH
            </div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-2 sm:mb-3">
              Ambitious Businesses & Creative Teams
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 sm:mb-4 leading-relaxed">
              Whether it's a new brand launching its first website or an existing business looking for a stronger digital presence:
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {whoIWorkWith.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Core Goal Banner */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center shadow-md">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-purple-200">
                MY CORE GOAL
              </div>
              <div className="font-heading font-extrabold text-xs sm:text-sm tracking-wide mt-0.5">
                CREATE AMAZING WORK THAT MAKES THE CLIENT PROUD.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHAT I DO Grid */}
      <div className="pt-6">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            WHAT I DO
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Specialized Design Capabilities
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            My approach is driven by a highly creative mind, attention to visual details, and a constant desire to explore better ways of presenting ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {whatIDo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl backdrop-blur-xl border transition-all ${
                item.isPrimary
                  ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700/60 shadow-lg ring-1 ring-purple-400/30'
                  : 'bg-white/70 dark:bg-[#160a2b]/60 border-purple-200/60 dark:border-purple-800/30 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                {item.isPrimary && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-extrabold uppercase tracking-wider">
                    Main Focus
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};
