'use client';

import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-mosque font-medium">Loading Map...</div>
});

export default function PropertyMapWrapper() {
  return <PropertyMap />;
}
