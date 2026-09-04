import React from 'react';
import { X, TrendingUp, IndianRupee } from 'lucide-react';

export default function RevenueModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <IndianRupee className="w-5 h-5" />
          </div>
          Revenue Analytics
        </h3>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">Total Lifetime Revenue</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">₹1,25,430</p>
          <p className="text-sm text-green-600 flex items-center justify-center mt-2 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" /> +12.5% vs last month
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-gray-700">Recent Payouts</h4>
          <div className="border border-gray-100 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50">
            <div>
              <p className="font-bold text-gray-800">SBI Bank Transfer</p>
              <p className="text-xs text-gray-500">Ref: UTR987654321</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">+ ₹12,000</p>
              <p className="text-xs text-gray-500">2 Sept 2026</p>
            </div>
          </div>
          <div className="border border-gray-100 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50">
            <div>
              <p className="font-bold text-gray-800">HDFC Bank Transfer</p>
              <p className="text-xs text-gray-500">Ref: UTR123456789</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">+ ₹8,430</p>
              <p className="text-xs text-gray-500">28 Aug 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
