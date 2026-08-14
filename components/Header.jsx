'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROFILE_IMAGE, ASSISTANT_NAME } from '@/lib/config';

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header
        className="relative flex-shrink-0 flex items-center gap-3 px-4 py-3 z-20"
        style={{
          background: 'rgba(8, 4, 15, 0.97)',
          backdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(139,92,246,0.15)',
          boxShadow: '0 1px 0 rgba(139,92,246,0.12), 0 4px 30px rgba(0,0,0,0.7)',
        }}
      >
        {/* Liseré violet en haut */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(139,92,246,0.5) 30%, rgba(167,139,250,0.95) 50%, rgba(139,92,246,0.5) 70%, transparent 95%)' }}
        />

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={PROFILE_IMAGE}
            alt={ASSISTANT_NAME}
            className="avatar-ring w-11 h-11 rounded-full object-cover relative"
            style={{ border: '1.5px solid rgba(139,92,246,0.6)' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%2308040f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%238b5cf6' font-size='8' font-family='sans-serif' font-weight='bold'%3EHUGO%3C/text%3E%3C/svg%3E";
            }}
          />
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
            style={{ background: '#22c55e', border: '1.5px solid #08040f', boxShadow: '0 0 5px rgba(34,197,94,0.7)' }}
          />
        </div>

        {/* Nom + statut */}
        <div className="flex-1 min-w-0">
          <p
            className="font-bold text-sm truncate leading-tight tracking-wide"
            style={{
              background: 'linear-gradient(90deg, #ffffff, #8b5cf6, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {ASSISTANT_NAME}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e', boxShadow: '0 0 4px #22c55e' }} />
            <span className="text-[11px] font-medium" style={{ color: 'rgba(134,239,172,0.7)' }}>En ligne</span>
          </div>
        </div>

        {/* Badge */}
        <div
          className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#8b5cf6',
          }}
        >
          48CAH
        </div>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all ml-1"
          style={{
            background: menuOpen ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${menuOpen ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.07)'}`,
            color: menuOpen ? '#8b5cf6' : 'rgba(200,200,200,0.6)',
          }}
          aria-label="Menu"
        >
          {menuOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </header>

      {menuOpen && (
        <>
          <button
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setMenuOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
            aria-label="Fermer le menu"
            tabIndex={0}
          />
          <div
            className="absolute top-[68px] right-3 z-30 rounded-2xl overflow-hidden w-52"
            style={{
              background: 'rgba(8, 4, 15, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(139,92,246,0.15)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.1)',
            }}
          >
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }} />
            <div className="py-2">
              <button
                onClick={() => { setMenuOpen(false); router.push('/admin'); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all"
                style={{ color: 'rgba(209,213,219,0.8)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.color = '#8b5cf6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(209,213,219,0.8)'; }}
              >
                <span style={{ color: 'rgba(139,92,246,0.7)' }}><LockIcon /></span>
                <span>Connexion Admin</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
