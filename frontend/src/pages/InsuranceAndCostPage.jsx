import React, { useState } from 'react';
import { ShieldCheck, Calculator, CheckCircle, Search, ArrowRight, DollarSign } from 'lucide-react';
import { INSURERS, PROCEDURE_CALCULATOR_DATA, MOCK_HOSPITALS } from '../services/mockData';
import { Link } from 'react-router-dom';

export default function InsuranceAndCostPage() {
  const [selectedInsurer, setSelectedInsurer] = useState(INSURERS[0]);
  const [selectedProcedure, setSelectedProcedure] = useState(PROCEDURE_CALCULATOR_DATA[0].procedure);

  const matchedHospitals = MOCK_HOSPITALS.filter(h => h.acceptedInsurances.includes(selectedInsurer));
  const currentProcedure = PROCEDURE_CALCULATOR_DATA.find(p => p.procedure === selectedProcedure) || PROCEDURE_CALCULATOR_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Cashless Approval & Surgery Cost Estimator
        </div>
        <h1 className="text-4xl font-black text-white">Insurance & Procedure Cost Navigator</h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Check instant cashless network hospitals for your health insurance plan and calculate realistic surgery costs across Government vs. Private institutions.
        </p>
      </div>

      {/* Feature 1: Cashless Network Checker */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Instant TPA Lookup</span>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" /> Cashless Insurance Network Checker
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">Select Insurer:</span>
            <select
              value={selectedInsurer}
              onChange={(e) => setSelectedInsurer(e.target.value)}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {INSURERS.map((ins, idx) => (
                <option key={idx} value={ins} className="bg-slate-900 text-slate-100">{ins}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Found <strong className="text-emerald-400 font-bold">{matchedHospitals.length}</strong> cashless empaneled hospitals for <strong>{selectedInsurer}</strong></span>
            <span className="text-slate-500">Average Cashless Approval Time: 45 Minutes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedHospitals.map(hosp => (
              <div key={hosp.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">{hosp.name}</h4>
                    <p className="text-xs text-slate-400">{hosp.city} • {hosp.type}</p>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                    Cashless Ready
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">Consultation: <strong className="text-emerald-400">₹{hosp.consultationFee}</strong></span>
                  <Link to={`/hospital/${hosp.id}`} className="text-brand-400 font-semibold hover:underline">View Profile</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 2: Surgery Cost Calculator */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-accent-400 uppercase tracking-wider">Clinical Financial Planning</span>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 mt-1">
            <Calculator className="w-6 h-6 text-accent-400" /> Surgical Procedure Cost Calculator
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <label className="text-xs font-semibold text-slate-300">Choose Treatment / Surgical Procedure</label>
            <select
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className="w-full bg-slate-900 text-white text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
            >
              {PROCEDURE_CALCULATOR_DATA.map((p, idx) => (
                <option key={idx} value={p.procedure} className="bg-slate-900 text-slate-100">{p.procedure}</option>
              ))}
            </select>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-400"><span>Clinical Category:</span> <strong className="text-white">{currentProcedure.category}</strong></div>
              <div className="flex justify-between text-slate-400"><span>Avg Hospital Stay:</span> <strong className="text-white">{currentProcedure.recoveryDays}</strong></div>
              <div className="flex justify-between text-slate-400"><span>Standard Health Insurance:</span> <strong className="text-emerald-400">Covered 100%</strong></div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-xs text-slate-400 font-medium">Government Hospital (AIIMS/PGIMER)</span>
              <div className="text-2xl font-extrabold text-emerald-400">₹{currentProcedure.govtEst.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500 block">Highly subsidized procedure cost</span>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-brand-500/30 text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">MOST COMMON</div>
              <span className="text-xs text-slate-400 font-medium">Standard Private Hospital</span>
              <div className="text-2xl font-extrabold text-brand-300">₹{currentProcedure.privateAvg.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500 block">Single AC room package</span>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-xs text-slate-400 font-medium">Luxury / International Wing</span>
              <div className="text-2xl font-extrabold text-purple-400">₹{currentProcedure.privateLuxury.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500 block">Suite room & dedicated nurse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
