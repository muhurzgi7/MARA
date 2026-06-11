import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquarePlus, User, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS, SERVICES } from '../data';

export default function ReviewSlider() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const local = localStorage.getItem('mara_reviews');
    return local ? JSON.parse(local) : INITIAL_REVIEWS;
  });

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      serviceName: serviceName || 'General Grooming',
      isVerified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('mara_reviews', JSON.stringify(updated));

    setName('');
    setRating(5);
    setComment('');
    setServiceName('');
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <section className="py-20 bg-black border-t border-zinc-900 overflow-hidden text-left" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white tracking-tight">
              What Our <span className="text-gradient bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">Groomsmen Say</span>
            </h2>
            <p className="mt-2 text-xs text-zinc-400 max-w-md">
              Real reviews from local gentlemen in CMC and around Addis Ababa who trust the premium standard.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/20 text-amber-500 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {showForm ? 'View Reviews' : 'Write Review'}
          </button>
        </div>

        {showForm ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg bg-zinc-950 border border-zinc-900 rounded-2xl p-6 shadow-md"
          >
            {successMsg ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-amber-400 font-serif text-base mt-3">Amesegenalehu!</p>
                <p className="text-zinc-500 text-xs mt-1">Your feedback is verified & published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Samuel Alula"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Service Received *</label>
                  <select
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="">Select service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-2 font-semibold">Quality Level</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setRating(stars)}
                        className="transition-transform active:scale-95"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            stars <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-800'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Feedback *</label>
                  <textarea
                    required
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-amber-500 resize-none"
                    placeholder="Tell us about your grooming session..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-wider rounded-lg transition"
                >
                  Publish Review
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between p-5 bg-zinc-950 border border-zinc-900 rounded-xl"
              >
                <div>
                  {/* RatingStars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-zinc-800'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-3.5 text-zinc-300 font-serif text-sm italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-900/60 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-amber-500 flex items-center justify-center text-[10px] font-bold">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-zinc-100 flex items-center gap-1 text-[11px]">
                        {rev.name}
                        {rev.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </h4>
                      <span className="text-[9px] text-zinc-500 block">{rev.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
