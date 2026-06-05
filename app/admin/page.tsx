'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <div className="text-white p-8 animate-pulse">Loading dashboard...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Dashboard Overview</h1>
        <button className="bg-[#E8FF00] text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
          <p className="text-[#888] text-sm font-medium mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-emerald-400 text-xs mt-2 font-medium">↑ 12% vs last month</p>
        </div>
        
        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
          <p className="text-[#888] text-sm font-medium mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
          <p className="text-emerald-400 text-xs mt-2 font-medium">↑ 5% vs last month</p>
        </div>

        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
          <p className="text-[#888] text-sm font-medium mb-1">Active Products</p>
          <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
          <p className="text-[#666] text-xs mt-2 font-medium">Across 5 categories</p>
        </div>

        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
          <p className="text-[#888] text-sm font-medium mb-1">Active Users Now</p>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E8FF00]"></span>
            </span>
          </div>
          <p className="text-[#666] text-xs mt-2 font-medium">Live traffic</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (Mocked for dashboard layout) */}
        <div className="lg:col-span-2 bg-[#111] border border-[#222] p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222] text-[#888] text-sm">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats.totalOrders > 0 ? (
                   <tr>
                    <td colSpan={4} className="py-8 text-center text-[#666]">Orders will appear here once placed.</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#666]">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Inventory Alerts */}
        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">Inventory Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-red-900/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-white">Pulse Jump Rope</span>
              </div>
              <span className="text-xs text-red-400 font-bold">OUT OF STOCK</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-amber-900/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-white">Phantom Mouse X1</span>
              </div>
              <span className="text-xs text-amber-400 font-bold">LOW STOCK (4)</span>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-[#1a1a1a] hover:bg-[#222] text-white font-semibold py-2.5 rounded-lg transition-colors border border-[#333] text-sm">
            Manage Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
