'use client';

import { useState } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
  };

  const active = value.trim() && !disabled;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2.5 px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Écrivez votre message..."
        disabled={disabled}
        className="flex-1 text-white rounded-full px-4 py-2.5 text-sm focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          border: focused ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(139,92,246,0.15)',
          boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.1), 0 2px 12px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.3)',
        }}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!active}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: active ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'rgba(255,255,255,0.05)',
          border: active ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: active ? '0 4px 20px rgba(139,92,246,0.4)' : 'none',
          color: active ? '#fff' : '#374151',
          transform: active ? 'scale(1)' : 'scale(0.95)',
        }}
        aria-label="Envoyer"
      >
        <SendIcon />
      </button>
    </form>
  );
}
