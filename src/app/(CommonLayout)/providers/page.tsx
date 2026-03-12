"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MapPin, Info, PlusCircle, Building2, ChefHat } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

export default function ProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProviders = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProviderProfile/all-providers`);
        const result = await res.json();

        if (result.success) {
          setProviders(result.data);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProviders();
  }, []);

  const handleAddMealAction = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    if (user.role !== "PROVIDER") {
      toast.error("Access Denied! Only providers can add meals.");
      return;
    }

    if (!user.hasProfile) {
      toast.info("Create your provider profile first.");
      router.push("/providers/create-profile");
      return;
    }

    router.push("/providers/add-meal");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D70F64] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black italic text-gray-400 animate-pulse">FINDING BEST KITCHENS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#D70F64] font-black uppercase tracking-[0.3em] text-[10px]">
              <ChefHat size={16} /> Certified Partners
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">
              Explore <span className="text-[#D70F64]">Kitchens.</span>
            </h1>
            <p className="text-gray-500 font-medium italic text-lg max-w-md">
              Discover unique tastes from our community of professional home chefs.
            </p>
          </div>

          <Button 
            onClick={handleAddMealAction}
            className="bg-gray-900 hover:bg-[#D70F64] text-white px-10 py-8 rounded-[2rem] text-lg font-black italic shadow-2xl transition-all active:scale-95 flex gap-3"
          >
            <PlusCircle size={24} /> Add Your Meal
          </Button>
        </header>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {providers.length > 0 ? (
            providers.map((provider: any, index: number) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(215,15,100,0.1)] transition-all group"
              >
                {/* Visual Cover */}
                <div className="h-32 bg-gradient-to-r from-pink-50 to-orange-50 group-hover:from-pink-100 transition-colors" />
                
                <div className="px-8 pb-10 -mt-16 flex flex-col items-center text-center">
                  {/* Logo Container */}
                  <div className="relative w-32 h-32 bg-white rounded-[2.5rem] p-2 shadow-xl mb-6">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gray-50 relative">
                      {provider.logoUrl ? (
                        <Image 
                          src={provider.logoUrl} 
                          alt={provider.businessName} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-200">
                          <Building2 size={48} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Provider Info */}
                  <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter mb-2 group-hover:text-[#D70F64] transition-colors">
                    {provider.businessName}
                  </h2>
                  
                  <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                    <MapPin size={12} className="text-[#D70F64]" /> {provider.address}
                  </div>

                  <p className="text-gray-500 text-sm font-medium italic line-clamp-3 mb-8 leading-relaxed">
                    {provider.description || "Bringing you the finest homemade delicacies with love and hygiene."}
                  </p>

                  <Button 
                    onClick={() => router.push(`/providers/${provider.id}`)}
                    className="w-full bg-gray-50 hover:bg-gray-900 text-gray-900 hover:text-white py-7 rounded-[1.8rem] font-black italic transition-all group/btn"
                  >
                    View Full Menu <Info className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={18} />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-white rounded-[4rem] border-4 border-dashed border-gray-100 flex flex-col items-center">
              <div className="bg-gray-50 p-6 rounded-full mb-4 text-gray-300">
                <ChefHat size={60} />
              </div>
              <p className="text-gray-400 font-black italic text-xl uppercase tracking-tighter">No Chefs found at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}