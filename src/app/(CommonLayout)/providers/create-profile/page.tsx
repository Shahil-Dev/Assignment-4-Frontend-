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
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("User session not found. Please login again.");
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    
    // তোমার লগইন ডাটা স্ট্রাকচার অনুযায়ী এই ৩টি কমন জায়গার একটিতে টোকেন থাকে
    // ১. user.token
    // ২. user.accessToken
    // ৩. user.data.accessToken (যদি ব্যাকএন্ড থেকে সরাসরি ডাটা অবজেক্ট সেভ করো)
    const token = user?.token || user?.accessToken || user?.data?.accessToken; 

    if (!token) {
      console.log("LocalStorage User Object:", user); // চেক করার জন্য
      toast.error("Authentication token missing! Please login again.");
      setLoading(false);
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProviderProfile/ProviderProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: JSON.stringify(formData), 
    });

    const result = await res.json();

    if (result.success) {
      toast.success("Profile created successfully!");
      
      // LocalStorage আপডেট যাতে ইউজার সাথে সাথে কাজ করতে পারে
      const updatedUser = { ...user, hasProfile: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      router.push("/providers/add-meal");
    } else {
      toast.error(result.message || "Submission failed");
    }
  } catch (error: any) {
    toast.error("Connection failed!");
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 pt-28 pb-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-sm border border-gray-100 max-w-2xl w-full">
        <header className="text-center mb-12">
          <div className="w-24 h-24 bg-[#D70F64] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Building2 size={44} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic italic">
            Kitchen <span className="text-[#D70F64]">Profile.</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <Building2 size={14} className="text-[#D70F64]" /> Business Name
            </label>
            <input 
              required 
              type="text" 
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <LinkIcon size={14} className="text-[#D70F64]" /> Logo Image URL
            </label>
            <input 
              type="url" 
              value={formData.logoUrl}
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <MapPin size={14} className="text-[#D70F64]" /> Address
            </label>
            <input 
              required 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 px-8 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
              <AlignLeft size={14} className="text-[#D70F64]" /> Description
            </label>
            <textarea 
              rows={3} 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 border-none rounded-[2rem] py-6 px-8 font-bold outline-none resize-none" 
            />
          </div>

          <Button disabled={loading} className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-9 rounded-[2.5rem] text-xl font-black">
            {loading ? "Launching..." : "Confirm & Start Selling"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}