'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Mot de passe incorrect.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #08040f, #0f0620, #08040f)' }}
    >
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-8"
        style={{
          background: 'rgba(8, 4, 15, 0.9)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderTop: '2px solid rgba(139,92,246,0.55)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.04)',
        }}
      >
        <div className="text-center mb-8">
          <p className="text-xl font-bold tracking-wide" style={{
            background: 'linear-gradient(90deg, #ffffff, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Hugo Pronostique
          </p>
          <p className="text-sm mt-1" style={{ color: '#8b5cf6' }}>Panel Administrateur</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(139,92,246,0.25)',
            }}
          />
          {error && <p className="text-xs text-center" style={{ color: '#a78bfa' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 4px 20px rgba(139,92,246,0.35)' }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
