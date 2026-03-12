"use client";

import { Menu, ShoppingCart, Search, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const Navbar1 = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart(); 
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user"); 
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    setIsProfileOpen(false);
    router.push("/login");
  };

  const menu = [
    { title: "Home", url: "/" },
    { title: "Browse Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
      <div className="container mx-auto px-4 lg:max-w-6xl lg:mx-auto md:px-6">
        <nav className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-[#D70F64] to-[#ff4d94] p-2 rounded-xl shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
              <ShoppingCart className="text-white size-5" />
            </div>
            <span className="text-2xl font-black lg:text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r heading from-gray-900 to-gray-600">
              Foodie<span className="text-[#D70F64]">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "relative text-sm font-bold tracking-wide transition-all hover:text-[#D70F64]",
                  pathname === item.url ? "text-[#D70F64]" : "text-gray-600"
                )}
              >
                {item.title}
                {pathname === item.url && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D70F64] rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons & Profile Section */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50">
              <Search className="size-5 text-gray-600" />
            </Button>

            <div className="relative group">
              <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 transition-all">
                <Link href="/Card">
                  <ShoppingCart className="size-5 text-gray-700 group-hover:text-[#D70F64]" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#D70F64] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>

            <div className="w-[1px] h-6 bg-gray-200 mx-2" />

            {!user ? (
              <Button asChild className="rounded-full bg-gray-900 hover:bg-[#D70F64] text-white px-7 font-bold shadow-md transition-all active:scale-95">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D70F64] to-[#ff4d94] flex items-center justify-center text-white border-2 border-white shadow-sm overflow-hidden font-black uppercase">
                    {user.name?.[0] || <User size={20} />}
                  </div>
                  <ChevronDown size={14} className={cn("text-gray-400 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setIsProfileOpen(false)}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-[110]"
                    >
                      <div className="px-4 py-4 border-b border-gray-50 mb-2 bg-gray-50/50 rounded-t-xl">
                        <p className="text-[10px] text-[#D70F64] font-black uppercase tracking-widest mb-1">
                          {user.role || "Customer"}
                        </p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium truncate">{user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          href={user.role === "ADMIN" ? "/admin" : user.role === "PROVIDER" ? "/dashboard" : "/dashboard"}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-[#D70F64] rounded-xl transition-all font-bold text-sm group"
                        >
                          <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
                          My Dashboard
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold text-sm group"
                        >
                          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                          Logout Account
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-4">
            <Link href="/Card" className="relative mr-2 p-1">
              <ShoppingCart className="size-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D70F64] text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-0 bg-white">
                <SheetHeader className="text-left border-b pb-6">
                  <SheetTitle className="text-2xl font-black text-[#D70F64]">Foodie.</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-10">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "text-xl font-bold transition-all",
                        pathname === item.url ? "text-[#D70F64] border-l-4 border-[#D70F64] pl-3" : "text-gray-700"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}

                  <div className="flex flex-col gap-4 mt-10">
                    {user ? (
                      <>
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <p className="text-xs text-[#D70F64] font-black uppercase mb-1">{user.role}</p>
                          <p className="text-base font-bold text-gray-900">{user.name}</p>
                        </div>
                        <Button asChild className="w-full bg-gray-900 py-6 rounded-2xl font-bold">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <Button onClick={handleLogout} variant="outline" className="w-full py-6 rounded-2xl font-bold border-2 text-red-600">
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild className="w-full bg-[#D70F64] py-7 rounded-2xl text-lg font-bold">
                          <Link href="/login">Get Started</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full py-7 rounded-2xl text-lg font-bold border-2">
                          <Link href="/register">Create Account</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar1 };