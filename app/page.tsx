'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/language');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-900 text-white relative">
      <div className="animate-[fade-in-up_1s_ease-out] flex flex-col items-center">
        <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-emerald-700 bg-white shadow-2xl flex items-center justify-center animate-pulse">
          <Image src="/logo.png" alt="Uzhavan Bazar Logo" width={120} height={120} className="object-contain" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-widest text-white uppercase drop-shadow-md">Uzhavan Bazar</h1>
        <p className="text-amber-500 mt-3 text-sm font-medium tracking-wider uppercase drop-shadow-sm">From Our Fields to Your Home</p>
      </div>

      <div className="absolute bottom-12 w-48 h-1 bg-emerald-950 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-400 rounded-full animate-[loading_2.5s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
