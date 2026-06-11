import { BEFORE_AFTER_ITEMS } from '../data';
import { motion } from 'motion/react';
import { Scissors, Sparkles } from 'lucide-react';

export default function BeforeAfter() {
  return (
    <section className="py-20 bg-black border-t border-zinc-900" id="before-after">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Info */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs uppercase tracking-widest mb-4">
            <Scissors className="w-3.5 h-3.5" />
            <span>Style Transformations</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white tracking-tight">
            The Art of <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Grooming Precision</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm max-w-lg mx-auto">
            View real transformations of our clients from CMC Addis Ababa. True confidence begins with a bespoke hair alignment.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BEFORE_AFTER_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-amber-500/10 transition"
              id={`ba-card-${item.id}`}
            >
              <div className="grid grid-cols-2 gap-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-950">
                {/* Before Image */}
                <div className="relative h-full w-full group">
                  <img
                    src={item.beforeUrl}
                    alt={`${item.title} Before`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-zinc-800 text-[9px] font-mono tracking-widest text-zinc-400 rounded uppercase">
                    Before
                  </div>
                </div>

                {/* After Image */}
                <div className="relative h-full w-full">
                  <img
                    src={item.afterUrl}
                    alt={`${item.title} After`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-black font-mono font-bold text-[9px] tracking-widest rounded uppercase">
                    After
                  </div>
                </div>
              </div>

              {/* Card Text Info */}
              <div className="mt-4 text-left">
                <h3 className="text-base font-serif font-medium text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
