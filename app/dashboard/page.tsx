'use client';
import React, { useState } from 'react';
import MetricCard from '@/components/dashboard/MetricCard';
import AICameraBanner from '@/components/dashboard/AICameraBanner';
import IncomeChart from '@/components/dashboard/IncomeChart';
import PriceForecastChart from '@/components/dashboard/PriceForecastChart';
import PostList from '@/components/dashboard/PostList';
import { IndianRupee, ShoppingBag, TrendingUp } from 'lucide-react';
import RevenueModal from '@/components/dashboard/modals/RevenueModal';
import OrdersModal from '@/components/dashboard/modals/OrdersModal';
import ProfitModal from '@/components/dashboard/modals/ProfitModal';
import LogisticsMapModal from '@/components/dashboard/modals/LogisticsMapModal';
import { useAppContext } from '@/components/providers/AppProvider';

export default function Dashboard() {
  const { t } = useAppContext();
  const [showRevenue, setShowRevenue] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProfit, setShowProfit] = useState(false);
  const [showLogistics, setShowLogistics] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 space-y-8">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard 
          title={t('dashboard.revenue')} 
          value="₹1,25,430" 
          icon={<IndianRupee className="h-6 w-6 text-green-700" />} 
          colorClass="bg-green-100"
          subtitle="This Month"
          onClick={() => setShowRevenue(true)}
        />
        <MetricCard 
          title={t('dashboard.orders')} 
          value="125" 
          icon={<ShoppingBag className="h-6 w-6 text-yellow-700" />} 
          colorClass="bg-yellow-100"
          subtitle="Pending Delivery"
          onClick={() => setShowOrders(true)}
        />
        <MetricCard 
          title={t('dashboard.profit')} 
          value="+₹22,100" 
          icon={<TrendingUp className="h-6 w-6 text-blue-700" />} 
          colorClass="bg-blue-100"
          trend="up"
          trendValue="+15% from last month"
          onClick={() => setShowProfit(true)}
        />
      </div>

      {/* AI Camera Grading CTA */}
      <AICameraBanner />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 flex flex-col gap-8 h-full">
          <PriceForecastChart />
          <IncomeChart />
        </div>
        
        {/* Post Listing Section */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full max-h-[600px]">
          <button 
            onClick={() => setShowLogistics(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/MumboJumbo" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
            Find Shared Transport
          </button>
          
          <div className="flex-grow overflow-y-auto pr-1">
            <PostList />
          </div>
        </div>
      </div>
      
      {showRevenue && <RevenueModal onClose={() => setShowRevenue(false)} />}
      {showOrders && <OrdersModal onClose={() => setShowOrders(false)} />}
      {showProfit && <ProfitModal onClose={() => setShowProfit(false)} />}
      {showLogistics && <LogisticsMapModal onClose={() => setShowLogistics(false)} />}
    </div>
  );
}
