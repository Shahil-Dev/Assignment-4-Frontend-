"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Target, Users } from "lucide-react";

const AboutUs = () => {
    return (
        <main className="pt-24 pb-20 bg-white">
            {/* 1. Header Section */}
            <section className="container mx-auto px-6 text-center mb-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#D70F64] font-bold tracking-[0.3em] uppercase text-sm"
                >
                    Our Journey
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-cormorant font-bold text-gray-900 mt-4"
                >
                    The Heart Behind <br /> <span className="italic text-gray-400">Every Dish.</span>
                </motion.h1>
            </section>

            {/* 2. Hero Image Section */}
            <section className="container mx-auto px-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative h-[400px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop"
                        alt="Our Kitchen Story"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
            </section>

            {/* 3. Detailed Story Grid */}
            <section className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-cormorant font-bold text-gray-900">How It All Started</h2>
                        <p className="font-quicksand text-lg text-gray-600 leading-relaxed">
                            Founded in 2010, our journey began in a small garage with a big dream:
                            to make gourmet food accessible to everyone. We believed that fast food
                            doesn't have to be "junk" food.
                        </p>
                        <p className="font-quicksand text-lg text-gray-600 leading-relaxed">
                            We traveled across continents, learning secret spices and traditional
                            techniques from local masters. Today, we stand as a symbol of quality
                            and taste, serving over 50,000 happy customers every month.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Stats/Values Cards */}
                        {[
                            { icon: <Target className="text-red-500" />, title: "Our Mission", text: "To deliver happiness through every bite of our fresh, organic meals." },
                            { icon: <Heart className="text-pink-500" />, title: "Our Passion", text: "Crafting flavors that tell a story of tradition and innovation." },
                            { icon: <Users className="text-blue-500" />, title: "Community", text: "Supporting local farmers and sustainable sourcing for 10+ years." }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex gap-6 items-start"
                            >
                                <div className="p-3 bg-white rounded-2xl shadow-sm">{value.icon}</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2">{value.title}</h4>
                                    <p className="text-gray-500 font-quicksand">{value.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;