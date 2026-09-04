import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, UserCircle, Edit3, Settings, LogOut, MapPin, Phone, CreditCard, ListOrdered, ShoppingBag, CheckCircle2, QrCode, Globe } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import FarmerIDCardModal from './FarmerIDCardModal';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const router = useRouter();
  const { user, logout, t, setLanguage } = useAppContext();
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  const maskAadhaar = (aadhaar: string) => {
    if (!aadhaar) return 'XXXX XXXX XXXX';
    return `XXXX XXXX ${aadhaar.slice(-4)}`;
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 flex flex-col overflow-y-auto pb-24">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-green-50 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-green-900">{t('drawer.profile')}</h2>
          <button onClick={onClose} className="p-2 text-green-700 hover:bg-green-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 flex flex-col items-center border-b border-gray-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
            <UserCircle className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{user?.fullName || 'Ramasamy K.'}</h3>
          
          <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            {user?.role === 'buyer' ? 'Verified Buyer' : 'Verified Farmer'}
          </div>
          <p className="text-gray-500 text-sm mt-2">{user?.email || 'ramasamy.farm@gmail.com'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-100 bg-gray-50">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase">{t('drawer.wallet')}</p>
            <p className="text-xl font-bold text-gray-800">₹{user?.walletBalance?.toLocaleString() || '42,500'}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase">{t('dashboard.orders')}</p>
            <p className="text-xl font-bold text-gray-800">3 Batches</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-3 text-green-500" />
            <span>{user?.mobile || '+91 98765 43210'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-green-500" />
            <span>{user?.city || 'Madurai District, Tamil Nadu'}</span>
          </div>
          {!user || user.role !== 'buyer' ? (
            <div className="flex items-center text-gray-600">
              <ShoppingBag className="w-5 h-5 mr-3 text-green-500" />
              <span>Land Holding: 4.5 Acres (Tomato, Paddy)</span>
            </div>
          ) : null}
          <div className="flex items-center text-gray-600">
            <CreditCard className="w-5 h-5 mr-3 text-green-500" />
            <span>Aadhaar: {user?.aadhaar ? maskAadhaar(user.aadhaar) : 'XXXX XXXX 8921'} <span className="text-green-500 text-xs font-bold ml-1">✓ Verified</span></span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto p-4 space-y-2 border-t border-gray-100">
          <button onClick={() => setShowEdit(true)} className="w-full flex items-center p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
            <Edit3 className="w-5 h-5 mr-3" /> {t('drawer.edit_profile')}
          </button>
          
          <button onClick={() => setShowChangePassword(true)} className="w-full flex items-center p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
            <Settings className="w-5 h-5 mr-3" /> {t('drawer.change_password')}
          </button>
          
          <div className="relative group">
            <button className="w-full flex items-center p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
              <Globe className="w-5 h-5 mr-3" /> Change Language
            </button>
            <div className="hidden group-hover:block absolute left-full ml-2 top-0 bg-white border border-gray-200 rounded-lg shadow-lg w-32 py-2 z-50">
              <button onClick={() => setLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">English</button>
              <button onClick={() => setLanguage('ta')} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">தமிழ்</button>
            </div>
          </div>

          <button onClick={() => setShowIDCard(true)} className="w-full flex items-center p-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium">
            <QrCode className="w-5 h-5 mr-3" /> Download Digital ID Card
          </button>

          <button onClick={handleLogout} className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold mt-4">
            <LogOut className="w-5 h-5 mr-3" /> Log Out
          </button>
        </div>
      </div>

      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
      {showIDCard && <FarmerIDCardModal onClose={() => setShowIDCard(false)} />}
    </>
  );
}
