"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Utensils, Heart } from "lucide-react";

const features = [
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Super Fast Delivery",
        desc: "Your food reaches your door in under 30 minutes, fresh and steaming hot.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "100% Hygienic",
        desc: "We follow strict safety protocols and regular kitchen inspections.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: <Utensils className="w-8 h-8" />,
        title: "Top Rated Chefs",
        desc: "Every meal is prepared by world-class professional chefs.",
        color: "bg-orange-50 text-orange-600",
    },
];

const Features = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-6"
                    >
                        <h3 className="text-[#D70F64] font-bold tracking-[0.3em] uppercase text-sm">Our Philosophy</h3>
                        <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gray-900 leading-tight">
                            We deliver the <span className="italic text-gray-400">Best Quality</span> food to your table.
                        </h2>
                        <p className="font-quicksand text-lg text-gray-600 leading-relaxed max-w-lg">
                            Through our network of top-tier restaurants and dedicated delivery fleet,
                            we ensure that every bite you take is a moment of pure joy.
                        </p>

                        <div className="pt-4">
                            <button className="group flex items-center gap-3 font-bold text-gray-950 hover:text-[#D70F64] transition-colors">
                                Learn more about our standards
                                <div className="w-10 h-[1px] bg-gray-300 group-hover:w-16 group-hover:bg-[#D70F64] transition-all" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Side: Feature Cards */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Decorative background circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-50 rounded-full blur-3xl -z-10" />

                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                                className={`p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group ${index === 2 ? "md:col-span-2" : ""}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="font-quicksand text-gray-500 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;