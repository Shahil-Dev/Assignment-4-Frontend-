"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Utensils, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const userStr = localStorage.getItem("user");
    const token = userStr ? JSON.parse(userStr).token : null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/provider-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setOrders(result.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const userStr = localStorage.getItem("user");
    const token = userStr ? JSON.parse(userStr).token : null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(`Order marked as ${newStatus}`);
        fetchOrders(); 
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 italic">Incoming <span className="text-[#D70F64]">Orders.</span></h1>

        <div className="grid gap-6">
          {orders.length === 0 ? (
            <p className="text-gray-400 font-bold">No orders found yet.</p>
          ) : (
            orders.map((order: any) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-pink-50 p-4 rounded-2xl">
                    <Utensils className="text-[#D70F64]" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Order #{order.id.slice(-6)}</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">
                      Customer: {order.customer.name}
                    </p>
                    <div className="flex gap-2 mt-1">
                      {order.items.map((item: any) => (
                        <span key={item.id} className="text-xs bg-gray-100 px-2 py-1 rounded-lg font-bold">
                          {item.quantity}x {item.meal.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="text-right mr-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase">Total Amount</p>
                      <p className="text-xl font-black text-[#D70F64]">${order.totalAmount}</p>
                   </div>
                   
                   {/* স্ট্যাটাস বাটনগুলো */}
                   <div className="flex gap-2">
                     {order.status === "PLACED" && (
                       <>
                         <button 
                           onClick={() => updateStatus(order.id, "PREPARING")}
                           className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#D70F64] transition-all"
                         >
                           Accept & Prepare
                         </button>
                         <button 
                           onClick={() => updateStatus(order.id, "CANCELLED")}
                           className="bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-500 transition-all"
                         >
                           Cancel
                         </button>
                       </>
                     )}

                     {order.status === "PREPARING" && (
                       <button 
                         onClick={() => updateStatus(order.id, "READY")}
                         className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm"
                       >
                         Mark as Ready
                       </button>
                     )}

                     {order.status === "READY" && (
                       <span className="bg-green-50 text-green-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                         <CheckCircle2 size={16} /> Ready for Delivery
                       </span>
                     )}
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}