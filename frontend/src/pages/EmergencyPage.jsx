import React from 'react';
import { Ambulance, PhoneCall, ShieldAlert, MapPin, Activity, Heart, Clock } from 'lucide-react';
import { MOCK_HOSPITALS } from '../services/mockData';

export default function EmergencyPage() {
  const emergencyHospitals = MOCK_HOSPITALS.filter((h) => h.hasEmergency);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-rose-950/90 via-rose-900/60 to-slate-950 p-8 md:p-12 rounded-3xl border border-rose-800/80 shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" /> 24/7 Rapid Medical Emergency Command
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white">Emergency Services & Ambulance Dispatch</h1>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl">
          Real-time tracking of critical care units, Level-1 trauma centers, and immediate emergency bed allocation across NCR, Mumbai, and Bengaluru.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a href="tel:108" className="bg-rose-600 hover:bg-rose-500 text-white font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-rose-600/40 flex items-center gap-3 transition-all">
            <PhoneCall className="w-6 h-6 animate-bounce" /> Call National Ambulance (108 / 112)
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-rose-500" /> Nearest Emergency Ready Hospitals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyHospitals.map((hosp) => (
            <div key={hosp.id} className="glass-card p-6 rounded-3xl border border-rose-900/40 hover:border-rose-700/60 transition-all space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-white text-lg">{hosp.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {hosp.city}</p>
                </div>
                <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-rose-500/40">
                  24x7 ICU
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Available ICU Beds</span>
                  <span className="text-emerald-400 font-extrabold text-sm">{hosp.availableBeds} Free</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Trauma Team</span>
                  <span className="text-slate-200 font-bold">On Standby</span>
                </div>
              </div>

              <a href={`tel:${hosp.emergencyContact}`} className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors">
                <PhoneCall className="w-4 h-4" /> Call Desk: {hosp.emergencyContact}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
