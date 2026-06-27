import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 px-4 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-white">Hospital<span className="gradient-text">Compare</span></span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            India's most trusted AI-powered hospital service comparison and transparent healthcare discovery platform.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
            <ShieldCheck className="w-4 h-4" /> NABH & AB-PMJAY Accredited Data
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/search" className="hover:text-white transition-colors">Compare Hospitals</Link></li>
            <li><Link to="/ai-assistant" className="hover:text-white transition-colors">Gemini AI Symptom Match</Link></li>
            <li><Link to="/emergency" className="hover:text-white transition-colors">24x7 Emergency Finder</Link></li>
            <li><Link to="/compare" className="hover:text-white transition-colors">Cost Matrix Analyzer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Medical Specialties</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="hover:text-white cursor-pointer">Cardiology & Heart Surgery</span></li>
            <li><span className="hover:text-white cursor-pointer">Neurology & Brain Care</span></li>
            <li><span className="hover:text-white cursor-pointer">Oncology (Cancer Care)</span></li>
            <li><span className="hover:text-white cursor-pointer">Orthopedics & Joint Replacement</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Emergency Hotline</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-4 h-4 text-rose-500" /> 1800-HOSPITAL (24x7 Toll Free)
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-4 h-4 text-brand-400" /> support@hospitalcompare.com
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-accent-400" /> New Delhi, MH, KA - India
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 HospitalCompare Technologies Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">Built with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for transparent healthcare access.</p>
      </div>
    </footer>
  );
}
