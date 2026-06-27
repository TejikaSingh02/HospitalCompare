import React, { useState } from 'react';
import { Stethoscope, ShieldAlert, CheckCircle, ArrowRight, Search, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptomInput, setCustomSymptomInput] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState(null);

  const symptomsList = [
    { id: 'chest_pain', label: 'Chest Tightness / Pain', dept: 'Cardiology', urgency: 'High (Emergency)' },
    { id: 'joint_stiffness', label: 'Severe Joint Stiffness / Knee Pain', dept: 'Orthopedics', urgency: 'Moderate' },
    { id: 'headache_dizziness', label: 'Chronic Headache & Dizziness', dept: 'Neurology', urgency: 'Moderate' },
    { id: 'stomach_acid', label: 'Acid Reflux & Stomach Cramps', dept: 'Gastroenterology', urgency: 'Low' },
    { id: 'fever_cough', label: 'High Fever & Shortness of Breath', dept: 'Pulmonology', urgency: 'High' }
  ];

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCustomSymptomSubmit = (e) => {
    e.preventDefault();
    if (!customSymptomInput.trim()) return;

    const query = customSymptomInput.toLowerCase();
    let dept = "General Medicine";
    let urgency = "Moderate";
    let tests = ["Complete Blood Count (CBC)", "Routine Health Audit"];

    if (query.includes('eye') || query.includes('vision') || query.includes('blur')) {
      dept = "Ophthalmology (Eye Care)";
      urgency = "Moderate";
      tests = ["Visual Acuity Test", "Slit Lamp Examination", "Fundoscopy"];
    } else if (query.includes('skin') || query.includes('rash') || query.includes('itch')) {
      dept = "Dermatology";
      urgency = "Low";
      tests = ["Skin Allergy Patch Test", "Dermoscopy"];
    } else if (query.includes('back') || query.includes('spine') || query.includes('disc')) {
      dept = "Orthopedics & Spine Surgery";
      urgency = "Moderate";
      tests = ["Lumbosacral Spine X-Ray", "MRI Lumbar Spine"];
    } else if (query.includes('kidney') || query.includes('urine') || query.includes('burning')) {
      dept = "Urology & Nephrology";
      urgency = "Moderate";
      tests = ["Urine Routine & Culture", "Ultrasound KUB", "Renal Function Test"];
    } else if (query.includes('ear') || query.includes('throat') || query.includes('sinus')) {
      dept = "ENT (Ear, Nose, Throat)";
      urgency = "Low";
      tests = ["Pure Tone Audiometry", "Nasal Endoscopy"];
    }

    setCustomAnalysis({
      symptom: customSymptomInput,
      dept,
      urgency,
      tests
    });
  };

  const matchedDepts = symptomsList.filter(s => selectedSymptoms.includes(s.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4" /> Educational Clinical Triage
        </div>
        <h1 className="text-4xl font-black text-white">Interactive Symptom Checker</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Type any custom symptom or select from common physical indicators to determine appropriate medical specialties.
        </p>
      </div>

      {/* Feature 1: Self-Filling Natural Language Input Bar */}
      <div className="glass-panel p-8 rounded-3xl border border-brand-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" /> Describe Your Symptoms in Your Own Words
        </div>
        <form onSubmit={handleCustomSymptomSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 bg-slate-900 px-4 py-3 rounded-2xl border border-slate-800">
            <Search className="w-4 h-4 text-brand-400" />
            <input
              type="text"
              placeholder="e.g. blurry vision, lower back pain, skin rash, frequent urination..."
              value={customSymptomInput}
              onChange={(e) => setCustomSymptomInput(e.target.value)}
              className="bg-transparent text-white text-xs placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-600/20 whitespace-nowrap">
            Analyze Symptoms
          </button>
        </form>

        {customAnalysis && (
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 mt-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-400">Analysis for: <strong className="text-white">"{customAnalysis.symptom}"</strong></span>
              <span className="bg-brand-950 text-brand-300 text-[10px] font-bold px-2.5 py-1 rounded border border-brand-800">
                Urgency: {customAnalysis.urgency}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Recommended Department</span>
                <h4 className="font-extrabold text-brand-400 text-base">{customAnalysis.dept}</h4>
                <div className="text-[11px] text-slate-400 mt-1">Recommended Diagnostic Tests: {customAnalysis.tests.join(', ')}</div>
              </div>
              <Link to={`/search?query=${encodeURIComponent(customAnalysis.dept.split(' ')[0])}`} className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap">
                Find {customAnalysis.dept.split(' ')[0]} Specialists <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Feature 2: Quick Multi-Select Symptom Chips */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base">Or Select Common Physical Indicators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {symptomsList.map(s => (
            <button
              key={s.id} onClick={() => toggleSymptom(s.id)}
              className={`p-4 rounded-2xl text-left border text-xs font-semibold transition-all flex items-center justify-between ${selectedSymptoms.includes(s.id) ? 'bg-brand-600 text-white border-brand-500 shadow-md' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
            >
              <span>{s.label}</span>
              {selectedSymptoms.includes(s.id) && <CheckCircle className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {matchedDepts.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-brand-500/40 space-y-4 animate-fadeIn">
          <h3 className="font-bold text-white text-lg">Recommended Clinical Departments</h3>
          <div className="space-y-3">
            {matchedDepts.map((d, idx) => (
              <div key={idx} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-400">{d.dept}</span>
                  <div className="text-xs text-slate-300">Associated with {d.label}</div>
                </div>
                <Link to={`/search?query=${encodeURIComponent(d.dept)}`} className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1">
                  Find Specialists <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-300 text-[11px] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>DISCLAIMER: This tool provides general educational suggestions and does NOT provide formal medical diagnoses or replace clinical care.</span>
          </div>
        </div>
      )}
    </div>
  );
}
