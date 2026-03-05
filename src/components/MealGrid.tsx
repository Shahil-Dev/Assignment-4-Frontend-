"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Clock, Flame, Heart } from "lucide-react";

interface IMeal {
    _id: string;
    name: string;
    category: string;
    price: number;
    rating?: number;
    time?: string;
    calories?: string;
    image: string;
    badge?: string;
    providerName?: string; 
}

interface MealGridProps {
    meals: IMeal[]; 
    title?: string;
}

const MealGrid = ({ meals, title = "Most Popular Dishes" }: MealGridProps) => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">

                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#D70F64] font-bold tracking-[0.3em] uppercase text-xs"
                    >
                        Fresh from our Providers
                    </motion.span>
                    <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gray-900 mt-2">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {meals?.map((meal, index) => (
                        <motion.div
                            key={meal._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10 }}
                            className="group bg-white rounded-[2.5rem] p-4 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-60 w-full rounded-[2rem] overflow-hidden mb-5">
                                <Image
                                    src={meal.image || "/placeholder-food.jpg"}
                                    alt={meal.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {meal.badge && (
                                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-xl bg-[#D70F64] text-white text-[10px] font-black uppercase tracking-widest">
                                        {meal.badge}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="px-2 space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>{meal.category}</span>
                                    {meal.providerName && <span className="text-[#D70F64]">By {meal.providerName}</span>}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                                    {meal.name}
                                </h3>

                                <div className="flex items-center gap-4 text-gray-400 text-xs">
                                    <div className="flex items-center gap-1"><Clock size={14} /> {meal.time || "20 min"}</div>
                                    <div className="flex items-center gap-1 text-yellow-500"><Star size={14} className="fill-current" /> {meal.rating || 5.0}</div>
                                </div>

                                <div className="pt-4 flex justify-between items-center border-t border-gray-50">
                                    <span className="text-2xl font-black text-gray-950 font-quicksand">${meal.price}</span>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-gray-950 text-white rounded-xl hover:bg-[#D70F64] transition-all"
                                    >
                                        <ShoppingCart size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MealGrid;