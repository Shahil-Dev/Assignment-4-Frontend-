"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden text-center">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D70F64] opacity-10 blur-[100px] -mr-32 -mt-32"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-6">
                        Get 20% Off Your <span className="text-[#D70F64]">First Meal.</span>
                    </h2>
                    <p className="text-gray-400 font-medium max-w-lg mx-auto mb-10">
                        Subscribe to our newsletter and stay updated with the latest menus and exclusive discounts.
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#D70F64]"
                        />
                        <Button className="h-14 px-8 rounded-2xl bg-[#D70F64] hover:bg-pink-700 text-white font-black uppercase tracking-widest transition-all">
                            Join Now <Send className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}