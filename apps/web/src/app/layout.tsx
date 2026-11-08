import type { Metadata } from 'next';
import './globals.css';
import { PersistentNav } from '@/components/navigation/persistent-nav';

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
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-900 pb-16 md:pb-0">
        <PersistentNav />
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
