"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Join as Provider", href: "/register" },
    { name: "Careers", href: "#" },
    { name: "Our Chefs", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Safety Info", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter">
              Food<span className="text-[#D70F64]">Hub.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Bringing the warmth of home-cooked meals to your doorstep. We connect passionate home chefs with hungry foodies.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#D70F64] hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-8">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-[#D70F64] font-medium text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-8">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-[#D70F64] font-medium text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-8">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#D70F64]">
                  <MapPin size={16} />
                </div>
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#D70F64]">
                  <Phone size={16} />
                </div>
                +880 1234 567890
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#D70F64]">
                  <Mail size={16} />
                </div>
                hello@foodhub.com
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 FoodHub. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 text-[10px] font-black uppercase hover:text-[#D70F64] tracking-tighter">Privacy Policy</a>
            <a href="#" className="text-gray-400 text-[10px] font-black uppercase hover:text-[#D70F64] tracking-tighter">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}