"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Loader2, 
  Mail, 
  UserCircle 
} from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    const userStr = localStorage.getItem("user");
    const token = userStr ? JSON.parse(userStr).token : null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error(result.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    const userStr = localStorage.getItem("user");
    const token = userStr ? JSON.parse(userStr).token : null;

    const toastId = toast.loading(`Updating status to ${newStatus}...`);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(`User is now ${newStatus}`, { id: toastId });
        fetchUsers(); 
      } else {
        toast.error(result.message || "Update failed", { id: toastId });
      }
    } catch (error) {
      console.error("CORS or Network Error:", error);
      toast.error("CORS Error: PATCH method is blocked by server!", { id: toastId });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D70F64]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter text-gray-900">
              User <span className="text-[#D70F64]">Control.</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase text-xs mt-2 tracking-widest">
              Platform Management / {users.length} Members
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-none rounded-2xl py-5 pl-14 pr-6 shadow-xl shadow-gray-100 outline-none focus:ring-2 focus:ring-[#D70F64] transition-all font-medium"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">Basic Profile</th>
                  <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">Access Level</th>
                  <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">Current Status</th>
                  <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user.id} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-black text-xl">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-lg tracking-tight">{user.name}</p>
                          <p className="text-gray-400 font-medium text-sm flex items-center gap-1">
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className={`flex items-center gap-2 font-black text-sm ${
                        user.status === 'active' ? 'text-emerald-500' : 'text-red-500'
                      }`}>
                        {user.status === 'active' ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                        {user.status.toUpperCase()}
                      </div>
                    </td>
                    <td className="p-8 text-right">
                      <button 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                          user.status === 'active' 
                          ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' 
                          : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {user.status === 'active' ? 'Block Access' : 'Authorize User'}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}