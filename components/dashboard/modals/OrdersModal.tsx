import React from 'react';
import { X, Package, Truck, CheckCircle } from 'lucide-react';

export default function OrdersModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          Active Orders
        </h3>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="border border-orange-100 bg-orange-50/50 rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Tomatoes (Grade A) - 50kg</h4>
                <p className="text-sm text-gray-600">Buyer: Suresh Kumar (+91 98765 43210)</p>
              </div>
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-bold">Pending Dispatch</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600">
                <Truck className="w-4 h-4" /> Dispatch Now
              </button>
            </div>
          </div>

          <div className="border border-gray-100 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Onions (Grade B) - 100kg</h4>
                <p className="text-sm text-gray-600">Buyer: Ravi Traders (+91 99988 77766)</p>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">In Transit</span>
            </div>
          </div>

          <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 opacity-75">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Carrots - 30kg</h4>
                <p className="text-sm text-gray-600">Buyer: FreshMart</p>
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
