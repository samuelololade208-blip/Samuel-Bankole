import React, { useState } from 'react';
import { X, Send, Sparkles, Check, DollarSign, Clock, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SERVICES } from '../data/portfolioData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onSuccessToast: (msg: string) => void;
}

export const ProjectInquiryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  preselectedService = '',
  onSuccessToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(preselectedService || 'Web Design');
  const [budget, setBudget] = useState('$1,500 – $3,000');
  const [timeline, setTimeline] = useState('2 – 4 Weeks');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const budgetOptions = [
    '< $1,000',
    '$1,000 – $2,500',
    '$2,500 – $5,000',
    '$5,000+',
  ];

  const timelineOptions = [
    'Urgent (< 2 weeks)',
    '2 – 4 Weeks',
    '1 – 2 Months',
    'Flexible',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#c084fc', '#818cf8', '#e879f9'],
        });
      } catch (err) {
        // ignore if canvas-confetti is not loaded
      }

      onSuccessToast(`Thank you, ${name}! Your project inquiry has been received.`);
      onClose();
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#160a2b] shadow-2xl border border-purple-200 dark:border-purple-800/50 z-10 p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Project Inquiry & Booking</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Let's Start a Conversation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Tell me about your project, timeline, and goals. I usually reply within 24 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Service Selection Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Select Required Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSelectedService(s.title)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedService === s.title
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                        : 'bg-purple-50/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-white/5 hover:bg-purple-100/50 dark:hover:bg-white/10'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Estimated Budget Range (USD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all border ${
                      budget === b
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                        : 'bg-purple-50/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-white/5 hover:bg-purple-100/50 dark:hover:bg-white/10'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Target Timeline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timelineOptions.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all border ${
                      timeline === t
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30'
                        : 'bg-purple-50/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-purple-100 dark:border-white/5 hover:bg-purple-100/50 dark:hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Project Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Tell me about the project goals & details *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe what you want to build or redesign, key requirements, references..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-gradient px-8 py-3.5 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
