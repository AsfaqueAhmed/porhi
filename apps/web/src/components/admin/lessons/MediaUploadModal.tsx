'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Volume2,
  Video as VideoIcon,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type { MediaCategory, MediaUploadResponse } from '@pori/shared';
import { apiClient } from '@/lib/api-client';
import { resolveMediaUrl } from '@/components/content/rich-content-renderer';

export interface MediaUploadModalProps {
  isOpen: boolean;
  initialCategory?: MediaCategory;
  onClose: () => void;
  onInsertTag?: (tagString: string) => void;
  onSelectSimulation?: (url: string) => void;
}

interface CategoryConfig {
  key: MediaCategory;
  label: string;
  accept: string;
  maxSize: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'IMAGE',
    label: 'ছবি (Image)',
    accept: 'image/png,image/jpeg,image/webp,image/svg+xml',
    maxSize: 'সর্বোচ্চ 10MB',
    icon: ImageIcon,
    hint: 'PNG, JPEG, WebP বা SVG ডায়াগ্রাম ও চিত্র',
  },
  {
    key: 'AUDIO',
    label: 'অডিও (Audio)',
    accept: 'audio/mpeg,audio/wav,audio/ogg,audio/mp4',
    maxSize: 'সর্বোচ্চ 25MB',
    icon: Volume2,
    hint: 'MP3, WAV বা OGG সাউন্ড কম্পাঙ্ক ও অডিও নোট',
  },
  {
    key: 'VIDEO',
    label: 'ভিডিও (Video)',
    accept: 'video/mp4,video/webm',
    maxSize: 'সর্বোচ্চ 100MB',
    icon: VideoIcon,
    hint: 'MP4 বা WebM অ্যানিমেশন ও ভিডিও লেকচার',
  },
  {
    key: 'INTERACTIVE',
    label: 'সিমুলেশন (Interactive)',
    accept: '.zip,.html,text/html,application/zip,application/x-zip-compressed',
    maxSize: 'সর্বোচ্চ 15MB',
    icon: Sparkles,
    hint: 'একক HTML ফাইল বা index.html সহ জিপ আর্কাইভ',
  },
];

