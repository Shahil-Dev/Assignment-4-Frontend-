"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Package,
  ArrowUpRight
} from "lucide-react";

// এনিমেশন ভেরিয়েন্ট
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const stats = [
    { title: "Total Orders", value: "124", icon: Package, color: "bg-blue-500", trend: "+12%" },
    { title: "Active Bookings", value: "12", icon: Clock, color: "bg-orange-500", trend: "+5%" },
    { title: "Total Spent", value: "$4,250", icon: DollarSign, color: "bg-emerald-500", trend: "+18%" },
    { title: "Success Rate", value: "98%", icon: CheckCircle2, color: "bg-purple-500", trend: "+2%" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Overview<span className="text-[#D70F64]">.</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Hello, {user?.name || "User"}! Here's what's happening today.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-gray-200"
        >
          <PlusCircle className="size-5" />
          {user?.role === "PROVIDER" ? "Add New Service" : "New Order"}
        </motion.button>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={item}
            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-pink-50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend} <TrendingUp size={12} />
              </span>
            </div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.title}</h3>
            <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-[#D70F64] font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4 font-black">Service</th>
                  <th className="pb-4 font-black">Date</th>
                  <th className="pb-4 font-black">Status</th>
                  <th className="pb-4 font-black">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="group transition-colors hover:bg-gray-50/50">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-[#D70F64]">
                          <ShoppingBag size={18} />
                        </div>
                        <span className="font-bold text-gray-800">Pizza Margherita</span>
                      </div>
                    </td>
                    <td className="py-5 text-gray-500 font-medium">March 09, 2026</td>
                    <td className="py-5">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-black">Completed</span>
                    </td>
                    <td className="py-5 font-black text-gray-900">$24.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Profile/Side Card */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#D70F64] to-[#ff4d94] rounded-[3rem] p-8 text-white shadow-2xl shadow-pink-200 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center mb-6">
              <Users size={40} />
            </div>
            <h3 className="text-2xl font-black mb-2">Upgrade to Pro</h3>
            <p className="text-white/80 font-medium text-sm mb-8 leading-relaxed">
              Unlock advanced features like analytics, priority support, and custom branding for your food service.
            </p>
            <button className="bg-white text-[#D70F64] w-full py-4 rounded-2xl font-black shadow-xl hover:bg-gray-100 transition-all">
              Go Premium Now
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}

function PlusCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
  );
}