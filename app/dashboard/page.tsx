'use client';
import React, { useState } from 'react';
import MetricCard from '@/components/dashboard/MetricCard';
import AICameraBanner from '@/components/dashboard/AICameraBanner';
import IncomeChart from '@/components/dashboard/IncomeChart';
import PostList from '@/components/dashboard/PostList';
import { IndianRupee, ShoppingBag, TrendingUp } from 'lucide-react';
import RevenueModal from '@/components/dashboard/modals/RevenueModal';
import OrdersModal from '@/components/dashboard/modals/OrdersModal';
import ProfitModal from '@/components/dashboard/modals/ProfitModal';
import { useAppContext } from '@/components/providers/AppProvider';

export default function Dashboard() {
  const { t } = useAppContext();
  const [showRevenue, setShowRevenue] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProfit, setShowProfit] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="lg:col-span-2 flex flex-col h-full min-h-[400px]">
          <IncomeChart />
        </div>
        
        {/* Post Listing Section */}
        <div className="lg:col-span-1 flex flex-col h-full max-h-[600px] overflow-hidden">
          <div className="flex-grow overflow-y-auto pr-1">
            <PostList />
          </div>
        </div>
      </div>
      
      {showRevenue && <RevenueModal onClose={() => setShowRevenue(false)} />}
      {showOrders && <OrdersModal onClose={() => setShowOrders(false)} />}
      {showProfit && <ProfitModal onClose={() => setShowProfit(false)} />}
    </div>
  );
}
