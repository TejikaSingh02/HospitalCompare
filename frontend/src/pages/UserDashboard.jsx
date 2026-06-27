import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Heart, FileText, Bell, User, Clock } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-black text-2xl">
          {user?.fullName?.charAt(0) || 'U'}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Welcome back, {user?.fullName || 'Patient'}</h1>
          <p className="text-slate-400 text-xs mt-0.5">{user?.email} • Registered Member</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-brand-400">
            <h3 className="font-bold text-white text-base">Appointments</h3>
            <Calendar className="w-5 h-5" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
            <span className="text-emerald-400 font-bold block">CONFIRMED</span>
            <div className="font-bold text-white text-sm">Dr. Rajesh Sharma</div>
            <div className="text-slate-400">Apex Heart Hospital • June 30, 2026</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-accent-400">
            <h3 className="font-bold text-white text-base">Medical Reports</h3>
            <FileText className="w-5 h-5" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-white text-sm">Blood_Chemistry_June2026.pdf</div>
            <div className="text-slate-400">Summarized by Gemini AI</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-amber-400">
            <h3 className="font-bold text-white text-base">Notifications</h3>
            <Bell className="w-5 h-5" />
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="font-semibold text-slate-200">Reminder: Consultation tomorrow</div>
            <div className="text-slate-500">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
