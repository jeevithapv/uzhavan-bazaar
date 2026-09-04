'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

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
        <Leaf className="w-24 h-24 text-green-400 mb-4" />
        <h1 className="text-4xl font-extrabold tracking-widest text-green-50">AGRIMELAN</h1>
        <p className="text-green-300 mt-2 text-sm tracking-widest">EMPOWERING FARMERS</p>
      </div>
    </div>
  );
}
