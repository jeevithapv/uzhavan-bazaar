import React from 'react';
import { X, MapPin, Truck, Check } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function LogisticsMapModal({ onClose }: { onClose: () => void }) {
  const { t } = useAppContext();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden relative">
        <div className="p-4 border-b flex justify-between items-center bg-blue-50">
          <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Truck className="w-5 h-5" /> Nearby Transport Pooling
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-blue-100 rounded-full text-blue-800">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-[400px]">
          {/* Simulated Map Area */}
          <div className="w-full md:w-3/5 bg-gray-100 relative overflow-hidden border-r border-gray-200">
            <div className="absolute inset-0 opacity-40 bg-[url('https://maps.wikimedia.org/osm-intl/12/2967/1912.png')] bg-cover bg-center"></div>
            
            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/4 group cursor-pointer">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg relative z-10 animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap hidden group-hover:block z-20">You (50kg)</div>
            </div>

            <div className="absolute top-1/3 left-1/2 group cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg relative z-10">
                <Truck className="w-3 h-3" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap hidden group-hover:block z-20">Ramesh (200kg)</div>
            </div>

            <div className="absolute bottom-1/4 right-1/4 group cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg relative z-10">
                <Truck className="w-3 h-3" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap hidden group-hover:block z-20">Suresh (150kg)</div>
            </div>
            
            {/* Route Path Simulation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              <path d="M 120 100 Q 200 150 250 200" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" fill="none" />
              <path d="M 250 200 Q 300 250 350 300" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" fill="none" />
            </svg>
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-2/5 bg-white p-4 overflow-y-auto">
            <h4 className="font-bold text-gray-800 mb-4">Available Pools to Koyambedu</h4>
            
            <div className="border border-green-200 bg-green-50 rounded-xl p-3 mb-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-green-800">Mini-Truck Pool #842</p>
                <span className="bg-green-200 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Best Match</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">Departure: Today, 6:00 PM</p>
              <p className="text-xs text-gray-600 mb-2">Capacity left: 100kg</p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs">
                  <span className="line-through text-gray-400">₹1,500</span> <br/>
                  <span className="font-bold text-green-700 text-lg">₹300</span>
                </div>
                <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-green-700">
                  <Check className="w-4 h-4" /> Join
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-3 opacity-70 hover:opacity-100 transition-opacity">
              <p className="font-bold text-gray-800 mb-1">Tractor Pool #112</p>
              <p className="text-xs text-gray-600 mb-1">Departure: Tomorrow, 5:00 AM</p>
              <p className="text-xs text-gray-600 mb-2">Capacity left: 800kg</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-gray-700 text-lg">₹150</span>
                <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold border hover:bg-gray-200">
                  Join
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
