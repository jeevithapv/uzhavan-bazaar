'use client';
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Volume2 } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

const TICKER_DATA = [
  { name: 'Onion', price: 28, trend: 'down', predicted: 25, category: 'Vegetables' },
  { name: 'Potato', price: 22, trend: 'up', predicted: 24, category: 'Vegetables' },
  { name: 'Apple', price: 120, trend: 'flat', predicted: 120, category: 'Fruits' },
  { name: 'Brinjal', price: 30, trend: 'up', predicted: 33, category: 'Vegetables' },
  { name: 'Wheat', price: 25, trend: 'down', predicted: 22, category: 'Grains' },
  { name: 'Banana', price: 45, trend: 'up', predicted: 48, category: 'Fruits' },
  { name: 'Rice (Ponni)', price: 60, trend: 'up', predicted: 65, category: 'Grains' },
];

export default function MandiTicker() {
  const { t } = useAppContext();
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const filteredData = filter === 'All' ? TICKER_DATA : TICKER_DATA.filter(item => item.category === filter);

  const playTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = filteredData.map(item => `${item.name} is ${item.price} rupees`).join('. ');
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Basic language mapping for TTS voice (browser support varies)
      const langMap: any = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN' };
      // Ignoring language mapping for the TTS text since the items are in English, 
      // but in a real app we'd translate the TTS text string as well.
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50 flex flex-col">
      <div className="bg-gray-800 px-4 py-1 flex items-center justify-center gap-2 overflow-x-auto">
        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mr-2 hidden sm:inline">{t('ticker.filter')}</span>
        {['All', 'Vegetables', 'Fruits', 'Grains'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${filter === cat ? 'bg-green-600 text-white font-bold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {t(`ticker.${cat.toLowerCase()}`)}
          </button>
        ))}
        <button onClick={playTTS} className="ml-4 p-1 bg-gray-700 hover:bg-gray-600 rounded-full text-green-400" title="Read aloud">
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
      <div className="h-10 flex items-center overflow-hidden w-full relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Multiply the array for seamless scrolling */}
          {[...filteredData, ...filteredData, ...filteredData, ...filteredData].map((item, index) => (
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
    </div>
  );
}
