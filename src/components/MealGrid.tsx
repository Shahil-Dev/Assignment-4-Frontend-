"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";

interface IMeal {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function MealGrid({ limit }: { limit?: number }) {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
        const data = await res.json();
        if (data.success) setMeals(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const displayedMeals = limit ? meals.slice(0, limit) : meals;

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-black italic">Popular <span className="text-[#D70F64]">Meals.</span></h2>
        {limit && <Link href="/meals" className="text-[#D70F64] font-bold">View All →</Link>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedMeals.map((meal) => (
          <div key={meal.id} className="bg-white p-4 rounded-[2.5rem] shadow-lg border">
            <div className="relative h-60 mb-4 overflow-hidden rounded-[2rem]">
              <Image src={meal.image} alt={meal.name} fill className="object-cover" />
            </div>
            <h3 className="font-bold text-xl">{meal.name}</h3>
            <p className="text-[#D70F64] font-black">${meal.price}</p>
            <div className="flex gap-2 mt-4">
              <Link href={`/meals/${meal.id}`} className="flex-1 bg-gray-100 py-3 rounded-xl text-center font-bold">Details</Link>
              <button className="flex-1 bg-[#D70F64] text-white py-3 rounded-xl font-bold">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}