import React, { useState } from 'react';
import { Lock, User, ArrowLeft, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPortfolio }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Hardcoded credentials for Akshay's admin panel
    const validUsers = ['admin', 'akshay', 'akshaylinson24@gmail.com'];
    const validPass = ['admin123', 'akshay2025', 'password123'];

    setTimeout(() => {
      if (validUsers.includes(cleanUser) && validPass.includes(cleanPass)) {
        sessionStorage.setItem('portfolio_admin_auth', 'true');
        onSuccess();
      } else {
        setError('Invalid username or password. Please check the credential hints below.');
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          id="admin-login-back-btn"
          type="button"
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400" />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 id="admin-login-title" className="text-2xl font-bold text-white tracking-tight">
              Portfolio Admin Portal
            </h1>
            <p className="text-slate-400 text-xs">
              Manage portfolio contents, projects, credentials & JSON configuration.
            </p>
          </div>

          {error && (
            <div
              id="admin-login-error"
              className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs font-mono text-slate-300 mb-1.5"
              >
                Admin Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or akshaylinson24@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono text-slate-300 mb-1.5"
              >
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm transition-colors"
                />
              </div>
            </div>

            <button
              id="admin-submit-login-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md shadow-teal-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Hardcoded Credentials Hint Card */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-teal-400 flex items-center gap-1.5 font-semibold">
                  <KeyRound className="w-3.5 h-3.5" /> Hardcoded Access Credentials
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] text-teal-400 hover:underline hover:text-teal-300"
                >
                  Auto-fill
                </button>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <div>Username: <span className="text-teal-300">admin</span></div>
                <div>Password: <span className="text-teal-300">admin123</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
