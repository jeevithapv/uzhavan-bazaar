import React from 'react';
import { X, TrendingUp, PieChart } from 'lucide-react';

export default function ProfitModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <PieChart className="w-5 h-5" />
          </div>
          Profit & Expenses Analytics
        </h3>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">Net Profit</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">₹22,100</p>
          </div>
          <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-green-600 border border-green-200 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> 18% Margin
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-gray-700 mb-2">Cost Breakdown (Last Harvest)</h4>
          
          <div className="flex justify-between items-center text-sm p-2 border-b border-gray-100">
            <span className="text-gray-600">Seeds & Saplings</span>
            <span className="font-bold text-red-500">- ₹4,500</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 border-b border-gray-100">
            <span className="text-gray-600">Fertilizers & Pesticides</span>
            <span className="font-bold text-red-500">- ₹3,200</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 border-b border-gray-100">
            <span className="text-gray-600">Labor & Transport</span>
            <span className="font-bold text-red-500">- ₹5,800</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 bg-gray-50 font-bold rounded-lg mt-2">
            <span className="text-gray-800">Total Expenses</span>
            <span className="text-gray-900">₹13,500</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 bg-green-50 font-bold rounded-lg border border-green-100">
            <span className="text-green-800">Gross Harvest Value</span>
            <span className="text-green-700">₹35,600</span>
          </div>
        </div>
      </div>
    </div>
  );
}
