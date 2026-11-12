'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ShieldCheck,
  Smartphone,
  BookOpen,
  FileWarning,
  LogOut,
  CheckCircle2,
  ArrowRight,
  Save,
  Sparkles,
} from 'lucide-react';
import { PersistentNav } from '@/components/navigation/persistent-nav';
import { LanguageToggle } from '@/components/navigation/LanguageToggle';
import { apiClient } from '@/lib/api-client';
import { ensureGuestSession } from '@/lib/guest-session';
import { useUserStore, ReportedIssueItem } from '@/store/user-store';
import { useLanguageStore } from '@/store/language-store';

export default function AccountPage() {
  const router = useRouter();
  const {
    user,
    token,
    guestId,
    activeSubject,
    reportedIssues,
    setUser,
    setToken,
    setGuestId,
    hydrateFromServerOverview,
    logout,
  } = useUserStore();
  const { tr, language } = useLanguageStore();

  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [selectedClass, setSelectedClass] = useState<'SSC' | 'HSC'>(
    user?.selectedClass === 'HSC' ? 'HSC' : 'SSC',
  );
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [serverReports, setServerReports] = useState<ReportedIssueItem[]>([]);

  useEffect(() => {
    setFullName(user?.fullName || '');
    setSelectedClass(user?.selectedClass === 'HSC' ? 'HSC' : 'SSC');
  }, [user?.fullName, user?.selectedClass]);

  useEffect(() => {
    if (!token) return;
    Promise.resolve(apiClient.get<ReportedIssueItem[]>('/content-reports/mine'))
      .then((rows) => {
        if (Array.isArray(rows)) {
          setServerReports(rows);
        }
      })
      .catch(() => {});
  }, [token]);

  const isGuestAccount = !user || user.isGuest !== false || !user.phoneNumber;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setOtpLoading(true);
    setOtpError(null);
    setOtpMessage(null);
    try {
      await apiClient.post('/auth/request-otp', { phoneNumber: phoneNumber.trim() });
      setOtpStep('OTP');
      setOtpMessage(
        tr(
          'তোমার মোবাইলে OTP পাঠানো হয়েছে (টেস্ট মোডে ১২৩৪ ব্যবহার করো)।',
          'OTP sent to your phone (use 1234 in test mode).',
        ),
      );
    } catch (err: any) {
      setOtpError(err?.message || tr('সঠিক ১১ সংখ্যার মোবাইল নম্বর দাও।', 'Enter a valid 11-digit mobile number.'));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setOtpLoading(true);
    setOtpError(null);
    try {
      const currentGuestId = guestId || user?.guestId || undefined;
      const res = await apiClient.post<{
        accessToken?: string;
        user?: any;
        progressMigrated?: boolean;
      }>('/auth/verify-otp', {
        phoneNumber: phoneNumber.trim(),
        code: (otpCode || '1234').trim(),
        guestId: currentGuestId,
      });

      if (res?.accessToken) {
        setToken(res.accessToken);
      }
      if (res?.user) {
        setUser({ ...res.user, isGuest: false });
      }
      if (res?.progressMigrated) {
        setGuestId(null);
      }

      try {
        const subjectId = activeSubject?.id || 'sub_ssc_physics';
        const overview = await apiClient.get<any>(`/student/overview?subjectId=${encodeURIComponent(subjectId)}`);
        if (overview) {
          hydrateFromServerOverview(overview);
        }
      } catch {
        // Offline safe
      }

      setOtpStep('PHONE');
      setOtpCode('');
      setOtpMessage(
        res?.progressMigrated
          ? tr(
              'অ্যাকাউন্ট ভেরিফাই হয়েছে এবং তোমার সকল অগ্রগতি ও নোট সুরক্ষিতভাবে যুক্ত হয়েছে!',
              'Account verified and all guest progress & notes migrated!',
            )
          : tr('অ্যাকাউন্ট সফলভাবে ভেরিফাই হয়েছে!', 'Account verified successfully!'),
      );
    } catch (err: any) {
      setOtpError(err?.message || tr('OTP সঠিক নয়। আবার চেষ্টা করো।', 'Invalid OTP code.'));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage(null);
    try {
      await ensureGuestSession();
      const updated = await apiClient.patch<any>('/auth/profile', {
        fullName: fullName.trim(),
        selectedClass,
      });
      if (updated) {
        setUser({
          ...user,
          ...updated,
          isGuest: updated.isGuest ?? isGuestAccount,
        });
      }
      setProfileMessage(tr('প্রোফাইল তথ্য সংরক্ষিত হয়েছে।', 'Profile settings saved.'));
    } catch {
      setUser({
        id: user?.id || guestId || 'guest_local',
        ...user,
        fullName: fullName.trim() || null,
        selectedClass,
        isGuest: isGuestAccount,
      });
      setProfileMessage(tr('প্রোফাইল লোকালভাবে আপডেট হয়েছে।', 'Profile updated locally.'));
    } finally {
      setProfileSaving(false);
    }
  };

  const mergedReports = React.useMemo(() => {
    const map = new Map<string, ReportedIssueItem>();
    for (const r of serverReports) {
      map.set(r.id, r);
    }
    for (const r of reportedIssues) {
      if (!map.has(r.id)) {
        map.set(r.id, r);
      }
    }
    return Array.from(map.values());
  }, [serverReports, reportedIssues]);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'IN_REVIEW':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'DISMISSED':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <PersistentNav currentPath="/account" />

      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Identity Header Card */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">
                  {user?.fullName || tr('শিক্ষার্থী প্রোফাইল', 'Student Profile')}
                </h1>
                {isGuestAccount ? (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {tr('অতিথি সেশন (Guest)', 'Guest Session')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {tr('ভেরিফাইড অ্যাকাউন্ট', 'Verified Account')}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {user?.phoneNumber
                  ? `${tr('মোবাইল:', 'Phone:')} ${user.phoneNumber}`
                  : guestId
                    ? `${tr('গেস্ট আইডি:', 'Guest ID:')} ${guestId}`
                    : tr('অতিথি মোডে শেখা চলছে', 'Learning in guest mode')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </section>

        {/* Guest -> Phone OTP Upgrade Card */}
        {isGuestAccount && (
          <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50/40 rounded-2xl border border-indigo-200 shadow-xs p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  {tr(
                    'ফোন নম্বর যুক্ত করে অগ্রগতি ও বুকমার্ক নিরাপদ রাখো',
                    'Link Your Phone Number to Sync Progress & Bookmarks',
                  )}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {tr(
                    'অন্য ডিভাইস থেকে লগইন করলেও তোমার সকল সম্পন্ন পাঠ, ভুলের নোট এবং মডেল টেস্টের ফলাফল হারিয়ে যাবে না।',
                    'Keep completed lessons, notes, mistakes, and exam results synced across all your devices.',
                  )}
                </p>
              </div>
            </div>

            {otpStep === 'PHONE' ? (
              <form onSubmit={handleRequestOtp} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  <span>{tr('OTP পাঠান', 'Send OTP')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder={language === 'en' ? 'Enter OTP (e.g. 1234)' : 'OTP লিখো (যেমন: ১২৩৪)'}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{tr('ভেরিফাই ও মাইগ্রেট', 'Verify & Migrate')}</span>
                </button>
              </form>
            )}

            {otpError && <p className="text-xs font-semibold text-rose-600">{otpError}</p>}
            {otpMessage && (
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{otpMessage}</span>
              </p>
            )}
          </section>
        )}

        {!isGuestAccount && otpMessage && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{otpMessage}</span>
          </div>
        )}

        {/* Profile Edit & Preferences */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <h2 className="text-base font-extrabold text-slate-900">
            {tr('ব্যক্তিগত তথ্য ও শ্রেণি সেটিংস', 'Profile & Class Settings')}
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label
                htmlFor="full-name-input"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                {tr('পূর্ণ নাম', 'Full Name')}
              </label>
              <input
                id="full-name-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={tr('তোমার নাম লিখো', 'Enter your full name')}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">
                {tr('শ্রেণি / প্রোগ্রাম', 'Class / Program')}
              </span>
              <div className="inline-flex gap-2">
                {(['SSC', 'HSC'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>
                  {tr('সক্রিয় বিষয়:', 'Active Subject:')}{' '}
                  <strong className="text-slate-900">
                    {activeSubject?.nameBangla || tr('নির্বাচিত নয়', 'Not selected')}
                  </strong>
                </span>
                <Link
                  href="/subjects"
                  className="text-indigo-600 hover:underline font-bold ml-1"
                >
                  {tr('পরিবর্তন', 'Change')}
                </Link>
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{tr('প্রোফাইল সংরক্ষণ', 'Save Profile')}</span>
              </button>
            </div>

            {profileMessage && (
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{profileMessage}</span>
              </p>
            )}
          </form>
        </section>

        {/* Submitted Content Error Reports */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-amber-600" />
              <span>{tr('আমার পাঠানো কনটেন্ট রিপোর্ট', 'My Submitted Content Reports')}</span>
            </h2>
            <Link
              href="/content-report"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              {tr('+ নতুন রিপোর্ট', '+ New Report')}
            </Link>
          </div>

          {mergedReports.length === 0 ? (
            <p className="text-xs text-slate-500">
              {tr(
                'তুমি এখনো কোনো কনটেন্ট ভুলের রিপোর্ট পাঠাওনি। পাঠ বা প্রশ্নে ভুল পেলে রিপোর্ট বাটন ব্যবহার করতে পারো।',
                'No content reports submitted yet.',
              )}
            </p>
          ) : (
            <ul className="space-y-2.5">
              {mergedReports.map((rep) => (
                <li
                  key={rep.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700">
                      {rep.contentType} • {rep.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge(
                        rep.status,
                      )}`}
                    >
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{rep.description}</p>
                  {rep.resolutionNote && (
                    <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                      {tr('সমাধান নোট:', 'Resolution:')} {rep.resolutionNote}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Logout */}
        <section className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{tr('সেশন লগ আউট', 'Sign Out')}</span>
          </button>
        </section>
      </main>
    </div>
  );
}
