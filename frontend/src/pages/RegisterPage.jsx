import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, User, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUser = { id: 2, fullName, email, role: 'ROLE_USER' };
    login(mockUser, 'mock-jwt-token');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center mx-auto text-white">
            <Activity className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-slate-400 text-xs">Join thousands of patients comparing and saving on healthcare</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold">Full Name</label>
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
              <User className="w-4 h-4 text-slate-500" />
              <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold">Email Address</label>
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
              <Mail className="w-4 h-4 text-slate-500" />
              <input type="email" placeholder="patient@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-semibold">Password</label>
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-800">
              <Lock className="w-4 h-4 text-slate-500" />
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> Register Patient Profile
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account? <Link to="/login" className="text-brand-400 font-bold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}
