'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

const MOCK_FORECAST = {
  Tomato: [
    { day: 'Mon', historical: 20, predicted: null },
    { day: 'Tue', historical: 22, predicted: null },
    { day: 'Wed', historical: 25, predicted: null },
    { day: 'Thu (Today)', historical: 28, predicted: 28 },
    { day: 'Fri', historical: null, predicted: 30 },
    { day: 'Sat', historical: null, predicted: 32 },
    { day: 'Sun', historical: null, predicted: 35 },
  ],
  Onion: [
    { day: 'Mon', historical: 35, predicted: null },
    { day: 'Tue', historical: 32, predicted: null },
    { day: 'Wed', historical: 30, predicted: null },
    { day: 'Thu (Today)', historical: 28, predicted: 28 },
    { day: 'Fri', historical: null, predicted: 25 },
    { day: 'Sat', historical: null, predicted: 24 },
    { day: 'Sun', historical: null, predicted: 22 },
  ]
};

export default function PriceForecastChart() {
  const { t } = useAppContext();
  const [crop, setCrop] = useState<'Tomato' | 'Onion'>('Tomato');

  const data = MOCK_FORECAST[crop];
  
  // AI insights logic
  const isRising = data[data.length - 1].predicted! > data[3].historical!;
  const badgeText = isRising ? 'Hold for 3 Days' : 'Sell Today';
  const badgeColor = isRising ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-red-100 text-red-700 border-red-200';
  const Icon = isRising ? TrendingUp : AlertTriangle;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">AI Mandi Price Forecast</h3>
          <p className="text-sm text-gray-500">7-Day Historical vs Predicted Rates (₹/kg)</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
          <select 
            value={crop}
            onChange={(e) => setCrop(e.target.value as any)}
            className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-green-500 bg-gray-50"
          >
            <option value="Tomato">Tomato</option>
            <option value="Onion">Onion</option>
          </select>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${badgeColor}`}>
            <Icon className="w-4 h-4" />
            {badgeText}
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }}/>
            <ReferenceLine x="Thu (Today)" stroke="#9ca3af" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              name="Historical"
              dataKey="historical" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
              connectNulls
            />
            <Line 
              type="monotone" 
              name="Predicted"
              dataKey="predicted" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
