"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, ChevronRight, ShoppingBag, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";

const MOCK_ORDERS = [
  {
    id: "ORD-9921",
    date: "10 March, 2026",
    status: "Preparing",
    total: 45.50,
    items: 3,
    address: "Oxygen, Chattogram",
  },
  {
    id: "ORD-8842",
    date: "08 March, 2026",
    status: "Delivered",
    total: 22.00,
    items: 1,
    address: "GEC Circle, Chattogram",
  },
  {
    id: "ORD-7710",
    date: "05 March, 2026",
    status: "Cancelled",
    total: 15.00,
    items: 2,
    address: "Halishahar, Chattogram",
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Preparing": return "bg-blue-50 text-blue-600 border-blue-100";
    case "Pending": return "bg-amber-50 text-amber-600 border-amber-100";
    default: return "bg-gray-50 text-gray-500 border-gray-100";
  }
};

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-28">
      <div className="container mx-auto px-4 lg:max-w-4xl">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic mb-2">
            My <span className="text-[#D70F64]">Orders.</span>
          </h1>
          <p className="text-gray-500 font-medium italic">Track your delicious meals in real-time</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {MOCK_ORDERS.length > 0 ? (
            MOCK_ORDERS.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-pink-100/30 transition-all relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Order Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-pink-50 group-hover:text-[#D70F64] transition-colors">
                      <Package size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 italic tracking-tight mb-1">
                        #{order.id}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock size={12} /> {order.date}</span>
                        <span>•</span>
                        <span>{order.items} {order.items > 1 ? "Items" : "Item"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      getStatusColor(order.status)
                    )}>
                      {order.status}
                    </div>
                    <p className="text-2xl font-black text-gray-900 italic">${order.total.toFixed(2)}</p>
                  </div>

                  {/* Action Link */}
                  <Link 
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-center w-full md:w-12 h-12 bg-gray-900 text-white rounded-2xl hover:bg-[#D70F64] transition-all group-hover:scale-105"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-2 text-gray-400">
                  <MapPin size={14} className="text-[#D70F64]" />
                  <span className="text-xs font-bold uppercase tracking-tight truncate">{order.address}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <ShoppingBag size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">No orders found!</h2>
              <p className="text-gray-500 mb-8">Ready to order your first meal?</p>
              <Button asChild className="bg-gray-900 hover:bg-[#D70F64] rounded-2xl px-8 py-6">
                <Link href="/meals">Go to Menu</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
