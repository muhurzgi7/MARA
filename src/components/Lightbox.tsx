import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;
  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none" id="mara-lightbox">
        
        {/* Background Overlay click to close */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

        {/* Header Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-zinc-400 text-xs tracking-widest uppercase">
            <span className="text-amber-400 font-semibold">{currentIndex + 1}</span>
            <span>/</span>
            <span>{items.length}</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-500/80" /> CMC, Addis Ababa</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 hover:scale-105 transition-all duration-200"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-zinc-900 transition-all duration-200 z-10"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Active Image Container */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl max-h-[80vh] mx-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col justify-center items-center pointer-events-none"
        >
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="max-w-full max-h-[70vh] object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Footer Info bar */}
          <div className="w-full bg-zinc-950/90 border-t border-zinc-900 p-4 select-text pointer-events-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase font-semibold tracking-wider">
                  {currentItem.category}
                </span>
                <h3 className="text-lg font-serif font-medium text-zinc-100 mt-1">
                  {currentItem.title}
                </h3>
              </div>
              <div className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> High-Resolution Stock Photo
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 p-3 rounded-full bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-zinc-900 transition-all duration-200 z-10"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Keyboard Hints in footer */}
        <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none hidden sm:block">
          <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
            USE LEFT & RIGHT ARROWS TO NAVIGATE • ESC TO EXIT
          </span>
        </div>
      </div>
    </AnimatePresence>
  );
}
