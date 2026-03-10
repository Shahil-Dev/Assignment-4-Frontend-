"use client";

import { useCart } from "@/src/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-32 h-32 bg-pink-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag size={48} className="text-[#D70F64]" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter italic">Your cart is empty!</h1>
                    <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added any deliciousness yet.</p>
                    <Button asChild className="bg-gray-900 hover:bg-[#D70F64] text-white px-8 py-6 rounded-2xl font-bold transition-all">
                        <Link href="/meals">Browse Our Menu</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] pb-20 pt-28">
            <div className="container mx-auto px-4 lg:max-w-6xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <Link href="/meals" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D70F64] font-bold mb-4 transition-colors group text-sm uppercase tracking-widest">
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Continue Shopping
                        </Link>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter italic leading-none">
                            Your <span className="text-[#D70F64]">Cart.</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 font-bold text-lg italic">
                        {cartCount} {cartCount > 1 ? "Items" : "Item"} selected
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="bg-white rounded-[2.5rem] p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-pink-100/30 transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative h-32 w-full md:w-32 rounded-[1.8rem] overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110 duration-700"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-[#D70F64] transition-colors italic">
                                            {item.name}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mb-3">
                                            Premium Quality Meal
                                        </p>
                                        <p className="text-2xl font-black text-gray-900">${item.price}</p>
                                    </div>

                                    {/* Quantity Controller */}
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-10 h-10 flex items-center justify-center font-bold text-gray-500 hover:text-[#D70F64] transition-colors"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-10 text-center font-black text-gray-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center font-bold text-gray-500 hover:text-[#D70F64] transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-4 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-pink-200 sticky top-32"
                        >
                            <h2 className="text-2xl font-black mb-8 italic tracking-tight uppercase">Summary</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center text-gray-400 font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 font-bold">
                                    <span>Delivery</span>
                                    <span className="text-emerald-400 uppercase text-xs font-black">Free</span>
                                </div>
                                <div className="h-[1px] bg-white/10 w-full" />
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Amount</span>
                                    <span className="text-4xl font-black italic">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/Checkout">
                                <Button className="w-full bg-[#D70F64] hover:bg-white hover:text-[#D70F64] text-white py-8 rounded-2xl text-xl font-black transition-all group flex items-center gap-3 active:scale-95 shadow-lg">
                                    Checkout
                                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>

                            <p className="text-[10px] text-gray-500 text-center mt-6 font-bold uppercase tracking-widest">
                                Tax included • Secure Payment
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}