/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  Navigation,
  Share2
} from 'lucide-react';

import { SERVICES, GALLERY_ITEMS, BUSINESS_INFO } from './data';
import Navbar from './components/Navbar';
import BeforeAfter from './components/BeforeAfter';
import Lightbox from './components/Lightbox';
import ReviewSlider from './components/ReviewSlider';
import BookingForm from './components/BookingForm';

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleShareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MARA Barber Shop',
        text: 'Precision Cuts, Classic Style in CMC, Addis Ababa.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('MARA Barber website link copied!');
    }
  };

  return (
    <div className="relative font-sans text-zinc-300 min-h-screen bg-black" id="home">
      <Navbar />

      {/* ===== HERO COMPONENT ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0 bg-black">
          <motion.img
            initial={{ scale: 1.1, opacity: 0.15 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 6, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1920"
            alt="Barber Shop Style"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase tracking-widest mb-6 font-mono font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Addis Ababa's Five-Star Grooming Suite</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              Precision Cuts & <br />
              <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Classic Tailored Styling
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-zinc-400 text-sm sm:text-base font-light max-w-xl leading-relaxed"
            >
              Experience high-concept fades, classic straight-razor cuts, and gold-standard cellular facials in CMC, Addis Ababa. Designed for the modern gentleman.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#booking-section"
                className="py-3 px-6 rounded-lg bg-amber-500 text-black font-bold text-xs tracking-wider font-mono uppercase hover:bg-amber-400 transition shadow shadow-amber-500/20"
              >
                Book Your Chair
              </a>
              <a
                href="#services"
                className="py-3 px-6 rounded-lg border border-zinc-800 text-zinc-300 font-mono text-xs tracking-wider uppercase hover:bg-zinc-900/60 transition"
              >
                Services Menu
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-[10px] text-zinc-500 font-mono"
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                CMC SAFARI ADJACENT
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                8AM - 9PM EVERYDAY
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ===== STATISTICS STATS LINE ===== */}
      <section className="py-10 bg-zinc-950 border-y border-zinc-900 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-mono">
            <div>
              <div className="text-xl md:text-3xl font-bold text-white tracking-tight">12,000+</div>
              <div className="text-[10px] text-zinc-505 uppercase tracking-wider mt-1">Confirmed Clients</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-bold text-white tracking-tight">12+</div>
              <div className="text-[10px] text-zinc-505 uppercase tracking-wider mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-bold text-white tracking-tight">100%</div>
              <div className="text-[10px] text-zinc-505 uppercase tracking-wider mt-1">Sterilized Tools</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-bold text-white tracking-tight">5/5 Star</div>
              <div className="text-[10px] text-zinc-505 uppercase tracking-wider mt-1">Rating Average</div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== EXQUISITE SERVICES PRICING LIST ===== */}
      <section className="py-20 bg-black text-left" id="services">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs uppercase tracking-widest mb-4">
              <Scissors className="w-3.5 h-3.5" />
              <span>Grooming Services</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white tracking-tight">
              The Styling <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Menu</span>
            </h2>
            <p className="mt-2 text-xs text-zinc-405">
              Customized hair design formulas, hot shaves, and skin treatments.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {SERVICES.map((s) => (
              <div key={s.id} className="group border-b border-zinc-900 pb-6 last:border-0" id={`service-item-${s.id}`}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-serif text-lg text-white group-hover:text-amber-400 transition-colors">
                    {s.name}
                  </h3>
                  
                  <div className="flex-grow border-b border-dashed border-zinc-800 mx-2" />
                  
                  <div className="text-right whitespace-nowrap font-mono text-sm">
                    <span className="text-amber-500 font-bold">{s.priceETB} ETB</span>
                    <span className="text-zinc-500 text-[10px] block font-light">~{s.durationMin} Min</span>
                  </div>
                </div>
                
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-2xl font-light">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#booking-section"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider hover:underline"
            >
              Reserve Grooming Spot <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>


      {/* ===== TRANSFORMATION BEFORE/AFTER COMPONENT ===== */}
      <BeforeAfter />


      {/* ===== MEDIA GALLERY PORTFOLIO ===== */}
      <section className="py-20 bg-black border-t border-zinc-900" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white tracking-tight">
              Curated <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Lookbook Gallery</span>
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Take an interactive tour inside our shop space, bespoke clippers, and customized hair gradients.
            </p>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="aspect-square relative overflow-hidden rounded-xl bg-zinc-950 border border-zinc-900 group cursor-pointer"
                id={`gallery-item-${item.id}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition p-4 text-left">
                  <span className="text-[9px] text-amber-500 uppercase font-mono tracking-widest font-bold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-sm text-white mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ===== CUSTOMER REVIEWS GRID FEED ===== */}
      <ReviewSlider />


      {/* ===== RESERVATION & LOCATION CO-SECTION ===== */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900 text-left" id="booking-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Column 1: Details and Coordinates */}
            <div className="flex flex-col justify-between h-full gap-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs uppercase tracking-widest mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>The Location</span>
                </div>

                <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white tracking-tight">
                  Where to <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Find Us</span>
                </h2>
                
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                  MARA flagship lounge is located inside the Safari Building, 2nd floor, directly near the CMC Safari Tram line station. Extremely easy to access with secure indoor parking.
                </p>

                <div className="mt-8 flex flex-col gap-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">MONDAY - SATURDAY</span>
                    <span className="text-amber-500">08:00 AM - 09:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-zinc-500">SUNDAY</span>
                    <span className="text-amber-500">09:00 AM - 08:00 PM</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 font-mono text-xs">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between hover:border-amber-500/20 transition"
                  >
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">DIRECT HOTLINE PHONE</span>
                      <span className="text-zinc-200 font-bold text-sm block mt-0.5">{BUSINESS_INFO.phoneFormatted}</span>
                    </div>
                    <div className="p-2 bg-amber-500 rounded-full text-black">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between hover:border-amber-500/20 transition"
                  >
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase">EMAIL COMPLIANCE</span>
                      <span className="text-zinc-200 font-bold block text-sm mt-0.5">{BUSINESS_INFO.email}</span>
                    </div>
                    <div className="p-2 bg-zinc-900 rounded-full text-amber-500">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Responsive Google Map frame */}
              <div className="border border-zinc-900 rounded-xl overflow-hidden aspect-video bg-zinc-950 relative">
                <iframe
                  src={BUSINESS_INFO.gmapEmbedUrl}
                  className="w-full h-full grayscale opacity-70 hover:opacity-100 transition-opacity"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map location"
                ></iframe>

                <div className="absolute bottom-3 left-3">
                  <a
                    href="https://maps.google.com/?q=CMC+Safari+Addis+Ababa"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 bg-black border border-zinc-800 hover:border-amber-500 text-amber-500 font-mono text-[9px] rounded-lg flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3 fill-amber-500" />
                    GET DIAL DIRECTIONS
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Booking Form Component */}
            <div>
              <BookingForm />
            </div>

          </div>
        </div>
      </section>


      {/* ===== FOOTER COMPONENT ===== */}
      <footer className="bg-black border-t border-zinc-900 py-12 text-[11px] text-zinc-550 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-widest text-white">MARA</span>
              <span className="text-[10px] text-zinc-600">|</span>
              <span>Classic Style, Modern Confidence</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleShareWebsite}
                className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 rounded-full text-zinc-400 hover:text-amber-500 transition"
                title="Share website address"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <span>CMC Addis Ababa • Safari Building</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between text-[10px] text-zinc-600 font-mono gap-4">
            <div>
              © 2026 MARA Barber Shop. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span>Sterilized Hygiene Guaranteed</span>
              <span>•</span>
              <span>100% Cotton Hot Towel sequence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox photo viewer overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={GALLERY_ITEMS}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))}
            onNext={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
