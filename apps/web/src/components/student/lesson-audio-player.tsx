'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX, Headphones } from 'lucide-react';

interface LessonAudioPlayerProps {
  audioUrl?: string | null;
  audioDurationSeconds?: number | null;
  title: string;
  narrationText: string;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const;

function stripMarkdownForSpeech(input: string): string {
  return input
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/[#*_`>~\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatClock(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function LessonAudioPlayer({
  audioUrl,
  audioDurationSeconds,
  title,
  narrationText,
}: LessonAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(audioDurationSeconds ?? 0);

  const cleanNarration = useMemo(
    () => stripMarkdownForSpeech(`${title}. ${narrationText}`).slice(0, 1800),
    [title, narrationText],
  );

  useEffect(() => {
    setDuration(audioDurationSeconds ?? 0);
  }, [audioDurationSeconds]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore synthesis teardown errors
        }
      }
    };
  }, []);

  const toggleAudioFile = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlayingAudio) {
      el.pause();
      setIsPlayingAudio(false);
    } else {
      try {
        el.playbackRate = playbackRate;
        await el.play();
        setIsPlayingAudio(true);
      } catch {
        setIsPlayingAudio(false);
      }
    }
  };

  const toggleVoiceNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    synth.cancel();
    if (typeof SpeechSynthesisUtterance === 'undefined') {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanNarration || title);
    const voices = typeof synth.getVoices === 'function' ? synth.getVoices() : [];
    const banglaVoice = voices.find(
      (v) => v.lang?.toLowerCase().startsWith('bn'),
    );
    if (banglaVoice) {
      utterance.voice = banglaVoice;
      utterance.lang = banglaVoice.lang;
    } else {
      utterance.lang = 'bn-BD';
    }
    utterance.rate = playbackRate;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synth.speak(utterance);
  };

  return (
    <section className="rounded-2xl border border-indigo-200/80 bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/70 p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Headphones className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              অডিও লেসন ও ভয়েস পাঠ
            </h3>
            <p className="text-[11px] text-slate-500">
              {audioUrl
                ? 'রেকর্ডেড অডিও ক্লিপ অথবা ভয়েস রিডার চালু করে শুনুন'
                : 'ব্রাউজার ভয়েস রিডার দিয়ে পাঠের সারাংশ শুনুন'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {SPEED_OPTIONS.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setPlaybackRate(rate)}
              className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${
                playbackRate === rate
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {audioUrl && (
          <>
            <audio
              ref={audioRef}
              src={audioUrl}
              preload="metadata"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                if (Number.isFinite(e.currentTarget.duration) && e.currentTarget.duration > 0) {
                  setDuration(e.currentTarget.duration);
                }
              }}
              onEnded={() => setIsPlayingAudio(false)}
            />
            <button
              type="button"
              onClick={toggleAudioFile}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700"
            >
              {isPlayingAudio ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlayingAudio ? 'বিরতি' : 'অডিও চালাও'}</span>
            </button>

            <div className="flex flex-1 min-w-[140px] items-center gap-2 text-[11px] font-semibold text-slate-600">
              <span>{formatClock(currentTime)}</span>
              <input
                type="range"
                aria-label="অডিও অগ্রগতি"
                min={0}
                max={Math.max(1, duration)}
                value={Math.min(currentTime, Math.max(1, duration))}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setCurrentTime(next);
                  if (audioRef.current) {
                    audioRef.current.currentTime = next;
                  }
                }}
                className="flex-1 accent-indigo-600"
              />
              <span>{formatClock(duration)}</span>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={toggleVoiceNarration}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
            isSpeaking
              ? 'border-amber-400 bg-amber-50 text-amber-800'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          <span>{isSpeaking ? 'ভয়েস থামাও' : 'ভয়েস পাঠ শুরু'}</span>
        </button>
      </div>
    </section>
  );
}
