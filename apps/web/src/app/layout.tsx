import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/navigation/app-shell';

export const metadata: Metadata = {
  title: 'পড়ি (poRi) - SSC ও HSC সেলফ-স্টাডি লার্নিং প্ল্যাটফর্ম',
  description: 'এনসিটিবি কারিকুলাম ভিত্তিক ইন্টারেক্টিভ সেলফ-স্টাডি লার্নিং ও প্র্যাকটিস প্ল্যাটফর্ম',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-slate-50 antialiased text-slate-900 selection:bg-indigo-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
