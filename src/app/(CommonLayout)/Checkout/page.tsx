"use client";

import { useCart } from "@/src/context/CartContext";
import { motion } from "framer-motion";
import { MapPin, Phone, User, CreditCard, ChevronLeft, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Chattogram", 
  });

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Order Placed Successfully!", {
        description: "Your food is being prepared. Check your dashboard for updates.",
      });
      clearCart();
      router.push("/Orders"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-28">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        
        {/* Navigation back */}
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D70F64] font-bold mb-8 transition-colors group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Shipping Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100"
            >
              <h1 className="text-4xl font-black text-gray-900 mb-8 italic tracking-tighter">
                Delivery <span className="text-[#D70F64]">Details.</span>
              </h1>

              <form onSubmit={handleOrder} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <User size={14} className="text-[#D70F64]" /> Recipient Name
                  </label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Yemtehan Shahil"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Phone size={14} className="text-[#D70F64]" /> Contact Number
                  </label>
                  <input 
                    required
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Delivery Address */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MapPin size={14} className="text-[#D70F64]" /> Shipping Address
                  </label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Apt, Street, Area..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                {/* Payment Method (Visual Only) */}
                <div className="pt-4">
                   <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Payment Method</p>
                   <div className="bg-pink-50 border-2 border-[#D70F64] p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#D70F64] text-white p-2 rounded-xl">
                          <CreditCard size={20} />
                        </div>
                        <span className="font-black text-gray-900 italic">Cash on Delivery</span>
                      </div>
                      <CheckCircle2 className="text-[#D70F64]" />
                   </div>
                </div>

                <Button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-8 rounded-[2rem] text-xl font-black transition-all active:scale-95 shadow-xl disabled:opacity-50 mt-8"
                >
                  {loading ? "Processing Order..." : `Confirm Order — $${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 sticky top-32"
            >
              <h2 className="text-2xl font-black mb-8 italic flex items-center gap-3">
                <Truck className="text-[#D70F64]" /> Order Summary
              </h2>
              
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-8 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-100 text-gray-900 text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-lg">
                        {item.quantity}x
                      </span>
                      <p className="font-bold text-sm text-gray-700 truncate w-32 md:w-48">{item.name}</p>
                    </div>
                    <span className="font-black text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-400 font-bold text-sm uppercase">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-tighter">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-500 font-black">Free</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-900 font-black text-lg italic tracking-tight">Total Payment</span>
                  <span className="text-3xl font-black text-[#D70F64] italic tracking-tighter">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}