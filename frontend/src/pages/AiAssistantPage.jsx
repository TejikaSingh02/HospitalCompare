import React, { useState } from 'react';
import { Sparkles, FileText, Upload, CheckCircle, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { MOCK_HOSPITALS } from '../services/mockData';

export default function AiAssistantPage() {
  const [activeTab, setActiveTab] = useState('recommend');

  // Recommendation Form State
  const [disease, setDisease] = useState('Heart Care / Angioplasty');
  const [location, setLocation] = useState('Aligarh');
  const [budget, setBudget] = useState('Moderate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendResult, setRecommendResult] = useState(null);

  // Report Summary State
  const [reportFile, setReportFile] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  const handleRecommendSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      const matchedHospitals = MOCK_HOSPITALS.filter(h => h.city.toLowerCase() === location.toLowerCase());
      const bestHosp = matchedHospitals[0] || MOCK_HOSPITALS[0];
      const altHosp = matchedHospitals[1] || MOCK_HOSPITALS[1];

      setRecommendResult({
        recommendedHospital: bestHosp.name,
        matchScore: "96%",
        reasoning: `Selected for ${location} based on NABH accredited facilities, ${bestHosp.availableBeds} available beds, and low consultation fee (₹${bestHosp.consultationFee}).`,
        pros: [
          `Top-rated clinical team in ${location}`,
          `Full cashless support for major insurers`,
          `24x7 Emergency & Trauma Care`
        ],
        cons: [
          `Peak weekend OPD waiting time (~${bestHosp.waitingTimeMinutes} mins)`
        ],
        estimatedCost: `₹${(bestHosp.consultationFee * 10).toLocaleString()} - ₹${(bestHosp.consultationFee * 40).toLocaleString()} (Procedure dependent)`,
        alternativeOptions: [altHosp.name]
      });
    }, 800);
  };

  const handleReportUpload = (e) => {
    e.preventDefault();
    if (!reportFile) return;
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setReportResult({
        summary: "Patient lab report shows mild left ventricular hypertrophy with well-preserved ejection fraction (62%). Blood chemistry indicates elevated LDL cholesterol (145 mg/dL).",
        suggestedDepartment: "Cardiology & Vascular Medicine",
        keyTerms: ["Left Ventricular Hypertrophy", "Ejection Fraction (62%)", "LDL Cholesterol (145 mg/dL)", "Lipid Profile"],
        urgency: "Moderate - Schedule consultation within 7-10 days",
        disclaimer: "CRITICAL NOTICE: AI report summarization is for informational assistance only and is NOT a medical diagnosis. Please present original reports to a qualified clinician."
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/20 text-accent-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" /> Next-Gen Clinical AI Assistant
        </div>
        <h1 className="text-4xl font-extrabold text-white">Gemini AI Health Navigator</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Intelligent clinical matching and medical report deciphering powered by Google Gemini LLM architecture.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('recommend')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'recommend' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Sparkles className="w-4 h-4" /> Hospital Recommendation
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'report' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" /> Medical Report Analyzer
          </button>
        </div>
      </div>

      {/* Tab 1: Recommendation Engine */}
      {activeTab === 'recommend' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleRecommendSubmit} className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Enter Clinical Requirements</h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Condition / Disease / Specialty</label>
              <input
                type="text" placeholder="e.g. Angioplasty, Knee Replacement, Asthma" value={disease} onChange={(e) => setDisease(e.target.value)} required
                className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target City</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none cursor-pointer">
                <option value="Aligarh">Aligarh</option>
                <option value="Agra">Agra</option>
                <option value="Mathura">Mathura</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Budget Constraint</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none cursor-pointer">
                <option value="Economy">Economy (Budget Friendly)</option>
                <option value="Moderate">Moderate (Standard Super-Specialty)</option>
                <option value="Premium">Premium (Luxury Wing)</option>
              </select>
            </div>

            <button type="submit" disabled={isAnalyzing} className="w-full py-3 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-accent-600/25 transition-all flex items-center justify-center gap-2">
              {isAnalyzing ? "Gemini AI is analyzing clinical data..." : "Generate AI Recommendation"}
            </button>
          </form>

          <div className="lg:col-span-7 space-y-4">
            {!recommendResult ? (
              <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 h-full flex flex-col items-center justify-center space-y-3">
                <Sparkles className="w-12 h-12 text-slate-700 animate-pulse" />
                <h4 className="font-bold text-white text-base">Awaiting Your Input</h4>
                <p className="text-slate-400 text-xs max-w-xs">Submit your medical condition to view AI matching confidence scores and hospital reasoning.</p>
              </div>
            ) : (
              <div className="glass-panel p-6 rounded-3xl border border-accent-500/40 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-400">Top Match in {location}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{recommendResult.recommendedHospital}</h3>
                  </div>
                  <div className="bg-emerald-950 border border-emerald-700/80 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-extrabold">
                    Match Confidence: {recommendResult.matchScore}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clinical Reasoning</h4>
                  <p className="text-xs text-slate-200 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed">{recommendResult.reasoning}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Key Advantages</span>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {recommendResult.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-amber-400 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Considerations</span>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {recommendResult.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Est. Package Cost: <strong className="text-emerald-400">{recommendResult.estimatedCost}</strong></span>
                  <a href="#/search" className="text-brand-400 font-bold hover:underline flex items-center gap-1">View Hospital Profile <ArrowRight className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Report Summarizer */}
      {activeTab === 'report' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <form onSubmit={handleReportUpload} className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-brand-400">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Upload Lab / Medical Report (PDF)</h3>
              <p className="text-slate-400 text-xs mt-1">Our AI extracts medical jargon, highlights critical flags, and maps relevant medical departments.</p>
            </div>
            <input
              type="file" accept=".pdf,image/*" onChange={(e) => setReportFile(e.target.files[0])}
              className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-600 file:text-white hover:file:bg-brand-500 cursor-pointer bg-slate-900 p-2 rounded-xl border border-slate-800"
            />
            <button type="submit" disabled={!reportFile || isSummarizing} className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/20 disabled:opacity-50">
              {isSummarizing ? "Extracting & Summarizing..." : "Analyze & Summarize Report"}
            </button>
          </form>

          {reportResult && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 animate-fadeIn">
              <h4 className="font-bold text-white text-base">Report Analysis Summary</h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">{reportResult.summary}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="text-slate-400">Suggested Department: <strong className="text-brand-300">{reportResult.suggestedDepartment}</strong></span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {reportResult.keyTerms.map((term, idx) => (
                  <span key={idx} className="bg-accent-950/80 border border-accent-800/60 text-accent-300 text-[11px] px-2.5 py-1 rounded-lg">
                    {term}
                  </span>
                ))}
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-xl text-amber-300 text-[11px] flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{reportResult.disclaimer}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
