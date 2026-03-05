"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Utensils, Star, Quote } from "lucide-react";
import Link from "next/link";

const ChefStory = () => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
    const y = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

    return (
        <section className="relative py-24 bg-[#fafafa] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* ১. Visual Side (Left) - Parallax Image Box */}
                    <motion.div
                        style={{ scale, y }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative h-[500px] md:h-[650px] w-full rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)]">
                            <Image
                                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop"
                                alt="Chef Cooking"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            {/* Floating Stat on Image */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#D70F64] p-3 rounded-2xl text-white">
                                        <Utensils size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Experience</p>
                                        <p className="text-xl font-black text-gray-900 font-quicksand">15+ Years Mastery</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-[80px] -z-10 opacity-60" />
                    </motion.div>

                    {/* ২. Content Side (Right) */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3 text-[#D70F64]">
                                <Quote size={40} className="fill-current opacity-20" />
                                <span className="font-bold tracking-[.4em] text-xs uppercase">The Art of Cooking</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-cormorant font-bold text-gray-900 leading-[1.1]">
                                Cooked with <span className="text-[#D70F64]">Soul</span>, Served with <span className="italic text-gray-400 font-medium">Love.</span>
                            </h2>

                            <p className="font-quicksand text-lg text-gray-500 leading-relaxed">
                                Our kitchen is a lab of flavors where traditional recipes meet modern innovation.
                                We believe that great food doesn't just fill your stomach—it creates memories
                                that last a lifetime. Every ingredient is hand-picked daily to ensure perfection.
                            </p>
                        </motion.div>

                        {/* Features List with Custom Bullet Points */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Organic Sourcing", desc: "Straight from local farms" },
                                { title: "Secret Spices", desc: "Unique blends you'll love" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 h-5 w-5 rounded-full border-2 border-[#D70F64] flex items-center justify-center p-1">
                                        <div className="h-full w-full bg-[#D70F64] rounded-full" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link href="/AboutStory">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block"
                                >
                                    <button className="h-16 px-12 rounded-full border-2 border-gray-950 font-bold text-lg hover:bg-gray-950 hover:text-white transition-all duration-300">
                                        Read Our Full Story
                                    </button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChefStory;