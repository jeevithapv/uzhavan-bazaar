'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line
} from 'recharts';

const data = [
  { name: 'Aug', grossRevenue: 15000, netProfit: 9500 },
  { name: 'Sep', grossRevenue: 18000, netProfit: 11000 },
  { name: 'Oct', grossRevenue: 22000, netProfit: 14500 },
  { name: 'Nov', grossRevenue: 19500, netProfit: 12000 },
  { name: 'Dec', grossRevenue: 25000, netProfit: 16000 },
  { name: 'Jan', grossRevenue: 25930, netProfit: 17100 },
  { name: 'Feb (Proj)', grossRevenue: 28000, netProfit: 19000, isProjected: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-bold text-gray-900">₹{entry.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
        {label === 'Feb (Proj)' && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            * AI Projected based on current crop quality
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function IncomeChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Monthly Income Analytics</h3>
          <p className="text-sm text-gray-500">Gross Revenue vs Net Profit</p>
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0fdf4" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={(value) => `₹${value / 1000}k`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.4 }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            <Bar 
              dataKey="grossRevenue" 
              name="Gross Revenue" 
              fill="#86efac" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
            <Bar 
              dataKey="netProfit" 
              name="Net Profit" 
              fill="#16a34a" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
            />
            {/* Projected line */}
            <Line 
              type="monotone" 
              dataKey="grossRevenue" 
              stroke="#059669" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
              name="Trend"
              legendType="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
