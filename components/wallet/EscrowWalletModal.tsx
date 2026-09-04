import React, { useState } from 'react';
import { X, Lock, Unlock, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function EscrowWalletModal({ onClose }: { onClose: () => void }) {
  const { user } = useAppContext();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdrawableBalance = user?.walletBalance || 0;
  const lockedEscrow = 15000; // Mock locked escrow for demo

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      alert(`₹${withdrawableBalance} transferred successfully to UPI linked bank account!`);
      setIsWithdrawing(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden relative">
        <div className="bg-green-700 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-green-300" /> 
              Smart Escrow Wallet
            </h3>
            <p className="text-green-100 text-sm mt-1">0% Commission Direct Settlement via UPI</p>
          </div>
          <button onClick={onClose} className="text-green-200 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked in Escrow
              </p>
              <p className="text-2xl font-bold text-gray-800">₹{lockedEscrow.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 mt-1">Pending buyer delivery confirmation</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-green-700 font-bold uppercase mb-1 flex items-center gap-1">
                <Unlock className="w-3 h-3" /> Withdrawable
              </p>
              <p className="text-2xl font-bold text-green-700">₹{withdrawableBalance.toLocaleString()}</p>
              <button 
                onClick={handleWithdraw}
                disabled={isWithdrawing || withdrawableBalance === 0}
                className="mt-2 w-full bg-green-600 text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 hover:bg-green-700 disabled:opacity-50"
              >
                {isWithdrawing ? 'Processing...' : 'Transfer to UPI'} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <h4 className="font-bold text-gray-800 mb-3 flex justify-between items-center">
            Recent Ledger
            <button className="text-xs text-blue-600 flex items-center gap-1 font-medium hover:underline">
              <Download className="w-3 h-3" /> Statement
            </button>
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-bold text-sm text-gray-800">Escrow Released (Order #492)</p>
                <p className="text-xs text-gray-500">Buyer confirmed receipt of 50kg Tomatoes</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+ ₹1,500</p>
                <p className="text-[10px] text-gray-400">Today, 10:45 AM</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <p className="font-bold text-sm text-gray-800">Escrow Locked (Order #495)</p>
                <p className="text-xs text-gray-500">Payment held for 200kg Onions</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-500 text-sm">₹5,600 Locked</p>
                <p className="text-[10px] text-gray-400">Yesterday</p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-1">
              <div>
                <p className="font-bold text-sm text-gray-800">UPI Withdrawal</p>
                <p className="text-xs text-gray-500">To bank account ending in 4021</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-600">- ₹10,000</p>
                <p className="text-[10px] text-gray-400">30 Aug 2026</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
