"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/src/lib/validations";
import { ArrowLeft, User, Mail, Lock, UserCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Registering:", data);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-red-50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] -z-10" />

      {/* Floating Back Button */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-8 left-8 z-20"
      >
        <Link href="/">
          <button className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-gray-600 hover:text-black hover:shadow-lg transition-all duration-300 font-quicksand font-bold">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[550px] bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-gray-50 z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="inline-block p-4 bg-red-50 rounded-3xl mb-4 text-[#D70F64]"
          >
            <UserCircle2 size={40} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 font-quicksand mt-2 font-medium">
            Join our premium food community today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Name</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D70F64] transition-colors" size={20} />
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-400' : 'border-transparent'} focus:bg-white focus:border-[#D70F64] focus:ring-4 focus:ring-red-50 outline-none transition-all font-quicksand font-semibold`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-4 font-bold">{errors.name.message as string}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D70F64] transition-colors" size={20} />
              <input
                {...register("email")}
                placeholder="hello@example.com"
                className={`w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:bg-white focus:border-[#D70F64] focus:ring-4 focus:ring-red-50 outline-none transition-all font-quicksand font-semibold`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-4 font-bold">{errors.email.message as string}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D70F64] transition-colors" size={20} />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-quicksand font-semibold"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Join As</label>
              <div className="relative">
                <select
                  {...register("role")}
                  className="w-full h-16 px-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all appearance-none cursor-pointer font-quicksand font-bold text-gray-700"
                >
                  <option value="user">User / Diner</option>
                  <option value="provider">Food Provider</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#000" }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-gray-950 text-white rounded-2xl font-black text-lg shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all mt-6 uppercase tracking-widest"
          >
            Create My Account
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-10 font-quicksand font-medium">
          Already a member?{" "}
          <Link href="/login" className="text-[#D70F64] font-black hover:underline underline-offset-4">
            Sign In Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}