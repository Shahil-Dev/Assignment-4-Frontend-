"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogIn, X } from "lucide-react";
import Link from "next/link";

export const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center"
        >
          <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>

          <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center text-[#D70F64] mx-auto mb-6">
            <LogIn size={40} />
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2">Login Required!</h2>
          <p className="text-gray-500 font-medium mb-8">
            You need to be logged in to view meal details or add items to your cart.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/login" className="w-full">
              <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-[#D70F64] transition-all shadow-lg shadow-gray-200">
                Go to Login
              </button>
            </Link>
            <button onClick={onClose} className="w-full text-gray-400 font-bold text-sm hover:text-gray-900 transition-colors">
              Maybe Later
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};