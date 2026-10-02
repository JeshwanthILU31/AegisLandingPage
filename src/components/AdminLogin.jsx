import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { jobService } from '../services/jobService';

export default function AdminLogin({ onLoginSuccess, onNavigateHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await jobService.login(username, password, remember);
      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setError(result.error || 'Invalid credentials. Please verify username and password.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased text-[#071525]">
      {/* Top back link */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#64748B] hover:text-[#071525] bg-[#FFFFFF] border border-[#E2E8F0] px-3.5 py-2 rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo / Emblem */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/aegis-data-services-logo.png"
            alt="AEGIS Data Services LLP"
            className="h-10 w-auto object-contain"
          />
        </div>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#071525] tracking-tight uppercase">
          ADMIN PORTAL
        </h2>
        <p className="mt-2 text-xs text-[#64748B]">
          Sign in to manage active careers and candidate postings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#FFFFFF] border border-[#E2E8F0] py-8 px-6 sm:px-10 rounded-2xl shadow-sm"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                Username
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] placeholder-[#94A3B8] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-[#071525] font-semibold mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded-lg text-sm text-[#071525] placeholder-[#94A3B8] focus:outline-none focus:border-[#00BFEF] focus:ring-1 focus:ring-[#00BFEF] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#00BFEF] focus:ring-[#00BFEF] w-4 h-4"
                />
                <span className="text-xs text-[#64748B]">Stay signed in</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#071525] hover:bg-[#00BFEF] text-[#FFFFFF] hover:text-[#06131D] font-display text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center text-[11px] font-mono text-[#94A3B8]">
            <span>SECURE OPERATIONAL GATEWAY · AEGIS DATA SERVICES</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
