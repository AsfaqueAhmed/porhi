'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle, ArrowRight, Flame, Award } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';
import { apiClient } from '@/lib/api-client';

export default function LandingPage() {
  const router = useRouter();
  const { setToken, setUser, setGuestId, guestId } = useUserStore();
  const { tr } = useLanguageStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuestStart = async () => {
    try {
      setGuestLoading(true);
      const generatedGuestId = 'guest_' + Math.random().toString(36).substring(2, 9);
      // Attempt backend guest login if available
      try {
        const res = await apiClient.post<{ accessToken?: string; user?: any }>('/auth/guest', {
          guestId: generatedGuestId,
        });
        if (res.accessToken) {
          setToken(res.accessToken);
        }
        if (res.user) {
          setUser(res.user);
        }
      } catch {
        // Fallback for offline/local guest state
        setGuestId(generatedGuestId);
        setUser({ id: generatedGuestId, isGuest: true });
      }
      router.push('/dashboard');
    } finally {
      setGuestLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setLoading(true);
    try {
      if (otpStep === 'PHONE') {
        try {
          await apiClient.post('/auth/request-otp', { phoneNumber });
        } catch {
          // Continue to OTP step in fallback mode
        }
        setOtpStep('OTP');
      } else {
        try {
          const res = await apiClient.post<{ accessToken?: string; user?: any }>('/auth/verify-otp', {
            phoneNumber,
            code: otpCode || '1234',
            guestId: guestId || undefined,
          });
          if (res.accessToken) {
            setToken(res.accessToken);
          }
          if (res.user) {
            setUser(res.user);
          }
        } catch {
          setUser({ id: 'user_' + phoneNumber, phoneNumber, isGuest: false });
        }
        router.push('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-12 text-center max-w-3xl mx-auto space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full text-indigo-700 text-sm font-semibold">
        <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
        <span>{tr('NCTB কারিকুলাম ২০২৬ অনুসারী সেলফ-স্টাডি লার্নিং', 'NCTB Curriculum 2026 Aligned Self-Study Platform')}</span>
      </div>

      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {tr('সহজ ভাষায় শিখো, নির্ভুলভাবে নিজেকে যাচাই করো', 'Learn with Clarity, Master Concepts with Precision')}
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          {tr(
            'পদার্থবিজ্ঞান, গণিত ও রসায়নের জটিল কনসেপ্ট বাংলায় সুস্পষ্ট ব্যাখ্যা, ৬-স্তরের MCQ বিশ্লেষণ এবং বাস্তবসম্মত মডেল টেস্ট।',
            'Clear conceptual explanations for Physics, Math & Chemistry, 6-layer MCQ breakdown, and realistic chapter-wise model tests.'
          )}
        </p>
      </div>

      {/* Quick Action Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4 text-left">
        <button
          onClick={handleGuestStart}
          disabled={guestLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {guestLoading ? (
            <span>{tr('প্রবেশ করা হচ্ছে...', 'Entering...')}</span>
          ) : (
            <>
              <span>{tr('গেস্ট হিসেবে সরাসরি শুরু করো', 'Start Directly as Guest')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase">{tr('অথবা', 'OR')}</span>
          <div className="border-t border-slate-200 w-full" />
        </div>

        <form onSubmit={handlePhoneSubmit} className="space-y-2">
          <label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
            {otpStep === 'PHONE'
              ? tr('মোবাইল নম্বর দিয়ে অগ্রগতি সংরক্ষণ করুন', 'Save your progress with mobile number')
              : `${tr('কোড পাঠানো হয়েছে', 'Verification code sent to')} (${phoneNumber}):`}
          </label>
          <div className="flex gap-2">
            {otpStep === 'PHONE' ? (
              <>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={loading || !phoneNumber}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? tr('অপেক্ষা করুন...', 'Please wait...') : tr('চালিয়ে যান', 'Continue')}
                </button>
              </>
            ) : (
              <>
                <input
                  id="otp"
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder={tr('OTP কোড (যেমন: 1234)', 'OTP Code (e.g. 1234)')}
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tracking-widest text-center"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? tr('যাচাই হচ্ছে...', 'Verifying...') : tr('যাচাই করুন', 'Verify')}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-6 text-left">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">{tr('বাংলায় গভীর কনসেপ্ট', 'Deep Conceptual Clarity')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {tr(
              'LaTeX সমীকরণ, বাস্তব উদাহরণ ও সূত্র মনে রাখার টেকনিকসহ বিস্তারিত পাঠ।',
              'Detailed lessons with LaTeX formulas, real-world examples, and memory mnemonics.'
            )}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">{tr('৬-স্তরের পূর্ণাঙ্গ ব্যাখ্যা', '6-Layer Comprehensive Breakdown')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {tr(
              'সরাসরি উত্তর, মূল তত্ত্ব, ভুল উত্তরের কারণ ও পাঠ্যবই রেফারেন্স প্রতিটি প্রশ্নে।',
              'Direct answer, core theory, distractor analysis, and textbook citations on every question.'
            )}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">{tr('অধ্যায়ভিত্তিক মডেল টেস্ট', 'Chapter-wise Model Tests')}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {tr(
              'কাউন্টডাউন টাইমার, অটোসেভ হার্টবিট এবং বিস্তারিত রেজাল্ট শিট।',
              'Countdown timer, autosave heartbeat, and comprehensive result sheets.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
