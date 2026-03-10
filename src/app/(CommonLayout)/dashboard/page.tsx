"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Package,
  ArrowUpRight,
  Loader2,
  PlusCircle
} from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchDashboardData(parsedUser.token); 
    }
  }, []);

  const fetchDashboardData = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data); 
        calculateStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (allOrders: any[]) => {
    const totalSpent = allOrders.reduce((acc, curr) => acc + curr.amount, 0);
    const pending = allOrders.filter(o => o.status === "PENDING").length;
    
    setStats({
      totalOrders: allOrders.length,
      pendingOrders: pending,
      totalSpent: `$${totalSpent}`,
      successRate: allOrders.length > 0 ? "100%" : "0%"
    });
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D70F64]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">
            Dashboard<span className="text-[#D70F64]">.</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">
            Welcome, {user?.name} ({user?.role})
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#D70F64] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-pink-100"
        >
          <PlusCircle size={20} />
          {user?.role === "PROVIDER" ? "Add New Meal" : "Browse Meals"}
        </motion.button>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={Package} color="bg-blue-500" />
        <StatCard title="Pending" value={stats?.pendingOrders || 0} icon={Clock} color="bg-orange-500" />
        <StatCard title="Total Spent" value={stats?.totalSpent || "$0"} icon={DollarSign} color="bg-emerald-500" />
        <StatCard title="Growth" value={stats?.successRate || "0%"} icon={TrendingUp} color="bg-purple-500" />
      </div>

      {/* Recent Orders Table */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Activity</h2>
          <button className="text-[#D70F64] font-black text-sm flex items-center gap-1 hover:underline">
            Refresh List <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          {orders.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-50">
                  <th className="pb-6">Meal/Service</th>
                  <th className="pb-6">Date</th>
                  <th className="pb-6">Status</th>
                  <th className="pb-6">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order: any) => (
                  <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-6 font-bold text-gray-900">{order.mealName || "Standard Meal"}</td>
                    <td className="py-6 text-gray-500 text-sm font-medium">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${
                        order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-6 font-black text-gray-900">${order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest">No orders found yet!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm"
    >
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-inherit opacity-90`}>
        <Icon size={24} />
      </div>
      <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-gray-900 mt-2 tracking-tighter">{value}</p>
    </motion.div>
  );
}