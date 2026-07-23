'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { authApi } from '@/lib/api';
import {
  clearStoredAuthHeader,
  getStoredAuthHeader,
  setStoredAuthHeader,
} from '@/lib/auth';

export function AdminLoginGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAuthed(!!getStoredAuthHeader());
    setChecked(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await authApi.verify(username, password);
      setStoredAuthHeader(username, password);
      setAuthed(true);
    } catch {
      setError('Invalid username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearStoredAuthHeader();
    setAuthed(false);
    setUsername('');
    setPassword('');
  };

  if (!checked) return null;

  if (!authed) {
    return (
      <main className="min-h-screen bg-surface px-8 py-16 max-w-sm mx-auto flex flex-col justify-center">
        <h1 className="font-headline text-2xl font-bold tracking-tighter text-primary mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
              Username
            </label>
            <input
              required
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body"
            />
          </div>
          <div>
            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border-b border-outline-variant py-3 focus:outline-none focus:border-primary transition-colors text-sm font-body"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-on-primary py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto px-8 pt-6 flex justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
        >
          Log Out
        </button>
      </div>
      {children}
    </>
  );
}
