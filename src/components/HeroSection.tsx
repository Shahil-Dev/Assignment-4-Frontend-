"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronRight, Utensils, Star, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
    {
        title: "Flavorful Masterpiece.",
        subtitle: "TASTE THE EXTRAORDINARY",
        description: "Discover a world of tastes, prepared with passion and delivered hot to your doorstep.",
        image: "https://images.unsplash.com/photo-1771757279189-9772eb873d89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fERlbGljaW91cyUyMFBhbmNha2VzfGVufDB8fDB8fHww", // Delicious Pancakes
        ctaText: "Order Your Meal",
        ctaUrl: "/meals",
        color: "from-orange-50 via-white to-orange-100",
        accent: "text-orange-600",
        badge: "Hot & Fresh"
    },
    {
        title: "Nature's Purest Fresh.",
        subtitle: "FARM TO TABLE",
        description: "Your favorite food, sourced fresh, prepared right, and delivered with lightning speed.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop", // Healthy Salad Bowl
        ctaText: "Explore Now",
        ctaUrl: "/providers/1",
        color: "from-emerald-50 via-white to-emerald-100",
        accent: "text-emerald-600",
        badge: "100% Organic"
    },
    {
        title: "Chef's Signature Selection.",
        subtitle: "PREMIUM SELECTION",
        description: "Indulge in our curated selection of exquisite dishes, designed to delight your senses.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop", // Premium Pizza
        ctaText: "View Specials",
        ctaUrl: "/meals",
        color: "from-rose-50 via-white to-rose-100",
        accent: "text-[#D70F64]",
        badge: "Chef's Choice"
    },
];

const HeroSection = () => {
    const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 } as const
        },
    };

    return (
        <section className="relative overflow-hidden smooth-gpu bg-white min-h-[85vh] flex items-center">
            <Carousel
                plugins={[autoplayPlugin.current]}
                className="w-full relative z-10"
                opts={{ loop: true, align: "start" }}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="relative">
                            {/* Dynamic Animated Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} -z-10 opacity-60`} />

                            <div className="container mx-auto px-6 md:px-12 py-12 lg:py-20">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                                    {/* Left Content Side */}
                                    <motion.div
                                    
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="space-y-6"
                                    >
                                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100">
                                            <span className={`flex h-2 w-2 rounded-full bg-current ${slide.accent} animate-pulse`} />
                                            <span className={`text-xs font-black tracking-[0.2em] uppercase ${slide.accent}`}>{slide.subtitle}</span>
                                        </motion.div>

                                        <motion.h1
                                            variants={itemVariants}
                                            className="text-6xl md:text-7xl lg:text-8xl font-cormorant font-bold text-gray-950 leading-[0.95] tracking-tight"
                                        >
                                            {slide.title.split(' ').map((word, i) => (
                                                <span key={i} className={i === 1 ? slide.accent : ""}>{word} </span>
                                            ))}
                                        </motion.h1>

                                        <motion.p
                                            variants={itemVariants}
                                            className="font-quicksand text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed"
                                        >
                                            {slide.description}
                                        </motion.p>

                                        <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4">
                                            <Link href={slide.ctaUrl}>
                                                <Button className="h-16 px-10 rounded-2xl bg-gray-950 hover:bg-[#D70F64] text-white text-lg font-bold transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 group">
                                                    {slide.ctaText}
                                                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                            
                                        </motion.div>

                                        {/* Trust Badges */}
                                        <motion.div variants={itemVariants} className="flex items-center gap-8 pt-6 border-t border-gray-200/50">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
                                                <div className="flex text-yellow-500"><Star className="fill-current size-3" /><Star className="fill-current size-3" /><Star className="fill-current size-3" /><Star className="fill-current size-3" /><Star className="fill-current size-3" /></div>
                                            </div>
                                            <div className="h-10 w-[1px] bg-gray-200" />
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-bold text-gray-900">25k+</span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Customers</span>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Right Image Side */}
                                    <div className="relative flex justify-center items-center">
                                        {/* Background Decorative Rings */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-[110%] h-[110%] border border-dashed border-gray-300 rounded-full -z-10 opacity-50"
                                        />

                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            transition={{ duration: 1.2, ease: "circOut" }}
                                            className="relative w-full aspect-square max-w-[550px]"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -20, 0] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-full h-full relative z-20"
                                            >
                                                <Image
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    fill
                                                    className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.2)]"
                                                    priority
                                                />
                                            </motion.div>

                                            {/* Floating Action Cards */}
                                            <motion.div
                                                animate={{ x: [0, 15, 0] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="absolute -right-4 top-1/4 z-30 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 hidden md:block"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-rose-100 p-2 rounded-xl text-[#D70F64]"><Heart className="fill-current size-5" /></div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Popular</p>
                                                        <p className="text-sm font-black text-gray-900">Loved by many</p>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                animate={{ x: [0, -15, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                                className="absolute -left-6 bottom-1/4 z-30 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 hidden md:block"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Clock className="size-5" /></div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Fast Delivery</p>
                                                        <p className="text-sm font-black text-gray-900">20-30 Min</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Professional Navigation Controls */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-xl border-2 border-gray-100 bg-white/80 hover:bg-gray-950 hover:text-white transition-all shadow-xl" />
                    <div className="flex gap-2">
                        {/* {slides.map((_, i) => (
                            <div key={i} className="h-1.5 w-8 rounded-full bg-gray-200 overflow-hidden">
                                <motion.div className="h-full bg-gray-950" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 6 }} />
                            </div>
                        ))} */}
                    </div>
                    <CarouselNext className="static translate-y-0 h-12 w-12 rounded-xl border-2 border-gray-100 bg-white/80 hover:bg-[#D70F64] hover:text-white transition-all shadow-xl" />
                </div>
            </Carousel>

            {/* Background Abstract Shapes */}
            <div className="absolute top-0  right-0 w-[500px] h-[500px] bg-gradient-to-b from-pink-50/50 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-orange-50/50 to-transparent rounded-full blur-3xl -z-10" />
        </section>
    );
};

export { HeroSection };