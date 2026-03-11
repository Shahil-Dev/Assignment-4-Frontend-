"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, AlignLeft, Link as LinkIcon, Rocket, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";

export default function CreateProviderProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    description: "",
    logoUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      
      console.log("Profile Data:", formData);

      setTimeout(() => {
        setLoading(false);
        toast.success("Welcome Chef!", { 
          description: `${formData.businessName} is now ready for business.` 
        });
        router.push("/dashboard"); 
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 pt-28 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-gray-100 max-w-2xl w-full"
      >
        <header className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#D70F64] to-[#ff4d94] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-pink-100 animate-bounce-slow">
            <Building2 size={44} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic leading-none">
            Kitchen <span className="text-[#D70F64]">Profile.</span>
          </h1>
          <p className="text-gray-400 font-bold italic mt-3 uppercase text-[10px] tracking-[0.2em]">
            Setup your business identity to start selling
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Business Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 ml-2">
              <Building2 size={14} className="text-[#D70F64]" /> Business Name
            </label>
            <input 
              required 
              type="text"
              placeholder="e.g. Helaly's Signature Kitchen" 
              className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all placeholder:text-gray-300 shadow-sm"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />
          </div>

          {/* Logo URL Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 ml-2">
              <LinkIcon size={14} className="text-[#D70F64]" /> Logo Image URL
            </label>
            <div className="relative group">
              <input 
                type="url"
                placeholder="https://your-image-link.com/logo.jpg" 
                className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all placeholder:text-gray-300 shadow-sm"
                value={formData.logoUrl}
                onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              />
              <Camera className="absolute right-6 top-5 text-gray-300 group-focus-within:text-[#D70F64] transition-colors" size={20} />
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 ml-2">
              <MapPin size={14} className="text-[#D70F64]" /> Pick-up Address
            </label>
            <input 
              required 
              type="text"
              placeholder="Full Address (e.g. South Khulshi, Chattogram)" 
              className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all placeholder:text-gray-300 shadow-sm"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 ml-2">
              <AlignLeft size={14} className="text-[#D70F64]" /> Business Description
            </label>
            <textarea 
              rows={3} 
              placeholder="Tell customers about your kitchen's specialty..." 
              className="w-full bg-gray-50 border-none rounded-[2rem] py-6 px-8 font-bold text-gray-900 focus:ring-2 focus:ring-[#D70F64] outline-none transition-all resize-none placeholder:text-gray-300 shadow-sm"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <Button 
            disabled={loading} 
            className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-9 rounded-[2.5rem] text-xl font-black shadow-2xl shadow-pink-100 active:scale-95 transition-all group flex items-center justify-center gap-3"
          >
            {loading ? "Launching Your Kitchen..." : (
              <>
                Confirm & Start Selling <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}