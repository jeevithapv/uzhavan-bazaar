import React from 'react';
import Header from '@/components/dashboard/Header';
import MandiTicker from '@/components/dashboard/MandiTicker';
import FloatingMic from '@/components/voice/FloatingMic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-grow pb-14">{/* pb-14 to account for sticky ticker */}
        {children}
      </div>
      <FloatingMic />
      <MandiTicker />
    </>
  );
}
