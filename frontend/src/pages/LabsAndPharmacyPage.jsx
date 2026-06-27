import React, { useState } from 'react';
import { Pill, TestTube, CheckCircle, Search, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { MOCK_LABS } from '../services/mockData';

export default function LabsAndPharmacyPage() {
  const [activeTab, setActiveTab] = useState('labs');
  const [selectedCity, setSelectedCity] = useState('');

  const filteredLabs = selectedCity
    ? MOCK_LABS.filter(l => l.city.toLowerCase() === selectedCity.toLowerCase())
    : MOCK_LABS;

  const medicines = [
    { brand: "Lipitor (Atorvastatin 10mg)", brandPrice: 180, generic: "Atorvastatin 10mg (Generic)", genericPrice: 35, savings: "80%" },
    { brand: "Augmentin (Amoxicillin+Clav 625mg)", brandPrice: 210, generic: "Amoxyclav 625mg (Generic)", genericPrice: 70, savings: "66%" },
    { brand: "Janumet (Sitagliptin+Metformin)", brandPrice: 340, generic: "Sitagliptin-Met (Generic)", genericPrice: 110, savings: "67%" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/20 text-accent-300 text-xs font-bold uppercase tracking-wider">
          <TestTube className="w-4 h-4 text-brand-400" /> Transparent Diagnostics & Pathology Directory
        </div>
        <h1 className="text-4xl font-black text-white">Pathology Labs & Pharmacy Marketplace</h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Explore accredited pathology centers across Aligarh, Agra, Mathura, Delhi & more. Compare test packages and home sample collection services.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'labs' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <TestTube className="w-4 h-4" /> Diagnostic Labs by City
          </button>
          <button
            onClick={() => setActiveTab('pharmacy')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'pharmacy' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Pill className="w-4 h-4" /> Generic Medicine Substitute Finder
          </button>
        </div>
      </div>

      {activeTab === 'labs' ? (
        <div className="space-y-6">
          {/* City Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Filter Pathology Labs by Location:</span>
            </div>
            <select
              value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-900 text-white text-xs px-4 py-2 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="">All Cities</option>
              <option value="Aligarh">Aligarh</option>
              <option value="Agra">Agra</option>
              <option value="Mathura">Mathura</option>
              <option value="New Delhi">New Delhi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab) => (
              <div key={lab.id} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-white text-lg">{lab.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {lab.address}</p>
                    </div>
                    {lab.nablAccredited && (
                      <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 flex-shrink-0">
                        NABL
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-brand-400 uppercase">Popular Test Packages</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {lab.popularTests.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" /> {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-400" /> {lab.avgTurnaround} report</span>
                  <a href={`tel:${lab.phone}`} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Call Lab
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {medicines.map((m, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium">Brand Name Medicine</span>
                <h4 className="font-bold text-white text-base">{m.brand}</h4>
                <span className="text-sm font-bold text-slate-300">₹{m.brandPrice}</span>
              </div>

              <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase">Generic Substitute</span>
                  <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded">Save {m.savings}</span>
                </div>
                <div className="font-extrabold text-white text-sm">{m.generic}</div>
                <div className="text-xl font-black text-emerald-400">₹{m.genericPrice}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
