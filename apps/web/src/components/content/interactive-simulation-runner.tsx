'use client';

import React, { useState } from 'react';
import {
  Zap,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { resolveMediaUrl } from './rich-content-renderer';

export interface InteractiveSimulationRunnerProps {
  widgetUrl?: string | null;
  title?: string;
  className?: string;
}

export const InteractiveSimulationRunner: React.FC<InteractiveSimulationRunnerProps> = ({
  widgetUrl,
  title = 'ইন্টারেক্টিভ ল্যাব সিমুলেশন',
  className = '',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  if (!widgetUrl || !widgetUrl.trim()) {
    return null;
  }

  const resolvedUrl = resolveMediaUrl(widgetUrl.trim());

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      className={`my-3.5 sm:my-5 rounded-xl sm:rounded-2xl border border-indigo-200/90 bg-slate-900 shadow-md overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 m-0 rounded-none h-screen flex flex-col'
          : `w-full ${className}`
      }`}
    >
      {/* Simulation Top Bar */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800/95 border-b border-slate-700/80 flex items-center justify-between gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider shrink-0">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <span>ল্যাব সিমুলেশন</span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-slate-200 truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleReload}
            aria-label="রিলোড করুন (Reset Simulation)"
            title="পুনরায় শুরু করুন"
            className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <a
            href={resolvedUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="নতুন ট্যাবে খুলুন"
            className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'স্ক্রীন ছোট করুন (Exit Fullscreen)' : 'পূর্ণস্ক্রীন (Fullscreen)'}
            title={isFullscreen ? 'পূর্ণস্ক্রীন বন্ধ' : 'পূর্ণস্ক্রীন'}
            className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Sandboxed Interactive Frame */}
      <div className={`w-full bg-slate-50 relative ${isFullscreen ? 'flex-1 h-full' : 'h-[620px] sm:h-[650px] md:h-[680px]'}`}>
        <iframe
          key={reloadKey}
          src={resolvedUrl}
          sandbox="allow-scripts allow-same-origin allow-downloads"
          loading="lazy"
          title={title}
          className="w-full h-full border-0 block"
        />
      </div>
    </div>
  );
};
