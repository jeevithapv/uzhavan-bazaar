'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Eye, EyeOff, UploadCloud } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';
import LoginModal from '@/components/auth/LoginModal';

export default function FarmerRegistration() {
  const router = useRouter();
  const { setUser, t } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', city: '', aadhaar: '', password: '', confirm: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    setUser({
      fullName: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      aadhaar: formData.aadhaar,
      role: 'farmer',
      walletBalance: 0
    });
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <UserCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Farmer Registration</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.fullname')}</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')}</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.mobile')}</label>
              <div className="flex gap-2">
                <input required type="tel" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="flex-1 px-4 py-2 border rounded-lg focus:ring-green-500 outline-none" />
                <button type="button" className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 font-medium whitespace-nowrap">{t('form.send_otp')}</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.location')}</label>
                <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.aadhaar')}</label>
                <input required type="text" value={formData.aadhaar} onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none" placeholder="XXXX XXXX XXXX" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.upload_doc')}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <UploadCloud className="w-8 h-8 mb-2 text-green-500" />
                <span className="text-sm">Click to upload or drag and drop</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.password')}</label>
                <input required type={showPwd ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-8 text-gray-400">
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.confirm_password')}</label>
                <input required type={showConfirmPwd ? 'text' : 'password'} value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-green-500 outline-none pr-10" />
                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-8 text-gray-400">
                  {showConfirmPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 mt-6 disabled:opacity-70">
              {isSubmitting ? 'Registering...' : t('form.register')}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              <button type="button" onClick={() => setShowLogin(true)} className="text-green-600 hover:underline font-bold">
                {t('form.already_registered')}
              </button>
            </p>
          </form>
        </div>
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
