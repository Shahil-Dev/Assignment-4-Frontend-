"use client";

import { motion } from "framer-motion";
import { DollarSign, UtensilsCrossed, AlignLeft, ChevronLeft, Image as ImageIcon, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddMealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState({
    name: "",
    category: "LUNCH", 
    price: "",
    description: "",
    imageUrl: ""
  });

  const getToken = () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.token || localStorage.getItem("token");
      } catch (e) {
        return localStorage.getItem("token");
      }
    }
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const token = getToken();

  try {
    const payload = {
      name: mealData.name,
      description: mealData.description,
      price: parseFloat(mealData.price),
      imageUrl: mealData.imageUrl || "",
      categoryName: mealData.category 
    };

    console.log("Sending Payload:", payload);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/create-meal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      toast.success("Meal Added Successfully!");
      router.push("/providers/ProviderDashboard");
    } else {
      toast.error(result.message || "Failed to add meal");
    }
  } catch (error) {
    toast.error("Connection error!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D70F64] font-bold mb-8 transition-colors group text-xs uppercase tracking-widest">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic leading-none">
              Create New <span className="text-[#D70F64]">Dish.</span>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                  <UtensilsCrossed size={14} className="text-[#D70F64]" /> Meal Name
                </label>
                <input 
                  required 
                  type="text" 
                  value={mealData.name}
                  onChange={(e) => setMealData({...mealData, name: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                  <Tag size={14} className="text-[#D70F64]" /> Category
                </label>
                <select 
                  value={mealData.category}
                  onChange={(e) => setMealData({...mealData, category: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-[#D70F64]"
                >
                  <option value="LUNCH">Lunch</option>
                  <option value="DINNER">Dinner</option>
                  <option value="BREAKFAST">Breakfast</option>
                  <option value="SNACKS">Snacks</option>
                  <option value="DESSERT">Dessert</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                  <DollarSign size={14} className="text-[#D70F64]" /> Price (USD)
                </label>
                <input 
                  required 
                  type="number" 
                  step="0.01"
                  value={mealData.price}
                  onChange={(e) => setMealData({...mealData, price: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                  <ImageIcon size={14} className="text-[#D70F64]" /> Image URL
                </label>
                <input 
                  type="text" 
                  placeholder="https://image-link.com"
                  value={mealData.imageUrl}
                  onChange={(e) => setMealData({...mealData, imageUrl: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                  <AlignLeft size={14} className="text-[#D70F64]" /> Description
                </label>
                <textarea 
                  rows={4} 
                  required
                  value={mealData.description}
                  onChange={(e) => setMealData({...mealData, description: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none resize-none focus:ring-2 focus:ring-[#D70F64]" 
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <Button 
                disabled={loading} 
                type="submit" 
                className="w-full bg-black hover:bg-[#D70F64] text-white py-8 rounded-[2rem] text-xl font-black transition-all shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Publish Dish Now"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}