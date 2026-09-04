import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  colorClass: string;
  onClick?: () => void;
}

export default function MetricCard({ title, value, subtitle, icon, trend, trendValue, colorClass, onClick }: MetricCardProps) {
  return (
    <div onClick={onClick} className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer hover:border-green-200' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-full ${colorClass}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {trendValue && (
          <p className={`text-sm mt-2 font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trendValue}
          </p>
        )}
      </div>
    </div>
  );
}
