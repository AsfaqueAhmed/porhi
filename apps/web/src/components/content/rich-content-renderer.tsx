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
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Bookmark,
} from 'lucide-react';
import { LatexRenderer } from '@/components/math/latex-renderer';

export function resolveMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (typeof window !== 'undefined' && window.location?.hostname) {
      try {
        const parsed = new URL(url);
        if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
          parsed.hostname = window.location.hostname;
          return parsed.toString();
        }
      } catch {
        // Fallback
      }
    }
    return url;
  }
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  if (typeof window !== 'undefined' && window.location?.hostname) {
    try {
      const parsed = new URL(baseUrl);
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        parsed.hostname = window.location.hostname;
        baseUrl = parsed.origin;
      }
    } catch {
      // Fallback
    }
  }
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

export type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'divider' }
  | { type: 'blockquote'; text: string }
  | { type: 'unordered_list'; items: string[] }
  | { type: 'ordered_list'; items: { num: string; text: string }[] }
  | { type: 'math_block'; math: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'paragraph'; text: string };

export function parseMarkdownBlocks(raw: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Display math $$...$$
    if (line.trim().startsWith('$$')) {
      const trimmed = line.trim();
      if (trimmed.length > 2 && trimmed.endsWith('$$') && trimmed.indexOf('$$', 2) !== -1) {
        blocks.push({ type: 'math_block', math: trimmed.slice(2, -2).trim() });
        i++;
        continue;
      }

      let mathContent = trimmed.slice(2);
      i++;
      while (i < lines.length && !lines[i].includes('$$')) {
        mathContent += '\n' + lines[i];
        i++;
      }
      if (i < lines.length) {
        mathContent += '\n' + lines[i].replace('$$', '');
        i++;
      }
      blocks.push({ type: 'math_block', math: mathContent.trim() });
      continue;
    }

    // Dividers: --- or *** or ___
    if (/^(\s*[-*_]\s*){3,}$/.test(line)) {
      blocks.push({ type: 'divider' });
      i++;
      continue;
    }

    // Headings: #, ##, ###, ####
    const hMatch = /^(#{1,4})\s+(.+)$/.exec(line);
    if (hMatch) {
      blocks.push({
        type: 'heading',
        level: hMatch[1].length,
        text: hMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Blockquote: > lines
    if (line.trim().startsWith('>')) {
      const qLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        qLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', text: qLines.join('\n') });
      continue;
    }

    // Unordered list: - or *
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim());
        i++;
      }
      blocks.push({ type: 'unordered_list', items });
      continue;
    }

    // Ordered list: 1. or ১.
    const oMatch = /^\s*(\d+|[০-৯]+)\.\s+(.*)$/.exec(line);
    if (oMatch) {
      const items: { num: string; text: string }[] = [];
      while (i < lines.length) {
        const itemMatch = /^\s*(\d+|[০-৯]+)\.\s+(.*)$/.exec(lines[i]);
        if (!itemMatch) break;
        items.push({ num: itemMatch[1], text: itemMatch[2].trim() });
        i++;
      }
      blocks.push({ type: 'ordered_list', items });
      continue;
    }

    // Table: lines with pipes | col1 | col2 |
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const splitRow = (r: string) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim());
        const headers = splitRow(tableLines[0]);
        // Filter out separator row like |--|--|
        const rawRows = tableLines.slice(1).filter((r) => !/^\|[\s\-:|]+\|$/.test(r));
        const rows = rawRows.map(splitRow);
        blocks.push({ type: 'table', headers, rows });
        continue;
      }
    }

    // Paragraph: collect lines until empty or next block syntax
    const pLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i];
      if (!cur.trim()) break;
      if (
        cur.trim().startsWith('$$') ||
        /^(\s*[-*_]\s*){3,}$/.test(cur) ||
        /^(#{1,4})\s+/.test(cur) ||
        cur.trim().startsWith('>') ||
        /^\s*[-*]\s+/.test(cur) ||
        /^\s*(\d+|[০-৯]+)\.\s+/.test(cur) ||
        (cur.trim().startsWith('|') && cur.trim().endsWith('|'))
      ) {
        break;
      }
      pLines.push(cur.trim());
      i++;
    }
    if (pLines.length > 0) {
      blocks.push({ type: 'paragraph', text: pLines.join(' ') });
    }
  }

  return blocks;
}

