"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, AlignLeft, Link as LinkIcon, Loader2 } from "lucide-react";
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

  const getToken = () => {
    if (typeof window === "undefined") return null;

    let token = localStorage.getItem("token");
    if (token) return token;

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.token) return user.token;
      } catch (e) {
        console.error("User JSON parse error");
      }
    }

    const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
    if (match) return match[1];

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = getToken();

    if (!token) {
      toast.error("Authentication missing! Please login again.");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProviderProfile/ProviderProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Provider Profile Created Successfully!");
        router.push("/providers/add-meal"); 
      } else {
        // যদি অলরেডি প্রোফাইল থাকে, তবে সরাসরি অ্যাড মিলে পাঠিয়ে দাও
        if (data.message === "Provider profile already exists for this user!") {
          toast.info("You already have a profile! Redirecting to add meal...");
          router.push("/providers/add-meal");
        } 
        else if (res.status === 401) {
          toast.error("Session expired. Please login again.");
          router.push("/login");
        } 
        else {
          toast.error(data.message || "Failed to create profile");
        }
      }
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error("Network error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-sm border border-gray-100 max-w-2xl w-full"
      >
        <header className="text-center mb-10">
          <div className="w-20 h-20 bg-[#D70F64] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Building2 size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">
            Kitchen <span className="text-[#D70F64]">Profile.</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 px-4">
              <Building2 size={12} /> Business Name
            </label>
            <input 
              required 
              placeholder="Your Kitchen Name" 
              value={formData.businessName} 
              onChange={(e) => setFormData({...formData, businessName: e.target.value})} 
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 px-4">
              <LinkIcon size={12} /> Logo URL
            </label>
            <input 
              placeholder="https://image-link.com" 
              value={formData.logoUrl} 
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} 
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 px-4">
              <MapPin size={12} /> Address
            </label>
            <input 
              required 
              placeholder="Kitchen Location" 
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none focus:ring-2 focus:ring-[#D70F64]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 px-4">
              <AlignLeft size={12} /> Description
            </label>
            <textarea 
              placeholder="Tell us about your kitchen..." 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 font-bold outline-none resize-none h-24" 
            />
          </div>

          <Button 
            type="submit"
            disabled={loading} 
            className="w-full bg-black hover:bg-[#D70F64] text-white py-8 rounded-2xl text-lg font-black transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm & Start Selling"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}