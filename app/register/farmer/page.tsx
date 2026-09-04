'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function FarmerRegistration() {
  const router = useRouter();
  const { setUser } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', city: '', aadhaar: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUser({
      fullName: formData.name,
      mobile: formData.mobile,
      city: formData.city,
      aadhaar: formData.aadhaar,
      role: 'farmer',
      walletBalance: 0
    });
    // Simulate network request
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <UserCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Farmer Registration</h2>
          <p className="text-gray-500 text-center text-sm mt-2">Join Agrimelan to sell your produce at the best prices.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="e.g. Ramesh Kumar" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="+91" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
            <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="e.g. Madurai" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input required type="text" value={formData.aadhaar} onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" placeholder="XXXX XXXX XXXX" />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register as Farmer'}
          </button>
        </form>
      </div>
    </div>
  );
}
