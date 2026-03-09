"use client";

import { Menu, ShoppingCart, Search, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar1 = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
    <header className="fixed top-0 w-full z-[100] transition-all duration-300 glass-effect border-b border-gray-100/50">
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
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 transition-all">
                <ShoppingCart className="size-5 text-gray-700 group-hover:text-[#D70F64]" />
                <span className="absolute top-1 right-1 bg-[#D70F64] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                  0
                </span>
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
                  onMouseEnter={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D70F64] to-[#ff4d94] flex items-center justify-center text-white border-2 border-white shadow-sm overflow-hidden">
                    <User size={20} />
                  </div>
                  <ChevronDown size={14} className={cn("text-gray-400 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setIsProfileOpen(false)}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 p-2 z-[110]"
                    >
                      {/* User Info Section (Hover effect placeholder) */}
                      <div className="px-4 py-4 border-b border-gray-50 mb-2 bg-gray-50/50 rounded-t-xl">
                        <p className="text-[10px] text-[#D70F64] font-black uppercase tracking-widest mb-1">{user.role}</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium truncate">{user.email}</p>
                      </div>

                      <div className="space-y-1">
                        <Link 
                          href="/dashboard" 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-pink-50 hover:text-[#D70F64] rounded-xl transition-all font-bold text-sm group"
                        >
                          <LayoutDashboard size={18} className="group-hover:scale-110 transition-transform" />
                          User Dashboard
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
            <div className="relative mr-2">
               <ShoppingCart className="size-6 text-gray-700" />
               <span className="absolute -top-1 -right-1 bg-[#D70F64] text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full">0</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-900">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-0 glass-effect">
                <SheetHeader className="text-left border-b pb-6">
                  <SheetTitle className="text-2xl font-black text-[#D70F64]">Foodie.</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-10">
                  {menu.map((item) => (
                    <Link 
                      key={item.title} 
                      href={item.url} 
                      className={cn(
                        "text-xl font-bold transition-all",
                        pathname === item.url ? "text-[#D70F64] pl-2 border-l-4 border-[#D70F64]" : "text-gray-700"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                  
                  <div className="flex flex-col gap-4 mt-6">
                    {user ? (
                      <>
                        <div className="p-4 bg-pink-50 rounded-2xl mb-4">
                          <p className="text-sm font-black text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Button asChild className="w-full bg-gray-900 py-6 rounded-2xl font-bold text-lg">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <Button onClick={handleLogout} variant="outline" className="w-full py-6 rounded-2xl font-bold text-lg border-2 text-red-600">
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild className="w-full bg-[#D70F64] py-7 rounded-2xl text-lg font-bold">
                          <Link href="/login">Get Started</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full py-7 rounded-2xl text-lg font-bold border-2">
                          <Link href="/Registration">Create Account</Link>
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