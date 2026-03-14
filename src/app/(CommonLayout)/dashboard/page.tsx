"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, DollarSign, TrendingUp, Clock, 
  Package, ArrowUpRight, Loader2, Users, ShieldCheck
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [dataList, setDataList] = useState([]); 
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchDynamicData(parsedUser);
    }
  }, []);

  const fetchDynamicData = async (userData: any) => {
    try {
      setIsLoading(true);
      let endpoint = "";

      if (userData.role === "ADMIN") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;
      } else if (userData.role === "PROVIDER") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`; 
      } else {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`;
      }

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${userData.token}` }
      });
      const result = await response.json();
      
      if (result.success) {
        setDataList(result.data); 
        calculateDynamicStats(result.data, userData.role);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error("Dashboard data sync failed");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDynamicStats = (data: any[], role: string) => {
    if (role === "ADMIN") {
      setStats({
        card1: { title: "Total Users", value: data.length, icon: Users, color: "bg-blue-600" },
        card2: { title: "Active", value: data.filter(u => u.status === 'active').length, icon: ShieldCheck, color: "bg-emerald-500" },
        card3: { title: "Blocked", value: data.filter(u => u.status === 'blocked').length, icon: ShieldCheck, color: "bg-red-500" },
        card4: { title: "Growth", value: "12%", icon: TrendingUp, color: "bg-purple-500" }
      });
    } else if (role === "PROVIDER") {
      const revenue = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setStats({
        card1: { title: "Incoming Orders", value: data.length, icon: Package, color: "bg-blue-500" },
        card2: { title: "Pending", value: data.filter(o => o.status === "PENDING").length, icon: Clock, color: "bg-orange-500" },
        card3: { title: "Total Earnings", value: `$${revenue}`, icon: DollarSign, color: "bg-emerald-500" },
        card4: { title: "Rating", value: "4.8", icon: TrendingUp, color: "bg-yellow-500" }
      });
    } else {
      const spent = data.reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setStats({
        card1: { title: "My Orders", value: data.length, icon: ShoppingBag, color: "bg-[#D70F64]" },
        card2: { title: "In Progress", value: data.filter(o => o.status !== "DELIVERED").length, icon: Clock, color: "bg-orange-500" },
        card3: { title: "Total Spent", value: `$${spent}`, icon: DollarSign, color: "bg-emerald-500" },
        card4: { title: "Rewards", value: "120 XP", icon: TrendingUp, color: "bg-purple-500" }
      });
    }
  };

  if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#D70F64]" size={40} /></div>;

  return (
    <div className="space-y-10">
      {/* Dynamic Header */}
      <div>
        <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
          {user?.role} <span className="text-[#D70F64]">Panel.</span>
        </h1>
        <p className="text-gray-400 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]">
          Logged in as {user?.name}
        </p>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && Object.values(stats).map((s: any, i) => (
          <StatCard key={i} title={s.title} value={s.value} icon={s.icon} color={s.color} />
        ))}
      </div>

      {/* Dynamic Activity Table */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
          {user?.role === "ADMIN" ? "User Management" : "Recent Orders"}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-50">
                <th className="pb-6">{user?.role === "ADMIN" ? "User Name" : "Item"}</th>
                <th className="pb-6">{user?.role === "ADMIN" ? "Email" : "Date"}</th>
                <th className="pb-6">Status</th>
                <th className="pb-6">{user?.role === "ADMIN" ? "Role" : "Amount"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dataList.map((item: any) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 font-bold text-gray-900">{item.name || item.mealName || "N/A"}</td>
                  <td className="py-6 text-gray-500 text-sm font-medium">
                    {user?.role === "ADMIN" ? item.email : format(new Date(item.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-6">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.status === 'active' || item.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-6 font-black text-gray-900">
                    {user?.role === "ADMIN" ? item.role : `$${item.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-inherit`}>
        <Icon size={24} />
      </div>
      <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-gray-900 mt-2 tracking-tighter">{value}</p>
    </motion.div>
  );
}