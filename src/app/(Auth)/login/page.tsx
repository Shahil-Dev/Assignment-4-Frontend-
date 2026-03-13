"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/src/lib/validations";
import { Mail, Lock, ArrowRight, Home, Loader2 } from "lucide-react";
import { loginUser } from "@/src/Service/auth";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data: any) => {
  setIsLoading(true);
  try {
    const res = await loginUser(data);

    if (res && res.success) {
      const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
      const tokenFromCookie = match ? match[1] : null;

      const userData = res.data;
      const userToSave = {
        ...userData,
        token: tokenFromCookie
      };

      localStorage.setItem("user", JSON.stringify(userToSave));
      if (tokenFromCookie) localStorage.setItem("token", tokenFromCookie);

      toast.success("Login Successful!");

      // --- REDIRECT LOGIC ---
      if (userData.role === "PROVIDER") {
        // Jodi backend theke providerProfile ashe (orthat null na hoy)
        if (userData.providerProfile) {
          router.push("/providers/add-meal"); // Profile thakle add-meal page
        } else {
          router.push("/providers/create-profile"); // Profile na thakle create-profile page
        }
      } else if (userData.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  } catch (error: any) {
    toast.error(error.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FDFDFD] p-6 overflow-hidden">
      <Toaster position="top-center" richColors />
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60" />

      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute top-8 left-8 z-20">
        <Link href="/">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-gray-500 hover:text-black hover:shadow-xl transition-all duration-300 font-bold text-sm">
            <Home size={16} /> Back to home
          </button>
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-[480px]">
        <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-xl border border-gray-50/50 relative">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">Welcome <span className="italic text-gray-400">Back</span></h2>
            <p className="text-gray-400 mt-3 font-medium text-lg">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64]" size={20} />
              <input 
                {...register("email")} 
                placeholder="Email Address" 
                disabled={isLoading} 
                className="w-full h-16 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-semibold" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message as string}</p>}
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64]" size={20} />
              <input 
                type="password" 
                {...register("password")} 
                placeholder="Password" 
                disabled={isLoading} 
                className="w-full h-16 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-semibold" 
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-4">{errors.password.message as string}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-16 bg-[#D70F64] text-white rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-3 hover:bg-black transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In Now <ArrowRight size={20} /></>}
            </button>
          </form>
          <div className="mt-8 text-center text-gray-500">
            New here? <Link href="/Registration" className="text-[#D70F64] font-black hover:underline">Create Account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}