import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/providers/AppProvider';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { setUser, t } = useAppContext();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      fullName: 'Ramesh (Demo)',
      mobile: phone,
      city: 'Madurai',
      aadhaar: 'XXXX XXXX 1234',
      role: 'farmer',
      walletBalance: 25000
    });
    router.push('/dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4">Login to Agrimelan</h3>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.mobile')}</label>
            <input 
              required type="tel" 
              value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.password')}</label>
            <input 
              required type="password" 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 outline-none"
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 font-bold mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
