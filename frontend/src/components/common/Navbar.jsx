import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, GitCompare, Sparkles, User, LogOut, ShieldAlert, Award, TestTube, Stethoscope, Calculator } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCompare } from '../../context/CompareContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { selectedHospitalIds } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Hospital<span className="gradient-text">Compare</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Healthcare Decision Platform</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 text-xs">
          <Link to="/search" className={`px-3.5 py-2 rounded-full font-medium transition-all ${isActive('/search') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}>
            Explore
          </Link>
          <Link to="/match-score" className={`px-3.5 py-2 rounded-full font-bold transition-all flex items-center gap-1.5 ${isActive('/match-score') ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md' : 'text-amber-300 hover:text-white'}`}>
            <Award className="w-3.5 h-3.5" />
            Match Score™
          </Link>
          <Link to="/compare" className={`px-3.5 py-2 rounded-full font-medium transition-all flex items-center gap-1.5 ${isActive('/compare') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}>
            <GitCompare className="w-3.5 h-3.5" />
            Compare ({selectedHospitalIds.length})
          </Link>
          <Link to="/insurance-and-cost" className={`px-3.5 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${isActive('/insurance-and-cost') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}>
            <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Insurance & Cost
          </Link>
          <Link to="/labs-pharmacy" className={`px-3.5 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${isActive('/labs-pharmacy') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}>
            <TestTube className="w-3.5 h-3.5 text-brand-400" /> Labs & Meds
          </Link>
          <Link to="/symptom-checker" className={`px-3.5 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${isActive('/symptom-checker') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}>
            <Stethoscope className="w-3.5 h-3.5 text-accent-400" /> Symptoms
          </Link>
          <Link to="/emergency" className={`px-3 py-2 rounded-full font-bold transition-all flex items-center gap-1 ${isActive('/emergency') ? 'bg-rose-600 text-white' : 'text-rose-400 hover:bg-rose-950/40'}`}>
            <ShieldAlert className="w-3.5 h-3.5" /> 24x7
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link to={user.role === 'ROLE_SUPER_ADMIN' ? "/admin" : "/dashboard"} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors">
                <User className="w-4 h-4 text-brand-500" />
                <span className="hidden sm:inline">{user.fullName || 'Dashboard'}</span>
              </Link>
              <button onClick={() => { logout(); navigate('/'); }} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25 transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
