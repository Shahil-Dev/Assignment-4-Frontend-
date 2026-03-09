"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/src/lib/validations";
import { Mail, Lock, User, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { registerUser } from "@/src/Service/auth";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function RegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER"
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const toastId = toast.loading(`Creating your ${data.role} account...`);

    try {
      const res = await registerUser(data);

      if (res && res.success) {
        toast.success("Registration successful! Redirecting to login...", { id: toastId });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#FDFDFD] p-6 overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* Aesthetic Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -z-10 opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[480px]"
      >
        <div className="bg-white rounded-[3.5rem] p-10 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-50/50 relative">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-cormorant font-bold text-gray-900 tracking-tight">
              Create <span className="italic text-gray-400">Account</span>
            </h2>
            <p className="text-gray-400 font-quicksand mt-2">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64] transition-colors" size={20} />
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full h-14 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-quicksand font-semibold text-gray-700"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-bold ml-6">{errors.name.message as string}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64] transition-colors" size={20} />
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full h-14 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-quicksand font-semibold text-gray-700"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold ml-6">{errors.email.message as string}</p>}
            </div>

            {/* role Selection Dropdown */}
            <div className="space-y-1">
              <div className="relative group">
                <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64] transition-colors" size={20} />
                <select
                  {...register("role")}
                  className="w-full h-14 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-quicksand font-semibold appearance-none cursor-pointer text-gray-600"
                >
                  <option value="CUSTOMER">Register as CUSTOMER</option>
                  <option value="PROVIDER">Register as Provider</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 text-xs">▼</div>
              </div>
              {errors.role && <p className="text-red-500 text-xs font-bold ml-6">{errors.role.message as string}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D70F64] transition-colors" size={20} />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full h-14 pl-16 pr-8 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-[#D70F64] outline-none transition-all font-quicksand font-semibold text-gray-700"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold ml-6">{errors.password.message as string}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01, backgroundColor: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 bg-[#D70F64] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 mt-4 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Register Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-quicksand font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-[#D70F64] font-black hover:underline underline-offset-4">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}