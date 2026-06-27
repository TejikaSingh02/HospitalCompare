import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star, CheckCircle2, SlidersHorizontal, ShieldCheck, DollarSign } from 'lucide-react';
import { MOCK_HOSPITALS } from '../services/mockData';
import { useCompare } from '../context/CompareContext';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [hospitalType, setHospitalType] = useState('ALL');
  const [minRating, setMinRating] = useState(0);
  const [maxFee, setMaxFee] = useState(2000);
  const [onlyNabh, setOnlyNabh] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [onlyIcu, setOnlyIcu] = useState(false);
  const [onlyBloodBank, setOnlyBloodBank] = useState(false);

  const { toggleHospitalForCompare, selectedHospitalIds } = useCompare();

  const filteredHospitals = useMemo(() => {
    return MOCK_HOSPITALS.filter((h) => {
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || 
        h.name.toLowerCase().includes(q) || 
        h.city.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q) ||
        h.specialties.some(s => s.toLowerCase().includes(q));

      const matchesCity = !city || h.city.toLowerCase() === city.toLowerCase();
      const matchesType = hospitalType === 'ALL' || h.type.toUpperCase() === hospitalType;
      const matchesRating = h.rating >= minRating;
      const matchesFee = h.consultationFee <= maxFee;
      const matchesNabh = !onlyNabh || h.isNabhAccredited;
      const matchesEmergency = !onlyEmergency || h.hasEmergency;
      const matchesIcu = !onlyIcu || h.hasIcu;
      const matchesBloodBank = !onlyBloodBank || h.hasBloodBank;

      return matchesQuery && matchesCity && matchesType && matchesRating && matchesFee && matchesNabh && matchesEmergency && matchesIcu && matchesBloodBank;
    });
  }, [query, city, hospitalType, minRating, maxFee, onlyNabh, onlyEmergency, onlyIcu, onlyBloodBank]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Find & Filter Hospitals</h1>
        <p className="text-slate-400 text-sm mt-1">Discover verified healthcare institutions tailored to your clinical and economic preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Advanced Filter Sidebar */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-400" /> Advanced Filters
            </h3>
            <button
              onClick={() => {
                setQuery(''); setCity(''); setHospitalType('ALL'); setMinRating(0); setMaxFee(2000);
                setOnlyNabh(false); setOnlyEmergency(false); setOnlyIcu(false); setOnlyBloodBank(false);
              }}
              className="text-xs text-slate-400 hover:text-brand-300 underline"
            >
              Reset All
            </button>
          </div>

          {/* Search Term */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Keyword Search</label>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Hospital name (e.g. Tyagi), disease..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* City Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">City / Location</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="">All Cities</option>
              <optgroup label="Western UP / Regional" className="bg-slate-900 text-brand-400 font-bold">
                <option value="Agra">Agra</option>
                <option value="Aligarh">Aligarh</option>
                <option value="Mathura">Mathura</option>
              </optgroup>
              <optgroup label="Metro Cities" className="bg-slate-900 text-accent-400 font-bold">
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
              </optgroup>
            </select>
          </div>

          {/* Hospital Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Hospital Category</label>
            <div className="grid grid-cols-3 gap-2">
              {['ALL', 'PRIVATE', 'GOVERNMENT'].map((t) => (
                <button
                  key={t}
                  onClick={() => setHospitalType(t)}
                  className={`py-2 text-[11px] font-bold rounded-xl border transition-all ${hospitalType === t ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Max Consultation Fee Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Max Consultation Fee</span>
              <span className="font-bold text-emerald-400">₹{maxFee}</span>
            </div>
            <input
              type="range" min="50" max="2000" step="50" value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Facility Checkboxes */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-semibold text-slate-300 block">Crucial Facilities & Accreditations</label>
            {[
              { label: "NABH Accredited", state: onlyNabh, setter: setOnlyNabh },
              { label: "24x7 Emergency Services", state: onlyEmergency, setter: setOnlyEmergency },
              { label: "ICU Available", state: onlyIcu, setter: setOnlyIcu },
              { label: "In-House Blood Bank", state: onlyBloodBank, setter: setOnlyBloodBank }
            ].map((fac, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox" checked={fac.state} onChange={(e) => fac.setter(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-0 cursor-pointer"
                />
                <span>{fac.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing <strong className="text-white">{filteredHospitals.length}</strong> hospitals matching criteria</span>
            <span>Sorted by Rating & Relevance</span>
          </div>

          {filteredHospitals.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-bold text-white text-lg">No Hospitals Found</h3>
              <p className="text-slate-400 text-xs">Try relaxing your price range or clearing search filters.</p>
            </div>
          ) : (
            filteredHospitals.map((hosp) => {
              const isCompared = selectedHospitalIds.includes(hosp.id);
              return (
                <div key={hosp.id} className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row gap-6">
                  <div className="sm:w-48 h-36 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src={hosp.coverImageUrl} alt={hosp.name} className="w-full h-full object-cover" />
                    {hosp.isNabhAccredited && (
                      <span className="absolute top-2 left-2 bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> NABH
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg text-white hover:text-brand-300 transition-colors">{hosp.name}</h3>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" /> {hosp.address} ({hosp.city})
                          </p>
                        </div>
                        <div className="bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1 flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {hosp.rating}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {hosp.specialties.map((s, idx) => (
                          <span key={idx} className="bg-slate-900 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg border border-slate-800 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/60">
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Consultation Fee</span>
                          <span className="text-emerald-400 font-bold">₹{hosp.consultationFee}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">MRI Scan Cost</span>
                          <span className="text-slate-300 font-semibold">₹{hosp.mriCost}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">ICU / Day</span>
                          <span className="text-slate-300 font-semibold">₹{hosp.icuPerDayCost}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/hospital/${hosp.id}`} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                          Details
                        </Link>
                        <button
                          onClick={() => toggleHospitalForCompare(hosp.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isCompared ? 'bg-amber-500 text-slate-950' : 'bg-brand-950 text-brand-300 border border-brand-800/60 hover:bg-brand-900'}`}
                        >
                          {isCompared ? <CheckCircle2 className="w-4 h-4" /> : '+ Compare'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
