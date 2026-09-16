import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Unlock, X, Sparkles, Plus, Eye, EyeOff, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isDevMode: boolean;
  onToggleDevMode: (enable: boolean) => void;
  onOpenAddProject?: () => void;
  onSuccessToast: (msg: string, type?: 'success' | 'info') => void;
}

const DEV_PASSWORD = 'SAMUELAA';

export const DeveloperAuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  isDevMode,
  onToggleDevMode,
  onOpenAddProject,
  onSuccessToast,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setErrorMsg('');
      setIsVerifying(false);
      setIsShaking(false);
      // Auto-focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim();

    if (!cleanPass) {
      setErrorMsg('Please enter the developer password.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    // Simulate crisp verification
    setTimeout(() => {
      if (cleanPass.toUpperCase() === DEV_PASSWORD) {
        setIsVerifying(false);
        onToggleDevMode(true);
        try {
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#10b981', '#6366f1'],
          });
        } catch (err) {
          // ignore
        }
        onSuccessToast('Developer Mode Unlocked! "Add Project" is now active.', 'success');
        onClose();
      } else {
        setIsVerifying(false);
        setErrorMsg('Incorrect developer password. Please try again.');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 350);
  };

  const handleDisable = () => {
    onToggleDevMode(false);
    onSuccessToast('Developer Mode Deactivated. Viewing as public visitor.', 'info');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-md rounded-3xl bg-white dark:bg-[#180b2e] border border-purple-200 dark:border-purple-800/60 shadow-2xl p-6 sm:p-7 z-10 ${
            isShaking ? 'animate-bounce' : ''
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-md shadow-purple-500/10">
              {isDevMode ? <ShieldCheck className="w-6 h-6 text-emerald-500" /> : <KeyRound className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                PORTFOLIO CREATOR AUTH
              </div>
              <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                Developer Mode
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {isDevMode
              ? 'Developer Mode is currently ACTIVE. The "Add Project" button, "+ Upload Design" card, and project management controls are unlocked.'
              : 'Enter your developer password to unlock the "Add Project" tool and upload new projects to your portfolio.'}
          </p>

          {isDevMode ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified as Developer (Samuel Bankole). "Add Project" is active.</span>
              </div>

              {onOpenAddProject && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAddProject();
                  }}
                  className="w-full btn-primary-gradient py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-95 transition-transform cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Go to Portfolio & Add Project</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDisable}
                className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold transition-colors cursor-pointer"
              >
                Turn Off Developer Mode (View as Public Visitor)
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Developer Password
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className={`w-full pl-4 pr-11 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium ${
                      errorMsg
                        ? 'border-red-400 dark:border-red-500/80 bg-red-50/30'
                        : 'border-purple-200 dark:border-white/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full btn-primary-gradient py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-95 disabled:opacity-50 transition-transform cursor-pointer"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Developer Mode</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Protected creator access for Samuel Bankole.
                </span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
