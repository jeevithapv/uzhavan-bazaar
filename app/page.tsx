'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Splash() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push('/language');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!showSplash) return null;

  return (
    <div className="bg-[#14532d] min-h-screen flex flex-col items-center justify-center text-center px-4">
      <img 
        src="/logo.png" 
        alt="Uzhavan Bazar Logo" 
        className="w-36 h-36 md:w-44 md:h-44 object-contain rounded-full shadow-2xl bg-white p-2 border-4 border-amber-400 animate-pulse" 
      />
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mt-6">
        Uzhavan Bazar
      </h1>
      
      <p className="text-amber-400 text-lg sm:text-xl font-medium mt-2">
        From Our Fields to Your Home
      </p>

      <div className="w-48 h-1.5 bg-emerald-800 rounded-full overflow-hidden mt-8">
        <div className="bg-amber-400 h-full animate-[progress_3s_linear]" />
      </div>
      
      <p className="text-xs text-emerald-200 mt-2 font-mono">
        Loading Agriculture Hub...
      </p>
    </div>
  );
}
