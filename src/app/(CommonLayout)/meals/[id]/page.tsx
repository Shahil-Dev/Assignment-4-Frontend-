"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Clock, ChevronLeft, ShoppingCart, ShieldCheck, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import { toast } from "sonner";

export default function MealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      console.log("No user or token found, redirecting...");
      router.push("/login");
      return;
    }

    const fetchMealDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`);
        const data = await res.json();
        if (data.success) {
            setMeal(data.data);
        } else {
            toast.error("Meal not found");
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
        toast.error("Could not load meal details");
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id, router]);

  const handleAddToCart = () => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      imageUrl: meal.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      quantity: quantity,
      providerId: meal.providerId
    });
    toast.success(`${quantity} plate(s) of ${meal.name} added to cart!`);
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-[#D70F64] animate-pulse">Loading...</div>;
  if (!meal) return <div className="h-screen flex items-center justify-center font-bold">Meal not found!</div>;

  return (
    <div className="min-h-screen bg-white pb-20 pt-28">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        <Link href="/meals" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D70F64] font-bold mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[400px] lg:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src={meal.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} alt={meal.name} fill className="object-cover" priority />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg font-black text-gray-900">
              <Star className="fill-yellow-400 text-yellow-400" size={18} /> {meal.rating || "4.8"}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="bg-pink-100 text-[#D70F64] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                {meal.category?.name}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 italic tracking-tighter">
                {meal.name}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-400 font-bold text-xs uppercase mb-8">
                <span className="flex items-center gap-2"><Clock size={16} className="text-[#D70F64]" /> 25-35 MIN</span>
                <span className="flex items-center gap-2"><Utensils size={16} className="text-[#D70F64]" /> FRESHLY MADE</span>
            </div>

            <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
                {meal.description}
            </p>

            <div className="bg-gray-50 rounded-[2rem] p-5 border border-gray-100 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black text-sm uppercase">
                        {meal.provider?.businessName?.[0]}
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Provider</p>
                        <p className="font-bold text-gray-900 text-sm">{meal.provider?.businessName}</p>
                    </div>
                </div>
                <ShieldCheck className="text-emerald-500" size={24} />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">Price</p>
                    <p className="text-4xl font-black text-gray-900">${meal.price}</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 font-bold">-</button>
                    <span className="w-10 text-center font-black">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 font-bold">+</button>
                </div>
            </div>

            <button 
                onClick={handleAddToCart}
                className="w-full bg-gray-900 hover:bg-[#D70F64] text-white py-6 rounded-[2rem] text-lg font-black transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
            >
                <ShoppingCart size={20} /> Add to Cart — ${(meal.price * quantity).toFixed(2)}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}