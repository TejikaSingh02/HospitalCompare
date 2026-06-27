import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Sparkles, Building2, ShieldCheck, Star, ArrowRight, Ambulance, HeartPulse, Stethoscope, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_HOSPITALS } from '../services/mockData';
import { useCompare } from '../context/CompareContext';

export default function Home() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const { toggleHospitalForCompare, selectedHospitalIds } = useCompare();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/30 to-accent-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-brand-500/10">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            AI-Powered Healthcare Discovery & Matrix Comparison
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Compare Hospitals. <br />
            <span className="gradient-text">Choose Confidence. Save Costs.</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Transparent comparison of treatments, ICU costs, doctor ratings, NABH accreditation, and insurance coverage across top hospitals.
          </p>

          {/* Multi-parameter Search Bar */}
          <form onSubmit={handleSearch} className="glass-panel p-3 rounded-2xl md:rounded-full shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 border border-slate-700/80">
            <div className="md:col-span-5 flex items-center gap-3 bg-slate-900/80 px-4 py-3 rounded-xl md:rounded-full border border-slate-800">
              <Search className="w-5 h-5 text-brand-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search disease, treatment, doctor, hospital..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none w-full"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-3 bg-slate-900/80 px-4 py-3 rounded-xl md:rounded-full border border-slate-800">
              <MapPin className="w-5 h-5 text-accent-400 flex-shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none w-full cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-slate-300">All Cities</option>
                <optgroup label="Western UP / Regional" className="bg-slate-900 text-brand-400 font-bold">
                  <option value="Agra" className="bg-slate-900 text-slate-100">Agra</option>
                  <option value="Aligarh" className="bg-slate-900 text-slate-100">Aligarh</option>
                  <option value="Mathura" className="bg-slate-900 text-slate-100">Mathura</option>
                </optgroup>
                <optgroup label="Metro Cities" className="bg-slate-900 text-accent-400 font-bold">
                  <option value="New Delhi" className="bg-slate-900 text-slate-100">New Delhi</option>
                  <option value="Mumbai" className="bg-slate-900 text-slate-100">Mumbai</option>
                  <option value="Bengaluru" className="bg-slate-900 text-slate-100">Bengaluru</option>
                  <option value="Chennai" className="bg-slate-900 text-slate-100">Chennai</option>
                </optgroup>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full h-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-3 px-6 rounded-xl md:rounded-full shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick Stats Row */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Verified Hospitals", val: `${MOCK_HOSPITALS.length}+ Hospitals` },
              { label: "Transparent Rates", val: "100% Verified" },
              { label: "Insurer Partners", val: "45+ TPAs" },
              { label: "Happy Patients", val: "2.5M+" }
            ].map((st, idx) => (
              <div key={idx} className="glass-card p-4 rounded-xl text-center border border-slate-800">
                <div className="text-xl sm:text-2xl font-bold text-white mb-0.5">{st.val}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-slate-900 border border-rose-800/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-5 z-10">
            <div className="w-16 h-16 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Ambulance className="w-8 h-8 text-rose-400" />
            </div>
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wide">
                24/7 Rapid Response
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">Medical Emergency in Agra, Aligarh or Mathura?</h3>
              <p className="text-slate-300 text-sm">Find nearest available emergency beds, trauma centers, and live ambulance dispatchers instantly.</p>
            </div>
          </div>
          <Link to="/emergency" className="z-10 whitespace-nowrap bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2">
            <span>Find Emergency Care</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Hospitals Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-brand-400 font-bold text-sm uppercase tracking-wider mb-1">Top Rated Institutions</div>
            <h2 className="text-3xl font-extrabold text-white">Featured Hospitals Across India & UP</h2>
          </div>
          <Link to="/search" className="text-brand-400 hover:text-brand-300 text-sm font-semibold flex items-center gap-1">
            View All Hospitals ({MOCK_HOSPITALS.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_HOSPITALS.slice(0, 6).map((hosp) => {
            const isCompared = selectedHospitalIds.includes(hosp.id);
            return (
              <div key={hosp.id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={hosp.coverImageUrl} alt={hosp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 border border-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {hosp.rating} ({hosp.reviewCount})
                    </div>
                    <div className="absolute bottom-3 left-3 bg-brand-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-brand-300 border border-brand-800/60">
                      {hosp.type} • {hosp.city}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-brand-300 transition-colors line-clamp-1">{hosp.name}</h3>
                      <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {hosp.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block">Consultation Fee</span>
                        <span className="text-emerald-400 font-bold text-sm">₹{hosp.consultationFee}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Available ICU Beds</span>
                        <span className="text-white font-bold text-sm">{hosp.availableBeds} Beds</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {hosp.specialties.slice(0, 3).map((sp, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-slate-800/80 text-slate-300 text-[11px] font-medium rounded-md border border-slate-700/50">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <Link to={`/hospital/${hosp.id}`} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl font-semibold text-xs transition-colors">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleHospitalForCompare(hosp.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isCompared ? 'bg-amber-500 text-slate-950' : 'bg-brand-950 text-brand-300 border border-brand-800/60 hover:bg-brand-900'}`}
                  >
                    {isCompared ? <CheckCircle2 className="w-4 h-4" /> : '+ Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