export function MediaUploadModal({
  isOpen,
  initialCategory = 'IMAGE',
  onClose,
  onInsertTag,
  onSelectSimulation,
}: MediaUploadModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>(initialCategory);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<MediaUploadResponse | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
      setTitle('');
      setError(null);
      setUploadResult(null);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const currentConfig =
    CATEGORIES.find((c) => c.key === selectedCategory) || CATEGORIES[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', selectedCategory);

      const res = await apiClient.post<MediaUploadResponse>(
        '/admin/media/upload',
        formData,
        { scope: 'admin' },
      );

      setUploadResult(res);
      if (!title) {
        // Strip extension as default title
        const base = file.name.replace(/\.[^/.]+$/, '');
        setTitle(base);
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string; error?: string };
      setError(
        errorObj?.message ||
          errorObj?.error ||
          'ফাইল আপলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsert = () => {
    if (!uploadResult) return;

    const trimmedTitle = title.trim() || uploadResult.originalName;

    if (uploadResult.category === 'IMAGE') {
      const tag = `![${trimmedTitle}](${uploadResult.url})`;
      onInsertTag?.(tag);
      onClose();
    } else if (uploadResult.category === 'AUDIO') {
      const tag = `<audio controls src="${uploadResult.url}" title="${trimmedTitle}"></audio>`;
      onInsertTag?.(tag);
      onClose();
    } else if (uploadResult.category === 'VIDEO') {
      const tag = `<video controls src="${uploadResult.url}" title="${trimmedTitle}"></video>`;
      onInsertTag?.(tag);
      onClose();
    } else if (uploadResult.category === 'INTERACTIVE') {
      // Can be set as interactive simulation or inserted as tag
      if (onSelectSimulation) {
        onSelectSimulation(uploadResult.url);
      } else if (onInsertTag) {
        onInsertTag(`<iframe src="${uploadResult.url}" title="${trimmedTitle}"></iframe>`);
      }
      onClose();
    }
  };

  const handleSelectSimOnly = () => {
    if (!uploadResult || !onSelectSimulation) return;
    onSelectSimulation(uploadResult.url);
    onClose();
  };

  const resolvedPreviewUrl = uploadResult ? resolveMediaUrl(uploadResult.url) : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 id="modal-title" className="text-sm font-bold text-slate-900">
              মিডিয়া ও সিমুলেশন আপলোড (Media Asset Uploader)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              লেসনের মূল ব্যাখ্যা বা ইন্টার‍্যাক্টিভ সিমুলেশন স্লটে ব্যবহারের জন্য ফাইল যুক্ত করুন
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.key === selectedCategory;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setUploadResult(null);
                  setError(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all shrink-0 ${
                  isSelected
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* File Dropzone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl p-6 text-center bg-slate-50/50 transition-colors relative">
            <input
              type="file"
              data-testid="media-file-input"
              accept={currentConfig.accept}
              disabled={isUploading}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-slate-400" />
              )}
              <div className="text-xs font-semibold text-slate-700">
                {isUploading ? 'ফাইল আপলোড হচ্ছে...' : 'কম্পিউটার থেকে ফাইল নির্বাচন করুন বা এখানে ড্রপ করুন'}
              </div>
              <div className="text-[11px] text-slate-500">
                {currentConfig.hint} • {currentConfig.maxSize}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Upload Success Preview */}
          {uploadResult && (
            <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ফাইল সফলভাবে আপলোড হয়েছে: {uploadResult.originalName}</span>
              </div>

              {/* Title / Caption */}
              <div>
                <label
                  htmlFor="media-asset-title"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  অ্যাসেটের শিরোনাম বা ক্যাপশন (Title / Caption)
                </label>
                <input
                  id="media-asset-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: কম কম্পাঙ্কের শব্দ তরঙ্গ - ১০০ Hz"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* In-Modal Previews */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 block">প্রিভিউ:</span>
                {uploadResult.category === 'IMAGE' && (
                  <div className="flex justify-center bg-white p-2 rounded-lg border border-slate-200">
                    <img
                      data-testid="modal-image-preview"
                      src={resolvedPreviewUrl}
                      alt={title || uploadResult.originalName}
                      className="max-h-48 object-contain rounded"
                    />
                  </div>
                )}
                {uploadResult.category === 'AUDIO' && (
                  <div data-testid="modal-audio-preview" className="bg-white p-3 rounded-lg border border-slate-200">
                    <audio controls src={resolvedPreviewUrl} className="w-full" />
                  </div>
                )}
                {uploadResult.category === 'VIDEO' && (
                  <div data-testid="modal-video-preview" className="bg-black rounded-lg overflow-hidden">
                    <video controls src={resolvedPreviewUrl} className="w-full max-h-48" />
                  </div>
                )}
                {uploadResult.category === 'INTERACTIVE' && (
                  <div
                    data-testid="modal-interactive-preview"
                    className="border border-slate-200 rounded-lg overflow-hidden bg-white"
                  >
                    <iframe
                      src={resolvedPreviewUrl}
                      title={title || 'সিমুলেশন প্রিভিউ'}
                      sandbox="allow-scripts allow-same-origin allow-downloads"
                      className="w-full h-44"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-xl transition-colors"
          >
            বাতিল
          </button>

          {uploadResult && uploadResult.category === 'INTERACTIVE' && onSelectSimulation && (
            <button
              type="button"
              onClick={handleSelectSimOnly}
              className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors"
            >
              লেসনের সিমুলেশন হিসেবে সেট করুন
            </button>
          )}

          {uploadResult && (
            <button
              type="button"
              onClick={handleInsert}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
            >
              {uploadResult.category === 'INTERACTIVE' && onSelectSimulation
                ? 'সিমুলেশন স্লটে যুক্ত করুন'
                : 'লেসনে যুক্ত করুন'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
