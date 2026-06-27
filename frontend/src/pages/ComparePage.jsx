import React from 'react';
import { Link } from 'react-router-dom';
import { GitCompare, Check, X, ShieldCheck, Download, Trash2, Star, AlertCircle, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { MOCK_HOSPITALS } from '../services/mockData';
import { useCompare } from '../context/CompareContext';

export default function ComparePage() {
  const { selectedHospitalIds, toggleHospitalForCompare, clearCompareList } = useCompare();

  const comparedHospitals = MOCK_HOSPITALS.filter((h) => selectedHospitalIds.includes(h.id));

  const chartData = comparedHospitals.map((h) => ({
    name: h.name.split(' ')[0],
    ConsultationFee: h.consultationFee,
    MRICost: h.mriCost,
    ICUCostPerDay: h.icuPerDayCost,
  }));

  const radarData = [
    { subject: 'Hygiene & Cleanliness', A: 90, B: 85, C: 95 },
    { subject: 'Clinical Excellence', A: 95, B: 90, C: 88 },
    { subject: 'Waiting Time Efficiency', A: 85, B: 70, C: 92 },
    { subject: 'Staff Courtesy', A: 88, B: 82, C: 90 },
    { subject: 'Value for Money', A: 80, B: 95, C: 85 },
  ];

  const handleDownloadPDF = () => {
    alert("Generating & downloading official HospitalCompare PDF Comparison Report...");
  };

  if (comparedHospitals.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <GitCompare className="w-16 h-16 text-slate-600 mx-auto animate-bounce" />
        <h2 className="text-3xl font-extrabold text-white">No Hospitals Selected for Comparison</h2>
        <p className="text-slate-400 text-sm">Select up to 4 hospitals from the search list to generate an itemized cost and clinical comparison matrix.</p>
        <Link to="/search" className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3 rounded-2xl transition-all">
          Browse Hospitals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-brand-400" /> Matrix Comparison Analysis
          </h1>
          <p className="text-slate-400 text-sm mt-1">Comparing {comparedHospitals.length} selected healthcare facilities side-by-side.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={clearCompareList} className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-1.5">
            <Trash2 className="w-4 h-4" /> Clear Matrix
          </button>
          <button onClick={handleDownloadPDF} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/20 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Comparison Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Comparative Procedure & ICU Costs</h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ConsultationFee" fill="#14b8a6" name="Consultation Fee (₹)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="MRICost" fill="#6366f1" name="MRI Scan Cost (₹)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="ICUCostPerDay" fill="#f43f5e" name="ICU Per Day (₹)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Patient Experience Radar</h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name={comparedHospitals[0]?.name.split(' ')[0] || 'Hospital 1'} dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.4} />
                {comparedHospitals[1] && <Radar name={comparedHospitals[1].name.split(' ')[0]} dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />}
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Side-by-side Matrix Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60">
              <th className="p-4 text-xs font-bold uppercase text-slate-400 w-1/4">Feature / Metric</th>
              {comparedHospitals.map((h) => (
                <th key={h.id} className="p-4 text-center">
                  <div className="space-y-2">
                    <img src={h.coverImageUrl} alt={h.name} className="w-full h-24 object-cover rounded-xl border border-slate-800" />
                    <h4 className="font-bold text-white text-sm line-clamp-1">{h.name}</h4>
                    <button onClick={() => toggleHospitalForCompare(h.id)} className="text-[11px] text-rose-400 hover:underline">Remove</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            <tr>
              <td className="p-4 font-semibold text-slate-300">Hospital Category</td>
              {comparedHospitals.map(h => <td key={h.id} className="p-4 text-center font-bold text-brand-400">{h.type}</td>)}
            </tr>
            <tr className="bg-slate-900/30">
              <td className="p-4 font-semibold text-slate-300">Overall Rating</td>
              {comparedHospitals.map(h => (
                <td key={h.id} className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {h.rating} / 5.0
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-300">Consultation Fee</td>
              {comparedHospitals.map(h => <td key={h.id} className="p-4 text-center font-bold text-emerald-400">₹{h.consultationFee}</td>)}
            </tr>
            <tr className="bg-slate-900/30">
              <td className="p-4 font-semibold text-slate-300">MRI Scan Cost</td>
              {comparedHospitals.map(h => <td key={h.id} className="p-4 text-center text-slate-200">₹{h.mriCost}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-300">CT Scan Cost</td>
              {comparedHospitals.map(h => <td key={h.id} className="p-4 text-center text-slate-200">₹{h.ctScanCost}</td>)}
            </tr>
            <tr className="bg-slate-900/30">
              <td className="p-4 font-semibold text-slate-300">ICU Cost / Day</td>
              {comparedHospitals.map(h => <td key={h.id} className="p-4 text-center font-bold text-rose-400">₹{h.icuPerDayCost}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-300">NABH Accredited</td>
              {comparedHospitals.map(h => (
                <td key={h.id} className="p-4 text-center">
                  {h.isNabhAccredited ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}
                </td>
              ))}
            </tr>
            <tr className="bg-slate-900/30">
              <td className="p-4 font-semibold text-slate-300">24x7 Emergency Services</td>
              {comparedHospitals.map(h => (
                <td key={h.id} className="p-4 text-center">
                  {h.hasEmergency ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
