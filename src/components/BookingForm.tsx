import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, HOURLY_SLOTS } from '../data';
import { Appointment } from '../types';
import { Calendar, Clock, Sparkles, CheckCircle2, Copy, Download, Loader2 } from 'lucide-react';

interface BookingFormProps {
  onBookingAdded?: () => void;
}

export default function BookingForm({ onBookingAdded }: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  const getMinDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Appointment = {
        id: `MARA-BK-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        serviceId,
        preferredDate,
        preferredTime,
        additionalNotes: additionalNotes.trim(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      const existing = localStorage.getItem('mara_appointments');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newBooking);
      localStorage.setItem('mara_appointments', JSON.stringify(list));

      setIsSubmitting(false);
      setConfirmedBooking(newBooking);

      if (onBookingAdded) {
        onBookingAdded();
      }
    }, 1000);
  };

  const resetForm = () => {
    setFullName('');
    setPhoneNumber('');
    setServiceId('');
    setPreferredDate('');
    setPreferredTime('');
    setAdditionalNotes('');
    setConfirmedBooking(null);
  };

  const selectedServiceDetails = SERVICES.find(s => s.id === serviceId);

  const handleDownloadReceipt = () => {
    if (!confirmedBooking) return;
    const service = SERVICES.find(s => s.id === confirmedBooking.serviceId);
    const receiptContent = `
========================================
       MARA BARBER SHOP APPOINTMENT
========================================
Reservation ID:   ${confirmedBooking.id}
Client:           ${confirmedBooking.fullName}
Phone:            ${confirmedBooking.phoneNumber}
Service:          ${service?.name || 'General Grooming'}
Date:             ${confirmedBooking.preferredDate}
Time:             ${confirmedBooking.preferredTime}
Price:            ${service?.priceETB || 0} ETB

📍 Location: CMC Road, Safari Building, 2nd Floor, Addis Ababa, Ethiopia
📞 Contact: +251 77 177 1111
========================================
No deposit required. We hold seats for up to 15 mins.
`;
    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `MARA-APPOINTMENT-${confirmedBooking.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full bg-zinc-900/40 rounded-2xl border border-zinc-900 p-6 md:p-8 backdrop-blur-sm" id="booking">
      <AnimatePresence mode="wait">
        {!confirmedBooking ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center gap-1.5 text-amber-500 font-mono text-[10px] uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Real-time Secure Reservation</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white">
              Claim Your Grooming Chair
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Select your customized slot. No upfront deposit is required. We hold slots for up to 15 minutes.
            </p>

            <form onSubmit={handleBookingSubmit} className="mt-6 flex flex-col gap-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700"
                    placeholder="Samuel Alula"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700"
                    placeholder="+251 9..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Service *
                  </label>
                  <select
                    required
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Choose service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.priceETB} ETB)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={getMinDateString()}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Hour *
                  </label>
                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    <option value="">Select hour</option>
                    {HOURLY_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedServiceDetails && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black/90 border border-amber-500/10 rounded-xl p-4 flex justify-between items-center"
                >
                  <span className="flex items-center gap-1.5 text-amber-500 font-serif text-sm">
                    <Sparkles className="w-4 h-4 text-amber-450" />
                    <span>{selectedServiceDetails.name}</span>
                  </span>
                  <div className="text-right text-xs font-mono">
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider">Estimated Price</div>
                    <div className="text-amber-400 font-bold text-sm">{selectedServiceDetails.priceETB} ETB</div>
                    <div className="text-[10px] text-zinc-500">~ {selectedServiceDetails.durationMin} Min</div>
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Style Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full bg-black border border-zinc-850 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-700 resize-none"
                  placeholder="Skin sensitivities, razor preferences, fade requests..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold font-mono tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    Booking Slot...
                  </>
                ) : (
                  'Confirm Reservation'
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col text-center"
          >
            <div className="max-w-md mx-auto w-full p-6 bg-black border border-dashed border-amber-500/20 rounded-2xl relative shadow-xl flex flex-col items-center">
              
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
              
              <h4 className="text-lg font-serif font-medium text-amber-500 uppercase tracking-widest">
                Grooming Reserved
              </h4>
              
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                Official MARA Appointment Receipt
              </p>

              <div className="w-full mt-5 border-t border-zinc-900 pt-4 flex flex-col gap-2.5 font-mono text-xs text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Client:</span>
                  <span className="text-zinc-200 font-medium">{confirmedBooking.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service:</span>
                  <span className="text-amber-500 font-medium font-serif">
                    {selectedServiceDetails?.name || 'Styling Package'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Scheduled Date:</span>
                  <span className="text-zinc-200 font-medium">{confirmedBooking.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Hourly Slot:</span>
                  <span className="text-zinc-200 font-medium">{confirmedBooking.preferredTime}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-dashed border-zinc-900">
                  <span className="text-zinc-400 block">estimated total</span>
                  <span className="text-amber-400 font-bold font-serif text-sm">
                    {selectedServiceDetails?.priceETB || 0} ETB
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-zinc-950 rounded-xl border border-zinc-900 text-[10px] text-zinc-400 leading-relaxed text-center">
                <span className="font-semibold text-emerald-500 block mb-0.5">✓ Secured Seat!</span>
                Your chair is waiting at our Safari Building location.
              </div>

              <div className="mt-5 flex gap-2 w-full">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="flex-1 py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Receipt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const str = `Ticket: ${confirmedBooking.fullName} • ${confirmedBooking.preferredDate} at ${confirmedBooking.preferredTime} • MARA Barber`;
                    navigator.clipboard.writeText(str);
                    alert("Ticket copied!");
                  }}
                  className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Copy Details
                </button>
              </div>

            </div>

            <button
              onClick={resetForm}
              className="mt-5 mx-auto bg-transparent text-zinc-500 hover:text-amber-500 text-xs font-mono tracking-wider hover:underline"
            >
              Book Another Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
