"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  DollarSign, 
  Utensils, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export default function ProviderDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderStats = async () => {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      try {
        // এই এন্ডপয়েন্টটি তোমার ব্যাকএন্ডে তৈরি থাকতে হবে
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provider/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (error) {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchProviderStats();
  }, []);

  const statCards = [
    { 
        label: "Total Revenue", 
        value: `$${stats?.totalRevenue || 0}`, 
        icon: <DollarSign className="text-emerald-500" />, 
        bg: "bg-emerald-50" 
    },
    { 
        label: "Total Orders", 
        value: stats?.totalOrders || 0, 
        icon: <ShoppingBag className="text-blue-500" />, 
        bg: "bg-blue-50" 
    },
    { 
        label: "Active Meals", 
        value: stats?.activeMeals || 0, 
        icon: <Utensils className="text-[#D70F64]" />, 
        bg: "bg-pink-50" 
    },
    { 
        label: "Completion Rate", 
        value: "98%", 
        icon: <TrendingUp className="text-purple-500" />, 
        bg: "bg-purple-50" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter">
            Business <span className="text-[#D70F64]">Overview.</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{card.label}</p>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{card.value}</h3>
              </div>
              <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center`}>
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Recent Orders Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic tracking-tighter">Recent Orders</h2>
              <button className="text-[#D70F64] font-black text-xs uppercase tracking-widest">View All</button>
            </div>
            
            <div className="space-y-4">
              {/* মক ডাটা দিয়ে দেখানো হয়েছে, পরে এপিআই কানেক্ট করব */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Clock className="text-gray-400" size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Order #HF-202{item}</p>
                        <p className="text-xs text-gray-400 font-medium">2 Meals • $45.00</p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase">Pending</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-xl">
             <h2 className="text-2xl font-black italic tracking-tighter mb-6">Quick Actions</h2>
             <div className="space-y-4">
                <button className="w-full bg-[#D70F64] hover:bg-pink-700 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                  + Add New Meal
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                  Update Menu
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                  Contact Support
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}