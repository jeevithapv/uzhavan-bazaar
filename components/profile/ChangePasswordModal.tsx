import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { t } = useAppContext();
  const [showPwd, setShowPwd] = useState(false);
  const [formData, setFormData] = useState({ current: '', new: '', confirm: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.new !== formData.confirm) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4">{t('drawer.change_password')}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input 
              required type={showPwd ? 'text' : 'password'} 
              value={formData.current} onChange={e => setFormData({...formData, current: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 outline-none pr-10"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              required type={showPwd ? 'text' : 'password'} 
              value={formData.new} onChange={e => setFormData({...formData, new: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 outline-none pr-10"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.confirm_password')}</label>
            <input 
              required type={showPwd ? 'text' : 'password'} 
              value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 outline-none pr-10"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg">{t('common.cancel')}</button>
            <button type="submit" className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">{t('common.save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
