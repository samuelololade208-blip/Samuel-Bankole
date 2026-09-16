import React, { useState, useRef } from 'react';
import { X, Plus, Upload, Image as ImageIcon, Sparkles, Check, Link, Trash2, ArrowLeft, Home, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Project } from '../types';
import { compressImage } from '../utils/imageCompressor';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  onAddProject: (project: Project) => void;
  onSuccessToast: (msg: string) => void;
}

const CATEGORIES = [
  'Web Design',
  'UI/UX Design',
  'Graphic Design',
  'Logo Design',
  'Social Media Design',
  'Flyer / Poster Design',
];

const PRESET_IMAGES = [
  {
    name: 'Modern Web App',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Mobile Interface',
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Brand Identity & Logo',
    url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Event Poster & Art',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Social Media Feed',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  },
];

export const AddProjectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultCategory = 'Web Design',
  onAddProject,
  onSuccessToast,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [image, setImage] = useState('');
  const [imageSourceMode, setImageSourceMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('2026');
  const [role, setRole] = useState('Designer');
  const [deliverablesInput, setDeliverablesInput] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync category when opened with specific default
  React.useEffect(() => {
    if (defaultCategory && defaultCategory !== 'All') {
      setCategory(defaultCategory);
    }
  }, [defaultCategory, isOpen]);

  const processAndSetImage = async (file: File) => {
    try {
      setIsCompressing(true);
      const optimized = await compressImage(file, 1280, 1280, 0.82);
      setImage(optimized);
    } catch (err) {
      console.error('Failed to compress image, using standard reader:', err);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    processAndSetImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processAndSetImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title.');
      return;
    }

    const finalImage = image.trim() || imageUrlInput.trim() || PRESET_IMAGES[0].url;

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const deliverablesArray = deliverablesInput
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const newProject: Project = {
      id: `custom-project-${Date.now()}`,
      title: title.trim(),
      category: category,
      tags: tagsArray.length > 0 ? tagsArray : [category, 'Featured'],
      image: finalImage,
      description: description.trim() || 'A bespoke design project crafted with intent and precision.',
      client: client.trim() || undefined,
      year: year.trim() || '2026',
      role: role.trim() || 'Designer',
      deliverables: deliverablesArray.length > 0 ? deliverablesArray : undefined,
      isCustom: true,
    };

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onAddProject(newProject);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#c084fc', '#818cf8', '#e879f9'],
        });
      } catch (err) {
        // ignore
      }

      onSuccessToast(`"${title}" has been added to your ${category} portfolio!`);
      onClose();

      // Reset form
      setTitle('');
      setImage('');
      setImageUrlInput('');
      setTagsInput('');
      setClient('');
      setDescription('');
      setDeliverablesInput('');
    }, 600);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#160a2b] shadow-2xl border border-purple-200 dark:border-purple-800/50 z-10 p-6 sm:p-8"
        >
          {/* Top Navigation / Back to Home Button */}
          <div className="flex items-center justify-between mb-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer group shadow-sm border border-slate-200/60 dark:border-white/10"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Plus className="w-3.5 h-3.5" />
              <span>Upload & Add Project</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Add Project to Portfolio
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Upload your latest work, showcase designs, and expand your portfolio catalog.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fintech Mobile App Redesign"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-[#1f0f38] border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-[#1f0f38] text-slate-900 dark:text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Image Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Project Visual / Image *
              </label>

              {/* Source Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setImageSourceMode('upload')}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'upload'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-purple-200/70'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  Upload from Device
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceMode('url')}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'url'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-purple-200/70'
                  }`}
                >
                  <Link className="w-3.5 h-3.5 inline mr-1" />
                  Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceMode('presets')}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    imageSourceMode === 'presets'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-purple-200/70'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                  Preset Mockups
                </button>
              </div>

              {/* Upload Dropzone */}
              {imageSourceMode === 'upload' && (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-300 dark:border-purple-800/60 rounded-2xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/40 dark:bg-white/5"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isCompressing ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-8">
                      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        Optimizing visual for ultra-fast loading...
                      </span>
                    </div>
                  ) : image ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md">
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage('');
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        Image optimized & ready! Click or drop another to replace.
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        Click to browse or drag & drop project screenshot
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Supports PNG, JPG, GIF, WebP (Mockups, Figma exports, flyers, etc.)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* URL Input */}
              {imageSourceMode === 'url' && (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or hosted image link"
                    value={imageUrlInput}
                    onChange={(e) => {
                      setImageUrlInput(e.target.value);
                      setImage(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {imageUrlInput && (
                    <div className="w-full h-36 rounded-xl overflow-hidden border border-purple-200 dark:border-white/10">
                      <img
                        src={imageUrlInput}
                        alt="URL Preview"
                        className="w-full h-full object-cover"
                        onError={() => alert('Could not load image from this URL.')}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Presets Grid */}
              {imageSourceMode === 'presets' && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setImage(preset.url);
                        setImageUrlInput(preset.url);
                      }}
                      className={`group relative rounded-xl overflow-hidden border-2 aspect-video transition-all ${
                        image === preset.url
                          ? 'border-purple-600 ring-2 ring-purple-400'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-end p-1.5">
                        <span className="text-[10px] font-bold text-white leading-tight">{preset.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Project Overview & Concept *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe what this project is, the challenge solved, key visual aesthetic..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-medium"
              />
            </div>

            {/* Tags, Deliverables, Client & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Responsive, Dark Mode, Figma, 3D"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Landing Page, Design System, Mobile UI"
                  value={deliverablesInput}
                  onChange={(e) => setDeliverablesInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Client / Brand Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech or Personal Concept"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Year & Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Year (e.g. 2026)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Lead Designer)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-purple-50/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-purple-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:inline-block px-5 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-primary-gradient px-8 py-3.5 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </span>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Project to Portfolio</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
