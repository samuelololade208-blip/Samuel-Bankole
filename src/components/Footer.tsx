import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Globe,
  Dribbble,
  Twitter,
  Send,
} from 'lucide-react';
import { PERSONAL_INFO, SERVICES, SOCIAL_LINKS } from '../data/portfolioData';

interface Props {
  onNavigate: (sectionId: string) => void;
  onSuccessToast: (msg: string, type?: 'success' | 'info') => void;
  onToggleDevMode?: () => void;
  isDevMode?: boolean;
}

export const Footer: React.FC<Props> = ({
  onNavigate,
  onSuccessToast,
  onToggleDevMode,
  isDevMode = false,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleCopyrightClick = () => {
    if (!onToggleDevMode) return;
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setClickCount(0);
      onToggleDevMode();
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onSuccessToast('Thank you for subscribing to Samuel Bankole\'s newsletter!');
    setNewsletterEmail('');
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Dribbble':
        return <Dribbble className="w-4 h-4" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative z-10 pt-16 pb-12 px-4 sm:px-8 border-t border-purple-200/50 dark:border-white/5 bg-white/40 dark:bg-[#0b0515]/60 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* Brand Info & Socials (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
                <span className="font-heading text-lg">B</span>
              </div>
              <span className="font-heading font-black text-xl text-slate-900 dark:text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Web Designer, UI/UX Designer & Graphic Designer crafting modern websites and brand identities that inspire.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-2">
              {SOCIAL_LINKS.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-purple-100/80 hover:bg-purple-600 hover:text-white dark:bg-white/5 dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all duration-300"
                >
                  {getSocialIcon(s.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-purple-700 dark:text-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('works')}
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services List (Col 7-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-purple-700 dark:text-purple-400">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((serv) => (
                <li key={serv.id}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors text-left"
                  >
                    {serv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter (Col 9-12) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-purple-700 dark:text-purple-400">
                Contact
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-300 transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-2 pt-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-purple-700 dark:text-purple-400">
                Newsletter
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stay updated with my latest projects and insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-4 pr-11 py-2.5 rounded-full bg-purple-100/60 dark:bg-white/5 border border-purple-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 w-7 h-7 rounded-full btn-primary-gradient text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-purple-200/40 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div
            onClick={handleCopyrightClick}
            className="cursor-pointer select-none flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            title="Studio Developer Toggle"
          >
            <span>© 2026 Samuel Bankole. All Rights Reserved.</span>
            {isDevMode && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-700/50">
                Dev Studio Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onSuccessToast('Privacy Policy: All client data and inquiries remain strictly confidential.')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onSuccessToast('Terms of Use: Designs and source assets are provided under standard agency licensing.')}
              className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
