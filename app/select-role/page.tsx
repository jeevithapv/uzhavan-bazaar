'use client';
import { useRouter } from 'next/navigation';
import { UserCircle, ShoppingBag } from 'lucide-react';

export default function SelectRole() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to Agrimelan</h2>
        <p className="text-center text-gray-500 mb-10 text-lg">Are you a Farmer or a Buyer?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Farmer Card */}
          <button
            onClick={() => router.push('/register/farmer')}
            className="flex flex-col items-center justify-center p-10 bg-white border-2 border-transparent rounded-2xl shadow-sm hover:shadow-xl hover:border-green-500 group transition-all"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Farmer</h3>
            <p className="text-gray-500 text-center">Grade your produce, list items, and track your revenue directly from the field.</p>
          </button>

          {/* Buyer Card */}
          <button
            onClick={() => router.push('/register/buyer')}
            className="flex flex-col items-center justify-center p-10 bg-white border-2 border-transparent rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 group transition-all"
          >
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Buyer</h3>
            <p className="text-gray-500 text-center">Browse graded produce directly from local farmers and get the best market rates.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
