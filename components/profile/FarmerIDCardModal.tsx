import React from 'react';
import { X, QrCode, CheckCircle2, UserCircle } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function FarmerIDCardModal({ onClose }: { onClose: () => void }) {
  const { user } = useAppContext();
  
  const name = user?.fullName || 'Ramasamy K.';
  const role = user?.role === 'buyer' ? 'Buyer' : 'Verified Farmer';
  const aadhaar = user?.aadhaar ? `XXXX XXXX ${user.aadhaar.slice(-4)}` : 'XXXX XXXX 8921';
  const location = user?.city || 'Madurai District, Tamil Nadu';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-green-200 z-10 bg-black/20 rounded-full p-1">
          <X className="w-5 h-5" />
        </button>
        
        {/* Card Header */}
        <div className="bg-green-700 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-xl font-bold uppercase tracking-widest relative z-10">Kisan Digital Card</h2>
          <p className="text-green-200 text-xs font-medium uppercase relative z-10 mt-1">Govt of India Initiative</p>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-md -mt-12 relative z-10 bg-white">
            <UserCircle className="w-20 h-20 text-gray-400" />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{name}</h3>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase mt-2">
            {role}
          </span>
          
          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-xs font-medium uppercase">Aadhaar No.</span>
              <span className="text-gray-900 font-bold flex items-center gap-1">
                {aadhaar} <CheckCircle2 className="w-3 h-3 text-green-500" />
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-xs font-medium uppercase">Location</span>
              <span className="text-gray-900 font-bold text-sm text-right w-1/2 truncate">{location}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-xs font-medium uppercase">Valid Upto</span>
              <span className="text-gray-900 font-bold">Dec 2030</span>
            </div>
          </div>

          <div className="mt-8 mb-2 p-3 bg-white border border-gray-200 rounded-xl shadow-sm w-32 h-32 flex items-center justify-center">
            {/* Mock QR Code */}
            <QrCode className="w-24 h-24 text-gray-800" />
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Scan to Verify Identity</p>
        </div>
        
        {/* Card Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-2 rounded-lg text-sm hover:bg-gray-50">Close</button>
          <button onClick={() => alert("Downloading PDF...")} className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-green-700 flex items-center justify-center gap-2">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
