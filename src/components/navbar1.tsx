"use client";

import { Menu, ShoppingCart, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion,  } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import Link from "next/link";

const Navbar1 = () => {
  const pathname = usePathname();

  const menu = [
    { title: "Home", url: "/" },
    { title: "Browse Meals", url: "/meals" },
    { title: "Providers", url: "/providers" },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-300 glass-effect">
      <div className="container mx-auto px-4 lg:max-w-6xl lg:mx-auto md:px-6">
        <nav className="flex items-center justify-between h-20">
          
          {/* Gorgeous Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-[#D70F64] to-[#ff4d94] p-2 rounded-xl shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
              <ShoppingCart className="text-white size-5" />
            </div>
            <span className="text-2xl font-black lg:text-4xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r heading from-gray-900 to-gray-600">
              Foodie<span className="text-[#D70F64]">.</span>
            </span>
          </Link>

          {/* Desktop Menu with Active State */}
          <div className="hidden lg:flex items-center gap-10">
            {menu.map((item) => (
              <a
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
              </a>
            ))}
          </div>

          {/* Action Buttons */}
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

            <Button asChild className="rounded-full bg-gray-900 hover:bg-[#D70F64] text-white px-7 font-bold shadow-md transition-all active:scale-95">
              <a href="/login">Login</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
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
                    <a 
                      key={item.title} 
                      href={item.url} 
                      className={cn(
                        "text-xl font-bold transition-all",
                        pathname === item.url ? "text-[#D70F64] pl-2 border-l-4 border-[#D70F64]" : "text-gray-700"
                      )}
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="flex flex-col gap-4 mt-10">
                    <Button asChild className="w-full bg-[#D70F64] py-7 rounded-2xl text-lg font-bold">
                      <a href="/login">Get Started</a>
                    </Button>
                    <Button variant="outline" asChild className="w-full py-7 rounded-2xl text-lg font-bold border-2">
                      <a href="/register">Create Account</a>
                    </Button>
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