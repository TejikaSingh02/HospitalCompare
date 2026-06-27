import React, { useState, useMemo } from 'react';
import { Award, CheckCircle2, AlertTriangle, Sparkles, Sliders, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { INSURERS } from '../services/mockData';
import { getRankedHospitals } from '../utils/matchAlgorithm';
import { Link } from 'react-router-dom';

export default function MatchScorePage() {
  const [specialty, setSpecialty] = useState('Cardiology');
  const [insurance, setInsurance] = useState('Star Health');
  const [budget, setBudget] = useState(1200);
  const [minRating, setMinRating] = useState(4.5);

  const rankedResults = useMemo(() => {
    return getRankedHospitals({ specialty, insurance, budget, minRating });
  }, [specialty, insurance, budget, minRating]);

  const getRankBadge = (idx) => {
    if (idx === 0) return { label: "🥇 Rank 1 - Top Clinical Match", color: "from-amber-500 to-yellow-400 text-slate-950" };
    if (idx === 1) return { label: "🥈 Rank 2 - High Recommendation", color: "from-slate-300 to-slate-400 text-slate-950" };
    if (idx === 2) return { label: "🥉 Rank 3 - Strong Contender", color: "from-amber-700 to-amber-600 text-white" };
    return { label: `Rank ${idx + 1}`, color: "bg-slate-800 text-slate-300" };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-brand-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
          <Award className="w-4 h-4 text-amber-400" /> Proprietary Healthcare Decision Engine
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white">Hospital Match Score™</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Set your clinical priorities, budget, and insurance coverage. Our weighted multi-factor ranking algorithm computes your personalized match percentage and explains <em>why</em> each hospital fits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 h-fit sticky top-24">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-4">
            <Sliders className="w-4 h-4 text-brand-400" /> Your Healthcare Preferences
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Medical Specialty</label>
            <select
              value={specialty} onChange={(e) => setSpecialty(e.target.value)}
              className="w-full bg-slate-900 text-white text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Cardiology">Cardiology (Heart Care)</option>
              <option value="Neurology">Neurology & Brain Surgery</option>
              <option value="Oncology">Oncology (Cancer Treatment)</option>
              <option value="Orthopedics">Orthopedics (Joint Replacement)</option>
              <option value="Pediatrics">Pediatrics & Child Care</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Health Insurance Provider</label>
            <select
              value={insurance} onChange={(e) => setInsurance(e.target.value)}
              className="w-full bg-slate-900 text-white text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
            >
              {INSURERS.map((ins, idx) => (
                <option key={idx} value={ins}>{ins}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Max Consultation Budget</span>
              <span className="font-bold text-emerald-400">₹{budget}</span>
            </div>
            <input
              type="range" min="300" max="2000" step="100" value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Minimum Patient Rating</span>
              <span className="font-bold text-amber-400">{minRating} ⭐</span>
            </div>
            <input
              type="range" min="4.0" max="4.9" step="0.1" value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Ranked Hospital Match Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing personalized match rankings based on <strong className="text-white">5 weighted metrics</strong></span>
            <span>Algorithm Powered</span>
          </div>

          {rankedResults.map(({ hospital, matchPercentage, breakdown }, idx) => {
            const badge = getRankBadge(idx);
            return (
              <div
                key={hospital.id}
                className={`glass-card p-6 rounded-3xl border transition-all space-y-5 ${idx === 0 ? 'border-amber-500/50 shadow-xl shadow-amber-500/10' : 'border-slate-800'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r ${badge.color}`}>
                      {badge.label}
                    </span>
                    <h3 className="text-xl font-extrabold text-white">{hospital.name}</h3>
                    <p className="text-xs text-slate-400">{hospital.city} • {hospital.type} Institution</p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-900/90 px-5 py-3 rounded-2xl border border-slate-800 w-fit">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Match Score</span>
                      <span className="text-2xl font-black gradient-text">{matchPercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Explainable Match Insights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Explainable AI Insights (Why this matched)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                      <span className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Strengths & Fits</span>
                      <ul className="space-y-1 text-slate-300">
                        {breakdown.matches.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5"><span className="text-emerald-400">•</span> {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                      <span className="font-bold text-amber-400 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Trade-offs & Notes</span>
                      <ul className="space-y-1 text-slate-300">
                        {breakdown.warnings.length > 0 ? breakdown.warnings.map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5"><span className="text-amber-400">•</span> {w}</li>
                        )) : <li className="text-slate-500 italic">Zero major trade-offs detected!</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-4">
                    <span>Fee: <strong className="text-emerald-400">₹{hospital.consultationFee}</strong></span>
                    <span>Rating: <strong className="text-amber-400">{hospital.rating}⭐</strong></span>
                  </div>
                  <Link to={`/hospital/${hospital.id}`} className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1 transition-colors">
                    Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
