"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user", err);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <aside className="w-72 bg-white border-r border-gray-100 hidden md:block">
        <div className="p-8">
          <h1 className="text-2xl font-black text-[#D70F64] tracking-tighter">FOODIE</h1>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">
            {user?.role} Portal
          </p>
        </div>

        <nav className="px-4 space-y-2">
          <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</div>

          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-red-50 text-[#D70F64] rounded-2xl font-bold transition-all">
            Overview
          </a>

          {/* Role Based Conditional Rendering */}
          {user?.role === "PROVIDER" ? (
            <a href="/dashboard/my-services" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all">
              Manage Services
            </a>
          ) : (
            <a href="/dashboard/my-bookings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold transition-all">
              My Orders
            </a>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Welcome back,</span>
            <span className="font-bold text-gray-800">{user?.name || "User"}</span>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="px-5 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}