import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    mobile: user?.mobile || '',
    city: user?.city || '',
    email: user?.email || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, ...formData });
      alert('Profile updated successfully!'); // Toast simulation
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required type="text" 
              value={formData.fullName} 
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input 
              required type="text" 
              value={formData.mobile} 
              onChange={e => setFormData({...formData, mobile: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (City)</label>
            <input 
              required type="text" 
              value={formData.city} 
              onChange={e => setFormData({...formData, city: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          {user?.role === 'buyer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                required type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 font-medium">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
