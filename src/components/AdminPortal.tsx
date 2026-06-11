import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { SERVICES, BUSINESS_INFO } from '../data';
import { motion } from 'motion/react';
import { Shield, Sparkles, Database, CheckCircle, Clock, XCircle, FileSpreadsheet, CalendarDays, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface AdminPortalProps {
  refreshTrigger: number;
}

export default function AdminPortal({ refreshTrigger }: AdminPortalProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'api'>('queue');

  const fetchBookings = () => {
    const existing = localStorage.getItem('mara_appointments');
    if (existing) {
      setAppointments(JSON.parse(existing));
    } else {
      // Seed some starter appointments so the admin dashboard doesn't look empty and boring!
      const starterBookings: Appointment[] = [
        {
          id: 'MARA-BK-736291',
          fullName: 'Tewodros Kassahun',
          phoneNumber: '+251 911 204 888',
          serviceId: 'royal-cut',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '11:00 AM',
          additionalNotes: 'Keep fade sharp, request premium pomade scent.',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        },
        {
          id: 'MARA-BK-552399',
          fullName: 'Hana Belay',
          phoneNumber: '+251 922 411 999',
          serviceId: 'charcoal-mask',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '03:00 PM',
          additionalNotes: 'Booking facial grooming treatment as a birthday voucher.',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('mara_appointments', JSON.stringify(starterBookings));
      setAppointments(starterBookings);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = appointments.map((app) => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setAppointments(updated);
    localStorage.setItem('mara_appointments', JSON.stringify(updated));
  };

  const getServiceLabel = (id: string) => {
    return SERVICES.find((s) => s.id === id)?.name || 'General Grooming';
  };

  const getServicePrice = (id: string) => {
    return SERVICES.find((s) => s.id === id)?.priceETB || 0;
  };

  // Export to spreadsheet config payload
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appointments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'MARA-Appointments-Backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Calculated stats
  const totalSubmissions = appointments.length;
  const activeConfirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const projectedRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, app) => sum + getServicePrice(app.serviceId), 0);

  return (
    <div className="w-full bg-zinc-950/60 rounded-3xl border border-amber-500/10 p-6 md:p-8 backdrop-blur-md" id="admin-readiness-dashboard">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-mono tracking-widest uppercase mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Integrator Administrative Hub</span>
          </div>
          <h3 className="text-2xl font-serif font-semibold text-zinc-100 flex items-center gap-2">
            MARA Backoffice Portal
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] uppercase font-mono font-normal">
              Admin Ready
            </span>
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            This module represents the administrative structure prepared for Google Calendar syncing, Webhooks, or native database hooks.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 bg-zinc-900/8xl border border-zinc-850 rounded-xl max-w-fit self-start font-mono text-xs">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'queue' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Schedules ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'api' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Developer API Sync
          </button>
        </div>
      </div>

      {activeTab === 'queue' ? (
        <div className="mt-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-850 flex flex-col">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Estimated Slots Booked</span>
              <span className="text-2xl font-serif font-bold text-zinc-100 mt-1">{totalSubmissions} Total</span>
            </div>
            <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-850 flex flex-col">
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Confirmed Chairs</span>
              <span className="text-2xl font-serif font-bold text-emerald-400 mt-1">{activeConfirmed} Active</span>
            </div>
            <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-850 flex flex-col font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Projected Yield</span>
              <span className="text-2xl font-serif font-bold text-amber-400 mt-1">{projectedRevenue} ETB</span>
            </div>
          </div>

          {/* Bookings Queue */}
          {appointments.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No contemporary appointments found. Fill in the Booking form above to see live updates in real-time here!
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {appointments.map((app) => (
                <div
                  key={app.id}
                  className={`p-4 rounded-xl border transition ${
                    app.status === 'confirmed'
                      ? 'bg-zinc-900/40 border-emerald-950'
                      : app.status === 'cancelled'
                      ? 'bg-zinc-900/10 border-zinc-950 opacity-60'
                      : 'bg-zinc-900/30 border-amber-950'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* User and service info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-zinc-400">{app.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase ${
                          app.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                            : app.status === 'cancelled'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/25'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-serif font-medium text-zinc-100 mt-1">
                        {app.fullName}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        📞 {app.phoneNumber} • Style: <span className="text-amber-500">{getServiceLabel(app.serviceId)}</span>
                      </p>
                      
                      {app.additionalNotes && (
                        <p className="mt-2 text-xs text-zinc-500 italic bg-zinc-950 p-2 rounded">
                          "{app.additionalNotes}"
                        </p>
                      )}
                    </div>

                    {/* DateTime & actions */}
                    <div className="text-right flex flex-row sm:flex-col justify-between sm:items-end gap-2 shrink-0 sm:pt-0 pt-3 border-t sm:border-t-0 border-zinc-900">
                      <div className="text-left sm:text-right font-mono text-xs">
                        <div className="text-zinc-400 flex items-center gap-1 sm:justify-end">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {app.preferredDate}
                        </div>
                        <div className="text-zinc-500 flex items-center gap-1 sm:justify-end mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          {app.preferredTime}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1">
                        {app.status !== 'confirmed' && (
                          <button
                            onClick={() => updateStatus(app.id, 'confirmed')}
                            className="p-1 px-2 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 text-[10px] font-mono font-medium transition cursor-pointer"
                            title="Confirm Selection"
                          >
                            CONFIRM
                          </button>
                        )}
                        {app.status !== 'cancelled' && (
                          <button
                            onClick={() => updateStatus(app.id, 'cancelled')}
                            className="p-1 px-2 rounded bg-red-500/20 hover:bg-red-500/40 text-red-400 text-[10px] font-mono font-medium transition cursor-pointer"
                            title="Cancel Selection"
                          >
                            CANCEL
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Export action */}
          <div className="mt-6 flex justify-between items-center sm:flex-row flex-col gap-4 border-t border-zinc-900 pt-4">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              ★ Storage synchronized locally (localStorage)
            </span>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 rounded-xl text-xs font-mono tracking-wider flex items-center gap-2 hover:bg-zinc-900 transition"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export All Bookings
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 bg-zinc-950 p-6 rounded-2xl border border-zinc-900">
          <h4 className="font-serif text-amber-500 text-base font-medium flex items-center gap-2">
            <Layers className="w-4 h-4" /> Ready for Booking Software Integration
          </h4>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            This reservation engine holds all values in a sanitized schema. Real-time REST endpoints or Server actions can instantly map these variables to top-tier calendar providers.
          </p>

          {/* Sync payload layout code blocks */}
          <div className="mt-4 font-mono text-[11px] bg-black p-4 rounded-xl border border-zinc-900 overflow-x-auto text-zinc-400">
            <span className="text-amber-500 block mb-1">// API Outbound Sync Hook Payload Schema</span>
            {"{\n"}
            {"  \"event\": \"booking.created\",\n"}
            {"  \"shop\": \"MARA Barber\",\n"}
            {"  \"location\": \"CMC, Addis Ababa\",\n"}
            {"  \"googleCalendarPayload\": {\n"}
            {"    \"summary\": \"MARA Booking: Client Name\",\n"}
            {"    \"description\": \"Style: Royal Haircut & Wash.\\nPhone: +251...\",\n"}
            {"    \"start\": { \"dateTime\": \"2026-06-11T09:00:00\" },\n"}
            {"    \"end\": { \"dateTime\": \"2026-06-11T09:45:00\" }\n"}
            {"  }\n"}
            {"}"}
          </div>

          <div className="mt-6 bg-zinc-900/40 p-4 rounded-xl border border-zinc-850 text-xs flex flex-col gap-3">
            <span className="text-zinc-300 font-semibold uppercase tracking-wider block font-mono text-[10px]">
              Sync With Google Apps Script / Make.com / Zapier:
            </span>
            <div className="text-zinc-450 leading-relaxed space-y-2">
              <p>
                1. This frontend calls `localStorage.getItem('mara_appointments')` to cache data.
              </p>
              <p>
                2. On submission, the handler is structured to POST to any `/api/appointments` Express route, firing webhooks for SMS alerts (e.g. via Twilio or local Ethiopian carrier APIs).
              </p>
            </div>
            
            <a
              href="https://developers.google.com/calendar/api/v3/reference/events/insert"
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-xs text-amber-400 hover:underline flex items-center gap-1 max-w-fit font-mono focus:outline-none"
            >
              Google Calendar Event INSERT docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
