'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatBubble from '@/components/ChatBubble';
import AudioMessage from '@/components/AudioMessage';
import PlatformsCard from '@/components/PlatformsCard';
import ChatInput from '@/components/ChatInput';
import { WELCOME_MESSAGE, AUDIO_URL } from '@/lib/config';
import { sendMessage } from '@/services/chatApi';

function getSessionId() {
  const key = 'hugo_pronostique_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { sessionIdRef.current = getSessionId(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  const handleSend = async (text) => {
    const currentHistory = history;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
    setIsLoading(true);
    try {
      const reply = await sendMessage(text, currentHistory.slice(-20), sessionIdRef.current);
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'assistant', text: reply }]);
      setHistory((prev) => [...prev, { role: 'user', content: text }, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'assistant', text: "Désolé, je n'ai pas pu répondre. Réessaie dans un instant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col h-screen max-w-md mx-auto overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #08040f 0%, #0f0620 50%, #08040f 100%)' }}
    >
      {/* Orbes violets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)' }}
        />
        <div
          className="orb-2 absolute top-1/2 -right-40 w-[420px] h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)' }}
        />
        <div
          className="orb-3 absolute -bottom-24 left-1/3 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)' }}
        />
      </div>

      <Header />

      <main className="relative flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-3">
        <div className="msg-in">
          <ChatBubble sender="assistant" text={WELCOME_MESSAGE} />
        </div>
        <div className="msg-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <AudioMessage src={AUDIO_URL} />
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="msg-in">
            <ChatBubble sender={msg.sender} text={msg.text} />
          </div>
        ))}

        {isLoading && (
          <ChatBubble sender="assistant">
            <span className="flex gap-1.5 items-center py-0.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: '#8b5cf6', animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
          </ChatBubble>
        )}

        <div ref={bottomRef} />
      </main>

      <div
        className="relative flex-shrink-0"
        style={{
          background: 'rgba(8,4,15,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 -4px 24px rgba(139,92,246,0.06)',
        }}
      >
        <PlatformsCard />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
