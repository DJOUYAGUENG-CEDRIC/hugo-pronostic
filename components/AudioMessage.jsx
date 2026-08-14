'use client';

import { useState, useRef, useEffect } from 'react';

const SPEEDS = [1, 1.5, 2];

function formatTime(sec) {
  if (!sec || isNaN(sec) || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function PlayIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><polygon points="5,3 19,12 5,21" /></svg>;
}
function PauseIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>;
}
function MicIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" /></svg>;
}

export default function AudioMessage({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIndex, setSpeedIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('durationchange', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('durationchange', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { try { await audio.play(); setIsPlaying(true); } catch {} }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const cycleSpeed = () => {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const trackBg = `linear-gradient(to right, #8b5cf6 ${progress}%, rgba(255,255,255,0.08) ${progress}%)`;

  return (
    <div className="flex justify-start">
      <div
        className="rounded-2xl rounded-tl-sm px-3 py-3 w-72"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139,92,246,0.12)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
        }}
      >
        <audio ref={audioRef} src={src} preload="metadata" />
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="rounded-full p-1 flex-shrink-0" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#8b5cf6' }}>
            <MicIcon />
          </div>
          <span className="text-[11px] font-medium" style={{ color: 'rgba(139,92,246,0.7)' }}>Message vocal</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 4px 14px rgba(139,92,246,0.4)', color: '#fff' }}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <input
              type="range" min="0" max="100" value={progress}
              onChange={handleSeek}
              className="audio-range w-full"
              style={{ background: trackBg }}
              aria-label="Position de lecture"
            />
            <div className="flex justify-between text-[11px] tabular-nums" style={{ color: 'rgba(139,92,246,0.5)' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <button
            onClick={cycleSpeed}
            className="flex-shrink-0 text-xs font-bold rounded-lg px-2 py-1 transition-colors min-w-[2.25rem] text-center"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6' }}
            aria-label="Vitesse de lecture"
          >
            {SPEEDS[speedIndex]}x
          </button>
        </div>
      </div>
    </div>
  );
}
