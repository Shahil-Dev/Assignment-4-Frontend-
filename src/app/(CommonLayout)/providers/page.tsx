"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Info, PlusCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function ProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProviders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProviderProfile/ProviderProfile`);
        const data = await res.json();
        setProviders(data);
      } catch (error) {
        toast.error("Could not load providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [router]);

  const handleAddMealRedirect = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (user.role !== "PROVIDER") {
      toast.error("Only Providers can add meals!");
      return;
    }

    if (!user.hasProfile) {
      router.push("/providers/create-profile");
    } else {
      router.push("/providers/add-meal");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center tracking-tighter font-black italic">LOADING KITCHENS...</div>;

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
              Expert <span className="text-[#D70F64]">Chefs.</span>
            </h1>
            <p className="text-gray-500 font-bold italic mt-2 uppercase text-[10px] tracking-widest">Discover professional kitchens near you</p>
          </div>
          
          <Button 
            onClick={handleAddMealRedirect}
            className="bg-gray-900 hover:bg-[#D70F64] text-white px-8 py-7 rounded-2xl font-black italic transition-all active:scale-95 shadow-xl"
          >
            <PlusCircle className="mr-2" size={20} /> Add Your Meal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider: any, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 group hover:shadow-2xl hover:shadow-pink-100/50 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 p-1 border-2 border-dashed border-pink-200 rounded-[2.5rem] group-hover:border-[#D70F64] transition-colors">
                  <div className="relative w-full h-full overflow-hidden rounded-[2.2rem]">
                    <Image 
                      src={provider.logoUrl || "/placeholder-chef.jpg"} 
                      alt={provider.businessName} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-black text-gray-900 italic tracking-tight mb-2 group-hover:text-[#D70F64] transition-colors">
                  {provider.businessName}
                </h2>

                <div className="flex items-center gap-1 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                  <MapPin size={12} className="text-[#D70F64]" /> {provider.address}
                </div>

                <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 italic">
                  {provider.description || "No description available for this kitchen."}
                </p>

                <Button 
                  onClick={() => router.push(`/providers/${provider.id}`)}
                  className="w-full bg-gray-50 hover:bg-gray-900 text-gray-900 hover:text-white py-6 rounded-2xl font-black italic transition-all group/btn"
                >
                  View Kitchen <Info className="ml-2 group-hover/btn:rotate-12 transition-transform" size={18} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}