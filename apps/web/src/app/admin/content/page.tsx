'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminContentRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/curriculum');
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-slate-500">
      কারিকুলাম এক্সপ্লোরারে রিডাইরেক্ট করা হচ্ছে...
    </div>
  );
}
