'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/language');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-green-700 bg-white shadow-2xl flex items-center justify-center">
          <Image src="/logo.png" alt="Uzhavan Bazar Logo" width={120} height={120} className="object-contain" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-widest text-green-50 uppercase">Uzhavan Bazar</h1>
        <p className="text-green-300 mt-3 text-sm font-medium tracking-wider uppercase">From Our Fields to Your Home</p>
      </div>
    </div>
  );
}
