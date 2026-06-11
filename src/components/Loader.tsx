import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onFinish();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
      id="mara-loader"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Barber Pole Lines decoration */}
        <div className="absolute -top-12 flex h-2 w-24 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            animate={{ x: [-40, 40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="h-full w-12 bg-gradient-to-r from-red-600 via-white to-blue-600"
          />
        </div>

        {/* Custom Luxury Logo Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-500/30 bg-zinc-950 p-4 shadow-xl shadow-amber-500/5"
        >
          {/* Gold Glowing Core */}
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/50 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="font-serif text-3xl font-bold tracking-widest text-amber-400">M</span>
        </motion.div>

        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-center"
        >
          <h1 className="font-serif text-2xl font-semibold tracking-widest text-amber-400">MARA</h1>
          <p className="mt-1 text-xs tracking-widest text-zinc-400 uppercase">BARBER SHOP</p>
          <p className="mt-0.5 text-[9px] tracking-wider text-amber-500/60 uppercase">Addis Ababa • Est. 2014</p>
        </motion.div>

        {/* Loading Progress Bar */}
        <div className="mt-8 h-[1px] w-48 overflow-hidden bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
          />
        </div>
        <div className="mt-2 text-[10px] tracking-widest text-amber-500/70 font-mono">
          {progress}%
        </div>
      </div>
    </motion.div>
  );
}
