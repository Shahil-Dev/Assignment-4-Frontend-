"use client";

import { useEffect, useState } from "react";
import { MealCard } from "@/src/components/MealCard";
import { Loader2 } from "lucide-react";

export default function BrowseMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
        const data = await res.json();
        if (data.success) setMeals(data.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
          Delicious <span className="text-[#D70F64]">Selection.</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Discover fresh meals from our top providers</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#D70F64]" size={48} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {meals.map((meal: any) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}