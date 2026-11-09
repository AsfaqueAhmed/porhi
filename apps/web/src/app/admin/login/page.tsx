'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { apiClient, ApiError } from '@/lib/api-client';
import { resolveSafeAdminRedirect } from '@/lib/admin-auth';
import {
  isAllowedAdminRole,
  useAdminAuthStore,
  type AdminUserProfile,
} from '@/store/admin-auth-store';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone || !password) {
      setErrorMessage('অনুগ্রহ করে মোবাইল নম্বর এবং পাসওয়ার্ড দিন।');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient.post<{
        accessToken: string;
        user: AdminUserProfile;
      }>(
        '/auth/admin/login',
        { phoneNumber: trimmedPhone, password },
        { scope: 'admin' },
      );

      if (!response?.accessToken || !isAllowedAdminRole(response?.user?.role)) {
        setErrorMessage('এই অ্যাকাউন্টটির অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই।');
        return;
      }

      useAdminAuthStore.getState().setSession(response.accessToken, response.user);
      const safeNext = resolveSafeAdminRedirect(searchParams?.get('next') ?? null);
      router.replace(safeNext);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          setErrorMessage('ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } else if (error.status === 403) {
          setErrorMessage('এই অ্যাকাউন্টটির অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই।');
        } else {
          setErrorMessage('লগইন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
        }
      } else {
        setErrorMessage('এপিআই সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col items-center justify-center px-4 py-10 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Brand Header matching AdminSidebar */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-md">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 font-extrabold text-base tracking-wide text-slate-900">
                <span>poRi Admin</span>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-indigo-200">
                  v0.2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>এডটেক কন্ট্রোল স্যুট</span>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5 space-y-1 text-center">
            <h1 className="text-xl font-extrabold text-slate-900">অ্যাডমিন ও স্টাফ লগইন</h1>
            <p className="text-xs text-slate-500">
              শুধুমাত্র অনুমোদিত অ্যাডমিন, এডিটর ও রিভিউয়ারদের প্রবেশের জন্য
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-xs font-medium flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label
                htmlFor="admin-phone"
                className="block text-xs font-bold text-slate-700"
              >
                মোবাইল নম্বর
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-phone"
                  name="phoneNumber"
                  type="tel"
                  aria-label="মোবাইল নম্বর"
                  autoComplete="tel"
                  placeholder="017XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-slate-700"
              >
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  aria-label="পাসওয়ার্ড"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 disabled:opacity-60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'অক্ষর লুকান' : 'অক্ষর দেখান'}
                  disabled={isSubmitting}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-60"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>লগইন করুন</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>মূল প্ল্যাটফর্মে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
            <span className="text-sm font-semibold text-slate-700">লোড হচ্ছে...</span>
          </div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
