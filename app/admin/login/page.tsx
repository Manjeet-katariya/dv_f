'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMessage('');
    setLoading(true);

    try {
      console.log('Attempting login with:', email);
      await login(email, password);
      console.log('Login successful, redirecting...');
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.log('Login error caught:', err.message);
      const message = err.message || 'Invalid email or password';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border-b border-stone-300 bg-transparent text-[#1C1917] font-serif text-base py-3 focus:outline-none focus:border-stone-600 transition-colors placeholder:text-stone-450 rounded-none";

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-6 selection:bg-[#1C1917] selection:text-[#FAF9F5]">
      <div className="bg-white border border-stone-200 p-8 md:p-12 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative rounded-none">
        
        {/* Logo and Headings */}
        <div className="text-center mb-10">
          <div className="inline-block p-1 border border-stone-200 rounded-full mb-4">
            <img 
              src="/logo-dvl.png" 
              alt="DVL Architects" 
              className="h-14 w-14 object-cover rounded-full"
            />
          </div>
          <h1 className="font-serif font-bold text-2xl text-[#1C1917] tracking-tight">DVL Studio</h1>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.25em] mt-1.5">Administration Portal</p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 border border-red-500/20 bg-red-50 text-red-700 text-xs font-light flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.5} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@dvlarchitects.com"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className={inputClass}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-stone-400 hover:text-stone-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1917] text-[#FAF9F5] hover:bg-stone-800 py-4 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}