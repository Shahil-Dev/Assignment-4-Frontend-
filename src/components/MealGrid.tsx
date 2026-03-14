"use client";

import { useEffect, useState } from "react";

export default function MealGrid({ limit }: { limit?: number }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
        const data = await res.json();
        if (data.success) {
          setMeals(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch meals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const displayedMeals = limit ? meals.slice(0, limit) : meals;

  if (loading) return <div>Loading meals...</div>;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter text-gray-900">
            Popular <span className="text-[#D70F64]">Meals.</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">
            Handpicked delicious dishes for you
          </p>
        </div>
        
        {limit && (
          <a href="/meals" className="text-[#D70F64] font-black text-sm uppercase tracking-widest hover:underline">
            View All Dishes →
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedMeals.map((meal: any) => (
          <div key={meal.id}>
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
                <img src={meal.image} alt={meal.name} className="rounded-2xl w-full h-48 object-cover mb-4" />
                <h3 className="font-bold text-xl">{meal.name}</h3>
                <p className="text-[#D70F64] font-black mt-2">${meal.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}