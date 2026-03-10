"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Eye, ShoppingCart, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/context/CartContext";
import { toast } from "sonner";
import { LoginModal } from "./LoginModal";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

export const MealCard = ({ meal }: { meal: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const imageSrc = meal.imageUrl && meal.imageUrl.trim() !== "" ? meal.imageUrl : DEFAULT_IMAGE;



const handleAction = (e: React.MouseEvent, type: "details" | "cart") => {
  e.preventDefault();
  const user = typeof window !== "undefined" ? localStorage.getItem("USER") : null;

  if (!user) {
    setIsModalOpen(true);
  } else {
    if (type === "details") {
      router.push(`/meals/${meal.id}`);
    } else {
      addToCart({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        imageUrl: imageSrc,
        quantity: 1, 
        providerId: meal.providerId
      });
      toast.success(`${meal.name} added to cart!`, {
        description: "Check your cart to complete the order.",
      });
    }
  }
};



  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-50 group transition-all hover:shadow-2xl hover:shadow-pink-100/50"
      >
        <div className="relative h-52 w-full rounded-[2rem] overflow-hidden mb-5">
          <Image
            src={imageSrc}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm z-10">
            <span className="text-[10px] font-black text-[#D70F64] uppercase tracking-widest">
              {meal.category?.name || "Premium"}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm z-10">
            <Star className="fill-yellow-400 text-yellow-400" size={12} />
            <span className="text-[10px] font-black text-gray-900">{meal.rating || "4.8"}</span>
          </div>
        </div>

        <div className="px-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-black text-gray-900 truncate pr-2 group-hover:text-[#D70F64] transition-colors">
              {meal.name}
            </h3>
            <span className="text-[#D70F64] font-black text-lg">${meal.price}</span>
          </div>

          <p className="text-gray-400 text-xs font-medium line-clamp-2 mb-4 h-8">
            {meal.description}
          </p>

          <div className="flex items-center gap-2 mb-5 p-2 bg-gray-50 rounded-xl border border-gray-100/50">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[#D70F64] font-bold text-[8px] uppercase">
              {meal.provider?.businessName?.[0]}
            </div>
            <span className="text-[10px] font-bold text-gray-600 truncate uppercase tracking-tight">
              By {meal.provider?.businessName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleAction(e, "details")}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-2xl font-bold text-xs hover:bg-gray-200 transition-all active:scale-95"
            >
              <Eye size={16} /> Details
            </button>
            <button
              onClick={(e) => handleAction(e, "cart")}
              className="flex-[1.2] flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold text-xs hover:bg-[#D70F64] transition-all shadow-lg active:scale-95"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </motion.div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};