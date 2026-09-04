'use client';
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TICKER_DATA = [
  { name: 'Onion', price: 28, trend: 'down', predicted: 25 },
  { name: 'Potato', price: 22, trend: 'up', predicted: 24 },
  { name: 'Carrot', price: 40, trend: 'flat', predicted: 40 },
  { name: 'Brinjal', price: 30, trend: 'up', predicted: 33 },
  { name: 'Cabbage', price: 25, trend: 'down', predicted: 22 },
  { name: 'Cauliflower', price: 45, trend: 'up', predicted: 48 },
  { name: 'Bell Pepper', price: 60, trend: 'up', predicted: 65 },
];

export default function MandiTicker() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg overflow-hidden z-50 h-12 flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Double the array for seamless scrolling */}
        {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, index) => (
          <div key={index} className="inline-flex items-center mx-6 gap-2">
            <span className="font-semibold text-gray-200">{item.name}:</span>
            <span className="text-white">₹{item.price}/kg</span>
            {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
            {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
            {item.trend === 'flat' && <Minus className="h-4 w-4 text-gray-400" />}
            <span className="text-xs text-gray-400 ml-1">(Pred: ₹{item.predicted}/kg)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
