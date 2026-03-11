"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Upload, 
  DollarSign, 
  UtensilsCrossed, 
  AlignLeft, 
  ChevronLeft,
  Image as ImageIcon,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

export default function AddMealPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // পরবর্তীতে এখানে API কল হবে
    setTimeout(() => {
      setLoading(false);
      toast.success("Meal Added Successfully!", {
        description: "Your new dish is now visible to customers.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D70F64] font-bold mb-8 transition-colors group text-xs uppercase tracking-widest">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100"
        >
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic leading-none">
              Create New <span className="text-[#D70F64]">Dish.</span>
            </h1>
            <p className="text-gray-400 font-medium italic mt-2">Add a delicious masterpiece to your menu</p>
          </header>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Side: Basic Info */}
            <div className="space-y-6">
              {/* Meal Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <UtensilsCrossed size={14} className="text-[#D70F64]" /> Meal Name
                </label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Traditional Spicy Beef"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Tag size={14} className="text-[#D70F64]" /> Category
                </label>
                <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all appearance-none">
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Breakfast</option>
                  <option>Traditional</option>
                  <option>Healthy</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <DollarSign size={14} className="text-[#D70F64]" /> Price (USD)
                </label>
                <input 
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Side: Description & Image */}
            <div className="space-y-6">
              {/* Image Upload Placeholder */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#D70F64]" /> Meal Photo
                </label>
                <div className="w-full h-[155px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 group hover:border-[#D70F64] hover:bg-pink-50 transition-all cursor-pointer">
                  <Upload size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Click to Upload</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <AlignLeft size={14} className="text-[#D70F64]" /> Description
                </label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about the ingredients and taste..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all resize-none placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Full Width Button */}
            <div className="md:col-span-2 pt-4">
              <Button 
                disabled={loading}
                type="submit" 
                className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-8 rounded-[2rem] text-xl font-black transition-all active:scale-95 shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? "Creating..." : <><Plus size={20} /> Publish Meal</>}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}