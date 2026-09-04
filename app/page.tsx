'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export default function Splash() {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/language');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#14532d] via-[#166534] to-[#0f3d21] flex flex-col items-center justify-center text-white px-4 select-none relative">
      <div className="animate-[fade-in-up_1s_ease-out] flex flex-col items-center">
        <div className="w-44 h-44 mb-6 rounded-full overflow-hidden border-4 border-emerald-700/50 bg-white shadow-2xl flex items-center justify-center animate-pulse relative">
          {!imgError ? (
            <Image 
              src="/logo.png" 
              alt="Uzhavan Bazar Logo" 
              width={180} 
              height={180} 
              priority 
              className="rounded-full shadow-2xl mx-auto object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-green-700">
              <Sprout className="w-16 h-16 mb-1" />
              <span className="font-extrabold text-2xl tracking-tight">UB</span>
            </div>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">Uzhavan Bazar</h1>
        <p className="text-amber-400 text-lg font-medium mt-2 drop-shadow-sm text-center">From Our Fields to Your Home</p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center w-full max-w-xs">
        <p className="text-sm text-emerald-200/80 mb-3 tracking-widest uppercase font-medium animate-pulse text-center">Connecting Farmers Directly...</p>
        <div className="w-48 h-1 bg-emerald-900/50 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full animate-[loading_2.5s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  );
}
