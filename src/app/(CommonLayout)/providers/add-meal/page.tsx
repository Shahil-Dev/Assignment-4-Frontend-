"use client";

import { motion } from "framer-motion";
import { Plus, Upload, DollarSign, UtensilsCrossed, AlignLeft, ChevronLeft, Image as ImageIcon, Tag } from "lucide-react";
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
    category: "Lunch",
    price: "",
    description: "",
    imageUrl: "" // আপাতত হার্ডকোড বা স্ট্রিং হিসেবে
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user?.token;

      if (!token) {
        toast.error("Please login again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...mealData,
          price: parseFloat(mealData.price) // প্রাইসকে নাম্বার হিসেবে পাঠানো জরুরি
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Meal Added Successfully!");
        router.push("/providers");
      } else {
        toast.error(result.message || "Failed to add meal");
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection failed!");
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
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
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Tag size={14} className="text-[#D70F64]" /> Category
                </label>
                <select 
                  value={mealData.category}
                  onChange={(e) => setMealData({...mealData, category: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none appearance-none"
                >
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Breakfast</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <DollarSign size={14} className="text-[#D70F64]" /> Price (USD)
                </label>
                <input 
                  required 
                  type="number" 
                  value={mealData.price}
                  onChange={(e) => setMealData({...mealData, price: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none" 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#D70F64]" /> Image URL
                </label>
                <input 
                  type="text" 
                  placeholder="Paste image link here"
                  value={mealData.imageUrl}
                  onChange={(e) => setMealData({...mealData, imageUrl: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <AlignLeft size={14} className="text-[#D70F64]" /> Description
                </label>
                <textarea 
                  rows={4} 
                  value={mealData.description}
                  onChange={(e) => setMealData({...mealData, description: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none resize-none" 
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <Button disabled={loading} type="submit" className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-8 rounded-[2rem] text-xl font-black">
                {loading ? "Creating..." : "Publish Meal"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}