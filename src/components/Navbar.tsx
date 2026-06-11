import { useState, useEffect } from 'react';
import { Menu, X, Scissors, Phone, MapPin, Sparkles, LogIn } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#before-after' },
    { label: 'Lookbook', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Reserve Chair', href: '#booking-section' }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none">
      {/* Top microbar for contact/landmark */}
      <div className="bg-black/90 pointer-events-auto border-b border-zinc-900 text-[10px] tracking-widest text-zinc-500 uppercase py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              CMC Road • Safari, Addis Ababa
            </span>
            <span className="text-zinc-700">|</span>
            <span className="hidden md:inline text-amber-500/70">
              ⚡ Emergency booking hotline: +251 77 177 1111
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            100% STERILIZED HYGIENE GUARANTEED
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav
        className={`w-full pointer-events-auto transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 border-b border-zinc-900/90 py-3 shadow-lg backdrop-blur-md'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo element */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/40 bg-zinc-950 shadow shadow-amber-500/10 group-hover:border-amber-500 transition-colors">
              <Scissors className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              {/* Spinning border lines */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-500/20 group-hover:animate-spin" style={{ animationDuration: '10s' }} />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-widest text-zinc-100 group-hover:text-amber-400 transition-colors">
                MARA
              </span>
              <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors -mt-1">
                BARBER SHOP
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="text-xs uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors font-mono font-medium focus:outline-none"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop C.T.A. Action button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#booking-section"
              onClick={(e) => { e.preventDefault(); handleNavClick('#booking-section'); }}
              className="py-2.5 px-5 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-semibold text-xs font-mono tracking-wider uppercase rounded-xl hover:from-amber-500 hover:to-amber-300 transition shadow-lg shadow-amber-500/10 hover:scale-[1.02] focus:outline-none"
            >
              Reserve Chair
            </a>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-amber-400 focus:outline-none transition-colors border border-zinc-900 bg-zinc-950/60 rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Absolute Slide-Down Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full inset-x-0 bg-zinc-950 border-b border-zinc-800/90 py-6 px-4 shadow-2xl pointer-events-auto backdrop-blur-lg flex flex-col gap-4 lg:hidden"
          >
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="text-sm font-medium font-mono uppercase tracking-widest text-zinc-300 hover:text-amber-400 py-2.5 border-b border-zinc-900/60 focus:outline-none"
              >
                {item.label}
              </a>
            ))}

            <div className="flex flex-col gap-3 mt-4 pt-2">
              <a
                href="#booking-section"
                onClick={(e) => { e.preventDefault(); handleNavClick('#booking-section'); }}
                className="w-full py-3.5 bg-amber-500 text-black text-center font-semibold font-mono text-xs tracking-wider uppercase rounded-xl shadow-lg focus:outline-none"
              >
                Reserve Chair Now
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 border border-zinc-800 text-zinc-300 text-center font-medium font-mono text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 focus:outline-none"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                Call +251 77 177 1111
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
