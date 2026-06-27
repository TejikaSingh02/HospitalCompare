import React from 'react';
import { Building2, Users, Calendar, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const analyticsData = [
    { month: 'Jan', revenue: 450000, bookings: 320 },
    { month: 'Feb', revenue: 520000, bookings: 410 },
    { month: 'Mar', revenue: 610000, bookings: 480 },
    { month: 'Apr', revenue: 750000, bookings: 590 },
    { month: 'May', revenue: 890000, bookings: 710 },
    { month: 'Jun', revenue: 1020000, bookings: 840 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Platform Super Admin Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">System operational metrics, hospital onboarding & revenue statistics.</p>
        </div>
        <span className="bg-emerald-950 border border-emerald-700 text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
          <Activity className="w-4 h-4" /> System Healthy (99.99%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Total Network Revenue</span>
          <div className="text-2xl font-extrabold text-emerald-400">₹1.02M</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +14.6% this month</span>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Verified Hospitals</span>
          <div className="text-2xl font-extrabold text-white">1,420</div>
          <span className="text-[11px] text-slate-400">across 32 metro cities</span>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Monthly Appointments</span>
          <div className="text-2xl font-extrabold text-brand-400">840</div>
          <span className="text-[11px] text-brand-400 font-semibold">+22% growth</span>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Active Patients</span>
          <div className="text-2xl font-extrabold text-accent-400">128,400</div>
          <span className="text-[11px] text-slate-400">Registered users</span>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Platform Growth & Revenue Trajectory</h3>
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
