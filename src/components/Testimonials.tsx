"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Rahat Chowdhury",
    role: "Regular Customer",
    comment: "The quality of home-cooked meals is outstanding. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Sumi Akter",
    role: "Food Lover",
    comment: "Getting healthy food delivered to my office has never been this easy.",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Tanvir Ahmed",
    role: "Student",
    comment: "Affordable and delicious! Just like my mom's cooking.",
    avatar: "https://i.pravatar.cc/150?u=3"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 mb-2">
          What They <span className="text-[#D70F64]">Say.</span>
        </h2>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-16">
          Real stories from our happy foodies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-none shadow-xl shadow-gray-100 rounded-[2.5rem] p-4">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-16 h-16 mb-4 border-2 border-[#D70F64]/10">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-gray-600 italic mb-6">"{review.comment}"</p>
                    <h4 className="font-black text-gray-900">{review.name}</h4>
                    <p className="text-[10px] font-black text-[#D70F64] uppercase tracking-tighter">
                      {review.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}