'use client';

import React, { useRef, useState } from 'react';
import {
  Volume2,
  Play,
  Pause,
  Film,
  Maximize2,
  X,
  RotateCcw,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';

export function resolveMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

interface AudioCardProps {
  src: string;
  title?: string;
}

export const AudioCard: React.FC<AudioCardProps> = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="my-3.5 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/70 border border-indigo-200/90 shadow-2xs">
      <audio
        ref={audioRef}
        src={resolveMediaUrl(src)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800 truncate">
            {title || 'অডিও সাউন্ড ক্লিপ'}
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-100/70 text-indigo-700 shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'শব্দ থামান (Pause)' : 'শব্দ শুনুন (Play)'}
          className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={restart}
          aria-label="পুনরায় শুরু"
          title="পুনরায় শুরু"
          className="w-8 h-8 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center shrink-0 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
      </div>
    </div>
  );
};

interface VideoCardProps {
  src: string;
  title?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ src, title }) => {
  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs">
      {title && (
        <div className="px-4 py-2 bg-slate-800/90 border-b border-slate-700/80 flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-bold text-slate-200 truncate">{title}</span>
        </div>
      )}
      <div className="aspect-video w-full flex items-center justify-center bg-black">
        <video
          controls
          src={resolveMediaUrl(src)}
          className="w-full h-full object-contain"
          preload="metadata"
        />
      </div>
    </div>
  );
};

interface ImageWithLightboxProps {
  src: string;
  alt: string;
}

export const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure className="my-4 text-center">
        <div className="relative inline-block group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(src)}
            alt={alt}
            onClick={() => setIsOpen(true)}
            className="max-h-80 mx-auto rounded-xl border border-slate-200 shadow-2xs cursor-zoom-in transition-transform duration-200 group-hover:scale-[1.01]"
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="জুম করুন"
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
        {alt && <figcaption className="mt-1.5 text-xs text-slate-500 font-medium">{alt}</figcaption>}
      </figure>

      {isOpen && (
        <div
          role="dialog"
          aria-label="ইমেজ লাইটবক্স"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="জুম বন্ধ করুন (Close Lightbox)"
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(src)}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

type ContentToken =
  | { type: 'text'; text: string }
  | { type: 'audio'; src: string; title: string }
  | { type: 'video'; src: string; title: string }
  | { type: 'image'; src: string; alt: string };

export function parseTagAttributes(tagStr: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRegex = /([a-zA-Z0-9_-]+)=["']([^"']*)["']/g;
  let match: RegExpExecArray | null;
  while ((match = attrRegex.exec(tagStr)) !== null) {
    attrs[match[1].toLowerCase()] = match[2];
  }
  return attrs;
}

export function parseRichTokens(raw: string): ContentToken[] {
  const tokens: ContentToken[] = [];
  const pattern =
    /<audio\b[^>]*>(?:.*?<\/audio>)?|<video\b[^>]*>(?:.*?<\/video>)?|!\[([^\]]*)\]\(([^)]+)\)/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'text',
        text: raw.slice(lastIndex, match.index),
      });
    }

    const fullMatch = match[0];
    if (fullMatch.toLowerCase().startsWith('<audio')) {
      const attrs = parseTagAttributes(fullMatch);
      tokens.push({
        type: 'audio',
        src: attrs.src || '',
        title: attrs.title || '',
      });
    } else if (fullMatch.toLowerCase().startsWith('<video')) {
      const attrs = parseTagAttributes(fullMatch);
      tokens.push({
        type: 'video',
        src: attrs.src || '',
        title: attrs.title || '',
      });
    } else if (fullMatch.startsWith('![')) {
      tokens.push({
        type: 'image',
        alt: match[1] || '',
        src: match[2] || '',
      });
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < raw.length) {
    tokens.push({
      type: 'text',
      text: raw.slice(lastIndex),
    });
  }

  return tokens;
}

export interface RichContentRendererProps {
  content?: string | null;
  className?: string;
}

export const RichContentRenderer: React.FC<RichContentRendererProps> = ({
  content,
  className,
}) => {
  if (!content) return null;

  const tokens = parseRichTokens(content);

  return (
    <div className={className}>
      {tokens.map((token, idx) => {
        if (token.type === 'audio') {
          return <AudioCard key={idx} src={token.src} title={token.title} />;
        }
        if (token.type === 'video') {
          return <VideoCard key={idx} src={token.src} title={token.title} />;
        }
        if (token.type === 'image') {
          return <ImageWithLightbox key={idx} src={token.src} alt={token.alt} />;
        }
        return <LatexRenderer key={idx} content={token.text} />;
      })}
    </div>
  );
};