export const MarkdownBlockView: React.FC<{ block: MarkdownBlock }> = ({ block }) => {
  if (block.type === 'heading') {
    if (block.level === 1) {
      return (
        <div className="pt-1 sm:pt-2 pb-2 my-3 sm:my-4 border-b-2 border-indigo-100">
          <div className="flex items-center gap-1.5 text-indigo-600 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>মূল বিষয়বস্তু</span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            <LatexRenderer content={block.text} />
          </h1>
        </div>
      );
    }
    if (block.level === 2) {
      return (
        <div className="pt-2 sm:pt-3 pb-1.5 my-2.5 sm:my-3.5 border-b border-slate-200">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-snug">
            <LatexRenderer content={block.text} />
          </h2>
        </div>
      );
    }
    if (block.level === 3) {
      return (
        <div className="my-2 sm:my-3 pt-1 sm:pt-2">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-3.5 sm:h-4 rounded-full bg-indigo-600 shrink-0" />
            <span>
              <LatexRenderer content={block.text} />
            </span>
          </h3>
        </div>
      );
    }
    return (
      <h4 className="text-xs sm:text-sm md:text-base font-bold text-slate-800 my-1.5 sm:my-2">
        <LatexRenderer content={block.text} />
      </h4>
    );
  }

  if (block.type === 'divider') {
    return (
      <div className="my-3.5 sm:my-6 flex items-center gap-2 sm:gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    );
  }

  if (block.type === 'blockquote') {
    const isDefinition =
      block.text.includes('**সংজ্ঞা:**') ||
      block.text.includes('সংজ্ঞা:') ||
      block.text.toLowerCase().includes('definition');
    const isTip =
      block.text.includes('**মনে রাখবে:**') ||
      block.text.includes('**টিপস:**') ||
      block.text.toLowerCase().includes('tip');
    const isWarning =
      block.text.includes('**সতর্কতা:**') || block.text.toLowerCase().includes('warning');

    if (isDefinition) {
      return (
        <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-50/90 via-indigo-50/40 to-white border-l-4 border-l-indigo-600 border border-indigo-200/80 shadow-2xs">
          <div className="flex items-start gap-2 sm:gap-2.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed flex-1">
              <LatexRenderer content={block.text} />
            </div>
          </div>
        </div>
      );
    }

    if (isTip) {
      return (
        <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/80 border-l-4 border-l-amber-500 border border-amber-200/80 shadow-2xs">
          <div className="flex items-start gap-2 sm:gap-2.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-amber-950 leading-relaxed flex-1">
              <LatexRenderer content={block.text} />
            </div>
          </div>
        </div>
      );
    }

    if (isWarning) {
      return (
        <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-50/80 border-l-4 border-l-rose-500 border border-rose-200/80 shadow-2xs">
          <div className="flex items-start gap-2 sm:gap-2.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-rose-950 leading-relaxed flex-1">
              <LatexRenderer content={block.text} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/90 border-l-4 border-l-slate-400 border border-slate-200/80 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
        <LatexRenderer content={block.text} />
      </div>
    );
  }

  if (block.type === 'unordered_list') {
    return (
      <ul className="my-2.5 sm:my-3.5 space-y-2 sm:space-y-2.5 pl-0 sm:pl-1">
        {block.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500 mt-1.5 sm:mt-2 shrink-0 ring-3 sm:ring-4 ring-indigo-50" />
            <div className="flex-1 min-w-0">
              <LatexRenderer content={item} />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'ordered_list') {
    return (
      <ol className="my-2.5 sm:my-3.5 space-y-2 sm:space-y-2.5 pl-0 sm:pl-1">
        {block.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
            <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] sm:min-w-[22px] sm:h-[22px] px-1 rounded-md sm:rounded-lg bg-indigo-100/90 text-indigo-700 font-bold text-[11px] sm:text-xs shrink-0 mt-0.5 border border-indigo-200/80 shadow-2xs">
              {item.num}
            </span>
            <div className="flex-1 min-w-0">
              <LatexRenderer content={item.text} />
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === 'math_block') {
    return (
      <div className="my-3 sm:my-4 p-2 sm:p-3 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/80 overflow-x-auto text-center shadow-2xs">
        <LatexRenderer content={`$$${block.math}$$`} />
      </div>
    );
  }

  if (block.type === 'table') {
    return (
      <div className="my-3 sm:my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
        <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
          <thead className="bg-slate-100/80">
            <tr>
              {block.headers.map((h, idx) => (
                <th key={idx} className="px-3 sm:px-4 py-2 sm:py-2.5 text-left font-bold text-slate-800">
                  <LatexRenderer content={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {block.rows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/50' : ''}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-3 sm:px-4 py-2 text-slate-700">
                    <LatexRenderer content={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Paragraph
  return (
    <p className="my-2 sm:my-3 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
      <LatexRenderer content={block.text} />
    </p>
  );
};

export type ContentToken =
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

        const blocks = parseMarkdownBlocks(token.text);
        return (
          <div key={idx} className="space-y-1">
            {blocks.map((block, bIdx) => (
              <MarkdownBlockView key={bIdx} block={block} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
